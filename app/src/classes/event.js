
const { v4: uuidv4 } = require('uuid');

class EventType{
    name;
    picture;
    icon;

    constructor(name,defaultPicture){
        this.name = name;
        this.defaultPicture = defaultPicture;
    }
}

let EVENT_TYPES = {}


EVENT_TYPES.DIPLOMA = new EventType("Diploma",require('@/assets/diploma.png'));
EVENT_TYPES.MOVING = new EventType("Moving",require('@/assets/moving.png'));
EVENT_TYPES.JOB = new EventType("Job",require('@/assets/job.png')); 

class Event{
    id;
    date;
    name;
    type;
    picture;
    firstOfYear;
    firstOfAllTime;
    private; // element only visible by creator

    constructor(name,date,type,picture){
        this.id = uuidv4();
        this.name = name;

        this.date = date;

        this.type = type;

        //we use the type default picture if we have a type
        if(type){
            this.picture = type.defaultPicture;
        } else {
            this.picture = picture;
        }
        
    }

    get formattedDate(){
        return this.date.toLocaleDateString();
    }

    get year(){
        return this.date.getFullYear();
    }
}

export{Event, EVENT_TYPES};