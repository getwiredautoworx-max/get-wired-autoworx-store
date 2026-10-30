# Repository File Reconciliation — 2026-10-29

## Complete tracked-file inventory
- Repository: `getwiredautoworx-max/get-wired-autoworx-store`
- Base main snapshot before reconciliation: `3e362397e249150f4fb992fde199784b6cc42f7c`; recursive tree was `truncated=false`, **5,205 blobs / 498,013,273 declared bytes**.
- Intermediate review branch snapshot: `caf0a1d2ae68da6addb06c7ea0b5c0c7b7f5a1c0`; recursive tree was `truncated=false`, **5,206 blobs / 498,280,807 declared bytes**.
- Complete inventory-ledger snapshot: `3b3e477155df64e2987c7b03cf030aef53c81b31`; **5,210 blobs**, all represented in `REPOSITORY_FILE_INVENTORY_2026-10-29.csv` (the inventory file was added after this snapshot).
- Final review branch head: `c323c2c40898443167361685d8ebb9b256651ade`; **5,211 tracked blobs**, non-truncated.
- Image assets (JPG, PNG, WebP under `assets/`): **4,902**.
- Supplier library: 98 files.
- Catalogue source workspace: 6 files.
- This scan covers the complete tracked Git tree, names, paths, declared sizes and Git blob hashes. It does not claim that every binary image has been visually inspected or semantically matched to a product.

## Reconciliations applied on review branch / PR #110
1. Relocated all **47** Planetworld XLSX source workbooks byte-for-byte from `catalogue-source/suppliers/planetworld/incoming-xlsx/` to `suppliers/Planetworld/`, preserving original Git blob SHAs. The old incoming path contains **0 XLSX**.
2. Updated both Planetworld READMEs and added a current-source, read-only workbook audit workflow using the canonical supplier path.
3. Added a sanitized Car Audio row-level review file at `catalogue-audits/PLANETWORLD_CAR_AUDIO_REVIEW_ONLY_2026-10-29.csv`: **702 rows**, no blank descriptions, and no RRP, dealer-cost, stock or margin fields.
4. Removed the three confirmed unreferenced temporary files `index-new.tmp`, `index.html.tmp`, and `netlify.toml.new`.
5. Replaced the broken 12-byte Electrocity StepDown pointer with a folder README explaining that the referenced `StepDown.md` source is absent. No actual supplier catalogue PDF or product image was removed.

## Planetworld XLSX manifest
| Filename | Bytes | Original blob SHA |
|---|---:|---|
| `adeo-screens-price-list-2026-10-25.xlsx` | 20781 | `e91d2ca053d8d5a7f5e0a012ef7da3b5c490a135` |
| `aiper-price-list-2026-10-25.xlsx` | 20024 | `2022016563b99438732099d91703358ff69fd7d8` |
| `alpine-price-list-2026-10-25.xlsx` | 41657 | `d932105aa23599e2ffdf367a46e877d4ba22c679` |
| `alto-professional-price-list-2026-10-25.xlsx` | 25322 | `3bc33a5ebbf0dc89b11d56541d82e0e5015d855c` |
| `amplified-price-list-2026-10-25.xlsx` | 21326 | `1a6bb38636c0e252bbc5717b961df70569055781` |
| `arcam-price-list-2026-10-25.xlsx` | 17947 | `6364758c030648ebc1e8ffa9178f9443a9fec4bc` |
| `audison-price-list-2026-10-25.xlsx` | 57077 | `beb03e42b827b223ff4931226a65d0a69e3d3744` |
| `crossrock-price-list-2026-10-25.xlsx` | 27287 | `2dc5d27d5418766b2a51cab04d46bbc68e6aea42` |
| `db-price-list-2026-10-25.xlsx` | 32953 | `2a3bc8f5b508019c9e83f5915c441d207a715cff` |
| `dbx-price-list-2026-10-25.xlsx` | 18359 | `d33c27ac9066c94618aa64482d43539a3af1d22d` |
| `denon-dj-price-list-2026-10-25.xlsx` | 20547 | `e8daf9a190193631de3a2ea6e281f8badf00cddb` |
| `focal-car-audio-price-list-2026-10-25.xlsx` | 18394 | `d5df77bae56c2f5043c9ea1a73093807594d6766` |
| `harness-and-trims-price-list-2026-10-25.xlsx` | 37278 | `bf3f16f1f793a005686d7a6af7a38acc9cb19eba` |
| `hdanywhere-price-list-2026-10-25.xlsx` | 33720 | `8dec7911f53f11a26f2c09c251312596781ce267` |
| `ibanez-price-list-2026-10-25.xlsx` | 284223 | `e0395c8e58285047b28099f315b15cbec2c9f685` |
| `integra-price-list-2026-10-25.xlsx` | 19254 | `30d91576c3794a54ea3b900d6693c95ffa293a18` |
| `jabra-price-list-2026-10-25.xlsx` | 208941 | `f9eb4a536d6c963c522f048401897f473100d881` |
| `jbl-price-list-2026-10-25.xlsx` | 28527 | `0ab3d4123beb3a0a2133324f7edbb8b916d0651a` |
| `jlab-price-list-2026-10-25.xlsx` | 36854 | `e0e29d5885b10b6aa8c7842051f955aa8291b65c` |
| `jvc-car-audio-price-list-2026-10-25.xlsx` | 22917 | `5f7af83bb0974842dccd557b3d60feebc2ac3aa6` |
| `jvc-projectors-price-list-2026-10-25.xlsx` | 18853 | `c6b8b154350cef0fa9632c01e849204d62cde501` |
| `kenwood-car-audio-price-list-2026-10-25.xlsx` | 19236 | `5554d434b5ba9854441ae59689e8323d90c0f19e` |
| `kicker-price-list-2026-10-25.xlsx` | 99260 | `0ae8cf194f788f42aff1710adbe4eba27c67bc0b` |
| `klipsch-price-list-2026-10-25.xlsx` | 58589 | `a534362c6c098d410c9b9e7d6cb6857463cd6963` |
| `m-audio-price-list-2026-10-25.xlsx` | 25087 | `ee729d7bbd68dc3f5a792ca87043b571a5bf531d` |
| `m-k-sound-price-list-2026-10-25.xlsx` | 37091 | `282ec90d8b8a6ed4deb166aebe35e8c08f4f8b68` |
| `mason-price-list-2026-10-25.xlsx` | 37333 | `f8700dd5b74917ae23cb9318ab2ee1b86be9d97c` |
| `medeli-price-list-2026-10-25.xlsx` | 22245 | `e8d008a7c623d88e8ca6e44c9dadf4193596ff6c` |
| `numark-price-list-2026-10-25.xlsx` | 21711 | `0c57c37053e110c5f3951fb4e191686ba52208b3` |
| `on-stage-price-list-2026-10-25.xlsx` | 90016 | `6d61ac5eb2db6b2f11d6aa6802327c0629a6b0b6` |
| `one-price-list-2026-10-25.xlsx` | 140784 | `c6b5675cd226fdd2347bfff1bd8173337f782daf` |
| `onkyo-price-list-2026-10-25.xlsx` | 22149 | `d2168dba010226981b9df08763f2c244d99a3069` |
| `p5-price-list-2026-10-25.xlsx` | 19267 | `1ef1b1f2122cf8dfc77c047a0796526b434821b2` |
| `paiste-price-list-2026-10-25.xlsx` | 43143 | `70174db5769a6f6c1d05eacfbc9674146ee4b76a` |
| `pioneer-car-audio-price-list-2026-10-25.xlsx` | 18380 | `e0d5af4fab0646e32e5d8d1b991ae35cd0e6a5c4` |
| `planetwaves-price-list-2026-10-25.xlsx` | 19564 | `abc8f91b0d778b0cc525365eca93659f65a46864` |
| `rane-dj-price-list-2026-10-25.xlsx` | 20027 | `88bdd3b35c79dd12c8d2f12c3cfd610c531a2574` |
| `remo-price-list-2026-10-25.xlsx` | 85750 | `cafa50a6966fc606a5dbcf46562983f5a5432874` |
| `roborock-price-list-2026-10-25.xlsx` | 26553 | `31d31a84d18fa95d926f5d48fa0f43ad7966bfeb` |
| `shure-price-list-2026-10-25.xlsx` | 58109 | `99be84ddbaf30c2796005d27f864f02871852984` |
| `sonance-price-list-2026-10-25.xlsx` | 28856 | `6d0b879e7d1d42c02b903db8d94afa7b6ae14c72` |
| `sonos-price-list-2026-10-25.xlsx` | 43853 | `4e989bc5b9c154470f45db107b84f1c87399f651` |
| `sound-switch-price-list-2026-10-25.xlsx` | 18412 | `a87e0487695f95e6e8d93b5dcba4b21fa6788dd5` |
| `soundcraft-price-list-2026-10-25.xlsx` | 20906 | `0d9180599569739f31e5883a58f628aa38751611` |
| `tama-price-list-2026-10-25.xlsx` | 154456 | `84dadcf97653c42446c681560674b0c083d57930` |
| `vogels-price-list-2026-10-25.xlsx` | 53829 | `94021a229e99d3c1c67e4d1fb3bf2ce084bc9873` |
| `zoom-price-list-2026-10-25.xlsx` | 41375 | `80405f64b6ba45a362db594733206fadbfb1cb68` |

## Fresh Planetworld audit
- Run **40941740509** completed SUCCESS: [audit run](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40941740509).
- 47 workbooks; 94 sheets; 3,317 rows; 0 workbook errors.
- 0 identical workbook hash groups; 0 identical product-data duplicate groups; 0 rows from identical duplicate workbooks; 0 duplicate model/SKU flags; 0 missing model/SKU; 0 missing/unmapped RRP.
- 19 zero-RRP rows remain an owner-review hold. Positive-RRP cost-risk queues: 18 rows below estimated VAT-inclusive dealer cost at RRP−1%; 19 at RRP−2%. These are review flags, not approved price changes.
- Source divisions: Car Audio 702; Musical Instruments 1,719; Installed AV 435; Home CI 319; Home Retail 142.
- Historical review's 32 model/SKU flags are not reproduced by the current-source audit and are not confirmed duplicates.
- GitHub Actions artifact upload failed because account Actions storage quota is full. The audit job and summary succeeded; counts above are from its logs. The sanitized Car Audio CSV was recovered and committed separately to this review branch.

