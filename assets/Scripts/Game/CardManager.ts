

import { _decorator, Component, Node, Label, Color, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardManager')
export  class CardManager extends Component {

    @property({ type: SpriteFrame, visible: true })
    public suits: SpriteFrame[] = [];

    @property({ type: [Color], visible: true })
    public suitColors: Color[] = [];

    @property({ type: Color, visible: true })
    public playerColors: Color[] = [];

    onLoad() {
       // window.cardManager = this;
    }
}
