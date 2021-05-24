import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDeleteEvent,useGetEventsByGameId, useGetGameById, useUpdateEvent } from '../../apollo/actions'
import withApollo from '../../hoc/withApollo'
import BaseLayout from '../../layout/BaseLayout'
import { EventContainer, SingleGameContainer, Teamcontainer } from '../../styles/GamePageStyle'
import { AddGameButton, ContainerGames } from '../../styles/IndexPageStyles'

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useStyles } from '../../styles/ModalSyles'
import { Title } from '../../components/UserCardStyle'
import EditEventForm from '../../components/forms/EditEventForm'
const AppLink = ({ children, href, as }) => (
  <Link href={href} as={as}>
    <a>{children}</a>
  </Link>
);
const GamePage = () => {
  const classes = useStyles();
  const router=useRouter()
  const [deleteEvent]=useDeleteEvent()
  const { data: eventData } = useGetEventsByGameId({ variables: {id:router.query.id} });
  const {data:gameData}=useGetGameById({variables:{id:router.query.id}})
  const [updateEvent,{error}]=useUpdateEvent()
  const [open, setOpen] = useState(false);
  const [idToUpdate,setIdToUpdate]=useState()
  const events = (eventData && eventData.eventsByGameId) || [];
  const handleOpen = (id) => {

    setOpen(true);
    setIdToUpdate(id)
  };

  const handleClose = () => {
    setOpen(false);
    setIdToUpdate('')
  };

const handleUpdateEvent=(updateData)=>{
 
 if(idToUpdate){

   const id=idToUpdate
updateEvent({ variables: { id, ...updateData } });
  handleClose()
 }
}
const handleDeleteEvent=(id)=>{
  deleteEvent({variables:{id:id}})
}
  return (
    <BaseLayout>
      <SingleGameContainer>
        <h1>this is game page</h1>
        <AppLink href="/[id]/newEvent" as={`/${router.query.id}/newEvent`}>
          <AddGameButton style={{ margin: "auto" }}>Add Event</AddGameButton>
        </AppLink>
        {gameData && (
          <ContainerGames>
            {gameData.gameById.home_team}---{gameData.gameById.away_team}
          </ContainerGames>
        )}
        <EventContainer>
          <Teamcontainer>
            Home Team
            {eventData &&
             events.map((event) => {
                if (event.team === "home") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={event._id}
                    >
                      <p>
                        {event.eventType}-------{event.team}
                      </p>
                      <div>
                        <button onClick={() => handleOpen(event._id)}>
                          Edit
                        </button>
                        <button onClick={()=>handleDeleteEvent(event._id)}>Delete</button>
                      </div>
                    </div>
                  );
                }
              })}
          </Teamcontainer>
          <Teamcontainer>
            {" "}
            Away Team
            {eventData &&
             events.map((event) => {
                if (event.team === "away") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={event._id}
                    >
                      <p>
                        {event.eventType}-------{event.team}
                      </p>
                      <div>
                        <button onClick={() => handleOpen(event._id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteEvent(event._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
          </Teamcontainer>
        </EventContainer>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Title>Edit User</Title>
              <EditEventForm onSubmit={handleUpdateEvent} />

            </div>
          </Fade>
        </Modal>
      </SingleGameContainer>
    </BaseLayout>
  );
}

export default withApollo(GamePage)
