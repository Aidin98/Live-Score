import React, { useEffect, useState } from 'react'
import { useGetEventsByGameId } from '../apollo/actions';
import withApollo from '../hoc/withApollo'
import { GameResult } from '../styles/IndexPageStyles';
import { golas } from '../utils/dateFormat';
const Result = ({id}) => {

 var gameResult={}
 gameResult=(golas(id));

  return (
    <GameResult>{gameResult.homeGoals} - {gameResult.awayGoals}</GameResult>
  )
}

export default withApollo(Result)
