import React from 'react'
import { FormGroup, Label, Input, Message, Button,LForm } from "./Forms";
import {useForm} from 'react-hook-form'
const LoginForm = ({onSubmit}) => {
  const {handleSubmit,register}=useForm()
  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="label">Email</Label>
        <Input ref={register} type="email" name="email" id="email" />
        <Message>This is the validation message</Message>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input ref={register} type="password" name="password" id="password" />
        <Message>This is the validation message</Message>
      </FormGroup>
      <Button type="submit">Log In</Button>
    </LForm>
  );
}

export default LoginForm
