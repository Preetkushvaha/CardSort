import { _decorator, Component, Node } from 'cc'
import PopUpBase from '../PopUpBase';
const { ccclass, property } = _decorator

@ccclass('LoadingPopUp')
export class LoadingPopUp extends PopUpBase {
  onShow() {
    console.log('Loading......................')
  }

  onHide() {
    console.log("hide>>>>>>>>>>>>");

  }

  update(deltaTime: number) { }
}
