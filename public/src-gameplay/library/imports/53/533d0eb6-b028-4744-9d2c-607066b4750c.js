"use strict";
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
    baseURL: "http://localhost:8000",
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
                        return [4 /*yield*/, instance.post("/battle/", {
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