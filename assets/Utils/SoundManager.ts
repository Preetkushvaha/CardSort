import { AudioClip, AudioSource, Component, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class SoundManager extends Component {
  @property({ type: [AudioClip], visible: true })
  private soundList: AudioClip[] = [];

  @property(AudioSource)
  private audioSource: AudioSource = null;

  @property(AudioSource)
  private backgroundAudioSource: AudioSource = null;

  @property(AudioSource)
  private reelAudioSource: AudioSource[] = [];

  private sfxStatus: number;

  public get getSFXStatus() {
    return this.sfxStatus;
  }

  onLoad() {
    window.SoundManager = this;
    this.checkAudio();
  }

  playSound(id: number, loop: boolean = false) {
    // console.log("play sound: ", id, "  ", loop);

    if (!this.audioSource.volume) return;
    // console.log("play sound vol ", this.audioSource.volume);

    this.audioSource.clip = this.soundList[id];
    this.audioSource.play();
    this.audioSource.loop = loop;
  }

  startBackgroundMusic() {
    this.backgroundAudioSource.play();
    this.backgroundAudioSource.loop = true;
  }

  muteSound(flag: boolean, checkMusic = true) {
    if (flag) this.audioSource.volume = 0;
    else this.audioSource.volume = 1;

    // console.log("flag ", flag);
  }

  checkAudio() {
    //   this.sfxStatus = K.USER.getSingleItemFromStorage(LOCALSTORAGE_KEYS.SFX_STATUS);
    //   this.muteSound(this.sfxStatus ? false : true, false);
  }

  isSoundMuted() {
    if (this.audioSource.volume > 0) return false;
    return true;
  }

  stopBackgroundMusic() {
    this.backgroundAudioSource.stop();
  }

  startReelAudioMusic(index: number) {
    if (this.audioSource.volume) return;

    this.reelAudioSource[index].play();
  }

  stopReelAudioMusic(index: number) {
    this.reelAudioSource[index].stop();
  }

  stopSound() {
    this.audioSource.stop();
  }

  //-------------------------------------------------------------------------//
  setVolumeforSFX(value: number) {
    this.audioSource.volume = value;
  }

  getDuration(id: number) {
    this.audioSource.clip = this.soundList[id];
    return this.audioSource.duration;
  }
  //----------------------------------------------------------------------//
}
