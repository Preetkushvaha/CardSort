import { _decorator, Component, Node, Label } from 'cc';
import PopUpBase from '../PopUpBase';
const { ccclass, property } = _decorator;

@ccclass('NoAds')
export class NoAds extends PopUpBase {
    onShow(data) {
        // if (data) {
        //     this.messagelbl.string = 'Come back tommorow'
        // }
        // else {
        //     this.messagelbl.string = 'This difficulty is completed'
        // }
    }
    onBackButtonClick() {
        window.PopUpManager.hide(window.PopUpType.NoAds, null, null);
    }
}

