import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDeleteEvent,useGetEventsByGameId, useGetGameById, useUpdateEvent } from '../../apollo/actions'
import withApollo from '../../hoc/withApollo'
import BaseLayout from '../../layout/BaseLayout'
import {
  EventContainer,
  SingleGameContainer,
  Teamcontainer,
  EventRow,
  GamePageTitle,
  TeamTitle,
  GlobalInfo,
  Info,
} from "../../styles/GamePageStyle";
import EditIcon from "@material-ui/icons/Edit";
import { AddGameButton, ContainerGames, GameInfo, GameTeamName, GameTime } from '../../styles/IndexPageStyles'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useStyles } from '../../styles/ModalSyles'
import { Title } from '../../components/UserCardStyle'
import EditEventForm from '../../components/forms/EditEventForm'
import { formatDate, formatEventDate, sortEvents } from '../../utils/dateFormat'
import Result from '../../components/Result'
import { Span } from '../../styles/LoginStyle'
import moment from 'moment'

const AppLink = ({ children, href, as }) => (
  <Link href={href} as={as}>
    <a>{children}</a>
  </Link>
);
const GamePage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [deleteEvent] = useDeleteEvent({ id: router.query.id });
  const { data: eventData } = useGetEventsByGameId({
    variables: { id: router.query.id },
  });
  const { data: gameData } = useGetGameById({
    variables: { id: router.query.id },
  });
  const [updateEvent, { error }] = useUpdateEvent();
  const [open, setOpen] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState();
  const game = (gameData && gameData.gameById) || {};
  const events = (eventData && eventData.eventsByGameId) || [];
  const homeEvents=sortEvents(events.filter((p)=>p.team==='home'))
  const awayEvents = sortEvents(events.filter((p) => p.team === "away"));
  console.log(
    "domaci su",
    homeEvents
  );
  const handleOpen = (id) => {
    setOpen(true);
    setIdToUpdate(id);
  };

  const handleClose = () => {
    setOpen(false);
    setIdToUpdate("");
  };

  const handleUpdateEvent = async (updateData) => {
    try {
      if (idToUpdate) {
        const id = idToUpdate;
        await updateEvent({ variables: { id, ...updateData } });
        handleClose();
      }
    } catch {
      return;
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent({ variables: { id: id } });
    } catch (e) {
      return;
    }
  };

  return (
    <BaseLayout>
      <SingleGameContainer>
        <GamePageTitle>Game Informations</GamePageTitle>
        <AppLink href="/[id]/newEvent" as={`/${router.query.id}/newEvent`}>
          <AddGameButton style={{ margin: "auto" }}>Add Event</AddGameButton>
        </AppLink>
        {gameData && (
          <ContainerGames>
            <GameTeamName>{game.home_team}</GameTeamName>
            <GameInfo>
              <GameTime> {formatDate(game.time_start)}</GameTime>
              <Result id={game._id} />
            </GameInfo>
            <GameTeamName>{game.away_team}</GameTeamName>
          </ContainerGames>
        )}
        <GlobalInfo>
          <Info>Location : {game.location}</Info>
          <Info>Referee : {game.referee}</Info>
        </GlobalInfo>
        <EventContainer>
          <Teamcontainer>
            <TeamTitle> Home Team</TeamTitle>
            {eventData &&
              homeEvents.map((event) => {

                  return (
                    <EventRow key={event._id}>
                      <Info>
                        <span>
                          {moment
                            .utc(
                              moment(
                                formatDate(event.time),
                                "DD/MM/YYYY HH:mm:ss"
                              ).diff(
                                moment(
                                  formatDate(game.time_start),
                                  "DD/MM/YYYY HH:mm:ss"
                                )
                              )
                            )
                            .format("mm")}
                          '
                        </span>{" "}
                        | {event.eventType}
                      </Info>
                      <div>
                        <EditIcon onClick={() => handleOpen(event._id)} />

                        <DeleteForeverIcon
                          onClick={() => handleDeleteEvent(event._id)}
                        />
                      </div>
                    </EventRow>
                  );

              })}
          </Teamcontainer>
          <Teamcontainer>
            {" "}
            <TeamTitle> Away Team</TeamTitle>
            {eventData &&
              awayEvents.map((event) => {

                  return (
                    <EventRow
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={event._id}
                    >
                      <p>
                        <span>
                          {moment
                            .utc(
                              moment(
                                formatDate(event.time),
                                "DD/MM/YYYY HH:mm:ss"
                              ).diff(
                                moment(
                                  formatDate(game.time_start),
                                  "DD/MM/YYYY HH:mm:ss"
                                )
                              )
                            )
                            .format("mm")}
                          '
                        </span>{" "}
                        | {event.eventType}
                      </p>
                      <div>
                        <EditIcon onClick={() => handleOpen(event._id)} />

                        <DeleteForeverIcon
                          onClick={() => handleDeleteEvent(event._id)}
                        />
                      </div>
                    </EventRow>
                  );

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
              <Title>Edit Event</Title>
              <EditEventForm
                onSubmit={handleUpdateEvent}
                id={router.query.id}
              />
              <pre>
                {error &&
                  error.graphQLErrors.map(({ message }, i) => (
                    <Span key={i}>{message}</Span>
                  ))}
              </pre>
            </div>
          </Fade>
        </Modal>
      </SingleGameContainer>
    </BaseLayout>
  );
}

export default withApollo(GamePage)
