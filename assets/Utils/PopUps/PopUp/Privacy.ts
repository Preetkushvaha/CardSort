import { _decorator, Component, Node, PageView } from 'cc';
import PopUpBase from '../PopUpBase';
const { ccclass, property } = _decorator;

@ccclass('Privacy')
export class Privacy extends PopUpBase {
    @property(PageView)
    public target: PageView

    onShow() {
        setTimeout(() => {
            this.target.setCurrentPageIndex(0)
            this.target.scrollToPage(0)
        }, 40)
    }

    onLeftButtonClicked() {
        this.target.scrollToPage(this.target.getCurrentPageIndex() - 1, 1)
    }
    onRightButtonClicked() {
        this.target.scrollToPage(this.target.getCurrentPageIndex() + 1, 1)
    }

    onBackButtonClick() {
        window.PopUpManager.hideCurrentPopUp()
    }

}

