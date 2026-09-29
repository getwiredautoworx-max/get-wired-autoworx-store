#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="${NETLIFY_CACHE_DIR:-/tmp}/gw-owner-apk-toolchain"
mkdir -p "$WORK"

JDK_DIR="$WORK/jdk17"
GRADLE_DIR="$WORK/gradle-8.10.2"
SDK_DIR="$WORK/android-sdk"
TOOLS_DIR="$SDK_DIR/cmdline-tools/latest"

if [ ! -x "$JDK_DIR/bin/java" ]; then
  rm -rf "$JDK_DIR" "$WORK/jdk17.tar.gz"
  curl -L --fail --retry 3 -o "$WORK/jdk17.tar.gz" \
    "https://api.adoptium.net/v3/binary/latest/17/ga/linux/x64/jdk/hotspot/normal/eclipse"
  mkdir -p "$JDK_DIR"
  tar -xzf "$WORK/jdk17.tar.gz" --strip-components=1 -C "$JDK_DIR"
fi

if [ ! -x "$GRADLE_DIR/bin/gradle" ]; then
  rm -rf "$GRADLE_DIR" "$WORK/gradle.zip"
  curl -L --fail --retry 3 -o "$WORK/gradle.zip" \
    "https://services.gradle.org/distributions/gradle-8.10.2-bin.zip"
  unzip -q "$WORK/gradle.zip" -d "$WORK"
fi

if [ ! -x "$TOOLS_DIR/bin/sdkmanager" ]; then
  rm -rf "$SDK_DIR/cmdline-tools" "$WORK/cmdline-tools.zip"
  mkdir -p "$SDK_DIR/cmdline-tools"
  curl -L --fail --retry 3 -o "$WORK/cmdline-tools.zip" \
    "https://dl.google.com/android/repository/commandlinetools-linux-15859902_latest.zip"
  unzip -q "$WORK/cmdline-tools.zip" -d "$SDK_DIR/cmdline-tools"
  mkdir -p "$TOOLS_DIR"
  cp -R "$SDK_DIR/cmdline-tools/cmdline-tools/." "$TOOLS_DIR/"
  rm -rf "$SDK_DIR/cmdline-tools/cmdline-tools"
fi

export JAVA_HOME="$JDK_DIR"
export ANDROID_HOME="$SDK_DIR"
export ANDROID_SDK_ROOT="$SDK_DIR"
export PATH="$JAVA_HOME/bin:$TOOLS_DIR/bin:$SDK_DIR/platform-tools:$PATH"

yes | sdkmanager --licenses >/dev/null 2>&1 || true
sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"

STORE_ASSETS="$ROOT/android-owner-app/app/src/main/assets/store"
rm -rf "$STORE_ASSETS"
mkdir -p "$STORE_ASSETS"
cp "$ROOT/store.html" "$ROOT/index-new.html" "$ROOT/checkout-v2.html" "$ROOT/index.html" "$ROOT/admin.html" "$ROOT/category-navigation.js" "$STORE_ASSETS/"
cp -R "$ROOT/assets" "$STORE_ASSETS/assets"

cd "$ROOT/android-owner-app"
"$GRADLE_DIR/bin/gradle" --no-daemon :app:assembleDebug

APK="$ROOT/android-owner-app/app/build/outputs/apk/debug/app-debug.apk"
test -s "$APK"

mkdir -p "$ROOT/dist/owner-apk"
cp "$APK" "$ROOT/dist/owner-apk/Get-Wired-AutoWorx-Owner-debug.apk"
sha256sum "$APK" > "$ROOT/dist/owner-apk/Get-Wired-AutoWorx-Owner-debug.apk.sha256"

"$SDK_DIR/build-tools/35.0.0/apksigner" verify --verbose "$APK" >/tmp/owner-apk-apksigner.txt
"$SDK_DIR/build-tools/35.0.0/aapt" dump badging "$APK" | tee "$ROOT/dist/owner-apk/apk-badging.txt"
grep -q "package: name='za.co.getwiredautoworx.owner'" "$ROOT/dist/owner-apk/apk-badging.txt"
grep -q "targetSdkVersion:'35'" "$ROOT/dist/owner-apk/apk-badging.txt"

echo "OWNER_APK_BUILD_OK"
