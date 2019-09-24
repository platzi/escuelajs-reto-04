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
})({"assets/plugins/FonditaLoop.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FonditaLoop =
/** @class */
function () {
  /**
   *constructo of the FonditaLoop class
   * @memberof FonditaLoop
   */
  function FonditaLoop() {
    this.nTimeInit = 1000;
    this.nTimeFin = 8000;
  }

  FonditaLoop.prototype.getRandomTimeOrder = function () {
    var vA = +this.nTimeInit;
    var vB = this.nTimeFin;
    return this.getOneNumberRamdon(vA, vB);
  };

  ;

  FonditaLoop.prototype.getOneNumberRamdon = function (vA, vB) {
    var nRamdon = Math.random();
    return Math.floor(nRamdon * (vB - vA) + vA);
  };

  ;

  FonditaLoop.prototype.getTable = function () {
    return [{
      name: "Mesa 1",
      nameshort: "M.1",
      maxperson: 3
    }, {
      name: "Mesa 2",
      nameshort: "M.2",
      maxperson: 2
    }, {
      name: "Mesa 3",
      nameshort: "M.3",
      maxperson: 2
    }, {
      name: "Mesa 4",
      nameshort: "M.4",
      maxperson: 2
    }, {
      name: "Mesa 5",
      nameshort: "M.5",
      maxperson: 2
    }];
  };

  ;

  FonditaLoop.prototype.getTableTotal = function () {
    return this.getTable.length;
  };

  ;

  FonditaLoop.prototype.getMenu = function () {
    return [{
      name: "Combo Hamburguesa",
      pict: "https://web.artcompanysystem.com/public/platzi/hamburger.jpg"
    }, {
      name: "Combo Hot Dogs",
      pict: "https://web.artcompanysystem.com/public/platzi/hot-dog.jpg"
    }, {
      name: "Combo Pizza",
      pict: "https://web.artcompanysystem.com/public/platzi/pizza.JPEG"
    }];
  };

  ;

  FonditaLoop.prototype.getPerson = function () {
    return [{
      name: "Luis Sanchez",
      pict: ""
    }, {
      name: "J.O Waldner",
      pict: ""
    }, {
      name: "Jorgen Person",
      pict: ""
    }, {
      name: "Kin tam Su",
      pict: ""
    }, {
      name: "Liu Golian",
      pict: ""
    }, {
      name: "Hernesto Macias",
      pict: ""
    }, {
      name: "Gustavo Bolivar",
      pict: ""
    }];
  };

  ;

  FonditaLoop.prototype.getOnlyMenu = function () {
    this.aMenu = this.getMenu();
    var ttalMenu = this.aMenu.length;
    var nSelect = this.getOneNumberRamdon(0, ttalMenu);
    return this.aMenu[nSelect];
  };

  ;

  FonditaLoop.prototype.getOnlyPerson = function () {
    return __awaiter(this, void 0, Promise, function () {
      var ttalPerson, nSelect;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.aPerson = this.getPerson();
            ttalPerson = this.aPerson.length;
            return [4
            /*yield*/
            , this.getOneNumberRamdon(0, ttalPerson - 1)];

          case 1:
            nSelect = _a.sent();
            return [2
            /*return*/
            , this.aPerson[nSelect]];
        }
      });
    });
  };

  ;

  FonditaLoop.prototype.getOrders = function (product, personId, table) {
    var nThisTime = this.getRandomTimeOrder();
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({
          menu: product,
          table: table,
          personId: personId,
          time: nThisTime
        }); //resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, nThisTime);
    });
  };

  FonditaLoop.prototype.getPeopleReserved = function () {
    var ttalPerson = this.getOneNumberRamdon(1, 5);
    console.log('total personas**************', ttalPerson);
    return ttalPerson;
  };

  return FonditaLoop;
}();

exports.default = FonditaLoop;
},{}],"assets/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FonditaLoop_1 = __importDefault(require("./plugins/FonditaLoop"));

var htmlTable = document.querySelector('#wiz_table');

