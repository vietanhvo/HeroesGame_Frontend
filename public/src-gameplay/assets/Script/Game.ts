const axios = require("axios");

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000",
});

window.hero = 1;
window.monster = 0;
window.heroSkin = 3;
window.heroId = 2;
window.level = 1;

const { ccclass, property } = cc._decorator;
const t = cc.tween;
const testnet = false;
enum SOUND {
  WIN,
  LOSE,
  E1,
  E2,
  E3,
  E4,
  H1,
  H2,
  H3,
}

@ccclass
export default class Game extends cc.Component {
  @property(cc.ProgressBar)
  hpHero: cc.ProgressBar = null;
  @property(cc.Animation)
  animHpHero: cc.Animation = null;
  @property(cc.ProgressBar)
  hpMonster: cc.ProgressBar = null;
  @property(cc.Animation)
  animHpMonster: cc.Animation = null;
  @property([sp.Skeleton])
  heroes: sp.Skeleton[] = [];
  @property([sp.Skeleton])
  monsters: sp.Skeleton[] = [];
  @property(sp.Skeleton)
  battleStartAnim: sp.Skeleton;
  @property(cc.Label)
  notification: cc.Label;
  @property
  percentWaitResponse = 10;
  @property
  dameMonster = 0.01;
  @property
  dameHero = 0.01;
  @property(cc.Node)
  win: cc.Node;
  @property(cc.Node)
  lose: cc.Node;
  @property(cc.Node)
  failed: cc.Node;
  @property(cc.Animation)
  bulletMonster: cc.Animation;
  @property(cc.Animation)
  bulletMonster2: cc.Animation;
  @property(cc.Animation)
  bulletMonster3: cc.Animation;
  @property(cc.Animation)
  bulletMonster4: cc.Animation;
  @property(cc.Animation)
  bulletRanger: cc.Animation;
  @property(cc.Node)
  shadowHero: cc.Node;
  @property(cc.Node)
  shadowMonster: cc.Node;
  @property([cc.Node])
  stars: cc.Node[] = [];

  @property([cc.AudioClip])
  sounds: cc.AudioClip[] = [];

