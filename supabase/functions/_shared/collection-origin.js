"use strict";

/**
 * Resolve the carrier collection origin exclusively from server-side secrets.
 * Returns null unless every required field is configured.
 */
function collectionOrigin(getEnv) {
  const origin = {
    address: String(getEnv("COURIER_COLLECTION_ADDRESS") || "").trim(),
    city: String(getEnv("COURIER_COLLECTION_CITY") || "").trim(),
    province: String(getEnv("COURIER_COLLECTION_PROVINCE") || "").trim(),
    postal_code: String(getEnv("COURIER_COLLECTION_POSTAL_CODE") || "").trim(),
  };
  return Object.values(origin).every(Boolean) ? origin : null;
}

if (typeof module !== "undefined" && module.exports) module.exports = { collectionOrigin };
