import moment from "moment";
import { useGetEventsByGameId } from "../apollo/actions";
export const formatDate = (date) => {
  return moment.unix(date / 1000).format("DD/MM/YY, h:mm:ss a");
};
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
  return {homeGoals,awayGoals}
}


export const sortGames=(games)=>{
  return games.sort((a, b) => b.time_start - a.time_start);
}
export const sortEvents = (events) => {
  return events.sort((a, b) => b.time - a.time);
};
