// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActiveParticle extends cc.Component {

    onEnable(): void {
        if (this.node.parent.name == "bullet1" || this.node.parent.name == "bullet11")
            this.node.getComponent(sp.Skeleton).setAnimation(0, "atk_demo", false);
        else if (this.node.parent.name == "bullet2")
            this.node.getComponent(sp.Skeleton).setAnimation(0, "atk1", false);
        else
        {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "atk", false);
        }
    }
}