## Exact byte-identical image groups — review, not automatic product duplicates
- Across all 4902 image assets, found **339 groups** of filenames sharing an exact Git blob SHA (792 files in those groups).
- Within `assets/products/` JPG files alone, **163 groups** were identified; the full count also includes WebP duplicates in `assets/products_webp/`.
- Exact bytes establish file identity, not product identity. **No image was deleted, relabelled or assigned to a different model.** Review each group against the source SKU, manufacturer/model, description and image content before deciding whether any file can be removed or reused.
- SHA `d30b1b315a005ebb7167f560396786e7c0d7d8b7` (2 files): `assets/products/0097.jpg`, `assets/products/A8-MCD300.jpg`
- SHA `63e14fb3bb4926f770730ace3f7f2cca22ed765a` (2 files): `assets/products/100701.jpg`, `assets/products/T1-065-150.jpg`
- SHA `6aa95aab80552e507a0e95648125f715c33f5bd6` (2 files): `assets/products/100912.jpg`, `assets/products/T1-167.jpg`
- SHA `060e20fb6b79aa05f019bd8f831dc6761dd45553` (3 files): `assets/products/14-15L-1.25.jpg`, `assets/products/C-WW5.jpg`, `assets/products/RS1205C-B.jpg`
- SHA `93155e44b697e1e4379bcd8cba6d14ae41b04fc8` (2 files): `assets/products/180001.jpg`, `assets/products/181022.jpg`
- SHA `2f69f6e2344238d3c1265cbcec6eea62f3952204` (2 files): `assets/products/180114.jpg`, `assets/products/181032.jpg`
- SHA `db025a76101e28c8b2abd0792d73feb5ae4de473` (2 files): `assets/products/1820WP.jpg`, `assets/products/603B.jpg`
- SHA `45931a3bc5de39fd44923a19407884292fb5be12` (2 files): `assets/products/190403.jpg`, `assets/products/CVS11.jpg`
- SHA `7cc212d5d2a94eaa8fa02ab5c17f4eb18264639d` (2 files): `assets/products/192302.jpg`, `assets/products/192304.jpg`
- SHA `2673f47d89a24efdd766f60bcc400fb7653a85d8` (2 files): `assets/products/1DS.jpg`, `assets/products/254-10.jpg`
- SHA `b7fc8c962cae85d43e004573be6c0886653fc53a` (2 files): `assets/products/242515.jpg`, `assets/products/251002.jpg`
- SHA `14ea808fa0cf1f3c162ace56d9c50a32e33da991` (2 files): `assets/products/244008.jpg`, `assets/products/SCR32MM.jpg`
- SHA `c0091256052360a56de3ad723007d360de918072` (2 files): `assets/products/251053.jpg`, `assets/products/T2-005-500.jpg`
- SHA `5cd20142fa43f9f48a93f2b4eea5d0e4bdff6fb7` (3 files): `assets/products/260071.jpg`, `assets/products/261021.jpg`, `assets/products/423002.jpg`
- SHA `d743af11685eddac8a49935a01aab14e154709c3` (4 files): `assets/products/2747SW-R.jpg`, `assets/products/CH-309.jpg`, `assets/products/CS-5047.jpg`, `assets/products/S1-505LED.jpg`
- SHA `d0c78dfacd48b553ec85d85c350d351fdf5878c1` (4 files): `assets/products/2M1F.jpg`, `assets/products/CH-3622.jpg`, `assets/products/M7-049.jpg`, `assets/products/R1-023R.jpg`
- SHA `3a891d8f7cb6cd8fba8b5a3bd0c2f7d82d0b555b` (2 files): `assets/products/310018.jpg`, `assets/products/311100.jpg`
- SHA `403fbcb972e20d2cff6e79bc85f13b5223326b59` (2 files): `assets/products/312003.jpg`, `assets/products/312006.jpg`
- SHA `7c5c265853ba73a8755cc1ae09717c066a29cf2a` (2 files): `assets/products/330202.jpg`, `assets/products/710104.jpg`
- SHA `dea03227686e803bbcba42ea83e1e6e9f9465f5e` (4 files): `assets/products/334BP.jpg`, `assets/products/3DS.jpg`, `assets/products/880-LED.jpg`, `assets/products/9008.jpg`
- SHA `ffc17cb846436d4981ccdce291c6ecba7c506360` (2 files): `assets/products/340105.jpg`, `assets/products/P7-013-6.jpg`
- SHA `7aec2ece09d47e2c2e1c716187bfaf7d7e5251d1` (2 files): `assets/products/420391.jpg`, `assets/products/P5-211-10.jpg`
- SHA `919569c81d6367285a149cbd41973c49a72ebb8e` (2 files): `assets/products/4217S-KIT.jpg`, `assets/products/SC713-30.jpg`
- SHA `a7009eb5814762ff2bce049f8fd4f978609f0bc6` (3 files): `assets/products/440013.jpg`, `assets/products/C10-013-56.jpg`, `assets/products/RFL.jpg`
- SHA `ce07d039650c8583e9f7ad7cbea08dc7b4a23fbd` (3 files): `assets/products/440304.jpg`, `assets/products/EWP-REMOTE.jpg`, `assets/products/SW2.jpg`
- SHA `ade17f578ad0d70119899b05ec517d71fbe5a42c` (2 files): `assets/products/510108.jpg`, `assets/products/510109.jpg`
- SHA `06c08b8a8d69a6d7cae7a74320ba4d63b0aec20b` (2 files): `assets/products/510146.jpg`, `assets/products/T2-021-SL7.jpg`
- SHA `745212caf14940d863149f3c75490f00b506d069` (2 files): `assets/products/520102.jpg`, `assets/products/530103.jpg`
- SHA `e7c469a5b47b229831101d053857a433484b85cc` (2 files): `assets/products/520108.jpg`, `assets/products/530109.jpg`
- SHA `b1b85bcc14c0c663fc55a4c3704ca1b9631ba342` (2 files): `assets/products/550567.jpg`, `assets/products/550577.jpg`
- SHA `a871a1fb3fab0da6d8bd77946a4593138e18507a` (2 files): `assets/products/560633.jpg`, `assets/products/570203.jpg`
- SHA `fc1e74468b7389171aa4e5c916d16bf0b603844c` (4 files): `assets/products/570303.jpg`, `assets/products/A8-001-115.jpg`, `assets/products/A8-006-75.jpg`, `assets/products/A8-013-75.jpg`
- SHA `a6552230de31549350211f96d1dd9ad328432c3a` (2 files): `assets/products/5DS.jpg`, `assets/products/621-10.jpg`
- SHA `7e4a84546bc0d93bdf8961d48f36d1a31729134f` (2 files): `assets/products/6007-12.jpg`, `assets/products/B8-005.jpg`
- SHA `cdb1bc9b83c4a728c2ac3df7f79aaa7ef3540199` (3 files): `assets/products/6007-3.jpg`, `assets/products/B7-007BL.jpg`, `assets/products/UK-509.jpg`
- SHA `8bf090b99ade7a048bfc427816b3bfdf5264f0f1` (2 files): `assets/products/603W.jpg`, `assets/products/SH150SR.jpg`
- SHA `b61eb55a2fc0f5ae7289d066b31096003aa5d977` (3 files): `assets/products/6309.jpg`, `assets/products/A10-018.jpg`, `assets/products/A10-085.jpg`
- SHA `70e1d455d1950608fdea2529180eaca28b2146f8` (2 files): `assets/products/A1-004.jpg`, `assets/products/CA308.jpg`
- SHA `399294dea2648749e8f6fdea8ed0a1727db429e3` (2 files): `assets/products/A10-042.jpg`, `assets/products/A10-119.jpg`
- SHA `c2136262a1849fb08fbb18d072979d211c008c95` (2 files): `assets/products/A10-081.jpg`, `assets/products/TPS21X200.jpg`
- SHA `9f7e7ce418613aa12d27e196f6d8e85f739363f3` (2 files): `assets/products/A2-034S.jpg`, `assets/products/RTD35A.jpg`
- SHA `fd4eee137d5eef9c745fe29777af905d66feeb41` (2 files): `assets/products/A2-041Y.jpg`, `assets/products/R3-CC81.jpg`
- SHA `956a300b2f885d4a3f4682430d4acc621f866334` (2 files): `assets/products/A7-003.jpg`, `assets/products/VR1068.jpg`
- SHA `6c6c94f2e2fb63bbb42ab515084d68a549a6b254` (2 files): `assets/products/A8-005-65.jpg`, `assets/products/A8-005-75.jpg`
- SHA `ec18ed0c8a89b4e2e5a6918087662567194fb0a5` (2 files): `assets/products/A8-016-150.jpg`, `assets/products/C5-032-100.jpg`
- SHA `1caa8016e6771a4025bd6d3953d0b19daf78bd70` (2 files): `assets/products/A8-FD11560SS.jpg`, `assets/products/C5-032-60.jpg`
- SHA `7e0e31183f2fa19486b8024529d7d44b368b69c2` (2 files): `assets/products/A830048-1.jpg`, `assets/products/A832026E.jpg`
- SHA `d599607d91091bbea561889ad57be65ff44e6e5c` (2 files): `assets/products/B5-001-S.jpg`, `assets/products/C7-010H.jpg`
- SHA `4612fc5e7d63845f4be5c613b26ec28593be5653` (2 files): `assets/products/B5-018-1.jpg`, `assets/products/WT-25F.jpg`
- SHA `4bf16caf7527f342cee4357585e6a98e04c7c8e2` (2 files): `assets/products/BBC600AMP.jpg`, `assets/products/PN06N.jpg`
- SHA `f90be915323ac4f5fbd842994abb6a788770ff65` (2 files): `assets/products/BH0017.jpg`, `assets/products/BH1968.jpg`
- SHA `aa611d29e162f51cd61bef44cc4c0a75314c337d` (2 files): `assets/products/BN-04.jpg`, `assets/products/BS-302.jpg`
- SHA `c504d6e763cf2c9126fa347301abfbe7b1e25e69` (3 files): `assets/products/BOSH16.jpg`, `assets/products/W1-011.jpg`, `assets/products/WB18ES-3.jpg`
- SHA `73f72ccfc6dab839b6794eeab69d072bdad49a00` (2 files): `assets/products/C-WW10.jpg`, `assets/products/M-RWS.jpg`
- SHA `6cdab73568d8d2340abbe93fb118ab9bf2d05445` (2 files): `assets/products/C5-018-2.jpg`, `assets/products/H5-006-25.jpg`
- SHA `6fe8c7ffc6dae41e142a5594e0185b9f70de2107` (2 files): `assets/products/C5-032-80.jpg`, `assets/products/T1-011-9.jpg`
- SHA `44cc24af0a9a5cfb224a7e6d03b7234c1d8b7297` (2 files): `assets/products/C5-036S-10.jpg`, `assets/products/DST060GR.jpg`
- SHA `cd9d4a034faa006feaa6b02c26cc3309597784e1` (2 files): `assets/products/C7-002.jpg`, `assets/products/WR-75G-25.jpg`
- SHA `c1ea2c57cfe22b2165a2e960dd5de3e28b9adf5c` (3 files): `assets/products/CH3042.jpg`, `assets/products/E1-USB7.jpg`, `assets/products/S7-006-1.jpg`
- SHA `9fd4f4ea09fca6540b9c073c058305f30ca58549` (2 files): `assets/products/CJ203B.jpg`, `assets/products/PN06P.jpg`
- SHA `c02d3f4deaab5725970015f6a3e05815a2d56f30` (2 files): `assets/products/CP-RN01.jpg`, `assets/products/CP-TY04.jpg`
- SHA `24803d368bc7a64873fc9591953cca22dcde91b4` (3 files): `assets/products/CS-112040.jpg`, `assets/products/DL-FF01.jpg`, `assets/products/I1-129.jpg`
- SHA `09ca44e6fcc6dc2d4b92f7eee5836f0a06b21b15` (2 files): `assets/products/CS-114014.jpg`, `assets/products/F4-006.jpg`
- SHA `2a7314da82f79c82fead84ccd88a141e2135ab30` (2 files): `assets/products/CS-5048.jpg`, `assets/products/VOLT84C.jpg`
- SHA `5af9aa36f4c2c7df4a43183cde1287049e068113` (2 files): `assets/products/CSS-020.jpg`, `assets/products/CSS-026.jpg`
- SHA `a65386c776a9f4cb348f93f23b0b5fa7336efc7f` (2 files): `assets/products/CT-018.jpg`, `assets/products/JD-3232G.jpg`
- SHA `cb0d79ec8972adc93462334744489da38b6a308c` (2 files): `assets/products/CT25-100.jpg`, `assets/products/CT25-100B.jpg`
- SHA `dd5a3f1ac8b48f98eaf22e4efd5bf24f00afa6f8` (4 files): `assets/products/CT25-120B.jpg`, `assets/products/CT76-300B.jpg`, `assets/products/HCSS36W-10.jpg`, `assets/products/HCSS44W-10.jpg`
- SHA `789da1828a52232cb552de536b0140f03348a5d4` (4 files): `assets/products/CV-80F.jpg`, `assets/products/CV16MM.jpg`, `assets/products/DF19MM.jpg`, `assets/products/E18MM.jpg`
- SHA `3839cf26e094fc6b0f962d67f00cf11c7145c419` (2 files): `assets/products/CVOS27MM.jpg`, `assets/products/CVOS30MM.jpg`
- SHA `99bbaef575a8ff7fc0e2d1977c394825b502669f` (2 files): `assets/products/DHFL-QI.jpg`, `assets/products/DHIR-QI.jpg`
- SHA `b837e76a031f43f4fb1caa46e9d18c787b371d0e` (2 files): `assets/products/DHFR-HAC.jpg`, `assets/products/DHIL-QI.jpg`
- SHA `3d6b00faa570d57f15d0c8366a5b647004cc0277` (2 files): `assets/products/DHIL-YHG.jpg`, `assets/products/H-WRH01.jpg`
- SHA `a530a5b55f1b4748ddbe7bce51cab6ff6276d985` (2 files): `assets/products/EA017.jpg`, `assets/products/EX923.jpg`
- SHA `fa57ce574ac5ba3b94c3b7937940fd0ff9cbe519` (2 files): `assets/products/ETS-001-1.jpg`, `assets/products/RK-FBB01.jpg`
- SHA `4befda39779aca07d476e1844d8ba390677d96a4` (2 files): `assets/products/F1-019.jpg`, `assets/products/GF-239_240.jpg`
- SHA `d7b2e32f978bb2648897460049c7483f8ee6f90e` (2 files): `assets/products/F1-053.jpg`, `assets/products/VR1103.jpg`
- SHA `e287d77db153a320f2141705795a035418fbb3ba` (2 files): `assets/products/F1-086.jpg`, `assets/products/V-OFCC02.jpg`
- SHA `cd605d3516601972a7f28ffe2d09f84eb8e81f69` (2 files): `assets/products/F3-002.jpg`, `assets/products/FH-002.jpg`
- SHA `8ac509002993d3cb4b9c5dc0e46a4c5053a928fd` (3 files): `assets/products/F3-004-15.jpg`, `assets/products/FL30.jpg`, `assets/products/R3-43.jpg`
- SHA `4413dc051e2a302e46f1267d490468f596ed5329` (2 files): `assets/products/F3-005-FH.jpg`, `assets/products/F3-011-20.jpg`
- SHA `84010720644a28c05c541ae852354752f64a907f` (4 files): `assets/products/F7-002-4.jpg`, `assets/products/F7-002-7.jpg`, `assets/products/F7-107-18.jpg`, `assets/products/F7-107-20.jpg`
- SHA `36501953e89a71529aaa45f2c8058d8f950133d6` (2 files): `assets/products/F7-010-10.jpg`, `assets/products/F7-010-14.jpg`
- SHA `57310c1ec4635f292c66b7f0f01bb90d0865046c` (4 files): `assets/products/F7-102-17.jpg`, `assets/products/F7-102-20.jpg`, `assets/products/F7-103-6.jpg`, `assets/products/F7-104-5.jpg`
- SHA `119c316f9f89e4bc97f496b8d8ff0ea2e38e1ee0` (2 files): `assets/products/F7-102-32.jpg`, `assets/products/F7-104-12.jpg`
- SHA `2bf662100ddd0dfdc94a4eb711bbb436202d8809` (2 files): `assets/products/F7-104-15G.jpg`, `assets/products/F7-107-12.jpg`
- SHA `bd52a96f0b0aba05b503fe3c5f75e4d6256c9eea` (2 files): `assets/products/F7-104-16.jpg`, `assets/products/F7-104-19.jpg`
- SHA `579e7f06cc8691940a3fc79ca1ff9d0ce396d18d` (2 files): `assets/products/F9-001-2.jpg`, `assets/products/T9-0017.jpg`
- SHA `ade62496e2675880901ec9eae68aef284b8f8da0` (2 files): `assets/products/FG715.jpg`, `assets/products/ND86.jpg`
- SHA `47154d16bb60847a9e421d169e430ef1b0367fe4` (2 files): `assets/products/FK317.jpg`, `assets/products/ND41-24.jpg`
- SHA `c752cd0567e348009f1a1bc68d7229af37e8beab` (2 files): `assets/products/G6-049B.jpg`, `assets/products/S9-037.jpg`
- SHA `3257809cfd011ce866251f052f8955ef9dea2d60` (2 files): `assets/products/GH-501-16.jpg`, `assets/products/H15-LED-H.jpg`
- SHA `45498b66a7c39857be3b5ab2741b52bf1549a440` (2 files): `assets/products/GH-590C.jpg`, `assets/products/HID-H4DC.jpg`
- SHA `38fc9c037a70f2fc5e2fd19112ea1e2335b0f640` (2 files): `assets/products/GK-311N.jpg`, `assets/products/MA314.jpg`
- SHA `1b163aefdfc0564176f3599d34f3fa37a2651d1e` (3 files): `assets/products/GU500.jpg`, `assets/products/GUT12.jpg`, `assets/products/Y90385-18009.jpg`
- SHA `327cf008fdb5905dc6c01cd452e36a3cec2aeeca` (2 files): `assets/products/H5-001-6.jpg`, `assets/products/H5-001-8.jpg`
- SHA `38f2f97e819bdac5ca82e3fbe5306bec722b1d84` (2 files): `assets/products/HDJW2L.jpg`, `assets/products/WT-25-SP.jpg`
- SHA `0503d9e7d3ec63d41594bd1f0f7c17815bf93d38` (3 files): `assets/products/HT11.jpg`, `assets/products/QC350.jpg`, `assets/products/RSL1001.jpg`
- SHA `6684e1c90149fee80ccc4a1a77b06183b8ccd986` (2 files): `assets/products/I1-046.jpg`, `assets/products/RO-324.jpg`
- SHA `0283d31770c22686f4b192957d2ef0f47a2c3a05` (2 files): `assets/products/IASC-019.jpg`, `assets/products/IASC-019F.jpg`
- SHA `f337e0c93d8775463064b1c81219744724eae96b` (2 files): `assets/products/IASC-034.jpg`, `assets/products/S14-120GY.jpg`
- SHA `ea28b52d9e392ed59ef9cea5c0dd716dc36333ec` (2 files): `assets/products/IASC-045F.jpg`, `assets/products/S14-130BL.jpg`
- SHA `d1dd1c2e983060217117a3c49273e2b6ef0afb5b` (4 files): `assets/products/IASC-047CO-F.jpg`, `assets/products/IASC-052F.jpg`, `assets/products/S14-340BL.jpg`, `assets/products/S14-410B.jpg`
- SHA `80c0772085c56fccdd35ca0ff5fdeb5d951bf097` (2 files): `assets/products/IASC-053F.jpg`, `assets/products/S14-530G.jpg`
- SHA `e91337a4665ab3597fae49f716b892d5a76f6483` (2 files): `assets/products/IL-IZD02.jpg`, `assets/products/IL-VV01.jpg`
- SHA `c376b6ec376b236d0f94b09191d2473664ff0db4` (2 files): `assets/products/IL-W9.jpg`, `assets/products/OFC-01.jpg`
- SHA `5b32b9c5fdcd9518fc651cdec664bd3de3b1a50e` (2 files): `assets/products/J2-008.jpg`, `assets/products/TW605.jpg`
- SHA `512358f0b7c5bc7ed377423580971e2b225a434c` (2 files): `assets/products/J2-015.jpg`, `assets/products/Y4001-EC.jpg`
- SHA `ac35ffc867099ccf78e9053e20a00c6bfab1dd28` (3 files): `assets/products/K4-017-35.jpg`, `assets/products/S2001T.jpg`, `assets/products/YP895-2.jpg`
- SHA `7f2f5b248ad29e085be19807c7dd3bc15a276331` (2 files): `assets/products/K402.jpg`, `assets/products/S2-020GR.jpg`
- SHA `0332f230de8463e3e7c6f31f5b23b5ee2fd86b34` (3 files): `assets/products/K474R.jpg`, `assets/products/S2-026L.jpg`, `assets/products/S2-026R.jpg`
- SHA `0e43f8a30ffd97bfc55875d41b2f2f85f77823cd` (4 files): `assets/products/KOA1069SBR.jpg`, `assets/products/O-WRH02.jpg`, `assets/products/Q-SDC02.jpg`, `assets/products/SDHI-Q.jpg`
- SHA `ae24ae231a4f0387789991bc0f559aa41cf8cf0e` (3 files): `assets/products/KT1035CB15.jpg`, `assets/products/KT970GMS16.jpg`, `assets/products/KT986S15.jpg`
- SHA `78af18c67bef02005547b7fcd93736ef7227d142` (2 files): `assets/products/KT838S13.jpg`, `assets/products/KT996S14.jpg`
- SHA `201305835123889b2b8d5e55b0a063738a30b8ac` (3 files): `assets/products/MA330.jpg`, `assets/products/MA342.jpg`, `assets/products/MA342_2.jpg`
- SHA `2089d96e011cb583a7195771c8e24c9081f81163` (3 files): `assets/products/MA333-T.jpg`, `assets/products/MA396.jpg`, `assets/products/MA515.jpg`
- SHA `e82e5ccef8e885754363453bb8e6a0a1383a1d30` (2 files): `assets/products/MA333BN-T.jpg`, `assets/products/MA333M.jpg`
- SHA `5743f0d9be69c522f72dcb32cad30c4ae2639849` (2 files): `assets/products/MA648.jpg`, `assets/products/SL-939R.jpg`
- SHA `bb4d963659e7516355b0ee2fc0f1c04e02aba3c2` (2 files): `assets/products/ND51.jpg`, `assets/products/ND73.jpg`
- SHA `a57cfc36041025ebb01bd1993f71d43e12872763` (2 files): `assets/products/OFC-OP02.jpg`, `assets/products/UOR1.jpg`
- SHA `bf54584a439641663833654dfb908c8308a41ea2` (2 files): `assets/products/P5-047-9P.jpg`, `assets/products/P5-053-1.jpg`
- SHA `baee6be851b8c1f1de2dc5ed778a31cf14743753` (2 files): `assets/products/PE-650M.jpg`, `assets/products/T8-023.jpg`
- SHA `4347cfb2d481faad4944b7e4e48730d70fc8d272` (3 files): `assets/products/PWS-TY05.jpg`, `assets/products/PWS-UV01.jpg`, `assets/products/S2-031.jpg`
- SHA `9d18e6d44c8910e06903104d4babc19a029cbeb0` (2 files): `assets/products/Q-GSC02.jpg`, `assets/products/RT-BB01.jpg`
- SHA `dd3d515d19d7eff61b1ce2664c52380abf522c3e` (2 files): `assets/products/RB-093.jpg`, `assets/products/W-BS01.jpg`
- SHA `c97bd3f574789c4220bd1d12f5b3d48d7e74485b` (2 files): `assets/products/RC-20.jpg`, `assets/products/RCG3-14.jpg`
- SHA `740b61660daa2103ce2b244dff06b42341db733c` (2 files): `assets/products/RSL254B.jpg`, `assets/products/RSL255B.jpg`
- SHA `5f9365eb3e07ae489d2fe1c6ea288803877f38ad` (2 files): `assets/products/S1-1160MC.jpg`, `assets/products/SS-OP02.jpg`
- SHA `499852abc18488ee47714f16886843a9615456ea` (2 files): `assets/products/S14-630GY.jpg`, `assets/products/S14-835R.jpg`
- SHA `0da02de6d5ac5ed5a694364f2bb8fffc4274d388` (2 files): `assets/products/S2-015.jpg`, `assets/products/S2-041.jpg`
- SHA `1daca1fea09cec8cbad65dc78c572e89c76e0afd` (2 files): `assets/products/S5-11001.jpg`, `assets/products/S5-12001.jpg`
- SHA `78fc6e18ad81d0dd3404cf86a31fa5cbaadf8037` (2 files): `assets/products/S5-26281.jpg`, `assets/products/S5-26632.jpg`
- SHA `7c4fd6076883381119cbef2d0ab6a04583756dc0` (2 files): `assets/products/S5-32088.jpg`, `assets/products/S5-5181.jpg`
- SHA `75cd9aa8a285d6a3bfed83871d4b658aab429ed1` (2 files): `assets/products/S5-4130.jpg`, `assets/products/S5-4150.jpg`
- SHA `d10627be71b07dc256942903451ee18f2688ab6f` (3 files): `assets/products/S5-5242.jpg`, `assets/products/S5-5244.jpg`, `assets/products/SS-RS01.jpg`
- SHA `028281abe3273f558240c4b351e55e82e7a8e839` (2 files): `assets/products/S6-104GY.jpg`, `assets/products/S6-104T.jpg`
- SHA `36b594017a032a355c144d5b7fc3c1621d082973` (2 files): `assets/products/S6-105BL.jpg`, `assets/products/X1-011S.jpg`
- SHA `a19fe363de31a77a645d67d419a64f47bd5d157d` (2 files): `assets/products/S9-1.25.jpg`, `assets/products/TP-001.jpg`
- SHA `8beee77f611f0958454da0171ce7ecdede9fbe3b` (2 files): `assets/products/SFDP1-015-080-31.jpg`, `assets/products/T39B.jpg`
- SHA `5bfd84e9f15e29572b9838014559df5e7d23f803` (2 files): `assets/products/SL-OP01.jpg`, `assets/products/SL-RFR01.jpg`
- SHA `b2cb00ef082c7e497c91f798cd31d84a41801954` (3 files): `assets/products/SP-106108.jpg`, `assets/products/STUD1006.jpg`, `assets/products/YP-816-B.jpg`
- SHA `51bec1e9149e737d9e1afd7e83b2b0c66caf5af7` (2 files): `assets/products/SP-566-76.jpg`, `assets/products/YP802-L.jpg`
- SHA `ce010ba0846cdea35568294eb4e2c4474d599de6` (2 files): `assets/products/SW351C.jpg`, `assets/products/SWC790.jpg`
- SHA `258398c411d0e85f19c0c6ba14494d805a14e252` (2 files): `assets/products/T-UB006.jpg`, `assets/products/WP3_4.jpg`
- SHA `11bb4acc24f0a4abda0d408973bef92b55e380ae` (2 files): `assets/products/T1-196.jpg`, `assets/products/T15-004-T45.jpg`
- SHA `67ef4544144deb483fa3e9dc14d33e4c9a2897c5` (2 files): `assets/products/T15-001-11.jpg`, `assets/products/T15-008-9.jpg`
- SHA `267d4ffd4597e7ee9521d60dfad2a185587da2a3` (2 files): `assets/products/T15-001-15.jpg`, `assets/products/T15-003-E16.jpg`
- SHA `2db485d9c8fc6c6f5346ac943b0e1078334c5e24` (2 files): `assets/products/T15-002-11.jpg`, `assets/products/T15-005-14.jpg`
- SHA `872f89c43529e3a85536257216170346b5c6b491` (2 files): `assets/products/T15-002-9.jpg`, `assets/products/T15-005-7.jpg`
- SHA `3dcbf8e0ff285fad17e25d77485d5cd5acb28580` (2 files): `assets/products/T15-004-T60.jpg`, `assets/products/T15-010-32.jpg`
- SHA `8ffe598b685fdc2206cda0c436aaa89ee7ad170b` (2 files): `assets/products/T15-008-25.jpg`, `assets/products/T15-012-15.jpg`
- SHA `8dfe5848d71b3d967d4e49bd5d20d851af27c8f6` (2 files): `assets/products/T54CH.jpg`, `assets/products/T54G.jpg`
- SHA `34e145e7ffffb6beb4591cc02c4c69bfd037654b` (2 files): `assets/products/T9-0018-M.jpg`, `assets/products/T9-0018.jpg`
- SHA `285b8fded04d615821ba25d136f254e7a17529b7` (2 files): `assets/products/T9-0045.jpg`, `assets/products/T9-1023.jpg`
- SHA `41e2441adf6e2a0a4c738e86d0d3dd7b58739c9a` (2 files): `assets/products/T9-0049.jpg`, `assets/products/T9-1041.jpg`
- SHA `a904c34cabb51903af0586f8a79ff9110a54d520` (2 files): `assets/products/T9-0051.jpg`, `assets/products/T9-1042.jpg`
- SHA `c694af7f0c24adc1e964ddb36e53ae10efd13eba` (2 files): `assets/products/T9-0052.jpg`, `assets/products/T9-1045.jpg`
- SHA `15caa92ab154410d555ea5b49e232cd022e71958` (2 files): `assets/products/T9-1077.jpg`, `assets/products/T9-2540.jpg`
- SHA `f231ede65d4eff1a53e6d2b526873aa519d72506` (2 files): `assets/products/T9-1096.jpg`, `assets/products/T965.jpg`
- SHA `d97b9132daff0119dea5a8f23fb23045c322819b` (2 files): `assets/products/VR1063.jpg`, `assets/products/VR1073.jpg`
- SHA `3d77fc4e095987dc7768b46591ec5fa0302fc2a9` (2 files): `assets/products/VR1075.jpg`, `assets/products/VR1104.jpg`
- SHA `0f4d1a564e8e661e3118bd72cc50f09ae366e048` (2 files): `assets/products/W1-TOY1.jpg`, `assets/products/WB14ES-3.jpg`
- SHA `5959ca827b3d6c272b9d92926f9dad5a765f8b97` (2 files): `assets/products/WB17ES-3.jpg`, `assets/products/WB21ES-3.jpg`
- SHA `f85c7a1da1cfbca5ca9add3f121deeb7e507e63f` (2 files): `assets/products_webp/GW-004A923B.webp`, `assets/products_webp/GW-E618C516.webp`
- SHA `56cdb409994927771dbcb08eeed36c0540294c71` (2 files): `assets/products_webp/GW-00D637FC.webp`, `assets/products_webp/GW-D75E5F6D.webp`
- SHA `3ee3d374a0b69ce46939b2720c052cc0a82a29fe` (4 files): `assets/products_webp/GW-00FCD847.webp`, `assets/products_webp/GW-4B55DBAD.webp`, `assets/products_webp/GW-4F0634A3.webp`, `assets/products_webp/GW-85935332.webp`
- SHA `500f7cecc418009441d4ce94169e312d0428cc89` (3 files): `assets/products_webp/GW-017D5990.webp`, `assets/products_webp/GW-542E82A9.webp`, `assets/products_webp/GW-774FB9F8.webp`
- SHA `fd2113e53b0c43511a141c96100a22f1ad5f5b37` (2 files): `assets/products_webp/GW-01DDC851.webp`, `assets/products_webp/GW-5768C0EB.webp`
- SHA `c2aa1e4078972bdb34b08b83d5f9d092e6f7c2d7` (2 files): `assets/products_webp/GW-026C7F71.webp`, `assets/products_webp/GW-4246B2D6.webp`
- SHA `38fe0c8a833b719494081c975d5f61b0a2b17abe` (2 files): `assets/products_webp/GW-027DE994.webp`, `assets/products_webp/GW-E4786476.webp`
- SHA `db7f4953209497a281bbf5846cbf8d57aa8713b3` (2 files): `assets/products_webp/GW-03191CF6.webp`, `assets/products_webp/GW-F46FFEC2.webp`
- SHA `a4d465a79243e7eeea3518487a19ae5e02f36a5d` (2 files): `assets/products_webp/GW-05A03801.webp`, `assets/products_webp/GW-FCA4CFC3.webp`
- SHA `695f9a06437f28f9993622d8ab3d96d6ff595599` (2 files): `assets/products_webp/GW-05B9E728.webp`, `assets/products_webp/GW-F4D9D8C9.webp`
- SHA `c942e20f7c1915d04bf1e3a298b4d8e7c38ee2f1` (2 files): `assets/products_webp/GW-064CBFD5.webp`, `assets/products_webp/GW-1282DFFF.webp`
- SHA `1cf4febfca7e5e86e63f8606b867b8ce7fa40833` (3 files): `assets/products_webp/GW-068AEAD0.webp`, `assets/products_webp/GW-43EDB928.webp`, `assets/products_webp/GW-D8CB9050.webp`
- SHA `5009df943040ebc9e001a77666b491f2e84a70e1` (2 files): `assets/products_webp/GW-07119C31.webp`, `assets/products_webp/GW-E0762D50.webp`
- SHA `f633686ce105ee625ba78d54ae9c6cedeec0fb15` (4 files): `assets/products_webp/GW-07B8ED50.webp`, `assets/products_webp/GW-1C6C6131.webp`, `assets/products_webp/GW-294DEA3B.webp`, `assets/products_webp/GW-FCF4050E.webp`
- SHA `e26f402ecf108ac7d93301f8df1d8ef49dc801ef` (2 files): `assets/products_webp/GW-0915F96D.webp`, `assets/products_webp/GW-1A848A23.webp`
- SHA `986e16abd8ff131b42d73aeeed9e0e53b11fcb9a` (17 files): `assets/products_webp/GW-0A2894B7.webp`, `assets/products_webp/GW-179101FA.webp`, `assets/products_webp/GW-1FBF5D00.webp`, `assets/products_webp/GW-3888FAD4.webp`, `assets/products_webp/GW-43A1E227.webp`, `assets/products_webp/GW-4C0D1F06.webp`, `assets/products_webp/GW-60E04041.webp`, `assets/products_webp/GW-6779DD3C.webp`, `assets/products_webp/GW-795F68A4.webp`, `assets/products_webp/GW-81063A6E.webp`, `assets/products_webp/GW-94BDE82A.webp`, `assets/products_webp/GW-C9FCC002.webp`, `assets/products_webp/GW-D4399A40.webp`, `assets/products_webp/GW-DC9DC70B.webp`, `assets/products_webp/GW-E843CC1A.webp`, `assets/products_webp/GW-F918DDD0.webp`, `assets/products_webp/GW-FA046E3D.webp`
- SHA `055ebfad25033b7ab3bd8685b4f36ffd81dd0c72` (2 files): `assets/products_webp/GW-0B31F409.webp`, `assets/products_webp/GW-D2332452.webp`
- SHA `f63b0dd75aed5e9534c51f17ebcb3b364794694d` (3 files): `assets/products_webp/GW-0B6447DF.webp`, `assets/products_webp/GW-3BD6FD98.webp`, `assets/products_webp/GW-F19172E9.webp`
- SHA `56b156bedc93c54a6d2823606449f058e9b380d1` (2 files): `assets/products_webp/GW-0B8FC435.webp`, `assets/products_webp/GW-0F399056.webp`
- SHA `84de1ca9f2be7be1bed60a75d48cc4e28e69c048` (2 files): `assets/products_webp/GW-0BF70CF4.webp`, `assets/products_webp/GW-AF4C2FF1.webp`
- SHA `b1026c5bb295e973f156b5741f6ab4061296715a` (2 files): `assets/products_webp/GW-0BF7FF11.webp`, `assets/products_webp/GW-B5CEF0E6.webp`
- SHA `e66f04cdd185be867dee0ed19298725c82376a56` (3 files): `assets/products_webp/GW-0D73887C.webp`, `assets/products_webp/GW-A1FC8386.webp`, `assets/products_webp/GW-E3CB6F5F.webp`
- SHA `52cf01b1a2fbccbfe2320bea8b39c55f62f0033f` (2 files): `assets/products_webp/GW-0E6D3EB9.webp`, `assets/products_webp/GW-A8D2F0E3.webp`
- SHA `db8357b386b9c3a386996820676b58223cd080a9` (3 files): `assets/products_webp/GW-0F8EB119.webp`, `assets/products_webp/GW-AAAD8DCE.webp`, `assets/products_webp/GW-C1FEDE1E.webp`
- SHA `a2e3049887f646403589e9d5c160eb93e70625da` (3 files): `assets/products_webp/GW-1106A5AC.webp`, `assets/products_webp/GW-3CF0D353.webp`, `assets/products_webp/GW-E1846C0A.webp`
- SHA `7c6631152029da1ec8341babcc8ae47b5d10aba9` (2 files): `assets/products_webp/GW-113F85C9.webp`, `assets/products_webp/GW-9D0DA68A.webp`
- SHA `4c7e3ca8cb66ce2404f241d0f4f8f167f814d391` (2 files): `assets/products_webp/GW-11F68768.webp`, `assets/products_webp/GW-4CDEC552.webp`
- SHA `a5659cb1ec406732149d2ca5a5c8b631db80884a` (9 files): `assets/products_webp/GW-1252201D.webp`, `assets/products_webp/GW-15AFDF69.webp`, `assets/products_webp/GW-9F6AA5DE.webp`, `assets/products_webp/GW-B9C247F8.webp`, `assets/products_webp/GW-D4E8F46D.webp`, `assets/products_webp/GW-E4165564.webp`, `assets/products_webp/GW-F031F628.webp`, `assets/products_webp/GW-F2A28430.webp`, `assets/products_webp/GW-F7589F56.webp`
- SHA `c4cb3011a546dd48ccea1c8850532a746c0cdef7` (2 files): `assets/products_webp/GW-125D2F26.webp`, `assets/products_webp/GW-2B67E360.webp`
- SHA `0cd2cede1d5161f089d2f719b722ab1b91b54779` (2 files): `assets/products_webp/GW-128E8A8C.webp`, `assets/products_webp/GW-786C8F24.webp`
- SHA `27fe338183dfad456c6251f4239c591d16afbd92` (2 files): `assets/products_webp/GW-130526A6.webp`, `assets/products_webp/GW-E5467791.webp`
- SHA `b392261f8d37b91dbc90bc7a1dc4b44a912c983a` (2 files): `assets/products_webp/GW-13612220.webp`, `assets/products_webp/GW-F433FC9F.webp`
- SHA `d716ff70bf679f03d8a509406879cb058f071a17` (2 files): `assets/products_webp/GW-145BE840.webp`, `assets/products_webp/GW-C6A6A750.webp`
- SHA `f3b56297db3ef72d3f2ea042915b9c2af62d19ea` (2 files): `assets/products_webp/GW-147C352B.webp`, `assets/products_webp/GW-70E77034.webp`
- SHA `79ef1844c0204acfc59ee14509e027defe438f64` (2 files): `assets/products_webp/GW-15970624.webp`, `assets/products_webp/GW-F73D9987.webp`
- SHA `184f0f67cb1e8de53f6f26d6359bb696ab0e1be8` (2 files): `assets/products_webp/GW-15FEC068.webp`, `assets/products_webp/GW-87B0C54E.webp`
- SHA `39fe06fadb455be819f837f9812af870cc7e0133` (2 files): `assets/products_webp/GW-1618B470.webp`, `assets/products_webp/GW-894BDE03.webp`
- SHA `5fda5d86a9fb123a49b4fedaaf9883eb08d60e23` (3 files): `assets/products_webp/GW-16A9081C.webp`, `assets/products_webp/GW-2BBBAD57.webp`, `assets/products_webp/GW-A660A9FB.webp`
- SHA `b1f62e227d94df60aa54c6819f6afa1a37622a44` (3 files): `assets/products_webp/GW-16F183AD.webp`, `assets/products_webp/GW-370F6D37.webp`, `assets/products_webp/GW-E9A5C49F.webp`
- SHA `d544a902ecdd2c25098c77ce510ced7104e1a661` (2 files): `assets/products_webp/GW-17AC6469.webp`, `assets/products_webp/GW-86846570.webp`
- SHA `11c6e663d259dd8e57142ff68647549c10dbc4b6` (2 files): `assets/products_webp/GW-17AE132E.webp`, `assets/products_webp/GW-54EF74BB.webp`
- SHA `1fc34af8337a6d95ea62b7dcf24b3e037ba051ed` (2 files): `assets/products_webp/GW-17CC4397.webp`, `assets/products_webp/GW-F00EB1FC.webp`
- SHA `07d562a328d0e66a9e7249c790211f722e2d8cb8` (2 files): `assets/products_webp/GW-185D2206.webp`, `assets/products_webp/GW-7CA5AA6E.webp`
- SHA `c99c6ce59110b529769e9bd531b76a752b5c6b4f` (2 files): `assets/products_webp/GW-1994BF5D.webp`, `assets/products_webp/GW-75F32D38.webp`
- SHA `81b5e0a44d00aac53932eb142deb83aee9e19a3e` (3 files): `assets/products_webp/GW-1B375758.webp`, `assets/products_webp/GW-B2BF0FAF.webp`, `assets/products_webp/GW-C69788D3.webp`
- SHA `d00272d165ff84ad81f69fe2434b949bf2eae660` (3 files): `assets/products_webp/GW-1B7D02DE.webp`, `assets/products_webp/GW-88043E84.webp`, `assets/products_webp/GW-CF07F795.webp`
- SHA `ce40deecd076199bec995734823c0757532a272f` (2 files): `assets/products_webp/GW-1C87D5E5.webp`, `assets/products_webp/GW-1DA00CDF.webp`
- SHA `2c56c8a2ceb61615c0492517443be6913c5b864d` (2 files): `assets/products_webp/GW-1D0D368C.webp`, `assets/products_webp/GW-8A6BBEC3.webp`
- SHA `e8cdaaa52fe8a621071cf79a743f09e530dd3b83` (2 files): `assets/products_webp/GW-1E72B4B3.webp`, `assets/products_webp/GW-911A1D36.webp`
- SHA `d1018b23961c3dc5c8599cec787e1d5a09f6bffa` (2 files): `assets/products_webp/GW-1ED91C25.webp`, `assets/products_webp/GW-60C9620B.webp`
- SHA `cc628e5408bc9e5f3d8e122e220bd390d172a4e7` (2 files): `assets/products_webp/GW-1F00F3E3.webp`, `assets/products_webp/GW-56DCF302.webp`
- SHA `a0226a25d7e6bed04fb2fb8ef23cf89aab6db0ae` (2 files): `assets/products_webp/GW-1FF3525F.webp`, `assets/products_webp/GW-9A1EEF34.webp`
- SHA `43a61d74515e91ad6da27babe8ce75008acfd8e2` (2 files): `assets/products_webp/GW-2233DF00.webp`, `assets/products_webp/GW-277997A2.webp`
- SHA `b49802878368541ed20f7e95588ae52df3f30c3d` (2 files): `assets/products_webp/GW-22EFD687.webp`, `assets/products_webp/GW-5E128E52.webp`
- SHA `53ccb7d5aff8ce093964340870ecff18f2396d61` (2 files): `assets/products_webp/GW-22F51489.webp`, `assets/products_webp/GW-ACB6A06F.webp`
- SHA `809aaaaedc490628c2cbe4cee6e310777a1911a8` (2 files): `assets/products_webp/GW-23CC76F4.webp`, `assets/products_webp/GW-9BF60F9B.webp`
- SHA `67794d225d781d78d3ea268863c6d14bbdd616fa` (2 files): `assets/products_webp/GW-24AB1688.webp`, `assets/products_webp/GW-5723C54F.webp`
- SHA `fa8e430a8f66baf724d8bd39f6d872fcd16df683` (4 files): `assets/products_webp/GW-2757666A.webp`, `assets/products_webp/GW-2A7A9F1E.webp`, `assets/products_webp/GW-3EEEC849.webp`, `assets/products_webp/GW-D41C044F.webp`
- SHA `ce0d795e6f23772a8739dcc321a248a4a083fc86` (2 files): `assets/products_webp/GW-27973A0A.webp`, `assets/products_webp/GW-94555D84.webp`
- SHA `5e86f2cfaf4995e22a92a3d59c2e93b8772b29f7` (7 files): `assets/products_webp/GW-27CA10AE.webp`, `assets/products_webp/GW-79C1D9A3.webp`, `assets/products_webp/GW-893590EA.webp`, `assets/products_webp/GW-A38F230C.webp`, `assets/products_webp/GW-D2DFB924.webp`, `assets/products_webp/GW-D582BA35.webp`, `assets/products_webp/GW-F3BAA8D6.webp`
- SHA `08b2dd5a0ddc4a9b8a4fc88f23c5192f6e6803d7` (2 files): `assets/products_webp/GW-28DB1116.webp`, `assets/products_webp/GW-E02ABC36.webp`
- SHA `1ea65898fda179242f94133486733329f8bf0bc6` (2 files): `assets/products_webp/GW-299C111D.webp`, `assets/products_webp/GW-EBA90804.webp`
- SHA `f02d2a676585d13e9ec5850b5e07add32b900c69` (2 files): `assets/products_webp/GW-29BD37DC.webp`, `assets/products_webp/GW-CB4DB156.webp`
- SHA `f3881797c800fa44025fd3b1579113977e871c1f` (2 files): `assets/products_webp/GW-2AAF035C.webp`, `assets/products_webp/GW-44E01D4E.webp`
- SHA `d7d85f08acf7b9b0d4ec8a278c519f7b6c2f7b46` (2 files): `assets/products_webp/GW-2AC17E3B.webp`, `assets/products_webp/GW-B891A42E.webp`
- SHA `5286ceff5fd2d9f3f062fe505708f4bb3a96bce0` (3 files): `assets/products_webp/GW-2CA531B5.webp`, `assets/products_webp/GW-5CB1F079.webp`, `assets/products_webp/GW-FF1A8020.webp`
- SHA `83c2955c38c52ddb76d2ce7422bb85613bd4dac5` (2 files): `assets/products_webp/GW-2CCC4DE4.webp`, `assets/products_webp/GW-A6221CFA.webp`
- SHA `b538f5f4ed0cb58fbed651a69475a708199a64e3` (4 files): `assets/products_webp/GW-2E62756B.webp`, `assets/products_webp/GW-4CAE08FB.webp`, `assets/products_webp/GW-67F5A2EC.webp`, `assets/products_webp/GW-8D636204.webp`
- SHA `e1a98d2711ecad74e31b75664449d6bda8d48de4` (3 files): `assets/products_webp/GW-2EBFE64E.webp`, `assets/products_webp/GW-4D8AE695.webp`, `assets/products_webp/GW-8D6BA192.webp`
- SHA `b1f94def67c4b4b28aa929f1eef9b4518dab5a9e` (2 files): `assets/products_webp/GW-305E0FCE.webp`, `assets/products_webp/GW-7D104A7E.webp`
- SHA `629707a98f12f236611031df585ed590c9a0d69e` (4 files): `assets/products_webp/GW-31439E5E.webp`, `assets/products_webp/GW-4C8760EB.webp`, `assets/products_webp/GW-6BDB8924.webp`, `assets/products_webp/GW-C63028E8.webp`
- SHA `3f5e76c4ce80e38dcc791b9108a3dc7ab6fe2653` (2 files): `assets/products_webp/GW-31FC9859.webp`, `assets/products_webp/GW-AFBC63FF.webp`
- SHA `5d1b85ff9a6bf922ae37d7de37dfab1f8d907159` (2 files): `assets/products_webp/GW-32C23126.webp`, `assets/products_webp/GW-87BD674B.webp`
- SHA `532c5eab558f33a98399a3635e91b3a414b22bc0` (4 files): `assets/products_webp/GW-3403BF79.webp`, `assets/products_webp/GW-56304B54.webp`, `assets/products_webp/GW-79C02456.webp`, `assets/products_webp/GW-BDA2E8AD.webp`
- SHA `dfa320ea50c1b23512ab5eb7809714e345da1798` (2 files): `assets/products_webp/GW-365C98A3.webp`, `assets/products_webp/GW-FDBA6028.webp`
- SHA `68566f3390b155d20bff6fd0acaf1b4f38466732` (2 files): `assets/products_webp/GW-36F114BC.webp`, `assets/products_webp/GW-AF7D8551.webp`
- SHA `5d0edda9811fd32a05eb0d31a85ea6cc5a5abd77` (2 files): `assets/products_webp/GW-37FEA0E3.webp`, `assets/products_webp/GW-74235BE7.webp`
- SHA `35ae374332429b802dfed8384f769b7a555b0b0b` (2 files): `assets/products_webp/GW-39176405.webp`, `assets/products_webp/GW-81378F4B.webp`
- SHA `f5adfdcb14418427ae8d4facd9daaef8a0caf148` (2 files): `assets/products_webp/GW-3A7B36EA.webp`, `assets/products_webp/GW-F20B5A9E.webp`
- SHA `651b22cbf5e0e46a49d9b0fe774a3de6fa208c9e` (2 files): `assets/products_webp/GW-3B28B7C3.webp`, `assets/products_webp/GW-D5A2CDE7.webp`
- SHA `1dfbf37ce667ba6fd3a2b99f3f6c777cf8f4a3d9` (2 files): `assets/products_webp/GW-3C49F073.webp`, `assets/products_webp/GW-E93CDF1E.webp`
- SHA `9639dcbe5fdd29fa8244da4e68455db2efd5e038` (3 files): `assets/products_webp/GW-3C7F9636.webp`, `assets/products_webp/GW-77BA2923.webp`, `assets/products_webp/GW-A9369F0E.webp`
- SHA `51089c0d3132f0d7eddcc82c2f38aaf37326dad2` (2 files): `assets/products_webp/GW-3E5A07ED.webp`, `assets/products_webp/GW-FC547C09.webp`
- SHA `44793325afb68bc3c6b53f2b66f6255ee51f7914` (2 files): `assets/products_webp/GW-402B888A.webp`, `assets/products_webp/GW-43243DFF.webp`
- SHA `4c956d28064080a4d8e8e56afe5a6cb1e5d70f93` (3 files): `assets/products_webp/GW-40B61E59.webp`, `assets/products_webp/GW-7B9089B3.webp`, `assets/products_webp/GW-8C2EB5AE.webp`
- SHA `77f99df7b25f0e3174f60a983534ee18cac92741` (2 files): `assets/products_webp/GW-44DB9106.webp`, `assets/products_webp/GW-7B2AFF48.webp`
- SHA `7eb17dc3716a6b47d64c92e60c451a8e84a2159e` (2 files): `assets/products_webp/GW-48DEACF1.webp`, `assets/products_webp/GW-595299C6.webp`
- SHA `923584a50ac8525b23eb27ca547e2905373d406e` (3 files): `assets/products_webp/GW-48EA1DBB.webp`, `assets/products_webp/GW-576836F2.webp`, `assets/products_webp/GW-915F1923.webp`
- SHA `20783d74b27f720cec3e68abf891761f883786b2` (3 files): `assets/products_webp/GW-49B19293.webp`, `assets/products_webp/GW-705CE825.webp`, `assets/products_webp/GW-F174CE25.webp`
- SHA `8ca9b652e8f7696ca0369d072a6fa28beaba4861` (2 files): `assets/products_webp/GW-4B0BA55A.webp`, `assets/products_webp/GW-594A9D70.webp`
- SHA `1cf32893e5ecbce01ee705f4b07cdd5fdaac4543` (2 files): `assets/products_webp/GW-4B2B302A.webp`, `assets/products_webp/GW-616FD2BF.webp`
- SHA `fe72f6247da591fffabfa9fcf7f4b06ca70ec71a` (2 files): `assets/products_webp/GW-4BF9CBBD.webp`, `assets/products_webp/GW-6B5F1F0A.webp`
- SHA `a16a081e69b4f3ad89ab4dedb9736910f5f8208f` (2 files): `assets/products_webp/GW-4CA7CEA7.webp`, `assets/products_webp/GW-BB9F9F23.webp`
- SHA `66a035c8043eff50a63a4b7465976da1bd20647e` (4 files): `assets/products_webp/GW-4CE8C216.webp`, `assets/products_webp/GW-5763CFDB.webp`, `assets/products_webp/GW-969FF634.webp`, `assets/products_webp/GW-9B5C8E3A.webp`
- SHA `4a506f48edbc2b97804da81d5af87beef36c79a6` (2 files): `assets/products_webp/GW-50819978.webp`, `assets/products_webp/GW-A10F56D0.webp`
- SHA `b9b529f2542de791da9a6e91211e2c5896e723e5` (3 files): `assets/products_webp/GW-50BB8481.webp`, `assets/products_webp/GW-E8023FEE.webp`, `assets/products_webp/GW-F92020E6.webp`
- SHA `2517ac28c323ac6f9d633e7d69790371fc92130a` (2 files): `assets/products_webp/GW-510F412B.webp`, `assets/products_webp/GW-89E3AD11.webp`
- SHA `8367d6d33ba694189dcd9b7ce89093eda293e852` (2 files): `assets/products_webp/GW-51777AF1.webp`, `assets/products_webp/GW-7F10E9AA.webp`
- SHA `6b701482a07cd0cbc814a8f17275fd775057b06b` (2 files): `assets/products_webp/GW-525C062A.webp`, `assets/products_webp/GW-A34F8058.webp`
- SHA `81695a58ef936f4718438ec06dc99515d9b508e9` (2 files): `assets/products_webp/GW-55FA4840.webp`, `assets/products_webp/GW-B0818614.webp`
- SHA `c744db0f2f73742482e1d9eac900348b39d4cc0b` (2 files): `assets/products_webp/GW-597E0AE3.webp`, `assets/products_webp/GW-FB2CF3D4.webp`
- SHA `fedae8de42f57afa1b7c3a04bab3075a05409a9e` (2 files): `assets/products_webp/GW-59A00B4B.webp`, `assets/products_webp/GW-D85DA4EF.webp`
- SHA `af6da2daf028f9c153191485fac15ce7be0e82f1` (2 files): `assets/products_webp/GW-5A6B225B.webp`, `assets/products_webp/GW-B5D0BE74.webp`
- SHA `1165a7d458008f840ba6ad4d397aeec7bd494688` (3 files): `assets/products_webp/GW-5DC2AB54.webp`, `assets/products_webp/GW-9332656F.webp`, `assets/products_webp/GW-F7E61DE4.webp`
- SHA `57bee858134e36b23d9bc1a006328344d1f7d256` (2 files): `assets/products_webp/GW-5F0C1F4A.webp`, `assets/products_webp/GW-EB9FC2A3.webp`
- SHA `dd61a47c2f9067e8173e3ca493801cb5147293ae` (2 files): `assets/products_webp/GW-5F17E43C.webp`, `assets/products_webp/GW-CAC8E9B4.webp`
- SHA `9c1d89c00e0853ad4d3cb971e8b1af01e7314e05` (4 files): `assets/products_webp/GW-607E9F2B.webp`, `assets/products_webp/GW-64D0A906.webp`, `assets/products_webp/GW-89C214CE.webp`, `assets/products_webp/GW-B1274395.webp`
- SHA `988519e6d19b36a4119f658adc9d783215fd037c` (2 files): `assets/products_webp/GW-60AC2BD0.webp`, `assets/products_webp/GW-6E4F709D.webp`
- SHA `b187cb9f7d7fcdbb16a5a331f67651554b5aa05f` (2 files): `assets/products_webp/GW-643FB4A3.webp`, `assets/products_webp/GW-A2C86395.webp`
- SHA `435bcef481549185946d8214b519c6e70952b606` (2 files): `assets/products_webp/GW-6443D63A.webp`, `assets/products_webp/GW-7ED3B124.webp`
- SHA `b88f9e6699049b297186fd3e356da63d9be5f02a` (2 files): `assets/products_webp/GW-64FECDC1.webp`, `assets/products_webp/GW-B4E94378.webp`
- SHA `50a0d0730461e495e1b5570337100b108838c553` (2 files): `assets/products_webp/GW-6589BD68.webp`, `assets/products_webp/GW-8B85BE3E.webp`
- SHA `3e42baca5b4b2024425582fa61fd125aca42dfe9` (2 files): `assets/products_webp/GW-65FC0FBC.webp`, `assets/products_webp/GW-9A56CCD4.webp`
- SHA `d639d4462836a49100856461d7ccda04cecd9ddf` (2 files): `assets/products_webp/GW-65FE5E32.webp`, `assets/products_webp/GW-E3BB76E3.webp`
- SHA `67bac0c9129fa5b6996a103ee0d8799568b2fa91` (2 files): `assets/products_webp/GW-68224E5A.webp`, `assets/products_webp/GW-C6763517.webp`
- SHA `f8df0592fc8173cc928841587590df2ee3e0a1dd` (2 files): `assets/products_webp/GW-6932C8FA.webp`, `assets/products_webp/GW-E956710E.webp`
- SHA `dc6d1ea58768b2a09b3ffd8bc27d74aa26370be5` (2 files): `assets/products_webp/GW-69346295.webp`, `assets/products_webp/GW-89D386A1.webp`
- SHA `566df92397180185bcdec02feb6c6c88a9092065` (2 files): `assets/products_webp/GW-6B09F4E7.webp`, `assets/products_webp/GW-D8D79DED.webp`
- SHA `446a9b61ea8ed896181954cd1addd0c3613dd89a` (4 files): `assets/products_webp/GW-6D52481F.webp`, `assets/products_webp/GW-77B026C2.webp`, `assets/products_webp/GW-8DCBBDC4.webp`, `assets/products_webp/GW-E6E42624.webp`
- SHA `8b013d75b48b9f4d24de94c90eeebf8921d93658` (2 files): `assets/products_webp/GW-6F2481C3.webp`, `assets/products_webp/GW-CEDD4E12.webp`
- SHA `f4fcd65ec077a5b8960813876d58ab398a0675fc` (4 files): `assets/products_webp/GW-70EF49D1.webp`, `assets/products_webp/GW-81BEF747.webp`, `assets/products_webp/GW-D5A9A84E.webp`, `assets/products_webp/GW-E841DBC2.webp`
- SHA `a1ed8fcac0ee66cff539a6c557a2c1572681394c` (2 files): `assets/products_webp/GW-723E43F1.webp`, `assets/products_webp/GW-D53D9C2F.webp`
- SHA `921e7b5e1242cdcaffc81e257588d3ccf4515140` (2 files): `assets/products_webp/GW-726809C0.webp`, `assets/products_webp/GW-C0E8FFAC.webp`
- SHA `44c4897297f37fa714e5d491477be4d8e9af158c` (2 files): `assets/products_webp/GW-72B48D05.webp`, `assets/products_webp/GW-E0BDD2B2.webp`
- SHA `12f9fbdd8f979bef6f3766401367c17ed4668efb` (4 files): `assets/products_webp/GW-73CC2F34.webp`, `assets/products_webp/GW-976B6316.webp`, `assets/products_webp/GW-B1E343ED.webp`, `assets/products_webp/GW-D9244BCD.webp`
- SHA `0775ff4930caa43b04b9998748297779c35df7d9` (2 files): `assets/products_webp/GW-7469C62F.webp`, `assets/products_webp/GW-B3775EF7.webp`
- SHA `68146b88726848b76750d411d1a5273c272eeb60` (2 files): `assets/products_webp/GW-751B16A1.webp`, `assets/products_webp/GW-C6D7B26D.webp`
- SHA `fa820d65d9b614be721ee330b10ac9e8cb19c97f` (2 files): `assets/products_webp/GW-762553FF.webp`, `assets/products_webp/GW-84635378.webp`
- SHA `f5e7070986719b4ac34d78cf0973fe21d806a425` (2 files): `assets/products_webp/GW-76E4B058.webp`, `assets/products_webp/GW-C13DF79A.webp`
- SHA `54c83d30ea2ee1a920d03bdb133ba124d8e9c3f7` (2 files): `assets/products_webp/GW-77473239.webp`, `assets/products_webp/GW-96F67DB6.webp`
- SHA `20eb6cdbab3019c02032f6e6a6f4ce8a1e31662c` (2 files): `assets/products_webp/GW-774D85A2.webp`, `assets/products_webp/GW-B64BA8AC.webp`
- SHA `d980f684b1692edd618762cec413a218834763cc` (2 files): `assets/products_webp/GW-791EF72B.webp`, `assets/products_webp/GW-A0E70AFF.webp`
- SHA `15d52a976886f240f99582a3ed84341aebe1ffb1` (2 files): `assets/products_webp/GW-7B366651.webp`, `assets/products_webp/GW-EB04EE32.webp`
- SHA `6de6fee3ff5870cf2c5c2b5958de8014457f454d` (2 files): `assets/products_webp/GW-7BD7E22F.webp`, `assets/products_webp/GW-EC3163FA.webp`
- SHA `e39d9d50691057821801d47d7ad3de7467c91d5d` (2 files): `assets/products_webp/GW-7E24C540.webp`, `assets/products_webp/GW-92CB8638.webp`
- SHA `ea5864c95e628fa3962f8fa3c7e39f814c1408e6` (2 files): `assets/products_webp/GW-8119CE50.webp`, `assets/products_webp/GW-E18AD792.webp`
- SHA `aa8240364706dbfac4d06c27eeea36f4e84ca45a` (2 files): `assets/products_webp/GW-8139D473.webp`, `assets/products_webp/GW-8B9A2FD9.webp`
- SHA `fe9885b595eee6c19a7d74913bddc27437913e56` (3 files): `assets/products_webp/GW-8176C1B8.webp`, `assets/products_webp/GW-9B5BC35E.webp`, `assets/products_webp/GW-CB38F77B.webp`
- SHA `c3e9ab3552c7b4b75c062e6e1258f3161ea370f7` (2 files): `assets/products_webp/GW-8272C553.webp`, `assets/products_webp/GW-E0652882.webp`
- SHA `7b25ff5c65c53e682c7128dc3adb2b59565537df` (2 files): `assets/products_webp/GW-8320E78B.webp`, `assets/products_webp/GW-D210E4D6.webp`
- SHA `bb017345772d9d6357ed167d546eb86cecfaf793` (2 files): `assets/products_webp/GW-8438C353.webp`, `assets/products_webp/GW-A437C4FB.webp`
- SHA `8ad705de2d1a2638d1708aa619eb76f482e26363` (2 files): `assets/products_webp/GW-875CDFDE.webp`, `assets/products_webp/GW-B01B7501.webp`
- SHA `3ed8c539df99c6de5993b7f1426d44b5232c3579` (2 files): `assets/products_webp/GW-8876FEC1.webp`, `assets/products_webp/GW-8AFCC7A5.webp`
- SHA `993841e1a46e1989fb9105930196133afc229b87` (4 files): `assets/products_webp/GW-88B23E0A.webp`, `assets/products_webp/GW-958EA52D.webp`, `assets/products_webp/GW-B2FD05A4.webp`, `assets/products_webp/GW-B5007635.webp`
- SHA `d027c39eec6e458722eb127bab27e0656ed47d2c` (2 files): `assets/products_webp/GW-8A0876B1.webp`, `assets/products_webp/GW-D96807C9.webp`
- SHA `b9c066475afaab982954bee5471c574c3d732a0f` (2 files): `assets/products_webp/GW-8AE21119.webp`, `assets/products_webp/GW-CECCD89B.webp`
- SHA `7d516f640acb35c68489bf2ff395c7d68d45c2c0` (2 files): `assets/products_webp/GW-8E6C4DED.webp`, `assets/products_webp/GW-BACFDE14.webp`
- SHA `4df1644d112c3ed2ebfdeb6c08d249fb83be730d` (2 files): `assets/products_webp/GW-92028D5D.webp`, `assets/products_webp/GW-B006676B.webp`
- SHA `3dc97c9123ed573266b6423d31b48905e27ec39c` (2 files): `assets/products_webp/GW-934D277A.webp`, `assets/products_webp/GW-F50BD526.webp`
- SHA `7ca61fb0b1c2772747cdcaabf94d7cb88839a9fe` (2 files): `assets/products_webp/GW-934DF496.webp`, `assets/products_webp/GW-D1ECCAEB.webp`
- SHA `0105409dbfc697d7a974c5ac56ef4c286fd4c26e` (2 files): `assets/products_webp/GW-9A03DC1D.webp`, `assets/products_webp/GW-E885839B.webp`
- SHA `930f72419decf832b155832a05da715242961796` (2 files): `assets/products_webp/GW-9E6B9B11.webp`, `assets/products_webp/GW-DE9FBF3A.webp`
- SHA `9e88c73ae04bd3e3279cb00c901793627530d25c` (3 files): `assets/products_webp/GW-9EED8FCC.webp`, `assets/products_webp/GW-C4ECAFFD.webp`, `assets/products_webp/GW-C7F8B853.webp`
- SHA `776de8e7b3c99a0780525c96505b0907c0a9da4b` (2 files): `assets/products_webp/GW-A53716F6.webp`, `assets/products_webp/GW-C2D7E8C6.webp`
- SHA `f0568450627616148c5279976b144e63790d8fbd` (3 files): `assets/products_webp/GW-A9427903.webp`, `assets/products_webp/GW-ACAA8EB9.webp`, `assets/products_webp/GW-FE981E36.webp`
- SHA `b7a37e3107f36bbf51e331ba49721b7e2a6b76a4` (4 files): `assets/products_webp/GW-A9924B9A.webp`, `assets/products_webp/GW-D0B56C3D.webp`, `assets/products_webp/GW-DA3C1123.webp`, `assets/products_webp/GW-E91D9DD1.webp`
- SHA `978ce0cdc69874216ed8a646c8126cdf5d3b6299` (2 files): `assets/products_webp/GW-B2FD5184.webp`, `assets/products_webp/GW-E7358CD1.webp`
- SHA `e506e8252a3112c1c3e02f4a990bc6c26fc77609` (2 files): `assets/products_webp/GW-B452A963.webp`, `assets/products_webp/GW-CCC821C5.webp`
- SHA `d54841de19b8be936a010fc0d925a80ac4775ecf` (2 files): `assets/products_webp/GW-B633C613.webp`, `assets/products_webp/GW-EC508B51.webp`
- SHA `738a2228a651e9a14f7b8e41004dafdfa06993bd` (2 files): `assets/products_webp/GW-B7788A08.webp`, `assets/products_webp/GW-E1D7390B.webp`
- SHA `a4053f5aecc7fa6feeb262289ad5b049b88b50df` (2 files): `assets/products_webp/GW-B8632B12.webp`, `assets/products_webp/GW-D8608A5F.webp`
- SHA `468c430f26a78b534ccb9fb580b7544a206f23a9` (2 files): `assets/products_webp/GW-C18C4803.webp`, `assets/products_webp/GW-E0F7E684.webp`
- SHA `60cbf2a5ba5324d85695aaf74b5321a1d08b6297` (2 files): `assets/products_webp/GW-C3F730B7.webp`, `assets/products_webp/GW-D2B63F6B.webp`
- SHA `9704b7d26a6139e3d175c7664f0e563ccf9c8f38` (2 files): `assets/products_webp/GW-C9889746.webp`, `assets/products_webp/GW-ECEB2577.webp`
- SHA `52331368a37f1022b3208867d242dbcde9d0ed83` (2 files): `assets/products_webp/GW-D44F3E5F.webp`, `assets/products_webp/GW-E04862CD.webp`
- SHA `cf0ea3bd942107d97551aaf0107fd25423590e39` (2 files): `assets/products_webp/GW-D4D00F45.webp`, `assets/products_webp/GW-DFE56C42.webp`
- SHA `72c710ffe339ac8be6c29cf8f8d17dae90651fe9` (2 files): `assets/products_webp/GW-DD182DEA.webp`, `assets/products_webp/GW-EB1B38E3.webp`
- SHA `b5dbbefb7e134580c66c9fd8c98d73bdedc85ef7` (2 files): `assets/products_webp/GW-E09CBC2B.webp`, `assets/products_webp/GW-EF2F79C6.webp`
- SHA `b6c65e0c6c25361d244498ff8bbbf1c7dd9015aa` (2 files): `assets/products_webp/GW-E1003F2B.webp`, `assets/products_webp/GW-F573FA3F.webp`
- SHA `7df1324d30517b6e307277397b620b257538030a` (2 files): `assets/products_webp/GW-E3D95D2E.webp`, `assets/products_webp/GW-E5F0F7C0.webp`
- SHA `f558b33b91340cb91a77ebb7b87b0a19bc839c89` (2 files): `assets/products_webp/GW-E79221D3.webp`, `assets/products_webp/GW-FC3A46F8.webp`
- SHA `7bc2b0bde6aef18c9ae375b8dc4e2a600038a267` (2 files): `assets/products_webp/GW-EAAE0449.webp`, `assets/products_webp/GW-F6886663.webp`
- SHA `36162d6e1efc677052342b8464c77676473f1360` (2 files): `assets/products_webp/GW-EBF0D920.webp`, `assets/products_webp/GW-F21AF3AE.webp`
- SHA `8ead60469aac40aede89517359a51ba46b6e4c7b` (2 files): `assets/products_webp/GW-EC20B1E8.webp`, `assets/products_webp/GW-EDE9012C.webp`
- SHA `83959526f504f13dd053a51bbfd17d683c406185` (2 files): `assets/products_webp/GW-EFEA9F99.webp`, `assets/products_webp/GW-F6568D2F.webp`
- SHA `ed3903074a43cb0c5f7b51ec6382faaa1bb476e0` (2 files): `assets/products_webp/GW-F899B4D8.webp`, `assets/products_webp/GW-FB1477F8.webp`

