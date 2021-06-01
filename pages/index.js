import Head from "next/head";

import { useEffect, useState } from "react";

import BaseLayout from "../layout/BaseLayout";
import Link from "next/link";
import {
  Container,
  ContainerGames,
  TitlePage,
  GameTeamName,
  GameInfo,
  GameTime,
} from "../styles/IndexPageStyles";

import { useGetGames, useCreateGame, useLazyGetUser } from "../apollo/actions";
import withApollo from "../hoc/withApollo";

import { formatDate, golas, sortGames } from "../utils/functions";
import Result from "../components/Result";

import { useRouter } from "next/router";

const AppLink = ({ children, href, as }) => (
  <Link href={href} as={as}>
    <a>{children}</a>
  </Link>
);

function Home() {
  const { data: gameData } = useGetGames();
  let games = (gameData && gameData.games) || [];
  games = sortGames(games);

  const [user, setUser] = useState();

  const [getUser, { data: dataU, error: errorU }] = useLazyGetUser();

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

  return (
    <BaseLayout page="Home">
      <Head>
        <title>Index Page-game row</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <TitlePage>Welcome to Live Score Dasboard</TitlePage>
        {games.map((game) => {
          return (
            <div key={game._id}>
              <AppLink href="/[id]" as={`/${game._id}`}>
                <ContainerGames key={game._id}>
                  <GameTeamName>{game.home_team}</GameTeamName>
                  <GameInfo>
                    <GameTime> {formatDate(game.time_start)}</GameTime>
                    <Result id={game._id} start_time={game.time_start} />
                  </GameInfo>
                  <GameTeamName>{game.away_team}</GameTeamName>
                </ContainerGames>
              </AppLink>
            </div>
          );
        })}
      </Container>
    </BaseLayout>
  );
}

export default withApollo(Home);
