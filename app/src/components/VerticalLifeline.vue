<template>
  <div class="verticalTimelineContainer">
      <div class="" v-for="event in sortedEvents" :key="event.id">
        
        <!-- Process display of year -->
        <div v-if="event.firstOfYear" class="eventContainer">
          <div v-if="!event.firstOfAllTime" class="verticalLine"></div>
          <div class="timelineYear">
            {{event.year}}
          </div>
          <div class="verticalLine"></div>
        </div>

        <!-- Display event-->
        <div class="eventContainer">
          <div class="verticalLine"></div>
          <div class="eventDate">{{event.formattedDate}}</div>
          <img class="eventPicture" :src="event.picture" />
          <div class="eventName">{{event.name}}</div>
        </div>
      </div>
  </div>
</template>

<script>


import {Event, EVENT_TYPES} from '../classes/event.js';

export default {
  name: 'VerticalLifeline',
  data() {
    return {
      events: [] //list of Events
    }
  },
  mounted() {
    this.events = [
      new Event("BAC S ISN","05/01/2016",EVENT_TYPES.DIPLOMA),
      new Event("TOEIC 970","03/01/2018",EVENT_TYPES.DIPLOMA),
      new Event("DUT Informatique","07/01/2018",EVENT_TYPES.DIPLOMA),
      new Event("Licence pro","07/01/2019",EVENT_TYPES.DIPLOMA)
    ]
  },
  methods: {
    // to add
  },
  computed: {
    sortedEvents(){
      let sortedEvents = this.events.sort(function(a,b){
        if(a.date.getTime() < b.date.getTime()){
          return -1;
        }
        else if(a.date.getTime() > b.date.getTime()){
          return 1;
        }
        return 0;
      });

      let lastYear = 0;

      if(sortedEvents.length > 0){
        sortedEvents[0].firstOfAllTime = true;
      }

      sortedEvents.forEach(function(event){
        if(lastYear != event.year){
          lastYear = event.year;
          event.firstOfYear = true;
        }
      })

      return sortedEvents;

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  :root {
    --main-color: rgb(37, 204, 255);
    --secondary-color: grey;
  }

  .verticalTimelineContainer{
    display:flex;
    flex-direction:column;
  }

  .eventContainer{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }

  .eventPicture{
    height: 50px;
    width: 50px;
    border-style:solid;
    border-radius:100px;
    border-color: var(--main-color);
  }

  .eventName{
    margin-top:-10px;
    padding: 3px 5px;
    background-color: var(--main-color);
    max-width:200px;
    color:white;
    font-weight:bold;
  }

  .eventDate{
    color: var(--secondary-color);
    font-weight:100;
  }

  .verticalLine{
     height:20px;
     width:1px;
     background-color: var(--secondary-color);
  }

  .timelineYear{
    color: var(--secondary-color);
    border-style:solid;
    width: 50px;
    height:50px;
    border-radius:100px;
    line-height:50px;
    border-width:1px;
  }
</style>
