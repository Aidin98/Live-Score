import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useDeleteEvent,
  useGetEventsByGameId,
  useGetGameById,
  useLazyGetUser,
  useUpdateEvent,
} from "../../apollo/actions";
import withApollo from "../../hoc/withApollo";
import BaseLayout from "../../layout/BaseLayout";
import {
  EventContainer,
  SingleGameContainer,
  Teamcontainer,
  EventRow,
  GamePageTitle,
  TeamTitle,
  GlobalInfo,
  Info,
  TeamName,
} from "../../styles/GamePageStyle";
import EditIcon from "@material-ui/icons/Edit";
import {
  AddGameButton,
  ContainerGames,
  GameInfo,
  GameTeamName,
  GameTime,
} from "../../styles/IndexPageStyles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useStyles } from "../../styles/ModalSyles";

import EditEventForm from "../../components/forms/EditEventForm";
import {
  formatDate,
  formatEventDate,
  getCurrentTime,
  sortEvents,
} from "../../utils/functions";
import Result from "../../components/Result";
import { Span } from "../../styles/LoginStyle";

import withAuth from "../../hoc/withAuth";
import EventTime from "../../components/EventTime";
import { Title } from "../../styles/UserCardStyles";

const AppLink = ({ children, href, as }) => (
  <Link href={href} as={as}>
    <a>{children}</a>
  </Link>
);
const GamePage = () => {
  const [user, setUser] = useState();
  const classes = useStyles();
  const router = useRouter();
  const [deleteEvent] = useDeleteEvent({ id: router.query.id });
  const [getUser, { data: dataU, error: errorU }] = useLazyGetUser();
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
  const globalEvents = events.filter((p) => p.team === "global");
   let HomeAwayEvents = sortEvents(events.filter(function (currentElement) {
  return currentElement.team === 'home' || currentElement.team === 'away';
}))

  useEffect(() => {
    getUser();
  }, []);
  if (dataU) {
    if (dataU.user && !user) {
      setUser(dataU.user);
    }
    if (!dataU.user && user) {
      setUser(null);
    }
  }
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
  const doesInclude = () => {
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventType === "game_end") {
        return true;
      }
    }
    return false;
  };
  const niceTitle = (type) => {
    if (type === "game_end") {
      return "Game End :";
    }
    if (type === "halftime_start") {
      return "Halftime Start :";
    }
    if (type === "halftime_end") {
      return "Halftime End :";
    }
  };
  return (
    <BaseLayout>
      <SingleGameContainer>
        <GamePageTitle>Game Informations</GamePageTitle>
        {user &&
          user.role === "admin" &&
          !doesInclude() &&
          game.time_start < getCurrentTime() && (
            <div>
              <AppLink
                href="/[id]/newEvent"
                as={`/${router.query.id}/newEvent`}
              >
                <AddGameButton style={{ margin: "auto" }}>
                  Add Event
                </AddGameButton>
              </AppLink>
            </div>
          )}
        {gameData && (
          <ContainerGames>
            <GameTeamName>{game.home_team}</GameTeamName>
            <GameInfo>
              <GameTime> {formatDate(game.time_start)}</GameTime>
              <Result id={game._id} start_time={game.time_start} />
            </GameInfo>
            <GameTeamName>{game.away_team}</GameTeamName>
          </ContainerGames>
        )}
        <GlobalInfo>
          <Info>Location : {game.location}</Info>
          <Info>Referee : {game.referee}</Info>
          {globalEvents.map((global) => {
            return (
              <Info key={global._id}>
                {niceTitle(global.eventType)} {formatDate(global.time)}{" "}
                <div style={{marginLeft:"10px"}}>
                  {user && user.role === "admin" && (
                    <EditIcon onClick={() => handleOpen(global._id)} />
                  )}

                  {user && user.role === "admin" && (
                    <DeleteForeverIcon
                      onClick={() => handleDeleteEvent(global._id)}
                    />
                  )}
                </div>
              </Info>
            );
          })}
        </GlobalInfo>
        <EventContainer>
          <Teamcontainer>
            <TeamName>
              <TeamTitle>{game.home_team} : Events</TeamTitle>
              <TeamTitle>{game.away_team} : Events</TeamTitle>
            </TeamName>

            {eventData &&
              HomeAwayEvents.map((event) => {
                return (
                  <EventRow key={event._id} isHome={event.team==='home' ? true : false}>
                    <Info>
                      <EventTime
                        time={event.time}
                        id={game._id}
                        gameTime={game.time_start}
                      />
                      ' | {event.eventType}
                    </Info>
                    <div>
                      {user && user.role === "admin" && (
                        <EditIcon onClick={() => handleOpen(event._id)} />
                      )}

                      {user && user.role === "admin" && (
                        <DeleteForeverIcon
                          onClick={() => handleDeleteEvent(event._id)}
                        />
                      )}
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
                gameStart={game.time_start}
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
};

export default withApollo(withAuth(GamePage));
