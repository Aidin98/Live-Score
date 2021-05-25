import React from 'react'
import styled from 'styled-components'
import { useGetUser, useSignIn } from '../apollo/actions'
import { FormTitle } from '../components/forms/Forms'
import LoginForm from '../components/forms/LoginForm'
import Redirect from '../components/Redirect'
import withApollo from '../hoc/withApollo'
import BaseLayout from '../layout/BaseLayout'
import { Container, Span, Title } from '../styles/LoginStyle'


const login = () => {
   const [signIn, { data, loading, error }] = useSignIn();
   const {data:dataU}=useGetUser()


const handleSignIn = async(signInData) => {
  try {
    await signIn({ variables: signInData })
  } catch (error) {}
};
  return (
    <BaseLayout>
      <Container>
        <FormTitle>LOGIN PAGE</FormTitle>
        <LoginForm
          onSubmit={handleSignIn}
        />
        <pre>
             {error && error.graphQLErrors.map(({ message }, i) => (
            <Span key={i}>{message}</Span>
          ))}
        </pre>
        {data && <Redirect to="/" query={{ message: "LOGGED_IN" }} />}
      </Container>
    </BaseLayout>
  );
}

export default withApollo(login)



