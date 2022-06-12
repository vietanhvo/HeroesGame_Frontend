
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '533d062sChHRJ0sYHBmtHUM', 'Game');
// Script/Game.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var instance = axios.create({
    withCredentials: true,
    baseURL: "http://127.0.0.1:8000",
});
window.hero = 1;
window.monster = 0;
window.heroSkin = 3;
window.heroId = 2;
window.level = 1;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var t = cc.tween;
var testnet = false;
var SOUND;
(function (SOUND) {
    SOUND[SOUND["WIN"] = 0] = "WIN";
    SOUND[SOUND["LOSE"] = 1] = "LOSE";
    SOUND[SOUND["E1"] = 2] = "E1";
    SOUND[SOUND["E2"] = 3] = "E2";
    SOUND[SOUND["E3"] = 4] = "E3";
    SOUND[SOUND["E4"] = 5] = "E4";
    SOUND[SOUND["H1"] = 6] = "H1";
    SOUND[SOUND["H2"] = 7] = "H2";
    SOUND[SOUND["H3"] = 8] = "H3";
})(SOUND || (SOUND = {}));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpHero = null;
        _this.animHpHero = null;
        _this.hpMonster = null;
        _this.animHpMonster = null;
        _this.heroes = [];
        _this.monsters = [];
        _this.percentWaitResponse = 10;
        _this.dameMonster = 0.01;
        _this.dameHero = 0.01;
        _this.stars = [];
        _this.sounds = [];
        _this.currentHero = null;
        _this.currentMonster = null;
        _this.hp = null;
        _this.wait = true;
        _this.contractABI = null;
        _this.winLabel = [];
        _this.loseLabel = [];
        _this.failedLabel = null;
        _this.token = 0;
        _this.exp = 1;
        _this.tx = "";
        _this.countTx = 0;
        return _this;
    }
    Game.prototype.playSound = function (soundId, loop, delay) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        if (delay === void 0) { delay = 0; }
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.sounds[soundId], loop);
        }, delay);
    };
    Game.prototype.onLoad = function () {
        this.shadowHero.y = -390;
        this.shadowMonster.y = -390;
    };
    Game.prototype.updateSkin = function (skeleton) {
        if (window.heroSkin <= 2) {
            skeleton.setSkin("skin1");
        }
        else if (window.heroSkin <= 4) {
            skeleton.setSkin("skin2");
        }
        else {
            skeleton.setSkin("skin3");
        }
    };
    Game.prototype.start = function () {
        var _this = this;
        var params = new URL(window.location.href).searchParams;
        window.hero = params.get("h");
        window.monster = params.get("m") - 1;
        window.heroId = params.get("heroid");
        window.heroSkin = params.get("s");
        window.level = params.get("l");
        this.currentHero = this.heroes[window.hero];
        this.currentMonster = this.monsters[window.monster];
        this.updateSkin(this.currentHero);
        this.scheduleOnce(this.battle, 1);
        t(this.node)
            .call(function () {
            /*  */
            _this.currentHero.setAnimation(0, "run", true);
            t(_this.currentHero.node)
                .to(2, { x: -400 })
                .call(function () {
                _this.currentHero.setAnimation(0, "idle", true);
            })
                .start();
            _this.currentMonster.setAnimation(0, "run", true);
            t(_this.currentMonster.node)
                .to(2, { x: 400 })
                .call(function () {
                _this.currentMonster.setAnimation(0, "idle", true);
            })
                .start();
        })
            .delay(2)
            .call(function () {
            _this.hpHero.node.active = true;
            _this.hpMonster.node.active = true;
        })
            .delay(1)
            .call(function () {
            _this.battleStartAnim.node.active = true;
            _this.battleStartAnim.setAnimation(0, "animation", true);
            _this.scheduleOnce(function () {
                _this.battleStartAnim.node.active = false;
            }, 1);
        })
            .delay(3)
            .call(function () {
            _this.currentHero.setStartListener(function (track) {
                if (track.animation.name == "atk") {
                    if (window.hero != 0)
                        _this.scheduleOnce(function () {
                            _this.blink(_this.currentMonster.node);
                        }, 0.5);
                    else
                        _this.scheduleOnce(function () {
                            _this.blink(_this.currentMonster.node);
                        }, 0.3);
                }
            });
            //Warrior
            if (window.hero == 1) {
                // fix
                _this.currentHero.setAnimation(0, "run", true);
                t(_this.currentHero.node)
                    .by(0.5, { x: 450 })
                    .call(function () {
                    _this.heroAttack();
                    _this.schedule(_this.heroAttack, 1);
                })
                    .start();
            }
            //Ranger
            else if (window.hero == 0) {
                // fix
                _this.heroAttack();
                _this.schedule(_this.heroAttack, 0.5);
            }
            //Assassin
            else if (window.hero == 2) {
                _this.currentHero.setAnimation(0, "run", true);
                t(_this.currentHero.node)
                    .by(0.5, { x: 450 })
                    .call(function () {
                    _this.heroAttack();
                    _this.schedule(_this.heroAttack, 1);
                })
                    .start();
            }
            _this.currentMonster.setStartListener(function (track) {
                if (track.animation.name == "atk") {
                    if (window.monster == 3) {
                        _this.scheduleOnce(function () {
                            _this.blink(_this.currentHero.node);
                        }, 0.6);
                    }
                    else if (window.monster == 2) {
                        if (window.hero == 0) {
                            _this.scheduleOnce(function () {
                                _this.blink(_this.currentHero.node);
                            }, 0.8);
                        }
                        else {
                            _this.scheduleOnce(function () {
                                _this.blink(_this.currentHero.node);
                            }, 0.6);
                        }
                    }
                    else {
                        _this.scheduleOnce(function () {
                            _this.blink(_this.currentHero.node);
                        }, 0.2);
                    }
                    if (window.monster == 1) {
                        _this.bulletMonster.node.active = true;
                        if (window.hero == 1 || window.hero == 2)
                            // fix
                            _this.bulletMonster.play("monster_bullet_1");
                        else if (window.hero == 0)
                            // fix
                            _this.bulletMonster.play("monster_bullet_2");
                    }
                    else if (window.monster == 2) {
                        _this.scheduleOnce(function () {
                            _this.bulletMonster3.node.active = true;
                            _this.bulletMonster3.play("monster_bullet_3");
                        }, 0.5);
                    }
                    else if (window.monster == 3) {
                        _this.bulletMonster4.node.active = true;
                        _this.bulletMonster4.play("monster_bullet_4");
                    }
                    else {
                        _this.bulletMonster2.node.active = true;
                        if (window.hero == 1 || window.hero == 2)
                            // fix
                            _this.bulletMonster2.play("monster_bullet_1");
                        else if (window.hero == 0)
                            // fix
                            _this.bulletMonster2.play("monster_bullet_2");
                    }
                }
            });
            if (window.monster == 1) {
                if (window.hero == 0)
                    // fix
                    _this.schedule(_this.monsterAttack, 0.3);
                else
                    _this.schedule(_this.monsterAttack, 0.5);
            }
            else if (window.monster == 2) {
                _this.monsterAttack();
                _this.schedule(_this.monsterAttack, 1.5);
            }
            else if (window.monster == 3) {
                if (window.hero == 0) {
                    _this.currentMonster.setAnimation(0, "run", true);
                    t(_this.currentMonster.node)
                        .by(0.5, { position: cc.v2(-500, 0) })
                        .call(function () {
                        _this.monsterAttack();
                        _this.schedule(_this.monsterAttack, 1.2);
                    })
                        .start();
                }
                else {
                    _this.scheduleOnce(function () {
                        _this.monsterAttack();
                        _this.schedule(_this.monsterAttack, 1.2);
                    }, 0.5);
                }
            }
            else {
                _this.schedule(_this.monsterAttack, 1.1);
            }
            _this.currentHero.setCompleteListener(function (track) {
                if (track.animation.name == "atk") {
                    if (window.hero == 0) {
                        if (window.monster != 3)
                            _this.bulletRanger.play("ranger_bullet");
                        else
                            _this.bulletRanger.play("ranger_bullet2");
                    }
                    _this.hpMonster.progress -= _this.dameHero;
                    if (_this.hpMonster.progress < 0.1 && _this.wait) {
                        // 1 / 10 = 0.1
                        _this.hpMonster.progress = 0.1;
                    }
                    if (_this.hpMonster.progress <= 0.01) {
                        _this.playSound(SOUND.WIN, false, 0);
                        _this.unschedule(_this.heroAttack);
                        _this.unschedule(_this.monsterAttack);
                        _this.currentHero.setAnimation(0, "win", false);
                        // this.currentMonster.setAnimation(0, "die", false);
                        _this.currentMonster.setAnimation(0, "Die", false);
                        for (var i = 0; i < window.heroSkin; i++) {
                            _this.stars[i].active = true;
                        }
                        _this.scheduleOnce(function () {
                            _this.win.active = true;
                            if (window.hero == 1) {
                                // fix
                                _this.win.getChildByName("Warrior").active = true;
                                _this.win.getChildByName("Ranger").active = false;
                                _this.win.getChildByName("Assassin").active = false;
                                var sp = _this.win
                                    .getChildByName("Warrior")
                                    .getComponent("sp.Skeleton");
                                _this.updateSkin(sp);
                            }
                            else if (window.hero == 0) {
                                // fix
                                _this.win.getChildByName("Warrior").active = false;
                                _this.win.getChildByName("Ranger").active = true;
                                _this.win.getChildByName("Assassin").active = false;
                                var sp = _this.win
                                    .getChildByName("Ranger")
                                    .getComponent("sp.Skeleton");
                                _this.updateSkin(sp);
                            }
                            else if (window.hero == 2) {
                                _this.win.getChildByName("Warrior").active = false;
                                _this.win.getChildByName("Ranger").active = false;
                                _this.win.getChildByName("Assassin").active = true;
                                var sp = _this.win
                                    .getChildByName("Assassin")
                                    .getComponent("sp.Skeleton");
                                _this.updateSkin(sp);
                            }
                        }, 1);
                        return;
                    }
                }
            });
            _this.currentMonster.setCompleteListener(function (track) {
                if (track.animation.name == "atk") {
                    _this.hpHero.progress = _this.hpHero.progress - _this.dameMonster;
                    if (_this.wait && _this.hpHero.progress <= 0.1) {
                        _this.hpHero.progress = 0.1;
                    }
                    if (_this.hpHero.progress <= 0.01) {
                        _this.playSound(SOUND.LOSE, false, 0);
                        _this.unschedule(_this.monsterAttack);
                        _this.unschedule(_this.heroAttack);
                        _this.currentHero.setAnimation(0, "lose", false);
                        _this.currentMonster.setAnimation(0, "idle", false);
                        _this.scheduleOnce(function () {
                            _this.lose.active = true;
                        }, 1);
                        return;
                    }
                }
            });
        })
            .start();
    };
    Game.prototype.showFailed = function (msg) {
        this.failed.active = true;
        this.failedLabel.string = msg;
    };
    Game.prototype.battle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, instance.post("/hero/battle", {
                                hero_id: parseInt(window.heroId),
                                monster_id: window.monster + 1,
                            })];
                    case 1:
                        res = _a.sent();
                        console.log(res.data);
                        if (res.data) {
                            this.token = 100;
                            this.exp = 100;
                            this.winGame();
                        }
                        else {
                            this.token = 0;
                            this.exp = 0;
                            this.loseGame();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.update = function () {
        this.shadowHero.x = this.currentHero.node.x;
        this.shadowMonster.x = this.currentMonster.node.x;
    };
    Game.prototype.heroAttack = function () {
        this.currentHero.setAnimation(0, "atk", false);
        if (window.hero == 0) {
            this.playSound(SOUND.H1, false, 0);
        }
        else if (window.hero == 1) {
            this.playSound(SOUND.H2, false, 0);
        }
        else {
            this.playSound(SOUND.H3, false, 0);
        }
    };
    Game.prototype.monsterAttack = function () {
        // cc.log("monster attack");
        this.currentMonster.setAnimation(0, "atk", false);
        if (window.monster == 0) {
            this.playSound(SOUND.E1, false, 0);
        }
        else if (window.monster == 1) {
            this.playSound(SOUND.E2, false, 0);
        }
        else if (window.monster == 2) {
            this.playSound(SOUND.E3, false, 0);
        }
        else {
            this.playSound(SOUND.E4, false, 0);
        }
    };
    Game.prototype.blink = function (node) {
        node.color = cc.Color.RED;
        t(node)
            .delay(0.1)
            .call(function () {
            node.color = cc.Color.WHITE;
        })
            .start();
    };
    Game.prototype.winGame = function () {
        this.wait = false;
        this.dameHero = 0.5;
        this.dameMonster = 0;
        this.winLabel[0].string = "+" + this.exp;
        this.winLabel[1].string = "+" + this.token;
        this.winLabel[2].string = "Level " + window.level;
    };
    Game.prototype.loseGame = function () {
        this.wait = false;
        this.dameMonster = 0.5;
        this.dameHero = 0;
        this.loseLabel[0].string = "+" + this.exp;
        this.loseLabel[1].string = "+" + this.token;
        this.loseLabel[2].string = "Level " + window.level;
    };
    __decorate([
        property(cc.ProgressBar)
    ], Game.prototype, "hpHero", void 0);
    __decorate([
        property(cc.Animation)
    ], Game.prototype, "animHpHero", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Game.prototype, "hpMonster", void 0);
    __decorate([
        property(cc.Animation)
    ], Game.prototype, "animHpMonster", void 0);
    __decorate([
        property([sp.Skeleton])
    ], Game.prototype, "heroes", void 0);
    __decorate([
        property([sp.Skeleton])
    ], Game.prototype, "monsters", void 0);
    __decorate([
        property(sp.Skeleton)
    ], Game.prototype, "battleStartAnim", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "notification", void 0);
    __decorate([
        property
    ], Game.prototype, "percentWaitResponse", void 0);
    __decorate([
        property
    ], Game.prototype, "dameMonster", void 0);
    __decorate([
        property
    ], Game.prototype, "dameHero", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "win", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "lose", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "failed", void 0);
    __decorate([
        property(cc.Animation)
    ], Game.prototype, "bulletMonster", void 0);
    __decorate([
        property(cc.Animation)
    ], Game.prototype, "bulletMonster2", void 0);
    __decorate([
        property(cc.Animation)
    ], Game.prototype, "bulletMonster3", void 0);
    __decorate([
        property(cc.Animation)
    ], Game.prototype, "bulletMonster4", void 0);
    __decorate([
        property(cc.Animation)
    ], Game.prototype, "bulletRanger", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "shadowHero", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "shadowMonster", void 0);
    __decorate([
        property([cc.Node])
    ], Game.prototype, "stars", void 0);
    __decorate([
        property([cc.AudioClip])
    ], Game.prototype, "sounds", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "contractABI", void 0);
    __decorate([
        property([cc.Label])
    ], Game.prototype, "winLabel", void 0);
    __decorate([
        property([cc.Label])
    ], Game.prototype, "loseLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "failedLabel", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUvQixJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzVCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLE9BQU8sRUFBRSx1QkFBdUI7Q0FDakMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7QUFDaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbkIsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbEIsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFWCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ25CLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQztBQUN0QixJQUFLLEtBVUo7QUFWRCxXQUFLLEtBQUs7SUFDUiwrQkFBRyxDQUFBO0lBQ0gsaUNBQUksQ0FBQTtJQUNKLDZCQUFFLENBQUE7SUFDRiw2QkFBRSxDQUFBO0lBQ0YsNkJBQUUsQ0FBQTtJQUNGLDZCQUFFLENBQUE7SUFDRiw2QkFBRSxDQUFBO0lBQ0YsNkJBQUUsQ0FBQTtJQUNGLDZCQUFFLENBQUE7QUFDSixDQUFDLEVBVkksS0FBSyxLQUFMLEtBQUssUUFVVDtBQUdEO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBMFpDO1FBeFpDLFlBQU0sR0FBbUIsSUFBSSxDQUFDO1FBRTlCLGdCQUFVLEdBQWlC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QUFDLFNBQVMsQ0FBQzs2Q0FDVTtJQUVqQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzswQ0FDSztJQUUxQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzsyQ0FDTTtJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzZDQUNVO0lBNURWLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0EwWnhCO0lBQUQsV0FBQztDQTFaRCxBQTBaQyxDQTFaaUMsRUFBRSxDQUFDLFNBQVMsR0EwWjdDO2tCQTFab0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xyXG5cclxuY29uc3QgaW5zdGFuY2UgPSBheGlvcy5jcmVhdGUoe1xyXG4gIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcclxuICBiYXNlVVJMOiBcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMFwiLFxyXG59KTtcclxuXHJcbndpbmRvdy5oZXJvID0gMTtcclxud2luZG93Lm1vbnN0ZXIgPSAwO1xyXG53aW5kb3cuaGVyb1NraW4gPSAzO1xyXG53aW5kb3cuaGVyb0lkID0gMjtcclxud2luZG93LmxldmVsID0gMTtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IHQgPSBjYy50d2VlbjtcclxuY29uc3QgdGVzdG5ldCA9IGZhbHNlO1xyXG5lbnVtIFNPVU5EIHtcclxuICBXSU4sXHJcbiAgTE9TRSxcclxuICBFMSxcclxuICBFMixcclxuICBFMyxcclxuICBFNCxcclxuICBIMSxcclxuICBIMixcclxuICBIMyxcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gIGhwSGVybzogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgYW5pbUhwSGVybzogY2MuQW5pbWF0aW9uID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgaHBNb25zdGVyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLkFuaW1hdGlvbilcclxuICBhbmltSHBNb25zdGVyOiBjYy5BbmltYXRpb24gPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShbc3AuU2tlbGV0b25dKVxyXG4gIGhlcm9lczogc3AuU2tlbGV0b25bXSA9IFtdO1xyXG4gIEBwcm9wZXJ0eShbc3AuU2tlbGV0b25dKVxyXG4gIG1vbnN0ZXJzOiBzcC5Ta2VsZXRvbltdID0gW107XHJcbiAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gIGJhdHRsZVN0YXJ0QW5pbTogc3AuU2tlbGV0b247XHJcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gIG5vdGlmaWNhdGlvbjogY2MuTGFiZWw7XHJcbiAgQHByb3BlcnR5XHJcbiAgcGVyY2VudFdhaXRSZXNwb25zZSA9IDEwO1xyXG4gIEBwcm9wZXJ0eVxyXG4gIGRhbWVNb25zdGVyID0gMC4wMTtcclxuICBAcHJvcGVydHlcclxuICBkYW1lSGVybyA9IDAuMDE7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgd2luOiBjYy5Ob2RlO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIGxvc2U6IGNjLk5vZGU7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgZmFpbGVkOiBjYy5Ob2RlO1xyXG4gIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgYnVsbGV0TW9uc3RlcjogY2MuQW5pbWF0aW9uO1xyXG4gIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgYnVsbGV0TW9uc3RlcjI6IGNjLkFuaW1hdGlvbjtcclxuICBAcHJvcGVydHkoY2MuQW5pbWF0aW9uKVxyXG4gIGJ1bGxldE1vbnN0ZXIzOiBjYy5BbmltYXRpb247XHJcbiAgQHByb3BlcnR5KGNjLkFuaW1hdGlvbilcclxuICBidWxsZXRNb25zdGVyNDogY2MuQW5pbWF0aW9uO1xyXG4gIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgYnVsbGV0UmFuZ2VyOiBjYy5BbmltYXRpb247XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgc2hhZG93SGVybzogY2MuTm9kZTtcclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBzaGFkb3dNb25zdGVyOiBjYy5Ob2RlO1xyXG4gIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgc3RhcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICBAcHJvcGVydHkoW2NjLkF1ZGlvQ2xpcF0pXHJcbiAgc291bmRzOiBjYy5BdWRpb0NsaXBbXSA9IFtdO1xyXG5cclxuICBjdXJyZW50SGVybyA9IG51bGw7XHJcbiAgY3VycmVudE1vbnN0ZXIgPSBudWxsO1xyXG4gIGhwID0gbnVsbDtcclxuICB3YWl0ID0gdHJ1ZTtcclxuICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxyXG4gIGNvbnRyYWN0QUJJOiBjYy5Kc29uQXNzZXQgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxyXG4gIHdpbkxhYmVsOiBjYy5MYWJlbFtdID0gW107XHJcbiAgQHByb3BlcnR5KFtjYy5MYWJlbF0pXHJcbiAgbG9zZUxhYmVsOiBjYy5MYWJlbFtdID0gW107XHJcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gIGZhaWxlZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgdG9rZW4gPSAwO1xyXG4gIGV4cCA9IDE7XHJcbiAgdHggPSBcIlwiO1xyXG4gIGNvdW50VHggPSAwO1xyXG4gIHBsYXlTb3VuZChzb3VuZElkOiBudW1iZXIsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgZGVsYXk6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNvdW5kc1tzb3VuZElkXSwgbG9vcCk7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG4gIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2hhZG93SGVyby55ID0gLTM5MDtcclxuICAgIHRoaXMuc2hhZG93TW9uc3Rlci55ID0gLTM5MDtcclxuICB9XHJcbiAgdXBkYXRlU2tpbihza2VsZXRvbikge1xyXG4gICAgaWYgKHdpbmRvdy5oZXJvU2tpbiA8PSAyKSB7XHJcbiAgICAgIHNrZWxldG9uLnNldFNraW4oXCJza2luMVwiKTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93Lmhlcm9Ta2luIDw9IDQpIHtcclxuICAgICAgc2tlbGV0b24uc2V0U2tpbihcInNraW4yXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2tlbGV0b24uc2V0U2tpbihcInNraW4zXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzdGFydCgpOiB2b2lkIHtcclxuICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5zZWFyY2hQYXJhbXM7XHJcblxyXG4gICAgd2luZG93Lmhlcm8gPSBwYXJhbXMuZ2V0KFwiaFwiKTtcclxuICAgIHdpbmRvdy5tb25zdGVyID0gcGFyYW1zLmdldChcIm1cIikgLSAxO1xyXG4gICAgd2luZG93Lmhlcm9JZCA9IHBhcmFtcy5nZXQoXCJoZXJvaWRcIik7XHJcblxyXG4gICAgd2luZG93Lmhlcm9Ta2luID0gcGFyYW1zLmdldChcInNcIik7XHJcbiAgICB3aW5kb3cubGV2ZWwgPSBwYXJhbXMuZ2V0KFwibFwiKTtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRIZXJvID0gdGhpcy5oZXJvZXNbd2luZG93Lmhlcm9dO1xyXG5cclxuICAgIHRoaXMuY3VycmVudE1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJzW3dpbmRvdy5tb25zdGVyXTtcclxuICAgIHRoaXMudXBkYXRlU2tpbih0aGlzLmN1cnJlbnRIZXJvKTtcclxuICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuYmF0dGxlLCAxKTtcclxuICAgIHQodGhpcy5ub2RlKVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgLyogICovXHJcbiAgICAgICAgdGhpcy5jdXJyZW50SGVyby5zZXRBbmltYXRpb24oMCwgXCJydW5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdCh0aGlzLmN1cnJlbnRIZXJvLm5vZGUpXHJcbiAgICAgICAgICAudG8oMiwgeyB4OiAtNDAwIH0pXHJcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhlcm8uc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCB0cnVlKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRNb25zdGVyLnNldEFuaW1hdGlvbigwLCBcInJ1blwiLCB0cnVlKTtcclxuICAgICAgICB0KHRoaXMuY3VycmVudE1vbnN0ZXIubm9kZSlcclxuICAgICAgICAgIC50bygyLCB7IHg6IDQwMCB9KVxyXG4gICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb25zdGVyLnNldEFuaW1hdGlvbigwLCBcImlkbGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5kZWxheSgyKVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ocEhlcm8ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaHBNb25zdGVyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSlcclxuICAgICAgLmRlbGF5KDEpXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB0aGlzLmJhdHRsZVN0YXJ0QW5pbS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5iYXR0bGVTdGFydEFuaW0uc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuYmF0dGxlU3RhcnRBbmltLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5kZWxheSgzKVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SGVyby5zZXRTdGFydExpc3RlbmVyKCh0cmFjaykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRyYWNrLmFuaW1hdGlvbi5uYW1lID09IFwiYXRrXCIpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5oZXJvICE9IDApXHJcbiAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGluayh0aGlzLmN1cnJlbnRNb25zdGVyLm5vZGUpO1xyXG4gICAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rKHRoaXMuY3VycmVudE1vbnN0ZXIubm9kZSk7XHJcbiAgICAgICAgICAgICAgfSwgMC4zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL1dhcnJpb3JcclxuICAgICAgICBpZiAod2luZG93Lmhlcm8gPT0gMSkge1xyXG4gICAgICAgICAgLy8gZml4XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIZXJvLnNldEFuaW1hdGlvbigwLCBcInJ1blwiLCB0cnVlKTtcclxuICAgICAgICAgIHQodGhpcy5jdXJyZW50SGVyby5ub2RlKVxyXG4gICAgICAgICAgICAuYnkoMC41LCB7IHg6IDQ1MCB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5oZXJvQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhlcm9BdHRhY2ssIDEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SYW5nZXJcclxuICAgICAgICBlbHNlIGlmICh3aW5kb3cuaGVybyA9PSAwKSB7XHJcbiAgICAgICAgICAvLyBmaXhcclxuICAgICAgICAgIHRoaXMuaGVyb0F0dGFjaygpO1xyXG4gICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhlcm9BdHRhY2ssIDAuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQXNzYXNzaW5cclxuICAgICAgICBlbHNlIGlmICh3aW5kb3cuaGVybyA9PSAyKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIZXJvLnNldEFuaW1hdGlvbigwLCBcInJ1blwiLCB0cnVlKTtcclxuICAgICAgICAgIHQodGhpcy5jdXJyZW50SGVyby5ub2RlKVxyXG4gICAgICAgICAgICAuYnkoMC41LCB7IHg6IDQ1MCB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5oZXJvQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhlcm9BdHRhY2ssIDEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TW9uc3Rlci5zZXRTdGFydExpc3RlbmVyKCh0cmFjaykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRyYWNrLmFuaW1hdGlvbi5uYW1lID09IFwiYXRrXCIpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5tb25zdGVyID09IDMpIHtcclxuICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rKHRoaXMuY3VycmVudEhlcm8ubm9kZSk7XHJcbiAgICAgICAgICAgICAgfSwgMC42KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cubW9uc3RlciA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oZXJvID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5ibGluayh0aGlzLmN1cnJlbnRIZXJvLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC44KTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmJsaW5rKHRoaXMuY3VycmVudEhlcm8ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAwLjYpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rKHRoaXMuY3VycmVudEhlcm8ubm9kZSk7XHJcbiAgICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod2luZG93Lm1vbnN0ZXIgPT0gMSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYnVsbGV0TW9uc3Rlci5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oZXJvID09IDEgfHwgd2luZG93Lmhlcm8gPT0gMilcclxuICAgICAgICAgICAgICAgIC8vIGZpeFxyXG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRNb25zdGVyLnBsYXkoXCJtb25zdGVyX2J1bGxldF8xXCIpO1xyXG4gICAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5oZXJvID09IDApXHJcbiAgICAgICAgICAgICAgICAvLyBmaXhcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0TW9uc3Rlci5wbGF5KFwibW9uc3Rlcl9idWxsZXRfMlwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cubW9uc3RlciA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRNb25zdGVyMy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldE1vbnN0ZXIzLnBsYXkoXCJtb25zdGVyX2J1bGxldF8zXCIpO1xyXG4gICAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93Lm1vbnN0ZXIgPT0gMykge1xyXG4gICAgICAgICAgICAgIHRoaXMuYnVsbGV0TW9uc3RlcjQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuYnVsbGV0TW9uc3RlcjQucGxheShcIm1vbnN0ZXJfYnVsbGV0XzRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5idWxsZXRNb25zdGVyMi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oZXJvID09IDEgfHwgd2luZG93Lmhlcm8gPT0gMilcclxuICAgICAgICAgICAgICAgIC8vIGZpeFxyXG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRNb25zdGVyMi5wbGF5KFwibW9uc3Rlcl9idWxsZXRfMVwiKTtcclxuICAgICAgICAgICAgICBlbHNlIGlmICh3aW5kb3cuaGVybyA9PSAwKVxyXG4gICAgICAgICAgICAgICAgLy8gZml4XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldE1vbnN0ZXIyLnBsYXkoXCJtb25zdGVyX2J1bGxldF8yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5tb25zdGVyID09IDEpIHtcclxuICAgICAgICAgIGlmICh3aW5kb3cuaGVybyA9PSAwKVxyXG4gICAgICAgICAgICAvLyBmaXhcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm1vbnN0ZXJBdHRhY2ssIDAuMyk7XHJcbiAgICAgICAgICBlbHNlIHRoaXMuc2NoZWR1bGUodGhpcy5tb25zdGVyQXR0YWNrLCAwLjUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93Lm1vbnN0ZXIgPT0gMikge1xyXG4gICAgICAgICAgdGhpcy5tb25zdGVyQXR0YWNrKCk7XHJcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMubW9uc3RlckF0dGFjaywgMS41KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5tb25zdGVyID09IDMpIHtcclxuICAgICAgICAgIGlmICh3aW5kb3cuaGVybyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnN0ZXIuc2V0QW5pbWF0aW9uKDAsIFwicnVuXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0KHRoaXMuY3VycmVudE1vbnN0ZXIubm9kZSlcclxuICAgICAgICAgICAgICAuYnkoMC41LCB7IHBvc2l0aW9uOiBjYy52MigtNTAwLCAwKSB9KVxyXG4gICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlckF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm1vbnN0ZXJBdHRhY2ssIDEuMik7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJBdHRhY2soKTtcclxuICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMubW9uc3RlckF0dGFjaywgMS4yKTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm1vbnN0ZXJBdHRhY2ssIDEuMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudEhlcm8uc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2spID0+IHtcclxuICAgICAgICAgIGlmICh0cmFjay5hbmltYXRpb24ubmFtZSA9PSBcImF0a1wiKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaGVybyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tb25zdGVyICE9IDMpIHRoaXMuYnVsbGV0UmFuZ2VyLnBsYXkoXCJyYW5nZXJfYnVsbGV0XCIpO1xyXG4gICAgICAgICAgICAgIGVsc2UgdGhpcy5idWxsZXRSYW5nZXIucGxheShcInJhbmdlcl9idWxsZXQyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaHBNb25zdGVyLnByb2dyZXNzIC09IHRoaXMuZGFtZUhlcm87XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhwTW9uc3Rlci5wcm9ncmVzcyA8IDAuMSAmJiB0aGlzLndhaXQpIHtcclxuICAgICAgICAgICAgICAvLyAxIC8gMTAgPSAwLjFcclxuICAgICAgICAgICAgICB0aGlzLmhwTW9uc3Rlci5wcm9ncmVzcyA9IDAuMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaHBNb25zdGVyLnByb2dyZXNzIDw9IDAuMDEpIHtcclxuICAgICAgICAgICAgICB0aGlzLnBsYXlTb3VuZChTT1VORC5XSU4sIGZhbHNlLCAwKTtcclxuICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5oZXJvQXR0YWNrKTtcclxuICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5tb25zdGVyQXR0YWNrKTtcclxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIZXJvLnNldEFuaW1hdGlvbigwLCBcIndpblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50TW9uc3Rlci5zZXRBbmltYXRpb24oMCwgXCJkaWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnN0ZXIuc2V0QW5pbWF0aW9uKDAsIFwiRGllXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5oZXJvU2tpbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJzW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhlcm8gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBmaXhcclxuICAgICAgICAgICAgICAgICAgdGhpcy53aW4uZ2V0Q2hpbGRCeU5hbWUoXCJXYXJyaW9yXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMud2luLmdldENoaWxkQnlOYW1lKFwiUmFuZ2VyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLndpbi5nZXRDaGlsZEJ5TmFtZShcIkFzc2Fzc2luXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICBsZXQgc3AgPSB0aGlzLndpblxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZShcIldhcnJpb3JcIilcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwic3AuU2tlbGV0b25cIik7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2tpbihzcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5oZXJvID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgLy8gZml4XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMud2luLmdldENoaWxkQnlOYW1lKFwiV2FycmlvclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy53aW4uZ2V0Q2hpbGRCeU5hbWUoXCJSYW5nZXJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy53aW4uZ2V0Q2hpbGRCeU5hbWUoXCJBc3Nhc3NpblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgbGV0IHNwID0gdGhpcy53aW5cclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoXCJSYW5nZXJcIilcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwic3AuU2tlbGV0b25cIik7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2tpbihzcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5oZXJvID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy53aW4uZ2V0Q2hpbGRCeU5hbWUoXCJXYXJyaW9yXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLndpbi5nZXRDaGlsZEJ5TmFtZShcIlJhbmdlclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy53aW4uZ2V0Q2hpbGRCeU5hbWUoXCJBc3Nhc3NpblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBsZXQgc3AgPSB0aGlzLndpblxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZShcIkFzc2Fzc2luXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChcInNwLlNrZWxldG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNraW4oc3ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudE1vbnN0ZXIuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2spID0+IHtcclxuICAgICAgICAgIGlmICh0cmFjay5hbmltYXRpb24ubmFtZSA9PSBcImF0a1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHBIZXJvLnByb2dyZXNzID0gdGhpcy5ocEhlcm8ucHJvZ3Jlc3MgLSB0aGlzLmRhbWVNb25zdGVyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy53YWl0ICYmIHRoaXMuaHBIZXJvLnByb2dyZXNzIDw9IDAuMSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuaHBIZXJvLnByb2dyZXNzID0gMC4xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ocEhlcm8ucHJvZ3Jlc3MgPD0gMC4wMSkge1xyXG4gICAgICAgICAgICAgIHRoaXMucGxheVNvdW5kKFNPVU5ELkxPU0UsIGZhbHNlLCAwKTtcclxuICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5tb25zdGVyQXR0YWNrKTtcclxuICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5oZXJvQXR0YWNrKTtcclxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIZXJvLnNldEFuaW1hdGlvbigwLCBcImxvc2VcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnN0ZXIuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb3NlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgc2hvd0ZhaWxlZChtc2cpIHtcclxuICAgIHRoaXMuZmFpbGVkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLmZhaWxlZExhYmVsLnN0cmluZyA9IG1zZztcclxuICB9XHJcblxyXG4gIGFzeW5jIGJhdHRsZSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGluc3RhbmNlLnBvc3QoXCIvaGVyby9iYXR0bGVcIiwge1xyXG4gICAgICAgIGhlcm9faWQ6IHBhcnNlSW50KHdpbmRvdy5oZXJvSWQpLFxyXG4gICAgICAgIG1vbnN0ZXJfaWQ6IHdpbmRvdy5tb25zdGVyICsgMSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgaWYgKHJlcy5kYXRhKSB7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IDEwMDtcclxuICAgICAgICB0aGlzLmV4cCA9IDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy53aW5HYW1lKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IDA7XHJcbiAgICAgICAgdGhpcy5leHAgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmxvc2VHYW1lKCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG4gIH1cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNoYWRvd0hlcm8ueCA9IHRoaXMuY3VycmVudEhlcm8ubm9kZS54O1xyXG4gICAgdGhpcy5zaGFkb3dNb25zdGVyLnggPSB0aGlzLmN1cnJlbnRNb25zdGVyLm5vZGUueDtcclxuICB9XHJcblxyXG4gIGhlcm9BdHRhY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLmN1cnJlbnRIZXJvLnNldEFuaW1hdGlvbigwLCBcImF0a1wiLCBmYWxzZSk7XHJcbiAgICBpZiAod2luZG93Lmhlcm8gPT0gMCkge1xyXG4gICAgICB0aGlzLnBsYXlTb3VuZChTT1VORC5IMSwgZmFsc2UsIDApO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cuaGVybyA9PSAxKSB7XHJcbiAgICAgIHRoaXMucGxheVNvdW5kKFNPVU5ELkgyLCBmYWxzZSwgMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlTb3VuZChTT1VORC5IMywgZmFsc2UsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW9uc3RlckF0dGFjaygpOiB2b2lkIHtcclxuICAgIC8vIGNjLmxvZyhcIm1vbnN0ZXIgYXR0YWNrXCIpO1xyXG4gICAgdGhpcy5jdXJyZW50TW9uc3Rlci5zZXRBbmltYXRpb24oMCwgXCJhdGtcIiwgZmFsc2UpO1xyXG4gICAgaWYgKHdpbmRvdy5tb25zdGVyID09IDApIHtcclxuICAgICAgdGhpcy5wbGF5U291bmQoU09VTkQuRTEsIGZhbHNlLCAwKTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93Lm1vbnN0ZXIgPT0gMSkge1xyXG4gICAgICB0aGlzLnBsYXlTb3VuZChTT1VORC5FMiwgZmFsc2UsIDApO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cubW9uc3RlciA9PSAyKSB7XHJcbiAgICAgIHRoaXMucGxheVNvdW5kKFNPVU5ELkUzLCBmYWxzZSwgMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlTb3VuZChTT1VORC5FNCwgZmFsc2UsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuICBibGluayhub2RlKTogdm9pZCB7XHJcbiAgICBub2RlLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgdChub2RlKVxyXG4gICAgICAuZGVsYXkoMC4xKVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgbm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHdpbkdhbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLndhaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGFtZUhlcm8gPSAwLjU7XHJcbiAgICB0aGlzLmRhbWVNb25zdGVyID0gMDtcclxuICAgIHRoaXMud2luTGFiZWxbMF0uc3RyaW5nID0gYCske3RoaXMuZXhwfWA7XHJcbiAgICB0aGlzLndpbkxhYmVsWzFdLnN0cmluZyA9IGArJHt0aGlzLnRva2VufWA7XHJcbiAgICB0aGlzLndpbkxhYmVsWzJdLnN0cmluZyA9IGBMZXZlbCAke3dpbmRvdy5sZXZlbH1gO1xyXG4gIH1cclxuXHJcbiAgbG9zZUdhbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLndhaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGFtZU1vbnN0ZXIgPSAwLjU7XHJcbiAgICB0aGlzLmRhbWVIZXJvID0gMDtcclxuICAgIHRoaXMubG9zZUxhYmVsWzBdLnN0cmluZyA9IGArJHt0aGlzLmV4cH1gO1xyXG4gICAgdGhpcy5sb3NlTGFiZWxbMV0uc3RyaW5nID0gYCske3RoaXMudG9rZW59YDtcclxuICAgIHRoaXMubG9zZUxhYmVsWzJdLnN0cmluZyA9IGBMZXZlbCAke3dpbmRvdy5sZXZlbH1gO1xyXG4gIH1cclxufVxyXG4iXX0=