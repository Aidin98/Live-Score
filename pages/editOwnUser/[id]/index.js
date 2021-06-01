import React from "react";

import { useEditOwnUser, useGetUser, useSignIn } from "../../../apollo/actions";

import Redirect from "../../../components/Redirect";


import { Container, Span, Title } from "../../../styles/LoginStyle";
import EditOwnUserForm from "../../../components/forms/EditOwnUserForm";
import withApollo from "../../../hoc/withApollo";
import BaseLayout from "../../../layout/BaseLayout";
import { FormTitle } from "../../../styles/FormStyles";
import { useRouter } from "next/router";

const editPage = () => {
const router=useRouter()
const [editOwnUser,{data,error}]=useEditOwnUser()
const id = router.query.id;
console.log('id iz linka je ',id)
const handleEditUser=async(data)=>{
try {
editOwnUser({variables:{id,...data}})

} catch (error) {
return
}
}
  return (
    <BaseLayout>
      <Container>
        <FormTitle>EDIT PAGE</FormTitle>
        <EditOwnUserForm onSubmit={handleEditUser} />
        <pre>
          {error &&
            error.graphQLErrors.map(({ message }, i) => (
              <Span key={i}>{message}</Span>
            ))}
        </pre>
        {data && <Redirect to="/" query={{ message: "USER_EDITED" }} />}
      </Container>
    </BaseLayout>
  );
};

export default withApollo(editPage);
