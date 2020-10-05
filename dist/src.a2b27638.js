// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/tree.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTree = exports.calcSizes = exports.addNode = void 0;

function addNode(nodesList, newNode) {
  var parentNode = nodesList.find(function (node) {
    return node.id === newNode.pid;
  });

  var node = __assign(__assign({}, newNode), {
    path: __spreadArrays(parentNode.path, [parentNode.id])
  });

  return __spreadArrays(nodesList, [node]);
}

exports.addNode = addNode;

function calcSizes(flipedNodes) {
  var nodesChildrenSizes = flipedNodes.reduce(function (nodeSizes, parentNode) {
    var childrens = flipedNodes.filter(function (node) {
      return node.pid === parentNode.id;
    });
    var childrenSize = childrens.reduce(function (childrenSize, children) {
      var childrensOfChidlrenSize = nodeSizes[children.id] || {
        width: 0,
        height: 0
      };
      var childrenHeight = Math.max(childrensOfChidlrenSize.height, children.height);
      var childrenWithChildrensWidth = children.width + childrensOfChidlrenSize.width;
      var childrensWidth = Math.max(childrenSize.width, childrenWithChildrensWidth);
      var height = childrenSize.height + childrenHeight;
      var width = childrensWidth;
      return {
        height: height,
        width: width
      };
    }, {
      height: 0,
      width: 0
    });
    nodeSizes[parentNode.id] = childrenSize;
    return nodeSizes;
  }, {});
  return nodesChildrenSizes;
}

exports.calcSizes = calcSizes;

var centering = function centering(childrenIds, parentNode, nodeSizes, nodesPosition) {
  if (childrenIds.length > 0) {
    var center_1 = nodeSizes[parentNode.id].height / 2 - parentNode.height / 2; //findCenterPosition(childrenIds, nodesPosition, nodeSizes);

    console.log(parentNode, center_1, nodesPosition, nodeSizes);
    childrenIds.forEach(function (childrenId) {
      var children = nodesPosition[childrenId];
      nodesPosition[childrenId] = __assign(__assign({}, children), {
        y: children.y - center_1
      });
    });
  }

  return nodesPosition;
};

function buildTree(nodes, nodeSizes, hooks) {
  var _a;

  if (hooks === void 0) {
    hooks = {
      childrenCentering: function childrenCentering(childrenId, parentNode, nodeSizes, nodesPosition) {
        return nodesPosition;
      }
    };
  }

  var rootNode = nodes[0];
  var nodesPositions = nodes.reduce(function (nodesPosition, parentNode) {
    var parentNodeCoords = nodesPosition[parentNode.id] || {
      x: 0,
      y: 0
    };
    var parentNodeSize = nodeSizes[parentNode.id];
    var childrens = nodes.filter(function (node) {
      return node.pid === parentNode.id;
    }) // HACK
    .sort(function (a, b) {
      return ("" + a.id).localeCompare("" + b.id);
    });
    var nodePositionCursor = {
      x: parentNodeCoords.x + parentNodeSize.width,
      y: parentNodeCoords.y
    };
    childrens.forEach(function (children) {
      // console.log("nodePositionCursor--", children, nodePositionCursor);
      var childrenPosition = {
        x: parentNodeCoords.x + parentNode.width,
        y: nodePositionCursor.y
      };
      nodesPosition[children.id] = childrenPosition;
      var yCursor = Math.max(children.height, nodeSizes[children.id].height);
      nodePositionCursor = {
        x: childrenPosition.x,
        y: childrenPosition.y + yCursor
      };
    });
    var childrenIds = childrens.map(function (node) {
      return node.id;
    });

    if (childrenIds.length > 0) {
      nodesPosition = hooks.childrenCentering(childrenIds, parentNode, nodeSizes, nodesPosition);
    } // onst positions = Object.keys(nodesPosition).filter(keys )
    // findCenterPosition()

    /*
    nodesPosition[parentNode.id] = {
      ...nodesPosition[parentNode.id],
      y:  nodePositionCursor.y
    }
    */


    return __assign({}, nodesPosition);
  }, (_a = {}, _a[rootNode.id] = {
    x: 0,
    y: 0
  }, _a));
  return nodesPositions;
}

