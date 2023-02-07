import { Component, _decorator, Animation, AnimationClip } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class AnimBase extends Component {
  @property(Animation)
  private anim: Animation;

  callback: any = null;
  reverse: boolean = false;

  play(msg: any, cb: any, onShow: boolean): void {
    this.callback = cb;
    if (onShow) {
      this.anim.play(msg);
      this.reverse = false;
      this.anim.getState(msg).wrapMode = AnimationClip.WrapMode.Normal;
    } else {
      this.anim.stop();
      this.anim.play(msg);
      this.reverse = true;
      this.anim.getState(msg).wrapMode = AnimationClip.WrapMode.Reverse;
    }
  }

  onAnimEnd(): void {
    if (!this.reverse) {
      this.callback();
    }
  }

  onAnimStart(): void {
    if (this.reverse) {
      this.callback();
    }
  }
}