  currentHero = null;
  currentMonster = null;
  hp = null;
  wait = true;
  @property(cc.JsonAsset)
  contractABI: cc.JsonAsset = null;
  @property([cc.Label])
  winLabel: cc.Label[] = [];
  @property([cc.Label])
  loseLabel: cc.Label[] = [];
  @property(cc.Label)
  failedLabel: cc.Label = null;
  token = 0;
  exp = 1;
  tx = "";
  countTx = 0;
  playSound(soundId: number, loop: boolean = false, delay: number = 0) {
    this.scheduleOnce(() => {
      cc.audioEngine.playEffect(this.sounds[soundId], loop);
    }, delay);
  }
  onLoad(): void {
    this.shadowHero.y = -390;
    this.shadowMonster.y = -390;
  }
  updateSkin(skeleton) {
    if (window.heroSkin <= 2) {
      skeleton.setSkin("skin1");
    } else if (window.heroSkin <= 4) {
      skeleton.setSkin("skin2");
    } else {
      skeleton.setSkin("skin3");
    }
  }
  start(): void {
    let params = new URL(window.location.href).searchParams;

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
      .call(() => {
        /*  */
        this.currentHero.setAnimation(0, "run", true);
        t(this.currentHero.node)
          .to(2, { x: -400 })
          .call(() => {
            this.currentHero.setAnimation(0, "idle", true);
          })
          .start();
        this.currentMonster.setAnimation(0, "run", true);
        t(this.currentMonster.node)
          .to(2, { x: 400 })
          .call(() => {
            this.currentMonster.setAnimation(0, "idle", true);
          })
          .start();
      })
      .delay(2)
      .call(() => {
        this.hpHero.node.active = true;
        this.hpMonster.node.active = true;
      })
      .delay(1)
      .call(() => {
        this.battleStartAnim.node.active = true;
        this.battleStartAnim.setAnimation(0, "animation", true);
        this.scheduleOnce(() => {
          this.battleStartAnim.node.active = false;
        }, 1);
      })
      .delay(3)
      .call(() => {
        this.currentHero.setStartListener((track) => {
          if (track.animation.name == "atk") {
            if (window.hero != 0)
              this.scheduleOnce(() => {
                this.blink(this.currentMonster.node);
              }, 0.5);
            else
              this.scheduleOnce(() => {
                this.blink(this.currentMonster.node);
              }, 0.3);
          }
        });
        //Warrior
        if (window.hero == 1) {
          // fix
          this.currentHero.setAnimation(0, "run", true);
          t(this.currentHero.node)
            .by(0.5, { x: 450 })
            .call(() => {
              this.heroAttack();
              this.schedule(this.heroAttack, 1);
            })
            .start();
        }
        //Ranger
        else if (window.hero == 0) {
          // fix
          this.heroAttack();
          this.schedule(this.heroAttack, 0.5);
        }
        //Assassin
        else if (window.hero == 2) {
          this.currentHero.setAnimation(0, "run", true);
          t(this.currentHero.node)
            .by(0.5, { x: 450 })
            .call(() => {
              this.heroAttack();
              this.schedule(this.heroAttack, 1);
            })
            .start();
        }
        this.currentMonster.setStartListener((track) => {
          if (track.animation.name == "atk") {
            if (window.monster == 3) {
              this.scheduleOnce(() => {
                this.blink(this.currentHero.node);
              }, 0.6);
            } else if (window.monster == 2) {
              if (window.hero == 0) {
                this.scheduleOnce(() => {
                  this.blink(this.currentHero.node);
                }, 0.8);
              } else {
                this.scheduleOnce(() => {
                  this.blink(this.currentHero.node);
                }, 0.6);
              }
            } else {
              this.scheduleOnce(() => {
                this.blink(this.currentHero.node);
              }, 0.2);
            }
            if (window.monster == 1) {
              this.bulletMonster.node.active = true;
              if (window.hero == 1 || window.hero == 2)
                // fix
                this.bulletMonster.play("monster_bullet_1");
              else if (window.hero == 0)
                // fix
                this.bulletMonster.play("monster_bullet_2");
            } else if (window.monster == 2) {
              this.scheduleOnce(() => {
                this.bulletMonster3.node.active = true;
                this.bulletMonster3.play("monster_bullet_3");
              }, 0.5);
            } else if (window.monster == 3) {
              this.bulletMonster4.node.active = true;
              this.bulletMonster4.play("monster_bullet_4");
            } else {
              this.bulletMonster2.node.active = true;
              if (window.hero == 1 || window.hero == 2)
                // fix
                this.bulletMonster2.play("monster_bullet_1");
              else if (window.hero == 0)
                // fix
                this.bulletMonster2.play("monster_bullet_2");
            }
          }
        });
        if (window.monster == 1) {
          if (window.hero == 0)
            // fix
            this.schedule(this.monsterAttack, 0.3);
          else this.schedule(this.monsterAttack, 0.5);
        } else if (window.monster == 2) {
          this.monsterAttack();
          this.schedule(this.monsterAttack, 1.5);
        } else if (window.monster == 3) {
          if (window.hero == 0) {
            this.currentMonster.setAnimation(0, "run", true);
            t(this.currentMonster.node)
              .by(0.5, { position: cc.v2(-500, 0) })
              .call(() => {
                this.monsterAttack();
                this.schedule(this.monsterAttack, 1.2);
              })
              .start();
          } else {
            this.scheduleOnce(() => {
              this.monsterAttack();
              this.schedule(this.monsterAttack, 1.2);
            }, 0.5);
          }
        } else {
          this.schedule(this.monsterAttack, 1.1);
        }
        this.currentHero.setCompleteListener((track) => {
          if (track.animation.name == "atk") {
            if (window.hero == 0) {
              if (window.monster != 3) this.bulletRanger.play("ranger_bullet");
              else this.bulletRanger.play("ranger_bullet2");
            }
            this.hpMonster.progress -= this.dameHero;
            if (this.hpMonster.progress < 0.1 && this.wait) {
              // 1 / 10 = 0.1
              this.hpMonster.progress = 0.1;
            }

            if (this.hpMonster.progress <= 0.01) {
              this.playSound(SOUND.WIN, false, 0);
              this.unschedule(this.heroAttack);
              this.unschedule(this.monsterAttack);
              this.currentHero.setAnimation(0, "win", false);
              // this.currentMonster.setAnimation(0, "die", false);
              this.currentMonster.setAnimation(0, "Die", false);
              for (var i = 0; i < window.heroSkin; i++) {
                this.stars[i].active = true;
              }
              this.scheduleOnce(() => {
                this.win.active = true;
                if (window.hero == 1) {
                  // fix
                  this.win.getChildByName("Warrior").active = true;
                  this.win.getChildByName("Ranger").active = false;
                  this.win.getChildByName("Assassin").active = false;
                  let sp = this.win
                    .getChildByName("Warrior")
                    .getComponent("sp.Skeleton");
                  this.updateSkin(sp);
                } else if (window.hero == 0) {
                  // fix
                  this.win.getChildByName("Warrior").active = false;
                  this.win.getChildByName("Ranger").active = true;
                  this.win.getChildByName("Assassin").active = false;
                  let sp = this.win
                    .getChildByName("Ranger")
                    .getComponent("sp.Skeleton");
                  this.updateSkin(sp);
                } else if (window.hero == 2) {
                  this.win.getChildByName("Warrior").active = false;
                  this.win.getChildByName("Ranger").active = false;
                  this.win.getChildByName("Assassin").active = true;
                  let sp = this.win
                    .getChildByName("Assassin")
                    .getComponent("sp.Skeleton");
                  this.updateSkin(sp);
                }
              }, 1);
              return;
            }
          }
        });
        this.currentMonster.setCompleteListener((track) => {
          if (track.animation.name == "atk") {
            this.hpHero.progress = this.hpHero.progress - this.dameMonster;
            if (this.wait && this.hpHero.progress <= 0.1) {
              this.hpHero.progress = 0.1;
            }

            if (this.hpHero.progress <= 0.01) {
              this.playSound(SOUND.LOSE, false, 0);
              this.unschedule(this.monsterAttack);
              this.unschedule(this.heroAttack);
              this.currentHero.setAnimation(0, "lose", false);
              this.currentMonster.setAnimation(0, "idle", false);
              this.scheduleOnce(() => {
                this.lose.active = true;
              }, 1);
              return;
            }
          }
        });
      })
      .start();
  }

