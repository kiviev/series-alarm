<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12 ">
                    <SetInterval
                            :interval="interval"
                            @intervalSelected="setInterval"
                            :disable="disableSelectors()"
                    />
                </div>
                <div class="col-12">
                    <TimeSelector
                            :disable="disableSelectors()"
                            :minutes="minutes"
                            @minutes="setMinutes"
                    />
                </div>
                <div class="col-12 sa-control-buttons mx-auto">
                    <div class="btn-group btn-group-lg" role="group">
                        <button class="btn btn-primary" @click="launchStart" :disabled="!checkValidvalues || start === true">Start</button>
                        <button class="btn btn-secondary" @click="launchPause" :disabled="!checkValidvalues || !start">Pause</button>
                        <button class="btn btn-danger" @click="launchStop" :disabled="(!checkValidvalues || start === false)">Stop</button>
                    </div>

                </div>

            </div>
            <div class="row">
                <div class="col-12 pt-5">
                    <TimeViewer
                            :minutes="minutes"
                            :interval="interval"
                            :start="start"
                            :pause="pause"
                            :stop="stop"
                            @finished="finish"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import SetInterval from "@/components/SetInterval";
    import TimeSelector from "@/components/TimeSelector";
    import TimeViewer from "@/components/TimeViewer";
    export default {
        name: "Container",
        components:{
            SetInterval,
            TimeSelector,
            TimeViewer
        },
        computed: {
            checkValidvalues: function() {
                return this.minutes > 0 && this.interval > -1;
            }
        },

        data(){
            return {
                interval: -1,
                minutes: 0,
                start: false,
                pause: false,
                stop: false,
            };
        },
        methods:{
            launchStart(){
                if(this.checkValidvalues){
                    this.start = true;
                    this.pause = false;
                    this.stop = false;
                }
            },
            launchPause(){
                if(this.checkValidvalues && this.start){
                    this.pause = !this.pause;
                }
            },
            launchStop(){
                if(this.checkValidvalues){
                    this.start = false;
                    this.pause = false;
                    this.stop = true;
                }
            },
            finish(){
                this.start = false;
                this.pause = false;
                this.stop = false;
            },
            setMinutes(value){
                this.minutes = parseInt(value);
            },
            setInterval(value){
                this.interval = parseInt(value);
            },
            disableSelectors(){
                return this.start === true || this.pause === true;
            },


        }
    }
</script>

<style lang="scss" scoped>
    .sa-control-buttons button{
        margin-right: 15px;
    }

</style>