import {
  _decorator,
  Component,
  Node,
  Label,
  Color,
  Sprite,
  Vec3,
  tween,
  bezier,
} from "cc";
import { GameConst } from "../Constant/GameConstant";
const { ccclass, property } = _decorator;

@ccclass("Card")
export class Card extends Component {
  //Label array fo
  @property({ type: Label })
  CardValues: Label[] = [];

  @property({ type: Node })
  CardBack: Node = null;

  @property({ type: Node })
  GlowNode: Node = null;

  public targetNode: Node;

  public cardColor: string = null;
  public parentIndex = 0;
  public isSelected: boolean = false;

  onLoad() {
   // this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
  }

  public setProperties(data): void {
    this.GlowNode.active = false;
    this.CardBack.active = false;
    this.node.getComponent(Sprite).color = GameConst.ColorValue[data.color];
    this.parentIndex = data.parentIndex;
    this.CardBack.children[0].getComponent(Sprite).color =
      GameConst.ColorValue[data.color]; //
    this.cardColor = data.color;
    for (const iterator of this.CardValues) {
      iterator.string = data.value;
    }
  }
  touchEnd(event) {
    let location = event.touch.getLocation();
  //  this.node.parent.name;
  //  console.log("touch end  card : ", location);
  //  window.EventEmitter.emit('Card_Select', this.node,this);
  //window.EventEmitter.emit(GameConst.Game_Event.Block_Click, this.node.parent.name,this);

    // this.cardSelect();
  }
  onDestroy() {
    this.node.off(Node.EventType.TOUCH_CANCEL);
  }

  cardSelect(isSelected) {
    console.log("Card : ",);
    this.isSelected = isSelected;
    let position = this.node.position;
    if (this.isSelected) {
      this.node.setPosition(position.x, position.y - 20);
      this.node.setScale(1.2, 1.2, 1.2);
      this.GlowNode.active = true;
    } else {
      this.node.setPosition(position.x, position.y + 20);
      this.node.setScale(1, 1, 1);
      this.GlowNode.active = false;
    }
  }
  

  moveCard(targetPosition) :Promise<any>{
console.log("movindfdsfs");

    //this.targetNode = targetNode;c
    // let targetPosition = new Vec3(400, 300, 0);

    //  let move= bezier(this.node.position,this.node.position,)
    return new Promise((resolve: any, reject: any) => {
      console.log("target position :", targetPosition);
    //  this.node.removeFromParent();
      tween(this.node)
    .to(.5, { position: new Vec3(targetPosition) }, { easing: "sineIn" })
    .start();
    console.log("target position Enddd:", targetPosition);
    this.scheduleOnce(()=>{
      return  resolve (true);
    },.5)
  })
    
  }

  update(dt) {}
}
