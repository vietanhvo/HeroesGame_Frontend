
(function () {
var scripts = [{"deps":{"./assets/Script/Character":3,"./assets/Script/Game":4,"./assets/Script/Win":2,"./assets/Script/ActiveParticle":1,"./assets/Library/web3.min":5},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/Script/ActiveParticle.js"},{"deps":{},"path":"preview-scripts/assets/Script/Win.js"},{"deps":{},"path":"preview-scripts/assets/Script/Character.js"},{"deps":{"axios":7},"path":"preview-scripts/assets/Script/Game.js"},{"deps":{"indexof":6},"path":"preview-scripts/assets/Library/web3.min.js"},{"deps":{},"path":"preview-scripts/__node_modules/indexof/index.js"},{"deps":{"./lib/axios":8},"path":"preview-scripts/__node_modules/axios/index.js"},{"deps":{"./helpers/spread":10,"./cancel/isCancel":12,"./helpers/bind":15,"./env/data":18,"./utils":11,"../lib/core/AxiosError":13,"./core/mergeConfig":14,"./cancel/CanceledError":17,"./cancel/CancelToken":19,"./helpers/isAxiosError":20,"./helpers/toFormData":16,"./core/Axios":9,"./defaults":21},"path":"preview-scripts/__node_modules/axios/lib/axios.js"},{"deps":{"./../utils":11,"./mergeConfig":14,"./InterceptorManager":25,"../helpers/buildURL":24,"../helpers/validator":30,"./buildFullPath":26,"./dispatchRequest":23},"path":"preview-scripts/__node_modules/axios/lib/core/Axios.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/helpers/spread.js"},{"deps":{"./helpers/bind":15},"path":"preview-scripts/__node_modules/axios/lib/utils.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/cancel/isCancel.js"},{"deps":{"../utils":11},"path":"preview-scripts/__node_modules/axios/lib/core/AxiosError.js"},{"deps":{"../utils":11},"path":"preview-scripts/__node_modules/axios/lib/core/mergeConfig.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/helpers/bind.js"},{"deps":{"../utils":11,"buffer":22},"path":"preview-scripts/__node_modules/axios/lib/helpers/toFormData.js"},{"deps":{"../core/AxiosError":13,"../utils":11},"path":"preview-scripts/__node_modules/axios/lib/cancel/CanceledError.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/env/data.js"},{"deps":{"./CanceledError":17},"path":"preview-scripts/__node_modules/axios/lib/cancel/CancelToken.js"},{"deps":{"./../utils":11},"path":"preview-scripts/__node_modules/axios/lib/helpers/isAxiosError.js"},{"deps":{"../utils":11,"../core/AxiosError":13,"../helpers/toFormData":16,"../adapters/xhr":34,"C:/CocosDashboard_1.2.0/resources/.editors/Creator/2.4.5/resources/app.asar/node_modules/process/browser.js":29,"./env/FormData":32,"./transitional":33,"../helpers/normalizeHeaderName":35,"../adapters/http":34},"path":"preview-scripts/__node_modules/axios/lib/defaults/index.js"},{"deps":{"base64-js":27,"ieee754":28,"isarray":31},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"./../utils":11,"../cancel/isCancel":12,"../cancel/CanceledError":17,"../defaults":21,"./transformData":38},"path":"preview-scripts/__node_modules/axios/lib/core/dispatchRequest.js"},{"deps":{"./../utils":11},"path":"preview-scripts/__node_modules/axios/lib/helpers/buildURL.js"},{"deps":{"./../utils":11},"path":"preview-scripts/__node_modules/axios/lib/core/InterceptorManager.js"},{"deps":{"../helpers/combineURLs":36,"../helpers/isAbsoluteURL":37},"path":"preview-scripts/__node_modules/axios/lib/core/buildFullPath.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{"../core/AxiosError":13,"../env/data":18},"path":"preview-scripts/__node_modules/axios/lib/helpers/validator.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/helpers/null.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/defaults/transitional.js"},{"deps":{"./../utils":11,"./../helpers/buildURL":24,"../core/buildFullPath":26,"../defaults/transitional":33,"../core/AxiosError":13,"../cancel/CanceledError":17,"./../helpers/parseHeaders":39,"../helpers/parseProtocol":43,"./../core/settle":40,"./../helpers/cookies":41,"./../helpers/isURLSameOrigin":42},"path":"preview-scripts/__node_modules/axios/lib/adapters/xhr.js"},{"deps":{"../utils":11},"path":"preview-scripts/__node_modules/axios/lib/helpers/normalizeHeaderName.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/helpers/combineURLs.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/helpers/isAbsoluteURL.js"},{"deps":{"./../utils":11,"../defaults":21},"path":"preview-scripts/__node_modules/axios/lib/core/transformData.js"},{"deps":{"./../utils":11},"path":"preview-scripts/__node_modules/axios/lib/helpers/parseHeaders.js"},{"deps":{"./AxiosError":13},"path":"preview-scripts/__node_modules/axios/lib/core/settle.js"},{"deps":{"./../utils":11},"path":"preview-scripts/__node_modules/axios/lib/helpers/cookies.js"},{"deps":{"./../utils":11},"path":"preview-scripts/__node_modules/axios/lib/helpers/isURLSameOrigin.js"},{"deps":{},"path":"preview-scripts/__node_modules/axios/lib/helpers/parseProtocol.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    