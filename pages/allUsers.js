import withApollo from '../hoc/withApollo'
import React from 'react'
import { useGetAllUsers } from '../apollo/actions'
import BaseLayout from '../layout/BaseLayout'
import UserCard from '../components/UserCard'

const allUsers = () => {
  const {data}=useGetAllUsers()
   const users = (data && data.users) || [];

  return (
    <BaseLayout>
    {users.map((user)=>{
      return(
        <UserCard key={user._id} id={user._id} email={user.email} role={user.role} />
      )
    })}
    </BaseLayout>
  );
}

export default withApollo(allUsers)