## Non-image duplicate blobs
- SHA `38723ba3e3ef98167073d90937a3f8e490da979c`: `.github/workflows/store-production-qa.yml`, `store-production-qa.yml`

## Top-level inventory at ledger snapshot `3b3e477155df64e2987c7b03cf030aef53c81b31` (5,210 blobs; before adding the inventory CSV)
| Path | Files | Declared bytes |
|---|---:|---:|
| `assets` | 4913 | 317,497,390 |
| `suppliers` | 98 | 166,464,112 |
| `Get_Wired_AutoWorx_STORE_WITH_WATERMARKED_PRODUCT_IMAGES.zip` | 1 | 9,325,969 |
| `image-sync` | 1 | 654,177 |
| `AI_HANDOVER_PERMANENT.md` | 1 | 637,157 |
| `HANDOVER_CURRENT.md` | 1 | 596,326 |
| `HANDOVER.md` | 1 | 585,216 |
| `Get_Wired_AutoWorx_4186_CATALOG_IMPORT.sql` | 1 | 521,182 |
| `HANDOVER_2026-09-15.md` | 1 | 405,480 |
| `staging` | 4 | 282,197 |
| `catalogue-audits` | 5 | 181,096 |
| `.github` | 25 | 145,894 |
| `GET_WIRED_AUTOWORX_HANDOVER.md` | 1 | 86,848 |
| `REPOSITORY_FILE_RECONCILIATION_2026-10-29.md` | 1 | 72,320 |
| `AI_HANDOVER.md` | 1 | 60,663 |
| `scripts` | 5 | 59,180 |
| `handover-runs` | 13 | 52,008 |
| `supabase` | 7 | 49,854 |
| `HANDOVER_2026-10-14_JUNE_AUDIT_CONTINUATION.md` | 1 | 28,231 |
| `android-owner-app` | 7 | 27,963 |
| `TERMS_AND_CONDITIONS.md` | 1 | 25,988 |
| `CATEGORY_MAPPING_REVIEW_2026-10-09.md` | 1 | 24,785 |
| `HANDOVER_2026-10-11_CATALOGUE_RECONCILIATION.md` | 1 | 19,771 |
| `catalogue-source` | 6 | 19,429 |
| `terms-and-conditions.html` | 1 | 18,999 |
| `HANDOVER_CONTINUATION_2026-10-22_PLANETWORLD_AI.md` | 1 | 18,462 |
| `checkout-v2.html` | 1 | 16,570 |
| `HANDOVER_UPDATE_2026-10-26_MONITOR_RUN_08.md` | 1 | 14,206 |
| `audits` | 1 | 12,429 |
| `HANDOVER_IMAGE_REQUEST_VERIFICATION_2026-10-17.md` | 1 | 12,166 |
| `products.html` | 1 | 11,971 |
| `category.html` | 1 | 11,756 |
| `HANDOVER_2026-09-16.md` | 1 | 11,180 |
| `LIVE_READINESS.md` | 1 | 10,761 |
| `HANDOVER_UPDATE_2026-10-28_MONITOR_RUN_11.md` | 1 | 10,606 |
| `HANDOVER_UPDATE_2026-10-28_MONITOR_RUN_10.md` | 1 | 10,417 |
| `product.html` | 1 | 10,309 |
| `PET_PROJECT_01_HANDOVER.md` | 1 | 10,114 |
| `HANDOVER_PLANETWORLD_PRICELIST_2026-10-22.md` | 1 | 9,146 |
| `PROPOSED_FINAL_CATEGORY_TREE_AND_MAPPING_PLAN_2026-10-11.md` | 1 | 9,064 |
| `product-details.js` | 1 | 8,874 |
| `GEMINI_EXECUTION_BRIEF.md` | 1 | 8,685 |
| `returns-refunds.html` | 1 | 8,421 |
| `store-production-qa.yml` | 1 | 8,407 |
| `HANDOVER_UPDATE_2026-10-29_CATALOGUE_CONTINUATION.md` | 1 | 8,283 |
| `HANDOVER_CURRENT_ADDENDUM_2026-10-17.md` | 1 | 7,717 |
| `HANDOVER_UPDATE_2026-10-27_MONITOR_RUN_09.md` | 1 | 7,545 |
| `HANDOVER_UPDATE_2026-10-29_MONITOR_RUN_12.md` | 1 | 7,487 |
| `CHECKOUT_PAYMENT_DELIVERY.md` | 1 | 7,446 |
| `HANDOVER_UPDATE_2026-10-29_READINESS_PUSH_RUN_13.md` | 1 | 7,300 |
| `MASTER_PROJECT_HANDOVER.md` | 1 | 7,229 |
| `BUSINESS_STATUS_REPORT_2026-09-16.md` | 1 | 6,968 |
| `apk-sales-intelligence` | 7 | 6,930 |
| `category-navigation.js` | 1 | 6,740 |
| `CATALOGUE_IMPORT_RULES.md` | 1 | 6,662 |
| `index-new.html` | 1 | 5,979 |
| `PRODUCTION_SECURITY_TEST_MATRIX_2026-09-16.md` | 1 | 5,870 |
| `HANDOVER_UPDATE_2026-10-29_BUTTON_ONLY_RESET.md` | 1 | 5,694 |
| `NON_DATA_TASKS_COMPLETED_2026-09-16.md` | 1 | 5,561 |
| `HANDOVER_2026-10-09_AXXESS_UPLOAD.md` | 1 | 5,500 |
| `android-app` | 7 | 5,213 |
| `QA_RUNBOOK.md` | 1 | 5,086 |
| `netlify` | 1 | 5,028 |
| `GW_AI_OS` | 1 | 5,023 |
| `BOB_GO_DELIVERY_INTEGRATION_SPEC.md` | 1 | 4,983 |
| `HANDOVER_CONTINUATION_2026-10-13_C.md` | 1 | 4,875 |
| `YOUR_COURIER_DELIVERY_INTEGRATION_SPEC.md` | 1 | 4,664 |
| `HANDOVER_RELEASE_GATES_2026-10-14.md` | 1 | 4,576 |
| `DEPLOYMENT_NOTE.md` | 1 | 4,342 |
| `CHECKOUT_DELIVERY_QUOTE_SECURITY_REVIEW_20261029.md` | 1 | 4,003 |
| `HANDOVER_NEXT_PRIORITIES_2026-10-20.md` | 1 | 4,003 |
| `HANDOVER_UPDATE_2026-10-14_QA_AUTOMATION.md` | 1 | 3,720 |
| `functions` | 1 | 3,430 |
| `docs` | 1 | 3,425 |
| `admin.html` | 1 | 3,336 |
| `store.html` | 1 | 3,180 |
| `NON_DATA_ANALYSIS_QA_2026-09-16.md` | 1 | 3,119 |
| `HANDOVER_TASK_2026-10-12_CATALOGUE_QA.md` | 1 | 2,780 |
| `IMAGE_RECOVERY_PROGRESS_2026-10-14.md` | 1 | 2,744 |
| `CAELEX_INTEGRATION.md` | 1 | 2,654 |
| `HANDOVER_IMAGE_PROXY_404_DIAGNOSTIC_2026-10-26.md` | 1 | 2,552 |
| `HANDOVER_CONTINUATION_IMAGE_PROXY_2026-10-26.md` | 1 | 2,447 |
| `CAELEX_QUERY_ADAPTER.md` | 1 | 2,371 |
| `HANDOVER_UPDATE_2026-09-16_PRODUCT_TYPE_AND_OFFLINE_WORK.md` | 1 | 2,235 |
| `automation` | 1 | 2,224 |
| `SUPPLIER_QUOTE_ENGINE.md` | 1 | 1,983 |
| `STOCK_SYNC_STATUS_2026-09-16.md` | 1 | 1,966 |
| `FRIDGE_TEMP_HOSTING_DEPLOYMENT.md` | 1 | 1,902 |
| `catalogue-image-matching` | 1 | 1,892 |
| `PREVIEW_READINESS_2026-10-26.md` | 1 | 1,737 |
| `SESSION_CONTINUATION_2026-09-16.md` | 1 | 1,532 |
| `GITHUB_PAGES_RECOVERY.md` | 1 | 1,475 |
| `CATALOGUE_VALIDATION.sql` | 1 | 1,454 |
| `handover-updates` | 1 | 1,359 |
| `HANDOVER_OCR_RECOVERY_2026-10-13.md` | 1 | 1,263 |
| `EXECUTION_ROUTE_TEST_2026-09-28.md` | 1 | 1,008 |
| `netlify.toml` | 1 | 904 |
| `README.md` | 1 | 833 |
| `_headers` | 1 | 638 |
| `index.html` | 1 | 541 |
| `ADMIN_SETUP.md` | 1 | 489 |
| `CATALOGUE_AUDIT.md` | 1 | 489 |
| `checkout.html` | 1 | 469 |
| `PRODUCT_DETAILS_UPDATE.md` | 1 | 342 |
| `README_PRODUCT_DETAILS.md` | 1 | 274 |
| `.assetsignore` | 1 | 257 |
| `robots.txt` | 1 | 244 |
| `NETLIFY_DEPLOY_TRIGGER.md` | 1 | 187 |
| `netlify-root.toml` | 1 | 181 |
| `IMAGE_CLEANUP_RUN_TRIGGER.md` | 1 | 178 |
| `data` | 1 | 113 |
| `wrangler.toml` | 1 | 97 |
| `READY_FOR_STORE_VISIT.txt` | 1 | 83 |
| `_final_tree_hint` | 1 | 74 |
| `FINALIZE_NOTE.md` | 1 | 67 |
| `VERSION.txt` | 1 | 26 |
| `CNAME` | 1 | 23 |
| `DO_NOT_REMOVE` | 1 | 9 |
| `_product_details_enabled` | 1 | 7 |
| `READY.txt` | 1 | 5 |
| `UPDATE_COMPLETE` | 1 | 3 |

