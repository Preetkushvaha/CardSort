import { _decorator, Component, RenderTexture, SpriteFrame, Camera, Sprite } from "cc";
import { spriteImage } from "../Constants/GameConstants";
const { ccclass, property } = _decorator;



@ccclass("CaptureToWeb")
export class CaptureToWeb extends Component {
  @property(Sprite)
  sprite: Sprite = null;
  @property(Camera)
  camera: Camera = null;

  protected _renderTex: RenderTexture = null;

  onEnable() {
    console.log("Start Capture");
    const spriteframe = this.sprite.spriteFrame;
    const sp = new SpriteFrame();
    sp.reset({
      originalSize: spriteframe.getOriginalSize(),
      rect: spriteframe.getRect(),
      offset: spriteframe.getOffset(),
      isRotate: spriteframe.isRotated(),
      borderTop: spriteframe.insetTop,
      borderLeft: spriteframe.insetLeft,
      borderBottom: spriteframe.insetBottom,
      borderRight: spriteframe.insetRight,
    });
    const renderTex = (this._renderTex = new RenderTexture());
    renderTex.reset({
      width: 1024,
      height: 1024,
    });
    this.camera.targetTexture = renderTex;
    console.log("renderTex");
    sp.texture = renderTex;
    this.sprite.spriteFrame = sp;
  }

  async takeScreenShot() {
    let width = this.sprite.spriteFrame.width;
    let height = this.sprite.spriteFrame.height;
    let data = this.sprite.spriteFrame.texture.readPixels();
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#148885";
    ctx.fillRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    // console.log("canvas height width : ", height, width, canvas)
    let rowBytes = width * 4;
    for (let row = 0; row < height; row++) {
      let srow = height - 1 - row;
      let imageData = ctx.createImageData(width, 1);
      let start = srow * width * 4;
      for (let i = 0; i < rowBytes; i++) {
        imageData.data[i] = data[start + i];
      }
      ctx.putImageData(imageData, 0, row);
    }
    let dataUrl = canvas.toDataURL("image/png");
    spriteImage.image = dataUrl
    console.log("screen shot taken");
    // window.FBManager.loadBannerAd(ADS_LAUNCH_POINT);
  }
}
