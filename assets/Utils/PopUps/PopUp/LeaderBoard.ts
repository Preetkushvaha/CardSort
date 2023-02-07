import { _decorator, Component, Node, Skeleton, sp, Prefab, instantiate } from 'cc';
import { SetUserProfile } from '../../Extras/SetUserProfile';
import PopUpBase from '../PopUpBase';
const { ccclass, property } = _decorator;

@ccclass('LeaderBoard')
export class LeaderBoard extends PopUpBase {
    @property(sp.Skeleton)
    trophyAnimation: Skeleton = null
    @property(Node)
    contentNode: Node
    @property(Prefab)
    userProfilePrefab: Prefab[] = [];
    LeaderBoardData: any


    async onShow(data) {
        this.trophyAnimation.setAnimation(1, "start", true)
        this.contentNode.removeAllChildren();
        this.LeaderBoardData = data;
        await this.setTopLeaderBoardProfile();
        this.scheduleOnce(() => {
            this.playtrophyAnimation();

        }, 3)

    }

    setTopLeaderBoardProfile(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                // console.log("this.topLeaderBoardData : ", this.LeaderBoardData)
                if (this.LeaderBoardData) {
                    for (let i = 0; i < this.LeaderBoardData.length; i++) {
                        this.instantiateChild(i)
                        await this.contentNode.children[i].getComponent(SetUserProfile).init(this.LeaderBoardData[i]);
                    }
                }
                return resolve();
            }
            catch (err) {
                console.error("error 2: ", err)
                return reject(err);
            }
        });
    }

    instantiateChild(i) {
        if (i < 3) {
            let child = instantiate(this.userProfilePrefab[i])
            this.contentNode.addChild(child);
        }
        else {
            let child = instantiate(this.userProfilePrefab[3])
            this.contentNode.addChild(child);
        }
    }

    onBackButtonClick() {
        window.PopUpManager.hideCurrentPopUp()
    }

    async inviteFriend() {
        await window.FBManager.inviteFriend({})
    }

    playtrophyAnimation() {
        console.log("dkf")

        this.trophyAnimation.setAnimation(1, "loop", true)

    }
}

