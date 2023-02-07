import { assetManager, ImageAsset, SpriteFrame, Texture2D } from "cc";
import { EventEmitter } from "../Utils/EventEmitter";

export const GAMEOVER = 'GAMEOVER'
export const RESTART = 'RESTART'
export const MENU = 'HOME'
// export const HOME = 'HOME'

export const NUMBEROFWORDSCHOOSE = {
    EASY: 4,
    MEDIUM: 8,
    HARD: 12
}
export enum DIFFICULTY {
    EASY = 0,
    MEDIUM = 1,
    HARD = 2
}



export const PUZZLE = {
    WIDTH: 3240,
    HEIGHT: 3000,
    TILESIZE: 60
}

export enum SOUNDLIST {
    BUTTONCLICK = 0,
    POPUPOPEN = 1,
    POPUPCLOSE = 2,
}
export const GRIDSCREENSIZE = {
    EASY: {
        WIDTH: 1080,
        HEIGHT: 1920,
        SPACE: 4,
        MIDSPACE: 8
    },
    MEDIUM: {
        WIDTH: 1320,
        HEIGHT: 2400,
        SPACE: 4,
        MIDSPACE: 12
    },
    HARD: {
        WIDTH: 1680,
        HEIGHT: 3000,
        SPACE: 4,
        MIDSPACE: 18
    }

}

// export const GRIDINDEXCONSTANT = [
//     1323, 1377, 1378, 1324, 1270, 1269, 1268, 1322, 1376, 1430, 1431, 1432, 1433, 1379, 1325, 1271, 1217, 1216, 1215, 1214, 1213, 1276, 1321, 1375, 1429, 1483, 1484,
//     1485, 1486, 1487, 1488, 1434, 1380, 1326, 1272, 1218, 1164, 1163, 1162, 1161, 1160, 1159, 1158, 1212, 1266, 1320, 1374, 1428, 1482, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1489, 1435, 1381, 1327, 1273, 1219, 1165, 1111, 1110, 1109, 1108, 1107, 1106, 1105, 1104, 1103, 1157, 1211, 1265, 1319, 1373, 1427, 1481, 1535, 1589,
// ]



export const RESULTGRID = {
    WIDTH: 1080,
    HEIGHT: 540,
    TILESIZE: 60
}

export const FTUEVENT = {
    SHOW_MOVE_HAND: "SHOW_MOVE_HAND",
    HIDE_MOVE_HAND: "HIDE_MOVE_HAND",
    DISABLE_FTU: "DISABLE_FTU"
}

//["Mushroom","Margarine","Mayonnaise","Marmalade","Marzipan","Minestrone","Mussel","Mint","Marshmallow","Muffin","Miso","Meringue"]

export const adsRetriveAttempt = {
    reward: 3,
    interstitial: 3,
}

export const spriteImage: IpvpUser = {}

interface IpvpUser {
    image?: string
}

export const randomFunction = (seed, count) => {
    // let s = "12/2/2022"
    console.log("RNG seeded ", seed, count);
    return (new alea(`${seed}${count}`));
}

export const GAMEPLAYPERDAY = 1;

export enum APINAME {
    TOPLEADERBOARD,
    LEADERBOARD,
    USER_ENTRY,
    SET_SCORE,
    SET_PROFILE

}

//Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;


export const GameEvents = {
    CARD_PLACED: 'CardPlaced',
    CARD_REMOVED: 'CardRemoved',
    WORD_CREATED: 'WordCreated',
    WILD_CARD: 'WildCard',
    SET_WILD_CARD: 'SetWildCrad',
    STACK_DATA: 'StackData',
    GAME_PAUSE: 'GamePause',
    GAME_OVER: 'GameOver',
    FTU_OVER: 'FtuOver',
    RESTART_GAME: 'RestartGame',
    SHARE_IMG: 'shareimage',
    FTU_HIGHLIGHT_CARD: 'ftuhighlightcard',
    UNLOCK_CARD: "unlockcard",
    UNLOCK_ALLCARD: "unlockallcard",
    SHOW_MOVE_HAND: "movehand",
    HIDE_MOVE_HAND: "hidemovehand",
    DISABLE_FTU: "disableFtu"
}

export const FbMsg = {
    INVITE_MSG: 'Invited to play.',
    CHALLENEGE_MSG: 'is challenging you to a LetterStack.',
    LOST_MSG: 'beat your score on Letter Stack',
    WON_MSG: 'lost to you on your Letter Stack ',
    GAMEOVER_MSG: 'Game Over',
    SHARE_MSG: 'Share game',
    INVITE_CTA: 'PLAY'
}

export function loadImage(sprite, imgUrl) {
    if (!imgUrl) {
        return
    }
    console.log("image url::", imgUrl);
    assetManager.loadRemote<ImageAsset>(imgUrl, { ext: '.png' }, function (
        err: any,
        imageAsset: ImageAsset
    ) {
        if (err) {
            console.log('eror in loading image', err)
            return
        }
        const texture = new Texture2D()
        const spriteFrame = new SpriteFrame()
        texture.image = imageAsset
        spriteFrame.texture = texture
        sprite.spriteFrame = spriteFrame
    })
}

export const SCORE = 50;

export const TOTALTIME = 30

export const FTUWORDS = ["fork", "Spoon", "knife"];
export const FTUCLUE = "Cutlery";

export const FTURESULT = { "height": 8, "width": 5, "positionObjArr": [{ "wordStr": "knife", "xNum": 0, "yNum": 4, "isHorizon": true }, { "wordStr": "Spoon", "xNum": 1, "yNum": 0, "isHorizon": false }, { "wordStr": "fork", "xNum": 3, "yNum": 4, "isHorizon": false }], "ownerMap": [[null, { "letter": "S", "v": 1, "vIdx": 0 }, null, null, null], [null, { "letter": "p", "v": 1, "vIdx": 1 }, null, null, null], [null, { "letter": "o", "v": 1, "vIdx": 2 }, null, null, null], [null, { "letter": "o", "v": 1, "vIdx": 3 }, null, null, null], [{ "letter": "k", "h": 0, "hIdx": 0 }, { "letter": "n", "h": 0, "hIdx": 1, "v": 1, "vIdx": 4 }, { "letter": "i", "h": 0, "hIdx": 2 }, { "letter": "f", "h": 0, "hIdx": 3, "v": 2, "vIdx": 0 }, { "letter": "e", "h": 0, "hIdx": 4 }], [null, null, null, { "letter": "o", "v": 2, "vIdx": 1 }, null], [null, null, null, { "letter": "r", "v": 2, "vIdx": 2 }, null], [null, null, null, { "letter": "k", "v": 2, "vIdx": 3 }, null]] }



export const GameOverEvent = new EventEmitter();
export const GameRestartEvent = new EventEmitter();
export const MenuScreenEvent = new EventEmitter();
export const FtuEvent = new EventEmitter();