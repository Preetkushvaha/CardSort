import { _decorator, Component, Node, Prefab, UITransform, Size, instantiate, Sprite, Color, Label } from 'cc';
import { RESULTGRID, FTUCLUE } from '../../Constants/GameConstants';
import { LEVELS } from '../../Constants/WordLists';
import { Letter } from '../../Extras/Letter';
import { ResultGridLetter } from '../../Extras/ResultGridLetter';
import PopUpBase from '../PopUpBase';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends PopUpBase {
    @property(Prefab)
    gridPrefab: Prefab
    @property(Node)
    gridParent: Node
    @property(Node)
    clueBoard: Node
    @property(Label)
    clueLabel: Label
    puzzleData: any;
    resultGridArray: Node[] = [];
    resultGridDataArray = [];
    resultHeight = 0;
    resultWidth = 0;
    gridSize: number
    onShow(data) {
        console.log("data in result screen : ", data);
        this.gridParent.removeAllChildren();
        this.resultGridArray = []
        this.resultGridDataArray = []
        this.puzzleData = data;
        if (data.ftue) {
            this.setClue(`Clue : ${FTUCLUE}`);
        }
        else {
            let letter = `Clue : ${LEVELS[data.level - 1]}`;
            this.setClue(letter);
        }
        this.calculateChild(data.item.node.children, data.height, data.width)
        setTimeout(() => {
            // console.log("inside time out ")
            window.PopUpManager.hideCurrentPopUp();
            window.PopUpManager.show(window.PopUpType.GameOver, data)
        }, 2000)
    }


    calculateChild(childs, height, width) {

        let addHeight = 4;
        let addWidth = 4;
        let hx = Math.floor(RESULTGRID.HEIGHT / (height + addHeight));
        let hy = Math.floor(RESULTGRID.WIDTH / (width + addWidth));
        let gridSize = hx < hy ? hx : hy;
        this.gridSize = gridSize
        // console.log("totalGrids 1: ", gridSize, hx, hy)
        this.resultWidth = RESULTGRID.WIDTH - (RESULTGRID.WIDTH % gridSize);
        // this.resultWidth = this.resultWidth + 2 * gridSize
        this.resultHeight = RESULTGRID.HEIGHT - (RESULTGRID.HEIGHT % gridSize);

        this.gridParent.getComponent(UITransform).contentSize = new Size(this.resultWidth, this.resultHeight)
        // this.gPparentNode.getComponent(UITransform).contentSize = new Size(this.resultWidth, this.resultHeight)
        let totalGrids = ((this.resultWidth) * this.resultHeight) / (gridSize * gridSize);

        this.generateGrids(totalGrids, gridSize);

        let gridIndex = (Math.floor((this.resultHeight / gridSize) / 2) - 1) * (this.resultWidth / gridSize) + (Math.floor((this.resultWidth / gridSize) / 2) + 1);
        let child = [...childs];

        let negativeAxis = this.claculateNegativeChild(child);
        let letterArray = Array.from(Array(width), () => new Array())

        // console.log("negativeAxis : ", negativeAxis, gridIndex, totalGrids)


        for (let childData of child) {
            let ch: Letter = childData.getComponent(Letter);
            letterArray[ch.i + negativeAxis.x][ch.j + negativeAxis.y] = { letter: ch.letter, i: ch.i + negativeAxis.x, j: ch.j + negativeAxis.y }

        }

        this.reCalculate(letterArray, height, width)
        // console.log("letterArray : ", letterArray)
        this.generateLetter(letterArray, gridIndex, gridSize)
    }

    generateGrids(totalGrids, gridSize) {
        for (let i = 0; i < totalGrids; i++) {
            const gridItem = instantiate(this.gridPrefab);
            gridItem.getComponent(UITransform).contentSize = new Size(gridSize, gridSize);
            this.gridParent.addChild(gridItem);
            this.resultGridArray.push(gridItem);
            let data = gridItem.getComponent(ResultGridLetter).letter
            this.resultGridDataArray.push(data);
        }
    }

    setClue(letter) {
        let length = letter.length;
        let board = this.clueBoard.getComponent(UITransform);
        let lb = this.clueLabel.getComponent(UITransform)
        lb.width = 20 * length;
        board.width = 20 * length
        this.clueLabel.string = letter
    }

    claculateNegativeChild(child) {
        let arrX = [];
        let arrY = [];
        let countX = 0;
        let countY = 0;
        for (let childData of child) {
            let ch: Letter = childData.getComponent(Letter);
            // console.log("childData", ch.letter, ch.i, ch.j)
            if (ch.i < 0 && arrX.indexOf(ch.i) < 0) {
                arrX.push(ch.i);
                countX++;
            }
            if (ch.j < 0 && arrY.indexOf(ch.j) < 0) {
                arrY.push(ch.j);
                countY++;
            }
        }
        return ({ x: countX, y: countY });
    }

    reCalculate(letterArray, heigth, width) {
        for (let letter of letterArray) {
            for (let data of letter) {
                // console.log("data :", data)
                if (data) {
                    data.i = data.i - Math.ceil(width / 2)
                    data.j = data.j - Math.ceil(heigth / 2)
                }
            }
        }

        if (!this.reCheck(letterArray)) {
            for (let letter of letterArray) {
                for (let data of letter) {
                    // console.log("data :", data)
                    if (data) {
                        data.i = data.i - 1
                        data.j = data.j - 1
                    }
                }
            }
        }
    }

    reCheck(letterArray) {
        for (let letter of letterArray) {
            for (let data of letter) {
                // console.log("data :", data)
                if (data) {
                    if (data.i == 0 && data.j == 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    async generateLetter(letterArray, gridIndex, gridSize) {
        for (let letter of letterArray) {
            for (let data of letter) {
                if (data) {
                    let letterGridCoOrdinate = this.calculateOtherLetterGridIndex(gridIndex, data.i, data.j, gridSize)
                    // console.log("letterGridCoOrdinate : ", letterGridCoOrdinate, data.letter, data.i, data.j)
                    let letterGridIndex = letterGridCoOrdinate.i + (letterGridCoOrdinate.j * this.resultWidth / gridSize)
                    // console.log("letterGridIndex", letterGridIndex);
                    let resultLetterGrid = this.resultGridArray[letterGridIndex].getComponent(ResultGridLetter)
                    resultLetterGrid.setLetter(`${data.letter}`, letterGridIndex)
                    let letterData = resultLetterGrid.getComponent(ResultGridLetter).letter
                    this.resultGridDataArray[letterGridIndex] = letterData;
                }
            }
        }
        let x = await this.makeHorizontalGridArray(gridSize)
        let y = await this.makeVerticalGridArray(gridSize)
        // console.log("this.resultGridDataArray : ", x, y)
        if (y.upCount - y.lowCount > 1 || y.upCount - y.lowCount < -1) {
            await this.resetResultVr(Math.floor((y.upCount - y.lowCount) / 2));
        }
        if (x.upCount - x.lowCount > 1 || x.upCount - x.lowCount < -1) {
            await this.resetResultHr(Math.floor((x.upCount - x.lowCount) / 2), (this.resultWidth / gridSize));
        }
        // console.log("out side time out ")
        // setTimeout(() => {
        //     console.log("inside time out ")
        //     window.PopUpManager.hideCurrentPopUp()
        //     window.PopUpManager.show(window.PopUpType.GameOver, this.puzzleData)
        // }, 1000)
        // await this.saveDataToCloud();
    }

    resetResultVr(count): Promise<void> {
        return new Promise<any>(async (resolve, reject) => {
            let arr = []
            // console.log("resetResulthr(count)  : ", count)
            for (let i = 0; i < this.resultGridDataArray.length; i++) {
                if (this.resultGridDataArray[i]) {
                    let resultLetterGrid: ResultGridLetter = this.resultGridArray[i].getComponent(ResultGridLetter)
                    // console.log("letter data : ", resultLetterGrid.letter, resultLetterGrid.letterIdx)
                    arr.push({ letter: resultLetterGrid.letter, letterIdx: resultLetterGrid.letterIdx - count })
                    resultLetterGrid.resetLetter();
                }
            }
            await this.setResult(arr)
        })
    }
    resetResultHr(count, width): Promise<void> {
        return new Promise<any>(async (resolve, reject) => {
            let arr = []
            // console.log("resetResultVr(count, width)  : ", count, width)
            for (let i = 0; i < this.resultGridDataArray.length; i++) {
                if (this.resultGridDataArray[i]) {
                    let resultLetterGrid: ResultGridLetter = this.resultGridArray[i].getComponent(ResultGridLetter)
                    // console.log("letter data 2 : ", resultLetterGrid.letter, resultLetterGrid.letterIdx)
                    arr.push({ letter: resultLetterGrid.letter, letterIdx: resultLetterGrid.letterIdx - (count * width) })
                    resultLetterGrid.resetLetter();
                }
            }
            await this.setResult(arr)
        })

    }

    makeHorizontalGridArray(gridSize): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            let arr = [];
            for (let i = 0; i < (this.resultHeight / gridSize); i++) {
                let arr2 = []
                for (let j = 0; j < (this.resultWidth / gridSize); j++) {
                    this.pushDataInArray(arr2, (i * (this.resultWidth / gridSize)) + j)
                }
                arr.push(arr2);
            }
            // let splittedWordArray = this.splitWord(arr);
            // console.log("arr : ", arr)
            return resolve(await this.countLetter(arr));
        })
    }

    countLetter(arr): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let flag = false;
            let counterData = { upCount: 0, lowCount: 0 }
            for (let i = 0; i < arr.length; i++) {
                flag = false;
                let data = arr[i];
                for (let j = 0; j < data.length; j++) {
                    let letter = data[j];
                    if (letter) {
                        flag = true;
                        counterData.upCount = i;
                        break;
                    }
                }
                if (flag) {
                    break;
                }

            }
            for (let i = arr.length - 1; i >= 0; i--) {
                flag = false;
                let data = arr[i];
                for (let j = 0; j < data.length; j++) {
                    let letter = data[j];
                    if (letter) {
                        flag = true;
                        counterData.lowCount = (arr.length - i - 1);
                        break;
                    }
                }
                if (flag) {
                    break;
                }

            }
            return resolve(counterData);
        })
    }


    makeVerticalGridArray(gridSize): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let arr = [];
            for (let i = 0; i < (this.resultWidth / gridSize); i++) {
                let arr2 = []
                for (let j = 0; j < this.resultHeight / gridSize; j++) {
                    this.pushDataInArray(arr2, i + j * (this.resultWidth / gridSize))
                }
                arr.push(arr2);
            }
            // console.log("arr 2 : ", arr)
            return resolve(this.countLetter(arr));
        })

    }

    pushDataInArray(arr2, index) {
        let gridData = this.resultGridDataArray[index]
        if (!gridData) {
            arr2.push(null);
        }
        else {
            arr2.push(gridData)
        }
    }

    calculateOtherLetterGridIndex(gridIndex, i, j, gridSize) {
        let x = gridIndex % (this.resultWidth / gridSize);
        let y = Math.floor(gridIndex / (this.resultWidth / gridSize));
        // console.log("x,y : ", x, y);
        return ({ i: x + i, j: y - j })
    }

    setResult(arr): Promise<void> {
        return new Promise<any>(async (resolve, reject) => {
            this.resultGridDataArray = [];
            this.resultGridDataArray.fill(null);
            console.log("result array : ", arr)
            for (let data of arr) {
                let resultLetterGrid: ResultGridLetter = this.resultGridArray[data.letterIdx].getComponent(ResultGridLetter)
                this.resultGridDataArray[data.letterIdx] = data.letter;
                resultLetterGrid.setLetter(`${data.letter}`, data.letterIdx)
            }
            // await this.saveDataToCloud();
        })
    }
}