  showFailed(msg) {
    this.failed.active = true;
    this.failedLabel.string = msg;
  }

  async battle() {
    try {
      const res = await instance.post("/hero/battle", {
        hero_id: parseInt(window.heroId),
        monster_id: window.monster + 1,
      });
      console.log(res.data);
      if (res.data) {
        this.token = 100;
        this.exp = 100;

        this.winGame();
      } else {
        this.token = 0;
        this.exp = 0;

        this.loseGame();
      }
    } catch (err) {
      console.log(err);
    }
  }
  update(): void {
    this.shadowHero.x = this.currentHero.node.x;
    this.shadowMonster.x = this.currentMonster.node.x;
  }

  heroAttack(): void {
    this.currentHero.setAnimation(0, "atk", false);
    if (window.hero == 0) {
      this.playSound(SOUND.H1, false, 0);
    } else if (window.hero == 1) {
      this.playSound(SOUND.H2, false, 0);
    } else {
      this.playSound(SOUND.H3, false, 0);
    }
  }

  monsterAttack(): void {
    // cc.log("monster attack");
    this.currentMonster.setAnimation(0, "atk", false);
    if (window.monster == 0) {
      this.playSound(SOUND.E1, false, 0);
    } else if (window.monster == 1) {
      this.playSound(SOUND.E2, false, 0);
    } else if (window.monster == 2) {
      this.playSound(SOUND.E3, false, 0);
    } else {
      this.playSound(SOUND.E4, false, 0);
    }
  }
  blink(node): void {
    node.color = cc.Color.RED;
    t(node)
      .delay(0.1)
      .call(() => {
        node.color = cc.Color.WHITE;
      })
      .start();
  }

  winGame(): void {
    this.wait = false;
    this.dameHero = 0.5;
    this.dameMonster = 0;
    this.winLabel[0].string = `+${this.exp}`;
    this.winLabel[1].string = `+${this.token}`;
    this.winLabel[2].string = `Level ${window.level}`;
  }

  loseGame(): void {
    this.wait = false;
    this.dameMonster = 0.5;
    this.dameHero = 0;
    this.loseLabel[0].string = `+${this.exp}`;
    this.loseLabel[1].string = `+${this.token}`;
    this.loseLabel[2].string = `Level ${window.level}`;
  }
}
