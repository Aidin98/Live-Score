import React from 'react'
import styled from 'styled-components'
import { useGetUser, useSignIn } from '../apollo/actions'
import LoginForm from '../components/forms/LoginForm'
import Redirect from '../components/Redirect'
import withApollo from '../hoc/withApollo'
import BaseLayout from '../layout/BaseLayout'
const Title=styled.h1`
margin:auto;
text-align:center;
font-size:2rem;
font-weight:bold;
color:black;
margin-top:50px;
`

const login = () => {
   const [signIn, { data, loading, error }] = useSignIn();
   const {data:dataU}=useGetUser()

   console.log('data je ',data)
   console.log('user je ',dataU)
  return (
    <BaseLayout>
      <Title>LOGIN PAGE</Title>
      <LoginForm onSubmit={(signInData) => signIn({ variables: signInData })} />
      {data &&  (
        <Redirect to="/" query={{ message: "LOGGED_IN" }} />
      )}
    </BaseLayout>
  );
}

export default withApollo(login)



