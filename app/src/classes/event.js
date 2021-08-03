
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

class Event{
    id;
    date;
    name;
    type;
    picture;
    firstOfYear;
    firstOfAllTime;

    constructor(name,date,type,picture){
        this.id = uuidv4();
        this.name = name;

        //use specified date or today if not defined
        if(date){
            this.date = new Date(date);
        } else {
            this.date = new Date();
        }

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