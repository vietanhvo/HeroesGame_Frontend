"use strict";
cc._RF.push(module, 'fbb10wZ1CVPPZK1dMjkVhVw', 'ActiveParticle');
// Script/ActiveParticle.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ActiveParticle = /** @class */ (function (_super) {
    __extends(ActiveParticle, _super);
    function ActiveParticle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActiveParticle.prototype.onEnable = function () {
        if (this.node.parent.name == "bullet1" || this.node.parent.name == "bullet11")
            this.node.getComponent(sp.Skeleton).setAnimation(0, "atk_demo", false);
        else if (this.node.parent.name == "bullet2")
            this.node.getComponent(sp.Skeleton).setAnimation(0, "atk1", false);
        else {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "atk", false);
        }
    };
    ActiveParticle = __decorate([
        ccclass
    ], ActiveParticle);
    return ActiveParticle;
}(cc.Component));
exports.default = ActiveParticle;

cc._RF.pop();