// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ProgressBar)
    exp: cc.ProgressBar

    onEnable(): void {
        this.schedule(this.addExp, 0.01);
    }

    addExp(): void {
        this.exp.progress += 0.01;
        if (this.exp.progress >= 1)
            this.unschedule(this.addExp);
    }
}
