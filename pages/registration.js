import React from "react";
import styled from "styled-components";
import { useSignUp, useGetUser, useSignIn } from "../apollo/actions";
import LoginForm from "../components/forms/LoginForm";
import Redirect from "../components/Redirect";
import withApollo from "../hoc/withApollo";
import BaseLayout from "../layout/BaseLayout";
const Title = styled.h1`
  margin: auto;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-top: 50px;
`;

const registration = () => {
 const [signUp, { data, loading, error }] = useSignUp();


  return (
    <BaseLayout>
      <Title>REGISTER HERE</Title>
      <LoginForm onSubmit={(signUpData) => signUp({ variables: signUpData })} />
      {data && data.signUp && (
        <Redirect to="/login" query={{ message: "LOGGED_IN" }} />
      )}
    </BaseLayout>
  );
};

export default withApollo(registration);
