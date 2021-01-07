<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="sa-minute">Select Minutes</label>
                    <select class="form-control sa-form-control-select" name="sa-minute" id="sa-minute" @change="setMinutes($event.target.value)" :disabled="disable">
                        <option value="-1" :selected="selectedMinutes('-1')">Select Minutes</option>
                        <option v-for="minuteVal in maxMinutes"
                                :value="minuteVal"
                                :selected="selectedMinutes(minuteVal)"
                                :key="minuteVal" >{{ minuteVal }} minute{{ (parseInt(minuteVal) > 1 ) ? 's' : ''}}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TimeSelector",
        props:{
            disable: Boolean,
            minutes: Number
        },

        data(){
            return {
                minutesSelected: -1,
                maxMinutes: 60,
                maxSeconds: 6
            };
        },
        mounted(){
            this.minutesSelected = this.minutes;
        },
        methods:{
            selectedMinutes(value){
                return this.minutesSelected === value
            },

            setMinutes(value){
                this.minutesSelected = value;
                this.$emit('minutes', value);
            },
        },
    }
</script>