## Car Audio reconciliation result
- The 702-row CSV contains supplier source workbook/sheet/row, brand, model/SKU, exact source description, proposed category/component and a review status. It excludes confidential cost, price, stock and margin values.
- Brand counts: One 290; Kicker 189; Audison 94; Alpine 58; Harness and Trims 47 (a product range, **not a manufacturer brand**); JVC Car Audio 13; Kenwood Car Audio 4; Amplified 3; Focal Car Audio 2; Pioneer Car Audio 2.
- Direct supplier-model filename comparison against all 4,902 repository image assets found **0 exact matches of 702**. However, repository image files are keyed by public GW SKU (the existing fallback uses `/assets/products_webp/{public_sku}.webp` and `/assets/products/{public_sku}.jpg`), not supplier model. Without an exact supplier-model → approved GW-SKU crosswalk, this filename check **cannot determine whether a matching image already exists**. No image has been marked missing solely from this check; official model/image verification and the GW-SKU crosswalk remain outstanding.
- Component suggestions are heuristic only: Vehicle Harnesses & Trims 243; Car Subwoofers 99; Car Head Units & Receivers 88; Car Speakers 78; Car Audio Accessories 65; Car Amplifiers 42; Car Speaker Pods/Grilles/Enclosures 28; Marine Audio 25; Vehicle Cameras 14; Car DSP/Signal Processors 11; Car Audio Packages 7; Vehicle Sensors/Parking Assist 2.

