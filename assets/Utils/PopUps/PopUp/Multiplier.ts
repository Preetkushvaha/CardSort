import { _decorator, Component, Node, Vec3, Button } from 'cc';
import PopUpBase from '../PopUpBase';
import { GameScreen } from '../../Game/GameScreen';
// import { GridCamera } from '../../Extras/GridCamera';
import { ScoreManager } from '../../Game/ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('Multiplier')
export class Multiplier extends PopUpBase {
    @property(GameScreen)
    gameScreen: GameScreen
    @property(ScoreManager)
    scoreManager: ScoreManager
    // @property(GridCamera)
    // gridCamera: GridCamera
    @property(Node)
    body: Node;
    async onShow(data) {
        this.unscheduleAllCallbacks()
        // console.log("multiplier Difficulty : ", data);
        // this.gameScreen.HintButtonNode.getComponent(Button).interactable = false;
        await this.setBodyPosition(data)
        setTimeout(() => {
            this.hidePopUp();
        }, 2000)
    }
    onBackButtonClick() {
        this.hidePopUp();
    }
    hidePopUp() {
        window.PopUpManager.hide(window.PopUpType.Multiplier, null, null)
        console.log("multiplier Pop up hide");
        this.gameScreen.enableAndDisableButtons(true);
        this.gameScreen.HintButtonNode.getComponent(Button).interactable = true;
    }

    setBodyPosition(difficulty): Promise<void> {
        return new Promise((resolve, reject) => {
            let yDiff = (960 - (960 * this.gameScreen.heightDiffPrec) / 100)
            if (difficulty == "EASY") {
                // console.log("this.gridCamera.topDiff : ", this.gridCamera.topDiff)
                this.body.setPosition(new Vec3(-306, (330 - yDiff)))
            }
            else if (difficulty == "MEDIUM") {
                // console.log("this.gridCamera.topDiff : ", this.gridCamera.topDiff)
                this.body.setPosition(new Vec3(0, (330 - yDiff)))
            }
            else if (difficulty == "HARD") {
                // console.log("this.gridCamera.topDiff : ", this.gridCamera.topDiff)
                this.body.setPosition(new Vec3(306, (330 - yDiff)))
            }
            return resolve();
        })
    }

    async onVideoClick() {
        this.scoreManager.playingStatus(false)
        console.log("onClick Video")
        this.hidePopUp();
        let x = await window.FBManager.showRewarded10XVideo(async (data: { msg: string }) => {
            if (data.msg == "ELIGIBLE") {
                this.addMultiplier()
                console.log("MULTIPLIER ELIGIBLE");
            } else if (data.msg == "INELIGIBLE" || data.msg == "SKIP") {
                console.log(" INELIGIBLE ");
            }
            else if (data.msg == "NOADS") {
                window.PopUpManager.show(window.PopUpType.NoAds, {}, {})
            }
            this.scoreManager.playingStatus(true)
        });
        console.log("value of x : ", x)
    }

    addMultiplier() {
        console.log("multiplier to be add");
        this.scoreManager.setMultiplierReward()
    }
}

