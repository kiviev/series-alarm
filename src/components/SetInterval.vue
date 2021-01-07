<template>
    <div class="container-fluid">
       <div class="row">
           <div class="col-12">
               <div class="form-group">
                   <label for="sa-interval">Select Inteval</label>
                   <select class="form-control sa-form-control-select" name="sa-interval" id="sa-interval"  @change="setInterval($event.target.value)" :disabled="disable">
                       <option value="-1" :selected="selectedInterval(-1)">Select Seconds of Interval</option>
                       <option value="10" :selected="selectedInterval(10)">10 Seconds</option>
                       <option value="20" :selected="selectedInterval(20)">20 Seconds</option>
                       <option value="30" :selected="selectedInterval(30)">30 Seconds</option>
                       <option value="60" :selected="selectedInterval(60)">60 Seconds</option>
                   </select>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "SetInterval",
        props: {
            disable: Boolean,
            interval: Number
        },
        data(){
          return {
            intervalSelected: -1
          };
        },
        mounted() {
          this.intervalSelected = this.interval;
        },
        methods: {
            selectedInterval(value){
                return this.intervalSelected === value;
            },
            setInterval(value){
                this.intervalSelected = value;
                this.$emit('intervalSelected', value);
            }
        }
    }
</script>
