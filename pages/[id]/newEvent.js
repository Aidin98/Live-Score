import React from 'react'
import AddEventForm from '../../components/forms/AddEventForm'
import styled from 'styled-components'
import BaseLayout from '../../layout/BaseLayout'
import { useCreateGameEvent, useGetEventsByGameId, useGetGameById } from '../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../hoc/withApollo';
import { EventForm } from '../../styles/GamePageStyle';
import { FormTitle } from '../../styles/FormStyles';
import { Container, Span } from '../../styles/LoginStyle';
import withAuth from '../../hoc/withAuth';



const newEvent = () => {
  const router=useRouter()
  const id=router.query.id
  const [createGameEvent,{error}]=useCreateGameEvent({id:id})
 const { data: gameData } = useGetGameById({
   variables: { id: router.query.id },
 });
 const game = (gameData && gameData.gameById) || {};
 console.log('utakmice su',game)
  const handleCreateGameEvent=async(data)=>{
    try{
if(data){
    await createGameEvent({ variables: {id, ...data,},   });
      router.push(`/${id}`)
    }
    }catch(e){
      return
    }
    }
  return (
    <BaseLayout>
      <Container style={{ marginTop: "80px" }}>
        <FormTitle>Add New Event</FormTitle>
        <AddEventForm onSubmit={handleCreateGameEvent} id={router.query.id}  gameStart={game.time_start}/>
        <pre>
          {error &&
            error.graphQLErrors.map(({ message }, i) => (
              <Span key={i}>{message}</Span>
            ))}
        </pre>
      </Container>
    </BaseLayout>
  );
}

export default withApollo(withAuth(newEvent, ["admin"]));
