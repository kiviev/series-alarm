import AudioApp from "@/Domain/Model/AudioModel";



const SOUNDS_DB = {
    finish: '/series-alarm/audio/iphone_alarm.mp3',
    interval: '/series-alarm/audio/buzzer.mp3'
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
        return src ? new AudioApp(src) : null;
    }
}


export default new AudioService();