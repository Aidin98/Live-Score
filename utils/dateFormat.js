import moment from "moment";
import { useGetEventsByGameId } from "../apollo/actions";
export const formatDate = (date) => {
  return moment.unix(date / 1000).format("MM/DD/YY, h:mm:ss a");
};
export const getDateFormat=(date)=>{
  return moment.unix(date / 1000).format();
}
export const getDateOnly=(date)=>{
  return moment.unix(date/1000).format("DD/MM/YY")
}
export const getTimeOnly=(date)=>{
  return moment.unix(date / 1000).format("HH:mm:ss");
}
export const formatEventDate=(date)=>{
  return moment.unix(date / 1000).format("h:mm:ss a");
}
export const golas=(id)=>{
   const { data: eventData } = useGetEventsByGameId({
     variables: { id:id },
   });
   const events = (eventData && eventData.eventsByGameId) || [];

  var homeGoals=0;
  var awayGoals=0;
  for (let i = 0; i < events.length; i++) {

    if (events[i].eventType === "goal" && events[i].team === "home") {
      homeGoals++;
    }
    if (events[i].eventType === "goal" && events[i].team === "away") {
      awayGoals++;
    }
  }
  return {homeGoals,awayGoals,events}
}


export const sortGames=(games)=>{
  return games.sort((a, b) => b.time_start - a.time_start);
}
export const sortEvents = (events) => {
  return events.sort((a, b) => b.time - a.time);
};


export const getCurrentTime=()=> {

  return moment()._d
}


export const dateDifferenceMinute=(date1,date2)=>{

  date1=moment(formatDate(date1))._d
  date2=moment(formatDate(date2))._d

var __duration = moment.duration(moment(date1).diff(date2));
var minutes = __duration.asMinutes();
return Math.round(minutes);
}

export const checkEvent = (eventyType,id) => {
 
  const gameResult=golas(id)
  for (let i = 0; i < gameResult.events.length; i++) {
    if (gameResult.events[i].eventType === eventyType)
      return gameResult.events[i];
  }
  return false;
};
export const currentMinute = (date) => {
  if (!checkEvent("halftime_end")) {
    return dateDifferenceMinute(getCurrentTime(), date);
  }
  if (checkEvent("halftime_end") && checkEvent("halftime_start")) {
    const halftimeStart = checkEvent("halftime_start");

    const current = dateDifferenceMinute(getCurrentTime(), halftimeStart.time);
    return current + 45;
  }
  if (dateDifferenceMinute(getCurrentTime(), date) > 120) {
    return "Game End";
  }
};
export const currentEventMinute=({time,id,gameTime})=>{

 if (
   !checkEvent("halftime_end", id) ||
   (checkEvent("halftime_end", id) && !checkEvent("halftime_start", id))
 ) {

   return dateDifferenceMinute(time, gameTime);
 }
 if (checkEvent("halftime_end",id) && checkEvent("halftime_start",id)) {
   const halftimeStart = checkEvent("halftime_start",id);

   const current = dateDifferenceMinute(time, halftimeStart.time);
   return current + 45;
 }
}
