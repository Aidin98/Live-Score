import React from "react";
import styled from "styled-components";
import { useSignUp, useGetUser, useSignIn } from "../apollo/actions";
import { FormTitle } from "../components/forms/Forms";
import LoginForm from "../components/forms/LoginForm";
import Redirect from "../components/Redirect";
import withApollo from "../hoc/withApollo";
import BaseLayout from "../layout/BaseLayout";
import { Span } from "../styles/LoginStyle";
import { Container, Title } from "../styles/RegisterStyle";

const registration = () => {
 const [signUp, { data, loading, error }] = useSignUp();

const handleSignUp=async(signUpData)=>{
  try {
    await signUp({ variables: signUpData });
  } catch (error) {}

}
  return (
    <BaseLayout>
      <Container>
        <FormTitle>REGISTER HERE</FormTitle>
        <LoginForm
          onSubmit={handleSignUp}
        />
        <pre>
          {error &&
            error.graphQLErrors.map(({ message }, i) => (
              <Span key={i}>{message}</Span>
            ))}
        </pre>
        {data && data.signUp && (
          <Redirect to="/login" query={{ message: "REGISTRED" }} />
        )}
      </Container>
    </BaseLayout>
  );
};

export default withApollo(registration);
