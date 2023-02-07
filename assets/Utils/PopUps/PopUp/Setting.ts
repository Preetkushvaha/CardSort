import { _decorator, Component, Node } from 'cc';
import PopUpBase from '../PopUpBase';
import SoundManager from '../../Extras/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Setting')
export class Setting extends PopUpBase {
    @property(Node)
    musicOnNode: Node[] = []
    @property(Node)
    soundOnNode: Node[] = []
    isMusic: boolean = true;
    isSound: boolean = true;
    // onShow(data) {

    // }
    onBackButtonClick() {
        window.PopUpManager.hideCurrentPopUp()
    }
    onClickMusic() {
        if (this.isMusic) {
            this.musicOnNode[1].active = true;
            this.musicOnNode[0].active = false;
            this.isMusic = false;
            window.SoundManager.stopBackgroundMusic();
        }
        else {
            this.musicOnNode[0].active = true;
            this.musicOnNode[1].active = false;
            this.isMusic = true
            window.SoundManager.startBackgroundMusic();
        }
    }
    onClickSound() {
        if (this.isSound) {
            this.soundOnNode[1].active = true;
            this.soundOnNode[0].active = false;
            this.isSound = false
            window.SoundManager.muteSound(true, true)
        }
        else {
            this.soundOnNode[0].active = true;
            this.soundOnNode[1].active = false;
            this.isSound = true
            window.SoundManager.muteSound(false, true)
        }
    }

    onClickPriivacy() {
        // window.PopUpManager.hideCurrentPopUp()
        // let data = { canPlayAnim: false }
        window.PopUpManager.show(window.PopUpType.Policy, {}, {})
    }
}

