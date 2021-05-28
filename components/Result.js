import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useGetEventsByGameId } from '../apollo/actions';
import withApollo from '../hoc/withApollo'
import { GameResult } from '../styles/IndexPageStyles';
import { formatDate, golas } from '../utils/dateFormat';
const Result = ({id,start_time}) => {

 var gameResult={}
 gameResult=(golas(id));
console.log('game result',gameResult)
const isGameEnd=()=>{
  for (let i = 0; i < gameResult.events.length; i++) {
    if(gameResult.events[i].eventType==='game_end')return true
}
return false
}
  return (
    <div style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <GameResult>
        {gameResult.homeGoals} - {gameResult.awayGoals}
      </GameResult>
      {isGameEnd()
        ? "Game End"
        : moment
            .utc(
              moment(formatDate(new Date()), "DD/MM/YYYY HH:mm:ss").diff(
                moment(formatDate(start_time), "DD/MM/YYYY HH:mm:ss")
              )
            )
            .format("mm")} 
    </div>
  );
}

export default withApollo(Result)
