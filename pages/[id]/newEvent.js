import React from 'react'
import AddEventForm from '../../components/forms/AddEventForm'
import styled from 'styled-components'
import BaseLayout from '../../layout/BaseLayout'
import { useCreateGameEvent } from '../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../hoc/withApollo';
import { useMutation } from '@apollo/react-hooks';
import { ADD_GAME_EVENT, EVENTS_BY_GAMEID } from '../../apollo/queries';
const Title = styled.h1`
  margin: auto;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-top: 50px;
`;
const newEvent = () => {
  const router=useRouter()
  const id=router.query.id
 // const [createGameEvent,{error}]=useCreateGameEvent()
 const [createEvent,{loading}]=useMutation(ADD_GAME_EVENT)
  console.log('id je',router.query)
  const handleCreateGameEvent=(data)=>{
    if(data){
     createEvent({
       variables: {
         id,
         ...data,
       },
       update: (cache, { data: { createGameEvent } }) => {
         const data = cache.readQuery({ query: EVENTS_BY_GAMEID });
         data.items = [...data.eventsByGameId, createGameEvent];
         cache.writeQuery({ query: EVENTS_BY_GAMEID }, data);
       },
     });
      router.push(`/${id}`)
    }
    }
  return (
    <BaseLayout>
      <Title>Add New Event</Title>
      <AddEventForm
        onSubmit={handleCreateGameEvent}
      />
    </BaseLayout>
  );
}

export default withApollo(newEvent)