var index =
/** @class */
function () {
  function index() {
    var _this = this;

    this.aAllPedido = [];
    this.nTagConsole = 0;
    this.fonditaLoop = new FonditaLoop_1.default();
    this.htmlTable = htmlTable;
    this.createTable();
    this.RestaurantOpen();
    setTimeout(function () {
      _this.waiter2();

      _this.waiter3();
    }, 6000);
  }
  /**
   * method to order of the table one and three
   *
   * @memberof index
   */


  index.prototype.waiter2 = function () {
    /** I show all my waiter in screen */
    this.showAllWater();
    /**
     * In process Table 1
     */

    var vTableNum = 0;
    this.processOrder(this.aAllPedido[vTableNum], vTableNum);
    /**
     * IN process Table 2
     */

    var vTableNum3 = 2;
    this.processOrder(this.aAllPedido[vTableNum3], vTableNum3);
  };

  ;

  index.prototype.waiter3 = function () {
    var vTableNum1 = 1;
    this.processOrderAsync(this.aAllPedido[vTableNum1], vTableNum1);
  };

  ;

  index.prototype.RestaurantOpen = function () {
    return __awaiter(this, void 0, void 0, function () {
      var myMenuIs, vTimeBussy;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.fonditaLoop.getOnlyMenu()];

          case 1:
            myMenuIs = _a.sent();
            vTimeBussy = 1000;
            this.fonditaLoop.getTable().forEach(function (list, id) {
              var ttalPerson = _this.fonditaLoop.getPeopleReserved();

              _this.consoleLog("=======", "");

              _this.consoleLog('Ocupando la mesa:', id + 1);

              var _loop_1 = function (index_1) {
                setTimeout(function () {
                  _this.pushIconTable({
                    id: id,
                    index: index_1
                  });

                  setTimeout(function () {
                    _this.pushIconTablePedido({
                      id: id,
                      index: index_1
                    });
                  }, 200);
                }, vTimeBussy);
                vTimeBussy += 500;
              };

              for (var index_1 = 0; index_1 < ttalPerson; index_1++) {
                _loop_1(index_1);
              }
            });
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ;

  index.prototype.createTable = function () {
    var vHTML = "";
    var vElement = document.createElement("div");
    var ordenTable = 0;
    var spaceFonda = 2;
    var ordentbg = 0;
    this.fonditaLoop.getTable().forEach(function (list, id) {
      if (spaceFonda === 2 && ordenTable === 0) {
        vHTML += '<div class="row">';
        vHTML += spaceFonda == 2 && "<div class=\"col-2 wiz_table__spacetable wiz_table__spacetable-drone\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img id=\"wiz-jx-waiter-2\" class=\"wiz_table__spacetable__imgdrone\"  src=\"https://web.artcompanysystem.com/public/platzi/robot1.png\" >\n\t\t\t\t\t\t\t\t\t\t\t\t</div>";
      } else if (ordenTable === 0) {
        vHTML += '<div class="row">';
      }

      ordenTable++;
      vHTML += "<div class=\"col-4 wiz_table__spacetable wiz_table__spacetable-table\">\n\t\t\t\t\t\t\t<div class=\"wiz_table__spacetable__footertable\" >" + list.nameshort + "</div>\n\t\t\t\t\t\t\t<div id=\"jx-per-" + id + "\" class=\"row wiz_table__spacetable__person\"></div>\n\t\t\t\t\t\t\t<div id=\"jx-per-or-" + id + "\" class=\"row wiz_table__spacetable__person\"></div>\n\t\t\t\t\t\t\t<div id=\"jx-per-wa-" + id + "\" class=\"row wiz_table__spacetable__person\"></div>\n\t\t\t\t\t\t\t<!--<img class=\"wiz_table__spacetable__imgtable animated bounceIn\" src=\"30235.jpg\" >\t-->\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>";

      if (spaceFonda === 2 && ordenTable === 2) {
        vHTML += "<div class=\"col-2 wiz_table__spacetable wiz_table__spacetable-drone\">\n\t\t\t\t\t\t\t\t\t\t<img id=\"wiz-jx-waiter-3\" class=\"wiz_table__spacetable__imgdrone\" src=\"https://web.artcompanysystem.com/public/platzi/robot2.png\" >\n\t\t\t\t\t\t\t\t\t</div></div>";
        ordenTable = 0;
        spaceFonda = 3;
      }
    });
    vElement.innerHTML = vHTML + "</div>";
    this.htmlTable.appendChild(vElement);
  };

  ;

  index.prototype.pushIconTable = function (aInfo) {
    //let list 	= aInfo.list;
    var id = aInfo.id;
    var index = aInfo.index;
    var IcoRand = this.fonditaLoop.getOneNumberRamdon(1, 70);
    var vTable = id + 1;
    var vDiner = index + 1;
    var personIco = document.querySelector("#jx-per-" + id);
    var vElement = document.createElement("div");
    var UriAvatarRan = "https://i.pravatar.cc/150?img=" + IcoRand;
    this.consoleLog("At table " + vTable + ", entering diner " + vDiner + ": <img style=\"height:12px\" src=\"" + UriAvatarRan + "\" />", "");
    vElement.className = 'col-3';
    vElement.innerHTML = "<div id=\"wiz-jx-per-one-" + id + "-" + index + "\" class=\"wiz_table__spacetable__person-icon backg-blue animated zoomIn\" >\n\t\t\t\t\t\t\t\t\t\t<img  class=\"wiz_table__spacetable__person-icon_img\" src=\"" + UriAvatarRan + "\" />\n\t\t\t\t\t\t\t\t\t</div>";
    personIco.appendChild(vElement);
  };

  ;

  index.prototype.pushIconTablePedido = function (aInfo) {
    var id = aInfo.id;
    var index = aInfo.index;
    var vDiner = index + 1;
    var vTable = id + 1;
    var vMenu = this.fonditaLoop.getOnlyMenu();
    var vMenuName = vMenu.name;
    var vMenuImag = vMenu.pict;
    var vPedido = {
      id: index,
      menu: vMenuName
    };

    if (this.aAllPedido[id]) {
      this.aAllPedido[id].push(vPedido);
    } else {
      this.aAllPedido.push([vPedido]);
    } //let vTtallPedido:number = this.aAllPedido[ id ].length;
    //console.log(`vTtallPedido== ${vTtallPedido}`);
    //	this.aAllPedido[ id ][vTtallPedido] = vPedido;  //= vPedido;


    this.consoleLog("diner " + vDiner + ", Table " + vTable + ": ", '');
    this.consoleLog("-->Orders ", vMenuName);
    var personIcoPedido = document.querySelector("#jx-per-or-" + id);
    var vElement = document.createElement("div");
    vElement.className = 'col-3';
    vElement.innerHTML = "<div id=\"wiz-jx-per-or-one-" + id + "-" + index + "\" title=\"el comensal " + (index + 1) + " pide:" + vMenuName + "\" class=\"wiz_table__spacetable__person-icon backg-yellow animated flash infinite\" >\n\t\t\t\t\t\t\t\t\t<img  class=\"wiz_table__spacetable__person-icon_img\" src=\"" + vMenuImag + "\" />\n\t\t\t\t\t\t\t\t</div>";
    personIcoPedido.appendChild(vElement);
  };

  index.prototype.consoleLog = function (vText, vVal) {
    var DOMConsole = document.querySelector('#wiz-jx-terminal');
    var vTagNum = this.nTagConsole;
    DOMConsole.innerHTML = DOMConsole.innerHTML + "<div style=\"margin-top:3px;\" ><a name=\"wiz-tag-" + vTagNum + "\" style=\"color:blue\" >~</a> <span style=\"color:pink\" >\u00BB</span> " + vText + " <b>" + vVal + "<b/></div>";
    location.href = "#wiz-tag-" + vTagNum;
    this.nTagConsole++;
  };

  ;

  index.prototype.ExecuteAllOrderTable = function (aVec) {
    var id = aVec.id;
    var vNode = document.querySelector("#jx-per-or-" + id).childNodes;
    var vNodeTtal = vNode.length;

    for (var index_2 = 0; index_2 < vNodeTtal; index_2++) {
      var chilNod = vNode[index_2].childNodes[0];
    }
  };

  index.prototype.showAllWater = function () {
    var element = document.querySelector('#wiz-jx-waiter-2');
    element.classList.add('animated', 'zoomInDown', 'display-show');
    var element3 = document.querySelector('#wiz-jx-waiter-3');
    element3.classList.add('animated', 'zoomInDown', 'display-show');
  };

  ;

  index.prototype.processOrder = function (vOrder, vTableNum) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , vOrder.forEach(function (element, index) {
              return __awaiter(_this, void 0, void 0, function () {
                var item;

                var _this = this;

                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      item = element.menu;
                      this.consoleLog("Entry Order table " + (vTableNum + 1) + " of the person " + (index + 1), "");
                      this.createIconEntryOrder(item, index, vTableNum);
                      return [4
                      /*yield*/
                      , this.fonditaLoop.getOrders(item, index, vTableNum).then(function (res) {
                        _this.changeToOrderServed(res);
                      })];

                    case 1:
                      _a.sent();

                      return [2
                      /*return*/
                      ];
                  }
                });
              });
            })];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ;

  index.prototype.createIconEntryOrder = function (item, index, vTableNum) {
    var id = vTableNum;
    var modifyElement = document.querySelector("#jx-per-wa-" + vTableNum);
    var vElement = document.createElement("div");
    vElement.className = 'col-3';
    var vMenuImag = "https://web.artcompanysystem.com/public/platzi/entry.png";
    var iconPedido = document.querySelector("#wiz-jx-per-or-one-" + id + "-" + index);
    iconPedido.classList.remove('animated', 'flash', 'infinite');
    vElement.innerHTML = "<div id=\"wiz-jx-per-wa-one-" + id + "-" + index + "\" title=\"Empezando el Pedido\" class=\"wiz_table__spacetable__person-icon backg-yellow animated flash infinite\" >\n\t\t\t\t\t\t\t\t\t<img id=\"wiz-jx-per-wa-one-" + id + "-" + index + "-img\" class=\"wiz_table__spacetable__person-icon_img\" src=\"" + vMenuImag + "\" />\n\t\t\t\t\t\t\t\t</div>";
    modifyElement.appendChild(vElement);
  };

  ;

  index.prototype.changeToOrderServed = function (res) {
    var time = res.time,
        menu = res.menu,
        table = res.table,
        personId = res.personId;
    time = time / 1000;
    var vEle = document.querySelector("#wiz-jx-per-wa-one-" + res.table + "-" + res.personId);
    vEle.title = "Pedido servido en " + time;
    vEle.classList.remove('animated', 'flash', 'infinite', 'backg-yellow');
    vEle.classList.add('backg-green');
    var vEleIco = document.querySelector("#wiz-jx-per-wa-one-" + res.table + "-" + res.personId + "-img");
    vEleIco.src = "https://web.artcompanysystem.com/public/platzi/prepared.png";
    this.consoleLog("Order " + menu + " from table " + (table + 1) + ", person " + (personId + 1) + " is ready", "");
  };

  index.prototype.processOrderAsync = function (vOrder, vTableNum) {
    var ttalOrder = vOrder.length;
    /**-- esto es una chambonada -- */

    switch (ttalOrder) {
      case 1:
        {
          this.processOrderAsyncSend1(vOrder, vTableNum);
        }
        break;

      case 2:
        {
          this.processOrderAsyncSend2(vOrder, vTableNum);
        }
        break;

      case 3:
        {
          this.processOrderAsyncSend3(vOrder, vTableNum);
        }
        break;

      case 4:
        {
          this.processOrderAsyncSend4(vOrder, vTableNum);
        }
        break;
    }
  };

  ;

  index.prototype.processOrderAsyncSend1 = function (vOrder, vTableNum) {
    return __awaiter(this, void 0, void 0, function () {
      var vMenu1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.consoleLog("Entry Order table " + (vTableNum + 1) + " of the person " + (0 + 1), "");
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 0, vTableNum)];

          case 1:
            vMenu1 = _a.sent();
            /** send order already */

            this.changeToOrderServed(vMenu1);
            this.consoleLog("Order " + vOrder[0].menu + " from table " + (vTableNum + 1) + ", person " + (0 + 1) + " is ready", "");
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ;

  index.prototype.processOrderAsyncSend2 = function (vOrder, vTableNum) {
    return __awaiter(this, void 0, void 0, function () {
      var vMenu1, vMenu2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 0, vTableNum)];

          case 1:
            vMenu1 = _a.sent();
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 1, vTableNum)];

          case 2:
            vMenu2 = _a.sent();
            /** send order already */

            this.changeToOrderServed(vMenu1);
            this.changeToOrderServed(vMenu2);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ;

  index.prototype.processOrderAsyncSend3 = function (vOrder, vTableNum) {
    return __awaiter(this, void 0, void 0, function () {
      var vMenu1, vMenu2, vMenu3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 0, vTableNum)];

          case 1:
            vMenu1 = _a.sent();
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 1, vTableNum)];

          case 2:
            vMenu2 = _a.sent();
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 2, vTableNum)];

          case 3:
            vMenu3 = _a.sent();
            /** send order already */

            this.changeToOrderServed(vMenu1);
            this.changeToOrderServed(vMenu2);
            this.changeToOrderServed(vMenu3);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ;

  index.prototype.processOrderAsyncSend4 = function (vOrder, vTableNum) {
    return __awaiter(this, void 0, void 0, function () {
      var vMenu1, vMenu2, vMenu3, vMenu4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 0, vTableNum)];

          case 1:
            vMenu1 = _a.sent();
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 1, vTableNum)];

          case 2:
            vMenu2 = _a.sent();
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 2, vTableNum)];

          case 3:
            vMenu3 = _a.sent();
            return [4
            /*yield*/
            , this.entryOrden(vOrder, 3, vTableNum)];

          case 4:
            vMenu4 = _a.sent();
            /** send order already */

            this.changeToOrderServed(vMenu1);
            this.changeToOrderServed(vMenu2);
            this.changeToOrderServed(vMenu3);
            this.changeToOrderServed(vMenu4);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ;

  index.prototype.entryOrden = function (vOrder, peopleID, vTableNum) {
    return __awaiter(this, void 0, void 0, function () {
      var index, item, vMenu1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            index = peopleID;
            item = vOrder[index].menu;
            this.createIconEntryOrder(item, index, vTableNum);
            return [4
            /*yield*/
            , this.fonditaLoop.getOrders(vOrder[index].menu, index, vTableNum)];

          case 1:
            vMenu1 = _a.sent();
            return [2
            /*return*/
            , vMenu1];
        }
      });
    });
  };

  ;
  return index;
}();

var vIndex = new index();
},{"./plugins/FonditaLoop":"assets/plugins/FonditaLoop.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49822" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/index.ts"], null)
//# sourceMappingURL=/assets.71ddc51b.js.map