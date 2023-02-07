import { Component, Enum, macro, SystemEvent, systemEvent, _decorator } from "cc";
import AnimBase from "../Extras/AnimBase";
// import SoundManager from "../SoundManager";
import PopUpBase from "./PopUpBase";
enum PopUpType {
  None = 100,

  // Loading = 99,
  // Result = 2,
  Multiplier = 0,
  Loading = 1,
  GameOver = 2,
  Result = 3,
  Setting = 4,
  LeaderBoard = 5,
  NoAds = 6,
  Policy = 7,

}

declare global {
  interface Window {
    PopUpManager: PopUpManager;
    PopUpType: typeof PopUpType;
  } // Making PopUpManger global
}
window.PopUpType = PopUpType;

const { ccclass, property } = _decorator;

@ccclass
export default class PopUpManager extends Component {
  @property(PopUpBase)
  public popUps: PopUpBase[] = [];

  @property({ type: Enum(PopUpType) })
  public currentPopUp = PopUpType.None;

  @property({ type: Enum(PopUpType) })
  public currentOverLayedPopUps = [];

  onLoad() {
    window.PopUpManager = this;
    // this.registerCloseBtn();
    //   this.currentOverLayedPopUps.push(PopUpType.None);
  }

  // registerCloseBtn() {
  //   var inst = this;

  //   systemEvent.on(SystemEvent.EventType.KEY_DOWN,
  //     (event, e) => {
  //       if (
  //         event.keyCode == macro.KEY.back ||
  //         event.keyCode == macro.KEY.escape
  //       ) {
  //         if (inst.currentOverLayedPopUps.length > 0) {
  //           e.stopPropagation();
  //         }
  //         inst.hideCurrentPopUp();
  //       }
  //     },
  //     this
  //   );
  // }

  /**
   * Show Pop up
   */
  show(popUp, data = null, callback = null) {
    var isOpen = this.currentOverLayedPopUps.indexOf(popUp) === -1 ? false : true;
    console.log(isOpen, "popup", popUp);

    if (popUp !== PopUpType.None && !isOpen) {
      this.currentOverLayedPopUps.push(popUp);
      this.currentPopUp = popUp;
      this.popUps[popUp].node.active = true;
      var anim = this.popUps[popUp].getComponent(AnimBase);
      var inst = this;
      if (anim !== null) {
        if (data && data.canPlayAnim == false) {
          // inst.popUps[popUp].node.setPosition(-407, 0, 0);
          console.log("in the if part")
          // anim.play("showPopUp", function () {
          //   if (popUp !== PopUpType.Loading) inst.popUps[popUp].onShow(data);
          //   if (callback !== null) callback();
          // }, data.canPlayAnim);
        } else {
          console.log("in the else part")
          anim.play(
            "popUpAnim",
            function () {
              inst.popUps[popUp].onShow(data);
              // if (callback !== null) callback();
            },
            true
          );
        }
      } else {
        this.popUps[popUp].onShow(data);
        // if (callback !== null) callback();
      }
    }
  }

  /**
   * Hide PopUp
   */
  hide(popUp, data = null, callBack = null) {
    var isOpen = this.currentOverLayedPopUps.indexOf(popUp) == -1 ? false : true;
    if (popUp !== PopUpType.None && isOpen) {
      this.currentOverLayedPopUps.splice(this.currentOverLayedPopUps.indexOf(popUp), 1);
      this.currentPopUp = this.currentOverLayedPopUps[this.currentOverLayedPopUps.length - 1];
      var anim = this.popUps[popUp].getComponent(AnimBase);
      var inst = this;
      if (anim !== null) {
        if (data && data.canPlayAnim == false) {
          // inst.popUps[popUp].node.children[2].setPosition(540, 0, 0);
          // anim.play("hidePopUp", function () {
          //   inst.popUps[popUp].node.active = false;
          //   if (popUp !== PopUpType.Loading) inst.popUps[popUp].onHide();
          //   if (callBack !== null) callBack();
          // }, data.canPlayAnim);
        } else {
          anim.play(
            "popUpAnim",
            function () {
              // if (popUp !== PopUpType.Loading) inst.popUps[popUp].onHide();
              if (callBack !== null) callBack();
              inst.popUps[popUp].node.active = false;
              console.log("Pop Is Active " + inst.popUps[popUp].node.active);
            },
            false
          );
        }
      } else {
        // if (popUp !== PopUpType.Loading) this.popUps[popUp].onHide();
        if (callBack !== null) callBack();
        this.popUps[popUp].node.active = false;
      }
      //   this.popUps[popUp].node.active = false;
    } else {
      if (callBack !== null) callBack();
    }
  }

  /**
   * Hide current PopUp
   */
  hideCurrentPopUp(callBack = null) {
    // if (this.currentPopUp == 5) {
    //     this.hide(this.currentPopUp, function() {
    //         this.show(4, null, function() {});
    //     }.bind(this));
    // } else {
    this.hide(this.currentPopUp, callBack);
    // }
  }

  /**
   * Hide all Popups
   */
  hideAllPopUps() {
    while (this.currentOverLayedPopUps.length !== 0) {
      this.hide(this.currentPopUp, function () { });
    }
  }
}
