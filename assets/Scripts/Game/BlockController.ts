import { _decorator, Component, Node, Vec3, Layout } from "cc";
import { GameConst } from "../Constant/GameConstant";
import { Card } from "./Card";
const { ccclass, property } = _decorator;

@ccclass("BlockController")
export class BlockController extends Component {
  public MaxChildCount = 4;
  public currentCardInBlock: number = 0;
  public  touchCount=0
  public sameColorArray=[];


  onLoad() {
    this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
  }

  touchEnd(event) {

    this.touchCount++;
    // if(this.touchCount==1){
        let location = event.touch.getLocation();
        this.node.parent.getComponent;
        console.log("touch end Block : ", location);
        if(this.node.children.length>0){
            let lastChild=this.node.children[this.node.children.length-1];
                this.sameColorArray.push(lastChild);
                //   lastChild.getComponent(Card).cardSelect(true);
        for (let index = this.node.children.length-1; index > 0; index--) {
            //const element = ;
            if( this.node.children[index].getComponent(Card).cardColor== this.node.children[index-1].getComponent(Card).cardColor){
                console.log("two element is same  :");
                this.sameColorArray.push(this.node.children[index-1]);
        }else{
            break;
        }
    }
    if(this.sameColorArray.length>=1){
        let data = {
          data: this.sameColorArray,
          isCard: true,
        };
        window.EventEmitter.emit('Card_Select',data ,this);
        this.sameColorArray=[];
       // this.touchCount=0;
    }
        //     window.EventEmitter.emit('Card_Select', lastChild,this);
     
        }
       
        else{
        let data = {
          data: this.node,
          isCard: false,
        };
            window.EventEmitter.emit('Card_Select',data,this);
        }
  }

  initCard(card: Node, data) {
    if (this.node.children.length <= this.MaxChildCount) {
      this.node.addChild(card);
      card.name=this.currentCardInBlock.toString();
      card.getComponent(Card).setProperties(data);
      this.currentCardInBlock++;
    }
  }

AddCard(card){
    console.log("Add Card");
    if (this.node.children.length <= this.MaxChildCount) {
        this.node.addChild(card);
        console.log("position : ");
        this.node.getComponent(Layout).enabled=false;
        this.node.getComponent(Layout).enabled=true;
           this.currentCardInBlock++;
    }
}
//************ */
  checkIsCardAddable(Color) {
    console.log("0000000000",this.node.children[this.node.children.length - 1].getComponent(Card).cardColor);
    console.log("Color: ",Color);
    if(this.node.children.length < this.MaxChildCount){

        if (this.node.children.length == 0||this.node.children[this.node.children.length - 1].getComponent(Card).cardColor == Color
        ) {
          return true;
        } 
    }
      return false;
    
  }
//************* */
  checkForBlockComplete(){
    let Color = [];
    if(this.node.children.length != this.MaxChildCount){
return
    }
    for (let index = 0; index < this.node.children.length; index++) {
       Color.push( this.node.children[index].getComponent(Card).cardColor)
        
    }
    
     if(this.areSame(Color)){
      //  this.foldAllCard();
        return true;
     }
    Color = [];
    return false;
  }
   areSame(arr)
  {
      // Put all array elements in a HashSet
      let s = new Set(arr);
      // If all elements are same, size of
      // HashSet should be 1. As HashSet contains only distinct values.
      return (s.size == 1);
  }
   
 
  async foldAllCard() {

      this.node.getComponent(Layout).enabled=false;
    for (let index = 0; index < this.node.children.length; index++) {
        this.node.children[index].setPosition(new Vec3(0,0,0))
        if(index==this.node.children.length-1){
            this.node.children[index].getComponent(Card).CardBack.active = true; 
        console.log("last index",   this.node.children[index].position);

        }
    }
    this.onDestroy();
  }


  onDestroy(){
    this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);

  }

  //*********update */
  update() {
    if (this.node.children.length < this.MaxChildCount) {
    }
  }
}
