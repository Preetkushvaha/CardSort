const { ccclass } = _decorator;
import { Component, _decorator } from "cc";
// import { GameSFX } from "../../global/Constants";
import { SOUNDLIST } from '../Constants/GameConstants';
@ccclass
export default class PopUpBase extends Component {
  data: any = {};
  node: any;

  onShow(data) {
    this.data = data;
    window.SoundManager.playSound(SOUNDLIST.POPUPOPEN, false);
  }

  onHide() {
    // this.hideCurrentPopUp()
    window.SoundManager.playSound(SOUNDLIST.POPUPCLOSE, false);
  }

  onButtonClick() {
    window.SoundManager.playSound(SOUNDLIST.BUTTONCLICK, false);
  }
}