exports.buildTree = buildTree;
},{}],"src/hierarchy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortNodes = void 0;

function sortNodes(data) {
  return data.sort(function (a, b) {
    return a.path.length - b.path.length;
  });
}

exports.sortNodes = sortNodes;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _tree = require("./tree");

var _hierarchy = require("./hierarchy");

/*
const data = [
  {
    id: 1,
    width: 10,
    height: 50,
    path: []
  },
  {
    id: 2,
    width: 20,
    height: 50,
    pid: 1,
    path: [1]
  },
  {
    id: 3,
    width: 20,
    height: 50,
    pid: 1,
    path: [1]
  },
  {
    id: 4,
    width: 20,
    height: 50,
    pid: 3,
    path: [1, 3]
  },
  {
    id: 5,
    width: 20,
    height: 50,
    pid: 3,
    path: [1, 3]
  }
];
*/
var data = [{
  id: "01",
  width: 100,
  height: 50,
  path: []
}, {
  id: "02",
  width: 200,
  height: 30,
  pid: "01",
  path: ["01"]
}, {
  id: "03",
  width: 200,
  height: 50,
  pid: "01",
  path: ["01"]
}, {
  id: "08",
  width: 250,
  height: 50,
  pid: "02",
  path: ["01", "02"]
}, {
  id: "09",
  width: 350,
  height: 50,
  pid: "02",
  path: ["01", "02"]
}];
var flipedNodes = (0, _hierarchy.sortNodes)(data).reverse();
var nodeSizes = (0, _tree.calcSizes)(flipedNodes);
var nodesSorted = (0, _hierarchy.sortNodes)(data); // console.log('size-', nodeSizes);

var hooks = {
  childrenCentering: function childrenCentering(childrenIds, parentNode, nodeSizes, nodesPosition) {
    var center = nodeSizes[parentNode.id].height / 2 - parentNode.height / 2; //findCenterPosition(childrenIds, nodesPosition, nodeSizes);

    console.log(parentNode, center, nodesPosition, nodeSizes);
    childrenIds.forEach(function (childrenId) {
      nodesPosition[childrenId].y = nodesPosition[childrenId].y - center;
    });
    return nodesPosition;
  }
};
var nodesPositions = (0, _tree.buildTree)(nodesSorted, nodeSizes, hooks);
console.log({
  nodeSizes: nodeSizes,
  nodesPositions: nodesPositions
});
var color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);
var svg = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight).append("g").attr("transform", "translate(0, 200)");
var nodes = svg.selectAll("rect").data(data);
nodes.enter().append("rect").attr("class", "node").style("fill", function (d) {
  return color(d.id);
}).attr("id", function (d) {
  return "id-".concat(d.id);
}).attr("x", function (d) {
  return nodesPositions[d.id].x;
}).attr("y", function (d) {
  return nodesPositions[d.id].y;
}).attr("width", function (d) {
  return d.width;
}).attr("height", function (d) {
  return d.height;
});
var titles = svg.selectAll("text").data(data);
titles.enter().append("text").attr("id", function (d) {
  return "text-id-".concat(d.id);
}).attr("x", function (d) {
  return nodesPositions[d.id].x;
}).attr("y", function (d) {
  return nodesPositions[d.id].y + 15;
}).style("font-size", '8px').text(function (d) {
  return "".concat(d.id, " ").concat(nodesPositions[d.id].x, " ").concat(nodesPositions[d.id].y);
});
var info = d3.select("body").append("div");
var txts = info.selectAll("div").data(data);
txts.enter().append("div").style("border", "1px soild black").style("background-color", function (d) {
  return color(d.id);
}).text(function (d) {
  return d.id;
});
},{"./styles.css":"src/styles.css","./tree":"src/tree.ts","./hierarchy":"src/hierarchy.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49572" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map