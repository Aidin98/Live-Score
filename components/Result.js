import moment from 'moment';
import React from 'react'
;
import withApollo from '../hoc/withApollo'
import { GameResult } from '../styles/IndexPageStyles';
import { dateDifferenceMinute, formatDate, getCurrentTime, getDateFormat, getTimeOnly, golas } from '../utils/dateFormat';
const Result = ({id,start_time}) => {

  var gameResult = {};
  gameResult = golas(id);
  const checkEvent = (eventyType, id) => {

    for (let i = 0; i < gameResult.events.length; i++) {
      if (gameResult.events[i].eventType === eventyType)
        return gameResult.events[i];
    }
    return false;
  };
  let check=checkEvent("game_end",id)
  const currentMinute = (date) => {
    if(date>getCurrentTime()){
      return 'Not Started'
    }
    if (!checkEvent("halftime_end")) {
      return dateDifferenceMinute(getCurrentTime(), date);
    }
    if (checkEvent("halftime_end") && checkEvent("halftime_start")) {
      const halftimeStart = checkEvent("halftime_start");

      const current = dateDifferenceMinute(
        getCurrentTime(),
        halftimeStart.time
      );
      return current + 45;
    }else{
      return 'Half Time'
    }

  };
if(gameResult){
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GameResult>
        {gameResult.homeGoals} - {gameResult.awayGoals}
      </GameResult>
      {check
        ? "Game End"
        : currentMinute(start_time)}
    </div>
  );
}}

export default withApollo(Result)
