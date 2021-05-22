import React from 'react'
import AddEventForm from '../../components/forms/AddEventForm'
import styled from 'styled-components'
import BaseLayout from '../../layout/BaseLayout'
import { useCreateGameEvent } from '../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../hoc/withApollo';
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
  const [createGameEvent,{error}]=useCreateGameEvent()
  console.log('id je',router.query)
  const handleCreateGameEvent=(data)=>{
    if(data){
      createGameEvent({variables:{id,...data}})
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
