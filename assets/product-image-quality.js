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
