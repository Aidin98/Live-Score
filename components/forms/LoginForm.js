import React from 'react'
import { FormGroup, Label, Input, Message, Button,LForm } from "../../styles/FormStyles";
import {useForm} from 'react-hook-form'
const LoginForm = ({onSubmit}) => {
  const {handleSubmit,register}=useForm()
  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="label">Email</Label>
        <Input ref={register} type="email" name="email" id="email" />

      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input ref={register} type="password" name="password" id="password" />

      </FormGroup>
      <Button type="submit">Log In</Button>
    </LForm>
  );
}

export default LoginForm
