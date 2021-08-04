<template>

  <div class="verticalTimelineContainerContainer">

    <b-button type="is-primary" @click="toggleAddEventModal = true">+ New Event</b-button>

    <!-- Event creation modal -->
    <b-modal v-model="toggleAddEventModal"
          has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-label="Example Modal"
            aria-modal>
      <div class="card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Event</p>
        </header>
        <div class="card-content">


          

          <b-field label="Type">
            <b-select placeholder="Select a type" expanded v-model="eventCreation.type">
                <option
                    v-for="eventType in eventTypes"
                    :value="eventType"
                    :key="eventType.name">
                    {{ eventType.name }}
                </option>
            </b-select>
          </b-field>

          <b-field label="Name">
            <b-input v-model="eventCreation.name" placeholder="Select a name"></b-input>
          </b-field>

          <b-field label="Select a date">
            <b-datepicker
                v-model="eventCreation.date"
                :locale="'fr-FR'"
                placeholder="Click to select..."
                trap-focus>
            </b-datepicker>
          </b-field>



        </div>
        <footer class="modal-card-foot">
          <b-button
              label="Close"
              @click="toggleAddEventModal = false" />
          <b-button
              v-if="canSubmitEvent"
              label="Create"
              type="is-primary" 
              @click="submitEvent()"
              />
        </footer>
      </div>
    </b-modal>

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
  </div>
</template>

<script>


import {Event, EVENT_TYPES} from '../classes/event.js';

export default {
  name: 'VerticalLifeline',
  data() {
    return {
      toggleAddEventModal: false,
      eventTypes : [], //list of EventTypes
      events: [], //list of Events
      eventCreation : { //object used for event creation
        name : undefined,
        date : undefined,
        type : undefined
      }
    }
  },
  mounted() {

    let eventKeys = Object.keys(EVENT_TYPES);

    for (let eventIndex = 0; eventIndex < eventKeys.length; eventIndex++) {
        this.eventTypes.push(EVENT_TYPES[eventKeys[eventIndex]]);
    }

    

    this.events = [
      new Event("BAC S ISN",new Date("05/01/2016"),EVENT_TYPES.DIPLOMA),
      new Event("TOEIC 970",new Date("03/01/2018"),EVENT_TYPES.DIPLOMA),
      new Event("DUT Informatique",new Date("07/01/2018"),EVENT_TYPES.DIPLOMA),
      new Event("Licence pro",new Date("07/01/2019"),EVENT_TYPES.DIPLOMA),
      new Event("BluePad",new Date("4/12/2019"),EVENT_TYPES.JOB),
      new Event("Moving to Metz",new Date("10/01/2019"),EVENT_TYPES.MOVING),
    ]
  },
  methods: {
    submitEvent(){

      //add event to list
      this.events.push(
        new Event(
          this.eventCreation.name,
          this.eventCreation.date,
          this.eventCreation.type
        )
      )

      //close modal and reset creation object
      this.toggleAddEventModal = false;
      this.eventCreation.name = undefined;
      this.eventCreation.date = undefined;
      this.eventCreation.type = undefined;
    }
  },
  computed: {
    canSubmitEvent(){
      return this.eventCreation.name && this.eventCreation.date && this.eventCreation.type;
    },
    sortedEvents(){
      let events = this.events;
      let sortedEvents = events.sort(function(a,b){
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

  .verticalTimelineContainerContainer{
    display:flex;
    justify-content:center;
  }
</style>
