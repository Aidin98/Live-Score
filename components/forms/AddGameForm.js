import React from "react";
import { FormGroup, Label, Input, Message, Button, LForm } from "./Forms";
import { useForm } from "react-hook-form";
import { Title } from "../UserCardStyle";
const LoginForm = ({ onSubmit, user }) => {
  const { handleSubmit, register } = useForm();

  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>

      <FormGroup>
        <Label htmlFor="label">Home Team</Label>
        <Input ref={register} type="text" name="home_team" id="home_team" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Away Team</Label>
        <Input ref={register} type="text" name="away_team" id="away_team" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Time Start</Label>
        <Input ref={register} type="text" name="time_start" id="time_start" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Location</Label>
        <Input ref={register} type="text" name="location" id="location" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Referee</Label>
        <Input ref={register} type="text" name="referee" id="referee" />
      </FormGroup>

      <Button type="submit">Add Game</Button>
    </LForm>
  );
};

export default LoginForm;
