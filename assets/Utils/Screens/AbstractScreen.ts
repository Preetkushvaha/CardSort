const { ccclass } = _decorator;
import { Component, _decorator } from "cc";
// import { GameSFX } from "../../global/Constants";
@ccclass
export default class AbstractScreen extends Component {
  data: any;

  onLoad() {}

  onShow(data) {
    this.data = data;
    console.log("Abs screen entry data", data);
  }

  onHide() {}

  onButtonClick() {
    // window.SoundManager.playSound(GameSFX.ButtonClick);
  }
}