## Remaining reconciliation queues
- **Images/features/GW SKUs:** no local exact model-code filename matches for the 702 Car Audio source rows. Need official manufacturer sources, feature verification, and separate GW-labeled output images; no guessed matches.
- **Audio Connections:** 2 supplier PDFs are present under `suppliers/Audio Connections/`; extraction and model/image matching are not yet complete.
- **ASC:** source PDFs are already under `suppliers/ASC/`; user instruction remains to exclude ASC stock from the store. Supplier-source permission is not permission to mutate live stock.
- **Storefront:** current main `index-new.html` has `data-storefront-mode="buttons-only"`, intentionally applied by owner instruction. Keep product cards/prices hidden until exact mapping is verified.
- **Other repeated content:** one non-image duplicate blob group remains: mirrored `.github/workflows/store-production-qa.yml` and root `store-production-qa.yml`. Retain pending decision on whether the root mirror is still needed.
- **Release boundary:** no live product, price, stock, category, Supabase, Axxess, DNS, payment or production deployment mutation. No Cloudflare/Netlify credits used.

## Verification
- Tree response complete and not truncated.
- 47 moved XLSX blob SHAs and byte sizes preserved.
- Old incoming XLSX path empty.
- Sanitized Car Audio CSV read-back verified at 702 rows and no price/stock/cost fields.
- PR #110 remains draft/unmerged; no production changes.


