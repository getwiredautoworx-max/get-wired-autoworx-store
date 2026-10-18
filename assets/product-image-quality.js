/* First-pass product image quality hold.
 * These exact public SKUs were visually inspected and the current source image
 * contains an overlaid ASC/GET WIRED catalogue watermark. Use a truthful
 * placeholder until a clean, verified replacement image is sourced.
 */
(function () {
  'use strict';
  var HOLD = new Set([
    'GW-BACFDE14',
    'GW-F632303D',
    'GW-F6416160',
    'GW-F68FB0CE',
    'GW-F672879F',
    'GW-F6672DED',
    'GW-F60D9CE9',
    'GW-F69F8DA1',
    'GW-F6461F7B',
    'GW-0DF03EDA',
    'GW-22007776',
    'GW-983B5305',
    'GW-51511F87',
    'GW-F0B21128',
    'GW-99207D13',
    'GW-D2AEB63B'
    // OCR audit 2026-10-18: suspected embedded Get Wired/ASC catalogue marks; hide until clean exact-SKU OEM/manufacturer images are verified.
    'GW-01BE1A79',
    'GW-05A03801',
    'GW-0BF70CF4',
    'GW-0F8EB119',
    'GW-1106A5AC',
    'GW-1883F6C1',
    'GW-1994BF5D',
    'GW-28482EFE',
    'GW-2853FF4C',
    'GW-2C1B9122',
    'GW-2C508DE3',
    'GW-31439E5E',
    'GW-37763665',
    'GW-39F679C3',
    'GW-3CF0D353',
    'GW-40B61E59',
    'GW-46C27D4C',
    'GW-478D5A49',
    'GW-4C8760EB',
    'GW-50819978',
    'GW-50D3FD3A',
    'GW-6BDB8924',
    'GW-70398C25',
    'GW-72B48D05',
    'GW-74FB67A9',
    'GW-75F32D38',
    'GW-76446714',
    'GW-7B9089B3',
    'GW-7D5AF19F',
    'GW-82D51707',
    'GW-88A6A2A4',
    'GW-8A5E0C80',
    'GW-8AE21119',
    'GW-8C2EB5AE',
    'GW-9266897E',
    'GW-9EED8FCC',
    'GW-A10F56D0',
    'GW-A48F3FB4',
    'GW-A53716F6',
    'GW-AAAD8DCE',
    'GW-AF4C2FF1',
    'GW-B452A963',
    'GW-B8A2F825',
    'GW-BDFF9ED9',
    'GW-C1FEDE1E',
    'GW-C2D7E8C6',
    'GW-C4ECAFFD',
    'GW-C63028E8',
    'GW-C7A2EE42',
    'GW-C7F8B853',
    'GW-CCC821C5',
    'GW-CECCD89B',
    'GW-D4FA9A1C',
    'GW-D9DCB4C9',
    'GW-DAA97281',
    'GW-E0BDD2B2',
    'GW-E1846C0A',
    'GW-E79221D3',
    'GW-EBF0D920',
    'GW-F21AF3AE',
    'GW-F55B7E7E',
    'GW-F922AD5C',
    'GW-F9E1460A',
    'GW-FC3A46F8',
    'GW-FCA4CFC3',
  ]);
  window.gwProductImageNeedsReview = function (sku) {
    return HOLD.has(String(sku || '').trim().toUpperCase());
  };
  window.gwProductImageSource = function (sku, cleanSource) {
    return window.gwProductImageNeedsReview(sku)
      ? 'assets/product-image-unavailable.svg'
      : (cleanSource || 'assets/product-image-unavailable.svg');
  };
})();
