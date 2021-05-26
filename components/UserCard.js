import React, { useState } from 'react'

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Card, Title,Image,Button } from './UserCardStyle'
import EditUserForm from '../components/forms/EditUserForm'
import { useDeleteUser, useUpdateUSer } from '../apollo/actions';
import { toast } from "react-toastify";
import { useStyles } from '../styles/ModalSyles';
import { Span } from '../styles/LoginStyle';


const UserCard = ({id,email,role}) => {
  const [deleteUser]=useDeleteUser()
  const [updateUser,{error}]=useUpdateUSer()
  const classes = useStyles();
  const [open, setOpen] = useState(false);
   const handleOpen = () => {
     console.log('uslo je')
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };

const handleUserUpdate=async(data)=>{
  try{
  if(data){
 await updateUser({variables:{id,...data}})
  toast.success("User has been updated", { autoClose: 2000 });
  handleClose()
  }}catch{
    return
  }
}
const handleDeleteUser=()=>{
  deleteUser({ variables: { id: id } });

}
  return (
    <Card>
      <Image
        src="https://lh3.googleusercontent.com/oUUiPB9sq3ACq4bUaRmo8pgvC4FUpRRrQKcGIBSOsafawZfRpF1vruFeYt6uCfL6wGDQyvOi6Ez9Bpf1Fb7APKjIyVsft7FLGR6QqdRFTiceNQBm1In9aZyrXp33cZi9pUNqjHASdA=s170-no"
        alt="Person"
      />
      <Title>{email}</Title>
      <div class="grid-container">
        <div class="grid-child-posts">Role : {role}</div>
      </div>

      <Button onClick={() => handleOpen()}>Edit User</Button>

      <Button type="button" onClick={handleDeleteUser}>
        Delete User
      </Button>

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
            <Title>Edit User</Title>
            <EditUserForm onSubmit={handleUserUpdate} />

            <pre>
              {error &&
                error.graphQLErrors.map(({ message }, i) => (
                  <Span key={i}>{message}</Span>
                ))}
            </pre>
          </div>
        </Fade>
      </Modal>
    </Card>
  );
}

export default UserCard

