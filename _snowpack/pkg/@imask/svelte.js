import { g as getDefaultExportFromCjs, c as createCommonjsModule, a as commonjsGlobal } from '../common/_commonjsHelpers-8c19dec8.js';
import { e as esm } from '../common/index-6f73045e.js';

var svelteImask = createCommonjsModule(function (module, exports) {
(function (global, factory) {
   factory(exports, esm) ;
}(commonjsGlobal, (function (exports, IMask) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var IMask__default = /*#__PURE__*/_interopDefaultLegacy(IMask);

  function fireEvent(el, eventName, data) {
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(eventName, true, true, data);
    el.dispatchEvent(e);
  }

  function initMask(el, opts) {
    var maskRef = opts instanceof IMask__default['default'].InputMask ? opts : IMask__default['default'](el, opts);
    return maskRef.on('accept', function () {
      return fireEvent(el, 'accept', maskRef);
    }).on('complete', function () {
      return fireEvent(el, 'complete', maskRef);
    });
  }

  function IMaskAction(el, options) {
    var maskRef = options && initMask(el, options);

    function destroy() {
      if (maskRef) {
        maskRef.destroy();
        maskRef = undefined;
      }
    }

    function update(options) {
      if (options) {
        if (maskRef) {
          if (options instanceof IMask__default['default'].InputMask) maskRef = options;else maskRef.updateOptions(options);
        } else maskRef = initMask(el, options);
      } else {
        destroy();
      }
    }

    return {
      update: update,
      destroy: destroy
    };
  }

  exports.imask = IMaskAction;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(svelteImask);

export default __pika_web_default_export_for_treeshaking__;
