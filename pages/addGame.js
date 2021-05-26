import React from "react";



import { useRouter } from "next/router";




import { useCreateGame } from "../apollo/actions";
import AddGameForm from "../components/forms/AddGameForm";
import BaseLayout from "../layout/BaseLayout";
import withApollo from "../hoc/withApollo";
import { FormTitle } from "../components/forms/Forms";
import { Container, Span } from "../styles/LoginStyle";


const addGame = () => {
  const router = useRouter();
  const id = router.query.id;
  const [createGame, { error }] = useCreateGame();

  const handleCreateGame = async (data) => {
    try {
      if (data) {
        await createGame({ variables: {...data } });
        router.push(`/`);
      }
    } catch (e) {
      return;
    }
  };
  return (
    <BaseLayout>
      <Container >
        <FormTitle>Add New Event</FormTitle>
        <AddGameForm onSubmit={handleCreateGame}/>
        <pre>
          {error &&
            error.graphQLErrors.map(({ message }, i) => (
              <Span key={i}>{message}</Span>
            ))}
        </pre>
      </Container>
    </BaseLayout>
  );
};

export default withApollo(addGame);
