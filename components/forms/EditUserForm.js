import React from "react";
import { FormGroup, Label, Input, Message, Button, LForm } from "./Forms";
import { useForm } from "react-hook-form";
import { Title } from "../UserCardStyle";
const LoginForm = ({ onSubmit,user }) => {
  const { handleSubmit, register } = useForm();

  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <Title>{user}</Title>
      <FormGroup>
        <Label htmlFor="label">Email</Label>
        <Input ref={register} type="email" name="email" id="email" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Role</Label>
        <Input ref={register} type="text" name="role" id="role" />
      </FormGroup>

      <Button type="submit">Edit</Button>
    </LForm>
  );
};

export default LoginForm;
