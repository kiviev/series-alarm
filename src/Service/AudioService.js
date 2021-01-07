import AudioApp from "@/Domain/Model/AudioModel";

const PUBLIC_PATH = process.env.production ? '/series-alarm/' : '/'

const SOUNDS_DB = {
    finish: PUBLIC_PATH + 'audio/iphone_alarm.mp3',
    interval: PUBLIC_PATH + 'audio/buzzer.mp3'
};

class AudioService {

    getAudio(name){
        return this.buildAudio(name)
    }

    getAudiosSrc(type){
        const result = SOUNDS_DB[type];
        return result ? result : null;
    }

    buildAudio(name){

        const src = this.getAudiosSrc(name);
        console.log(process.env.PUBLIC_PATH)
        return src ? new AudioApp(src) : null;
    }
}


export default new AudioService();