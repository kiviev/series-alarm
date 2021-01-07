class AudioModel{

    constructor(src, volume = 1) {
        this._src = src;
        this._volume = volume;
        this._loop = false;
        this._status = {
            play: false,
            pause: false
        }
        this.createAudio();
    }
    createAudio(){
        this.audio = this.src;
        this.setBasicConfig();
    }
    setBasicConfig(){
        let audio = this.audio
        audio.loop = false;
        audio.volume = this.volume;
    }
    get audio(){
        return this._audio;
    }
    set audio(src){
        this._audio = new Audio(src);
    }

    get loop(){
        return this._audio.loop;
    }
    set loop(loop){
        this._audio.loop = loop;
    }
    get src() {
        return this._src;
    }

    set src(value) {
        this._src = value;
    }

    get volume() {
        return this._volume;
    }

    set volume(value) {
        this._volume = value;
        this.audio.volume = this.volume;
    }

    play(){
        this.audio.play();
    }

    pause(){
        if(this.isPlayed()){
            this.audio.pause();
        }
    }

    stop(){
        if(this.isPlayed()){
            this.pause();
            this.audio.currentTime = 0;
        }
    }

    isPlayed(){
        return this.audio.played;
    }

    isPaused(){
        return this.audio.paused;
    }

}


export default AudioModel;