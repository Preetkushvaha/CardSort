import { Color } from "cc";



const Card_Count=12;
const Card_Color_Type=3;
const Card_Per_Color_Type=4;
const Card_Position_Diff=80;
const ColorValue={
    "Red":  Color.RED,
    "Purple": new Color(90, 34, 139, 255),
    "Brown": new Color(139,69,19,255),
    "Black":Color.BLACK,

}
const Game_Event={
    Card_Select:"Card_Select",
    Block_Click:"Block_Click",
    One_Card_Selected:"One_Card_Selected"

}
const Position_Array=[
    0,-75,-150,-225
]



 function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
 
export const GameConst={
Card_Color_Type,
Card_Count,
Card_Per_Color_Type,
Card_Position_Diff,
ColorValue,
Game_Event,
Position_Array,
randomNumberGenerator
}