## Audio Connections PDF extraction — 2026-10-29
- Read-only `pdftotext -layout` inspection succeeded for both supplier PDFs: STARSOUND list (2 pages, 360,046 bytes) and Sony Mobile ES dealer list (2 pages, 312,605 bytes).
- Extracted **53 Starsound/Reference Audio/Blackspider rows** and **15 Sony Mobile ES rows** into `catalogue-audits/AUDIO_CONNECTIONS_SOURCE_EXTRACT_REVIEW_ONLY_2026-10-29.csv` (68 rows total). Original PDFs remain unchanged under `suppliers/Audio Connections/`.
- Exact customer-facing label **“Price on Request due to Limited Stock and Availability”** applied to 3 Starsound rows with missing source prices and Sony `XS-690ES`, which the supplier explicitly marks Sold Out. These are review rows, not live listings.
- Starsound PDF explicitly states its prices are VAT-exclusive. Sony PDF includes `Price Ex` and `RRP` columns. No customer selling prices or live stock values were changed; source prices remain review-only.
- Added `catalogue-audits/PLANETWORLD_CAR_AUDIO_OFFICIAL_MATCHES_BATCH1_2026-10-29.csv` with 5 exact-model official Alpine page matches (BBX-F1200, BBX-T600, HDZ-653, HCE-C2100RD, iLX-705D) and verified feature summaries. Two direct manufacturer image URLs were identified, but images were not downloaded or relabelled; all five remain blocked from publishing until the exact image is locally saved/checked and the approved GW SKU is applied.
- Source references: https://www.alpine-asia.com/en/productDetail/24/BBX-F1200 ; https://alpineindia.com/discription-amplifier/BBX-T600.html ; https://www.alpine.com.au/product/hdz-653/ ; https://www.alpine-usa.com/product/hce-c2100rd ; https://www.alpine.co.il/p/Products/SingleView/ilx-705d .


