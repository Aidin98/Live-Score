import React from "react";
import {
  FormGroup,
  Label,
  Input,
  Message,
  Button,
  LForm,
} from "../../styles/FormStyles";
import { useForm } from "react-hook-form";
import { Title } from "../../styles/UserCardStyles";
const EditOwnUserForm = ({ onSubmit, user }) => {
  const { handleSubmit, register } = useForm();

  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <Title>{user}</Title>
      <FormGroup>
        <Label htmlFor="label">Email</Label>
        <Input ref={register} type="email" name="email" id="email" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Password</Label>
        <Input ref={register} type="password" name="password" id="password" />
      </FormGroup>

      <Button type="submit">Edit</Button>
    </LForm>
  );
};

export default EditOwnUserForm;
