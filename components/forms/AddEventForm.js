import React from "react";
import { FormGroup, Label, Input, Message, Button, LForm,Select } from "./Forms";
import { useForm } from "react-hook-form";
import { Title } from "../UserCardStyle";
const AddEventForm = ({ onSubmit, user }) => {
  const { handleSubmit, register } = useForm();

  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Event Type</Label>
        <Select ref={register} name="eventType">
          <option value="halftime_start">Halftime-Start</option>
          <option value="halftime_end">Halftime-End</option>
          <option value="goal">Goal</option>
          <option value="yellow_card">Yellow Card</option>
          <option value="red_card">Red Card</option>
          <option value="substitution">Substitution</option>
          <option value="foul">Foul</option>
          <option value="game_end">Game-End</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Team</Label>
        <Select ref={register} name="team">
          <option value="home">Home</option>
          <option value="away">Away</option>
          <option value="global">Global</option>
          </Select>
          </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Time :</Label>
        <Input ref={register} type="text" name="time" id="time" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Additional Information</Label>
        <Input ref={register} type="text" name="text" id="text" />
      </FormGroup>


      <Button type="submit">Add Game</Button>
    </LForm>
  );
};

export default AddEventForm;
