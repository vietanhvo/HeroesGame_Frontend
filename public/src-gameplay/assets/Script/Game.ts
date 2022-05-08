const Web3 = require('web3.min');

// window.hero = 1;
// window.monster = 1;
const GAS_PRICE_DEFAULT = '5000000000';
const GAS_PRICE_DEFAULT_TESTNET = '10000000000';
const BATTLE_CONTRACT = '0x9266D78e544035eF85ecfa15320fc827D9750088'
const BATTLE_CONTRACT_TESTNET = '0x2F18bB2436F975176f26c0bE60aDD30BFC3c8E48'//'0x1c6b1CAB672D56db2f967363f86263b049f3cA28' // testnet
window.hero = 1;
window.monster = 0;
window.heroSkin = 3;
window.heroId = 2;
window.level = 1;

const {ccclass, property} = cc._decorator;
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
    H3
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
    contractABI: cc.JsonAsset = null
    @property([cc.Label])
    winLabel: cc.Label[] = []
    @property([cc.Label])
    loseLabel: cc.Label[] = []
    @property(cc.Label)
    failedLabel: cc.Label = null
    token = 0
    exp = 1
    tx = ""
    countTx = 0
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
    onLoad(): void {
        this.shadowHero.y = -390;
        this.shadowMonster.y = -390;
    }
    updateSkin(skeleton){
        if (window.heroSkin <= 2 ){
            skeleton.setSkin("skin1")
        } else if (window.heroSkin <= 4 ){
            skeleton.setSkin("skin2")
        } else {
            skeleton.setSkin("skin3")
        }
    }
    start(): void {
        if(!testnet){
            let params = (new URL(window.location.href)).searchParams;
        
            window.hero = params.get("h")
            window.monster = params.get("m") - 1
            window.heroId = params.get("heroid")
            
            window.heroSkin = params.get("s")
            window.level = params.get("l")
        }

        this.currentHero = this.heroes[window.hero];

        this.currentMonster = this.monsters[window.monster];
        this.updateSkin(this.currentHero)
        if (testnet){
            this.initWeb3Testnet()
        }else{
            this.initWeb3();
        }
        // if (window.monster == 3 && window.hero == 0)
        // {
        //     this.bulletRanger.node.position = cc.v3(-223, -215);
        // }
        // else
        // {
        //     this.bulletRanger.node.position = cc.v3(-223, -215);
        // }
        t(this.node).call(() => {
                /*  */
                this.currentHero.setAnimation(0, "run", true);
                t(this.currentHero.node).to(2, {x: -400})
                    .call(() => {
                        this.currentHero.setAnimation(0, "idle", true);
                    })
                    .start();
                this.currentMonster.setAnimation(0, "run", true);
                t(this.currentMonster.node).to(2, {x: 400})
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
                this.battleStartAnim.node.active = true
                this.battleStartAnim.setAnimation(0,"animation", true)
                this.scheduleOnce(()=>{
                    this.battleStartAnim.node.active = false
                },1)

            })
            .delay(3)
            .call(() => {
                this.currentHero.setStartListener(track => {
                    if (track.animation.name == "atk")
                    {
                        if (window.hero != 0)
                            this.scheduleOnce(() => {
                                this.blink(this.currentMonster.node);
                            }, 0.5);
                        else
                            this.scheduleOnce(() => {
                                this.blink(this.currentMonster.node);
                            }, 0.3);
                    }
                })
                //Warrior
                if (window.hero == 1) // fix
                {
                    this.currentHero.setAnimation(0, "run", true);
                    t(this.currentHero.node).by(0.5, {x: 450})
                        .call(() => {
                            this.heroAttack();
                            this.schedule(this.heroAttack, 1);
                        }).start();
                }
                //Ranger
                else if (window.hero == 0) // fix
                {
                    this.heroAttack();
                    this.schedule(this.heroAttack, 0.5);
                    
                }
                //Assassin
                else if (window.hero == 2)
                {
                    this.currentHero.setAnimation(0, "run", true);
                    t(this.currentHero.node).by(0.5, {x: 450})
                        .call(() => {
                            this.heroAttack();
                            this.schedule(this.heroAttack, 1);
                        }).start();
                }
                this.currentMonster.setStartListener(track => {
                    if (track.animation.name == "atk")
                    {
                        if(window.monster == 3)
                        {
                            this.scheduleOnce(() => {
                                this.blink(this.currentHero.node);
                            }, 0.6);
                        }
                        else if (window.monster == 2)
                        {
                            if (window.hero == 0)
                            {
                                this.scheduleOnce(() => {
                                    this.blink(this.currentHero.node);
                                }, 0.8);
                            }
                            else
                            {
                                this.scheduleOnce(() => {
                                    this.blink(this.currentHero.node);
                                }, 0.6);
                            }
                        }
                        else
                        {
                            this.scheduleOnce(() => {
                                this.blink(this.currentHero.node);
                            }, 0.2);
                        }
                        if (window.monster == 1)
                        {
                            this.bulletMonster.node.active = true;
                            if (window.hero == 1 || window.hero == 2) // fix
                                this.bulletMonster.play("monster_bullet_1");
                            else if (window.hero == 0) // fix
                                this.bulletMonster.play("monster_bullet_2");
                        }
                        else if (window.monster == 2)
                        {
                            this.scheduleOnce(() => {
                                this.bulletMonster3.node.active = true;
                                this.bulletMonster3.play("monster_bullet_3");
                            }, 0.5);
                        }
                        else if (window.monster == 3)
                        {
                            this.bulletMonster4.node.active = true;
                            this.bulletMonster4.play("monster_bullet_4");
                        }
                        else
                        {
                            this.bulletMonster2.node.active = true;
                            if (window.hero == 1 || window.hero == 2) // fix
                                this.bulletMonster2.play("monster_bullet_1");
                            else if (window.hero == 0) // fix
                                this.bulletMonster2.play("monster_bullet_2");
                        }
                    }
                })
                if (window.monster == 1)
                {
                    if (window.hero == 0) // fix
                        this.schedule(this.monsterAttack, 0.3);
                    else
                        this.schedule(this.monsterAttack, 0.5);
                }
                else if (window.monster == 2)
                {
                    this.monsterAttack();
                    this.schedule(this.monsterAttack, 1.5);
                }
                else if (window.monster == 3)
                {
                    if (window.hero == 0)
                    {
                        this.currentMonster.setAnimation(0, "run", true);
                        t(this.currentMonster.node).by(0.5, {position: cc.v2(-500, 0)})
                            .call(() => {
                                this.monsterAttack();
                                this.schedule(this.monsterAttack, 1.2);
                            }).start();
                    }
                    else
                    {
                        this.scheduleOnce(() => {
                            this.monsterAttack();
                            this.schedule(this.monsterAttack, 1.2);
                        }, 0.5);
                    }
                }
                else
                {
                    this.schedule(this.monsterAttack, 1.1);
                }
                this.currentHero.setCompleteListener(track => {
                    if (track.animation.name == "atk")
                    {
                        if (window.hero == 0)
                        {
                            if (window.monster != 3)
                                this.bulletRanger.play("ranger_bullet");
                            else
                                this.bulletRanger.play("ranger_bullet2");
                        }
                        this.hpMonster.progress -= this.dameHero;
                        if (this.hpMonster.progress < 0.1 && this.wait) // 1 / 10 = 0.1
                        {
                            this.hpMonster.progress = 0.1;
                        }

                        if (this.hpMonster.progress <= 0.01)
                        {
                            this.playSound(SOUND.WIN,false,0)
                            this.unschedule(this.heroAttack);
                            this.unschedule(this.monsterAttack);
                            this.currentHero.setAnimation(0, "win", false);
                            // this.currentMonster.setAnimation(0, "die", false);
                            this.currentMonster.setAnimation(0, "Die", false);
                            for (var i=0; i < window.heroSkin; i ++){
                                this.stars[i].active = true
                            }
                            this.scheduleOnce(() => {
                                this.win.active = true;
                                if (window.hero == 1) // fix
                                {
                                    this.win.getChildByName("Warrior").active = true;
                                    this.win.getChildByName("Ranger").active = false;
                                    this.win.getChildByName("Assassin").active = false;
                                    let sp = this.win.getChildByName("Warrior").getComponent("sp.Skeleton")
                                    this.updateSkin(sp)
                                }
                                else if (window.hero == 0) // fix
                                {
                                    this.win.getChildByName("Warrior").active = false;
                                    this.win.getChildByName("Ranger").active = true;
                                    this.win.getChildByName("Assassin").active = false;
                                    let sp = this.win.getChildByName("Ranger").getComponent("sp.Skeleton")
                                    this.updateSkin(sp)
                                }
                                else if (window.hero == 2)
                                {
                                    this.win.getChildByName("Warrior").active = false;
                                    this.win.getChildByName("Ranger").active = false;
                                    this.win.getChildByName("Assassin").active = true;
                                    let sp = this.win.getChildByName("Assassin").getComponent("sp.Skeleton")
                                    this.updateSkin(sp)
                                }
                            }, 1)
                            return;
                        }
                    }
                });
                this.currentMonster.setCompleteListener(track => {
                    if (track.animation.name == "atk")
                    {
                        this.hpHero.progress = this.hpHero.progress - this.dameMonster
                        if (this.wait && this.hpHero.progress <= 0.1) {
                            this.hpHero.progress = 0.1;
                        } 

                        if (this.hpHero.progress <= 0.01)
                        {
                            this.playSound(SOUND.LOSE, false, 0)
                            this.unschedule(this.monsterAttack);
                            this.unschedule(this.heroAttack);
                            this.currentHero.setAnimation(0, "lose", false);
                            this.currentMonster.setAnimation(0, "idle", false);
                            this.scheduleOnce(() => {
                                this.lose.active = true;
                            }, 1)
                            return;
                        }
                    }
                });
            })
            .start();
            
    }
    initWeb3() {
        const isWeb3Enabled = () => !!window.parent.web3 
        if (isWeb3Enabled()) {
            this.web3 = new Web3();
            //Request account access for modern dapp browsers
            if (window.parent.ethereum) {
                console.log("window.ethereum")
                this.web3Provider = window.parent.ethereum;
                this.web3.setProvider(this.web3Provider);
                    window.parent.ethereum.request({ method: 'eth_requestAccounts' })
                    .then( result => {
                        console.log(result)
                        if (result.length > 0) {
                            this.address = result[0].toLowerCase();
                            console.log("Address: ", this.address)
                            this.initContract()
                        }
                    })
                    .catch(error=>{
                        console.error(error.message)
                        this.failed.active = true
                        this.failedLabel.string = error.message
                    });
            }
          //Request account access for legacy dapp browsers
            else if (window.parent.web3) {
                console.log("window.web3")
                this.web3Provider = window.parent.web3.currentProvider;
                this.web3.setProvider(this.web3Provider);
        
                this.initAccount();
            }
        } else {
            console.error('You must enable and login into your Wallet or MetaMask accounts!');
        }
    }
    initWeb3Testnet() {
        const isWeb3Enabled = () => !!window.web3 
        if (isWeb3Enabled()) {

          this.web3 = new Web3();
    
          //Request account access for modern dapp browsers
          if (window.ethereum) {
              console.log("window.ethereum")
            this.web3Provider = window.ethereum;
            this.web3Provider.on = null
            this.web3.eth.handleRevert = true
            this.web3.setProvider(this.web3Provider);
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then( result => {
                    if (result.length > 0) {
                        this.address = result[0].toLowerCase();
                        console.log("Address: ", this.address)
                        this.initContract()
                }})
                .catch(error => {
                    console.log(error.message)
                });
          }
          //Request account access for legacy dapp browsers
          else if (window.web3) {
            console.log("window.web3")
            this.web3Provider = window.web3.currentProvider;
            this.web3Provider.on = null
            this.web3.setProvider(this.web3Provider);
    
            this.initAccount();
          }
        } else {
          console.error('You must enable and login into your Wallet or MetaMask accounts!');
        }
    }
    initAccount(){
        this.web3.eth.getAccounts().then(accounts => {
            if (accounts.length > 0) {
                this.address = accounts[0].toLowerCase();
                console.log("Address: ", this.address)
                this.initContract()
            } 
            else console.error('You must enable and login into your Wallet or MetaMask accounts!');
        }).catch(err => {
            this.showFailed(err.message)
        });
    }
    showFailed(msg){
        this.failed.active = true
        this.failedLabel.string = msg
    }
    initContract(){
        this.web3.eth.net.getNetworkType().then(netId => {
            this.web3.eth.Contract.handleRevert = true
            this.contract = new this.web3.eth.Contract(
                this.contractABI.json,
                testnet ? BATTLE_CONTRACT_TESTNET : BATTLE_CONTRACT
            );
            if (window.heroId >=0  && window.monster >= 0){
                this.contract.methods.battle(window.heroId, window.monster + 1 ).send({
                    from: this.address,
                    gas: 250000,
                    gasPrice: testnet ? GAS_PRICE_DEFAULT_TESTNET : GAS_PRICE_DEFAULT
                  }, (err, hash)=>{
                      if (err){
                        this.showFailed(err.message)
                      } else {
                        this.tx = hash
                        this.scheduleOnce(this.waitForReceipt, 1)
                      }
                  })
            }else{
                this.showFailed("Hero data is not loaded successfully")
            }
          }).catch(err=>{
                this.showFailed(err.message)
          })
    }
    async getRevertReason(txHash){

        const tx = await this.web3.eth.getTransaction(txHash)
        var result = await this.web3.eth.call(tx, tx.blockNumber)
        console.log("reS: " +result)
        result = result.startsWith('0x') ? result : `0x${result}`
        if (result && result.substr(138)) {
            const reason = this.web3.utils.toAscii(result.substr(138))
            console.log('Revert reason:', reason)
            return reason
        } else {      
            console.log('Cannot get reason - No return value')
            return "Cannot get reason - No return value"
        }
      
    }
    waitForReceipt() {
        this.web3.eth.getTransactionReceipt(this.tx, (err, txr) => {
            if (err){
                this.showFailed(err.message)
            } else {
                if (txr==null){
                    this.countTx ++
                    if (this.countTx < 100){
                        this.scheduleOnce(this.waitForReceipt,1)
                    }
                } else {
                    console.log(txr)
                    if (!txr.status){
                        console.log("false")
                        this.getRevertReason(this.tx).then(a=>{
                            console.log("a:"+a)
                            this.showFailed("")
                        }).catch(err=>{
                            this.showFailed("Failed"])
                            console.log("err:")

                        })
                    } else {
                        const eventJsonInterface = _.find(
                        this.contract._jsonInterface,
                            o => o.name === 'BattleResult' && o.type === 'event',
                        )
                          
                        const log = _.find(
                            txr.logs,
                            l => l.topics.includes(eventJsonInterface.signature)
                        )
                          
                        var l = this.web3.eth.abi.decodeLog(eventJsonInterface.inputs, log.data, log.topics.slice(1))
                        this.token = l.tokenReward
                        this.exp = l.expReward
    
                        if (!!l.result) {
                            this.winGame()
                        } else {
                            this.loseGame()
                        }
                        
                    }
                        
                }
            }         

        })
    }
    update(): void {
        this.shadowHero.x = this.currentHero.node.x;
        this.shadowMonster.x = this.currentMonster.node.x;
    }

    heroAttack(): void {
        this.currentHero.setAnimation(0, "atk", false);
        if (window.hero == 0){
            this.playSound(SOUND.H1, false, 0)
        } else if (window.hero == 1) {
            this.playSound(SOUND.H2, false, 0)
        } else {
            this.playSound(SOUND.H3, false, 0)
        }
    }

    monsterAttack(): void {
        // cc.log("monster attack");
        this.currentMonster.setAnimation(0, "atk", false);
        if (window.monster == 0){
            this.playSound(SOUND.E1, false, 0)
        } else if (window.monster == 1) {
            this.playSound(SOUND.E2, false, 0)
        } else if (window.monster == 2) {
            this.playSound(SOUND.E3, false, 0)
        } else {
            this.playSound(SOUND.E4, false, 0)
        }
    }
    blink(node): void {
        node.color = cc.Color.RED;
        t(node).delay(0.1).call(() => {
            node.color = cc.Color.WHITE;
        }).start();
    }

    winGame(): void {
        this.wait = false;
        this.dameHero = 0.5;
        this.dameMonster = 0;
        this.winLabel[0].string = `+${this.exp}`
        this.winLabel[1].string = `+${this.token}`
        this.winLabel[2].string = `Level ${window.level}`
    }

    loseGame(): void {
        this.wait = false;
        this.dameMonster = 0.5;
        this.dameHero = 0;
        this.loseLabel[0].string = `+${this.exp}`
        this.loseLabel[1].string = `+${this.token}`
        this.loseLabel[2].string = `Level ${window.level}`
    }
}
