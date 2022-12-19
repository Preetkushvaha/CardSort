import { _decorator, Component, Node, Prefab, instantiate, Vec3, director, Layout } from "cc";
import { EventEmitter } from "../Constant/EventEmitter";
import { GameConst } from "../Constant/GameConstant";
import { BlockController } from "./BlockController";
import { Card } from "./Card";
const { ccclass, property } = _decorator;
declare global {
  interface Window {
    EventEmitter: EventEmitter;
  }
}
@ccclass("GamePlay")
export class GamePlay extends Component {
  @property({ type: Node })
  BlockHolder: Node = null;
  @property({ type: Prefab }) //CardPrefab
  cardPrefab: Prefab = null;
  @property({ type: Node })
  GameOver: Node = null;

  private colorArray = [
    { color: "Red", value: 2 },
    { color: "Purple", value: 3 },
    { color: "Brown", value: 4 },
  ];
  private startIndex = 0;
  private CardArray = [];
  private firstTouch;
  private  secondTouch;
  private InputCount=0;
  private firstCard;
  private completeCount=0;
  private firstCardScript;
   selectedCardArray=[]
   selectedCardArrayScripRef=[]

  onLoad() {
    this.GameOver.active=false;
    window.EventEmitter = new EventEmitter();
  //  this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
  }

  touchEnd(event) {
    let position = event.touch.getLocation();
    console.log("touch position in GamePlay: ", position);
    console.log("touch position in GamePlay: ", event.touch);
    // event.touch.
  }

  async cardSelect(data) {
    this.InputCount++;
    console.log("input count : ",this.InputCount);
    console.log("input data : ",data);
    let targetPosition=0;
    if(this.InputCount==1&&data.data.length>=1){
      console.log("input count :000000000 ",data.data);
for (let index = 0; index < data.data.length; index++) {
  console.log("input count : ",this.InputCount);
  this.firstTouch= data.data[index].parent.getComponent(BlockController);
  console.log("input c00000000000");
  this.selectedCardArray.push(data.data[index]);
  this.selectedCardArrayScripRef.push(data.data[index].getComponent(Card));
  this.selectedCardArrayScripRef[index].cardSelect(true);
  console.log("input 11111111111111");
  
}

return
    }
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

    //// blank>>>>>
   if(!data.isCard &&this.InputCount==2){
      console.log("second touch empty block");
      this.secondTouch=data.data
      let block= data.data.getComponent(BlockController);
      for (let index = 0; index < this.selectedCardArray.length; index++) {
        // const element = array[index];
        console.log("fsjldfsjdfksjfdklfdfkjsfsld");
        
        this.selectedCardArrayScripRef[index].cardSelect(false);  
        block.AddCard(this.selectedCardArray[index]);
        await  this.selectedCardArrayScripRef[index].moveCard(0,-560) 
     }
      this.selectedCardArray=[]
      this.selectedCardArrayScripRef=[]
      this.InputCount=0;
      return
    }

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    if(this.InputCount==2&&data.isCard){

      let blockScript=data.data[0].parent.getComponent(BlockController);
      console.log("Blovkkkkkkkkkkk",blockScript);
      
for (let index = 0; index < this.selectedCardArray.length; index++) {
  

  this.secondTouch=data.data[index]
  // this.InputCount=0;
  let   isAddableInBlock=blockScript.checkIsCardAddable(this.selectedCardArrayScripRef[index].cardColor);
  console.log("isAddable : "+isAddableInBlock);
   if(isAddableInBlock){
     //blockScript.AddCard(this.selectedCardArray[index]);
     
     this.selectedCardArray[index].parent=  data.data[0].parent//(this.selectedCardArray[index]);
     data.data[0].parent.getComponent(Layout).enabled=false;
     console.log("data.data[0].parent.children.length-1*-75",data.data[0].parent.children.length-1*-75);
     
     await this.selectedCardArrayScripRef[index].moveCard(new Vec3( 0,data.data[0].parent.children.length-1*-75,0));
     data.data[0].parent.getComponent(Layout).enabled=true;

     this.selectedCardArrayScripRef[index].cardSelect(false);      
   }else{
    this.selectedCardArrayScripRef[index].cardSelect(false);      
   }
}
//check if block have same color
if(blockScript.checkForBlockComplete()){
  this.completeCount++;   
  blockScript.foldAllCard();
  //***********Game completed
  if(this.completeCount==GameConst.Card_Color_Type){
  console.log("GameWin");
  this.GameOver.active=true;
  }
  
 }
this.selectedCardArray=[]
this.selectedCardArrayScripRef=[]
this.InputCount=0;

    }
 
  }

//******************* */




  start() {
    console.log("start");
    this.InitGame();
    window.EventEmitter.on(
      GameConst.Game_Event.Card_Select,
      this.cardSelect,
      this
    );
  }

  InitGame() {
    this.filledDataToArray();
    this.initCards();
  }
  TestButton() {
    let randNum = GameConst.randomNumberGenerator(0, 4);
    console.log("randNum : ", randNum);
  }
  //********for Level */
  initBlock() {


  }

  //******generate cards
  initCards() {
    for (let i = 0; i < GameConst.Card_Color_Type; i++) {
      console.log("init loop : " + i);
      for (let index = 0; index < GameConst.Card_Per_Color_Type; index++) {
        let card = instantiate(this.cardPrefab);
        this.BlockHolder.children[i]
          .getComponent(BlockController)
          .initCard(card, this.CardArray[this.startIndex]);
        this.startIndex++;
      }
    }
  }

  //*********filled data in array */
  filledDataToArray() {
    for (let i = 0; i < GameConst.Card_Color_Type; i++) {
      for (let j = 0; j < GameConst.Card_Per_Color_Type; j++) {
        let data = {
          color: this.colorArray[i].color,
          value: this.colorArray[i].value,
        };
        this.CardArray.push(data);
      }
    }
    this.shuffleArrayObject(this.CardArray);
    console.log(" array : ", JSON.stringify(this.CardArray));
  }

  //******Selected Card
  selectedCard() {}

  MoveCard() {}

 


  ///*********Delay
  delay(sec) {
    return new Promise((resolve) => this.scheduleOnce(resolve, sec));
  }

  //****Reset Game (Reset all value and destroy card) */
  reset() {
    director.loadScene("CardSort");
    // this.BlockHolder.children.forEach((element) => {
    //   element.removeAllChildren();
    // });
  }

  TouchEnd(event) {
    let position = event.touch.getLocation();
    console.log("touch Position :" + position);
  }


 // 
  onDestroy() {
    this.node.off(Node.EventType.TOUCH_CANCEL);
  }

  shuffleArrayObject(arrayWithobject) {
    arrayWithobject.sort(() => Math.random() - 0.5);
    return arrayWithobject;
  }
  // shuffleArray(array) {
  //   let currentIndex = array.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (currentIndex != 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // }
}
