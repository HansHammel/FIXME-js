!function r(t,e,n){function o(u,a){if(!e[u]){if(!t[u]){var s="function"==typeof require&&require;if(!a&&s)return s(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var c=e[u]={exports:{}};t[u][0].call(c.exports,function(r){var e=t[u][1][r];return o(e?e:r)},c,c.exports,r,t,e,n)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<n.length;u++)o(n[u]);return o}({1:[function(r,t,e){"use strict";function n(r,t){function e(){var t=Error.apply(this,arguments);this.name=r,this.message=t.message}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),new e(t)}function o(r,t){return n(a,"Fix by "+r.toLocaleDateString()+": "+t.trim())}function i(r,t){var e=arguments[0]instanceof Error?arguments[0]:n(r,t);throw e}var u="FIXME::ArgumentError",a="FIXME::UnfixedError";t.exports={factory:n,unfixedError:o,throwError:i,argumentErrorName:u,unfixedErrorName:a}},{}],2:[function(r,t,e){(function(e){"use strict";function n(r){var t,e,n;for(t=1;t<arguments.length;t++){e=arguments[t]||{};for(n in r)void 0!==e[n]&&(r[n]=e[n])}return r}function o(r){var t=!1;try{t=/^prod.+?$/.test(e.env.NODE_ENV)}catch(n){}r.skipProd&&t||new Date>=r.date&&u.throwError(u.unfixedError(r.date,r.text))}function i(){var r,t;r={skipProd:!0,date:void 0,text:void 0},1===arguments.length&&"string"==typeof arguments[0]||2===arguments.length&&"string"==typeof arguments[0]&&"object"==typeof arguments[1]?t=n(r,arguments[1],s(arguments[0])):2===arguments.length&&"string"==typeof arguments[0]||3===arguments.length&&"string"==typeof arguments[0]&&"object"==typeof arguments[2]?t=n(r,arguments[2],{date:a(arguments[0]),text:arguments[1]}):2===arguments.length&&arguments[0]instanceof Date||3===arguments.length&&arguments[0]instanceof Date&&"object"==typeof arguments[2]?t=n(r,{date:arguments[0],text:arguments[1]}):u.throwError(u.argumentErrorName,"Incorrect FIXME call signature."),o(t)}var u=r("./fixme-error"),a=r("./parse-date")(u),s=r("./parse-single-string")(u,a);"undefined"!=typeof t&&"undefined"!=typeof t.exports&&(t.exports=i),"function"==typeof define&&define.amd&&define([],function(){return i}),"undefined"!=typeof window&&(window.FIXME=i)}).call(this,r("_process"))},{"./fixme-error":1,"./parse-date":3,"./parse-single-string":4,_process:5}],3:[function(r,t,e){"use strict";function n(r){return function(t){var e=new Date(t);return isNaN(e.valueOf())&&r.throwError(r.argumentErrorName,'Date "'+t+'" is not valid.'),e}}t.exports=n},{}],4:[function(r,t,e){"use strict";function n(r,t){function e(e){var n=e.split(":");return 2!==n.length&&r.throwError(r.argumentErrorName,'Given string is not in format "[date]:[label]".'),{date:t(n[0]),text:n[1]}}return e}t.exports=n},{}],5:[function(r,t,e){function n(){c=!1,a.length?f=a.concat(f):g=-1,f.length&&o()}function o(){if(!c){var r=setTimeout(n);c=!0;for(var t=f.length;t;){for(a=f,f=[];++g<t;)a&&a[g].run();g=-1,t=f.length}a=null,c=!1,clearTimeout(r)}}function i(r,t){this.fun=r,this.array=t}function u(){}var a,s=t.exports={},f=[],c=!1,g=-1;s.nextTick=function(r){var t=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)t[e-1]=arguments[e];f.push(new i(r,t)),1!==f.length||c||setTimeout(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=u,s.addListener=u,s.once=u,s.off=u,s.removeListener=u,s.removeAllListeners=u,s.emit=u,s.binding=function(r){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(r){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},{}]},{},[2]);
