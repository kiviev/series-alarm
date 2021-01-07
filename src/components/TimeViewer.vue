<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="interval">
                    <h1>{{ printTime(minutesCalculated) }}m : {{ printTime(secondsCalculated) }}s</h1>
                </div>
                <div class="totalTime mb-5" :class="pause ? 'sa-in-pause' : ''">
                    <div class="progress-pie-chart" :data-percent="progress" :class="this.progress > 50 ? 'gt-50' : ''">
                        <div class="ppc-progress">
                            <div class="ppc-progress-fill" :style="calcProgressVar()"></div>
                        </div>
                        <div class="ppc-percents" :class="warning ? 'sa-pre-finish' : ''">
                            <div class="pcc-percents-wrapper">
                                <span>{{ progress }}%</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import AudioService from "@/Service/AudioService";

    const WARNING_TIME = 3;
    export default {
        name: "TimeViewer",
        props:{
            minutes: Number,
            interval: Number,
            start: Boolean,
            pause: Boolean,
            stop: Boolean
        },
        computed: {
            totalIntervals: function () {
                return (this.totalSeconds > 0 && this.interval > 0 ) ? Math.floor(this.totalSeconds / this.interval) : 0;
            },
            launchStart: function(){
                return this.start === true;
            },
            warning: function () {
                return this.interval > -1
                    && (this.interval < (this.handleIntervalData.secondsTranscurred + (WARNING_TIME +1)))
                    && (this.interval - this.handleIntervalData.secondsTranscurred !== 0) ;
            },

        },
        data(){
            return {
                countDown: 0,
                progress: 0,
                intervals: 0,
                totalSeconds: 0,
                minutesCalculated: 0,
                secondsCalculated: 0,
                intervalCb: null,
                handleIntervalData: {
                    actualInterval: 0,
                    secondsTranscurred: 0
                },
                audio: {
                    interval: null,
                    finish: null
                }
            }
        },
        mounted(){
            this.init();
            this.setAudios();
        },
        methods: {
            init(){
                this.setIntervalCb();
                this.totalSeconds = this.getTotalSeconds();
                this.countDown = this.totalSeconds;
                this.intervals = this.totalIntervals;
                this.calcProgress();
            },
            setAudios(){
                this.audio.finish = AudioService.buildAudio('finish');
                this.audio.finish.loop = true;
                this.audio.interval = AudioService.buildAudio('interval');
            },
            setCalculatedTime() {
                this.minutesCalculated = Math.floor((this.countDown / 60) % 60);
                this.secondsCalculated = this.countDown % 60;
                this.progress = this.totalIntervals ? 100 - (Math.floor(this.intervals * 100 / this.totalIntervals)) : 0;
            },
            setIntervalCb(){
                if(!this.intervalCb){
                    this.intervalCb = setInterval(this.handleInterval,1000);
                }
            },
            printTime(value){
              return value < 10 ? '0' + value : value;
            },
            getTotalSeconds(){
                return (this.minutes * 60);
            },
            handleInterval(){
                if((this.start && !this.pause && !this.stop)){

                    if(this.countDown > 0) {
                        this.countDown--;
                        if((this.countDown % this.interval) === 0){
                            this.intervals--;
                            this.handleIntervalData.actualInterval++;
                        }
                        this.calcProgress();
                    }else{
                        this.end();
                    }

                    if(this.handleIntervalData.secondsTranscurred === (this.interval)){
                        this.handleIntervalData.secondsTranscurred = 0;
                    }
                    this.handleIntervalData.secondsTranscurred++;
                    if(this.warning) {
                        this.launchWarning()
                    }
                }
            },
            calcProgress(){
                this.setCalculatedTime();
            },
            end(){
                this.audio.finish.play();
                this.finish();
                this.showEnd();
                this.audio.finish.stop();
                this.$emit('finished', true)
            },
            finish(){
                this.init();
            },
            showEnd(){
              alert('End')
            },
            calcProgressVar(){
                return "transform: rotate(" + this.calcProgressDeg() + "deg);";
            },
            calcProgressDeg(){
                return (360 * this.progress) / 100;
            },
            launchWarning(){
                this.audio.interval.play();
            },
        },

        watch: {
            stop: function(newStatus){
                if(newStatus === true){
                    this.finish();
                }
            },
            interval: function(newStatus, oldStatus){
                if(newStatus !== oldStatus){
                    this.init();
                }
            },
            minutes: function(newStatus, oldStatus){
                if(newStatus !== oldStatus){
                    this.init();
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    $size: 250px;
    $background: #fff;
    $progressColor: $success;
    $backgroundProgressColor: #e5e5e5;

    @mixin circle($size) {
        content: "";
        position: absolute;
        border-radius: 50%;
        left: calc(50% - #{$size/2});
        top: calc(50% - #{$size/2});
        width: $size;
        height: $size;
    }

    .sa-pre-finish{
        background: $warning !important;
    }

    .progress-pie-chart {
        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: $backgroundProgressColor;
        position: relative;
        &.gt-50 {
            background-color: $progressColor;
        }
    }
    .ppc-progress {
        @include circle($size);
        clip: rect(0, $size, $size, #{$size/2});
        .ppc-progress-fill {
            @include circle($size);
            clip: rect(0, #{$size/2}, $size, 0);
            background: $progressColor;
            transform: rotate(60deg);
        }
        .gt-50 & {
            clip: rect(0, #{$size/2}, $size, 0);
            .ppc-progress-fill {
                clip: rect(0, $size, $size, #{$size/2});
                background: $backgroundProgressColor;
            }
        }
    }
    .ppc-percents {
        @include circle(#{$size/1.15});
        background: $background;
        text-align: center;
        display: table;
        span {
            display: block;
            font-size: 2.6em;
            font-weight: bold;
            color: $progressColor;
        }
    }
    .pcc-percents-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .progress-pie-chart {
        margin: 50px auto 0;
    }

    .sa-in-pause{
        opacity: 0.5;
    }

</style>