## Full per-file inventory ledger
- Added `REPOSITORY_FILE_INVENTORY_2026-10-29.csv`, a row for every one of the **5210** tracked blobs at snapshot `3b3e477155df64e2987c7b03cf030aef53c81b31`: path, declared bytes, Git blob SHA, extension, file class, duplicate-image group size, reconciliation disposition, and content-review status.
- The inventory is deliberately path/hash/size complete but does **not** claim semantic review of every binary or historical document. It identifies which content is supplier source, review-only output, historical handover, image asset, workflow, or storefront file and prevents unverified files from being mistaken for reconciled product mappings.
- The inventory CSV itself is an additional audit artifact created after the snapshot, so it is not self-listed in its own rows.


## Final validation of review head
- Final review head: `c323c2c40898443167361685d8ebb9b256651ade`; recursive tree response `truncated=false`; **5,211 tracked blobs**.
- Planetworld workbook audit run **40944562096 SUCCESS** and Audio Connections PDF inspection run **40944561831 SUCCESS**, both completed on this final review head.
- Inventory CSV contains **5,210 data rows** for snapshot `3b3e477155df64e2987c7b03cf030aef53c81b31`; the CSV itself and later document updates are additional files, not self-listed.
- Repository privacy verified (`private=true`). PR #110 remains open/draft/unmerged. No live catalogue/stock/price/database/Axxess/DNS/payment changes or production deployment occurred.
