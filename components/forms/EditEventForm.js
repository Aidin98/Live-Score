import React, { useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Message,
  Button,
  LForm,
  Select,
} from "./Forms";
import { useForm } from "react-hook-form";
import { Title } from "../UserCardStyle";
import { useGetEventsByGameId } from "../../apollo/actions";
import { TextField } from "@material-ui/core";
const EditEventForm = ({ onSubmit, user,id }) => {
  const { handleSubmit, register,control,setValue } = useForm();
const [action, setAction] = useState("");
const [time, setTime] = useState();
const { data } = useGetEventsByGameId({ variables: { id: id } });
const doesInclude = (type) => {
  if (data && data.eventsByGameId) {
    const { eventsByGameId } = data;
    let eventTypes = [];
    eventsByGameId.forEach((element) => eventTypes.push(element.eventType));

    const statement = eventTypes.includes(type);

    if (statement) {
      return true;
    } else {
      return false;
    }
  }
};
const check = () => {
  if (
    action !== "halftime_start" &&
    action !== "halftime_end" &&
    action !== "game_end"
  ) {
    return true;
  } else {
    return false;
  }
};
  useEffect(() => {
    register({ name: "time" });
    setValue("time", "2017-05-20T10:30");
  });
  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Event Type</Label>
        <Select
          ref={register}
          name="eventType"
          onChange={(e) => setValue(e.target.value)}
        >
          {!doesInclude("halftime_start") && (
            <option value="halftime_start">Halftime-Start</option>
          )}
          {!doesInclude("halftime_end") && (
            <option value="halftime_end">Halftime-End</option>
          )}
          <option value="goal">Goal</option>
          <option value="yellow_card">Yellow Card</option>
          <option value="red_card">Red Card</option>
          <option value="substitution">Substitution</option>
          <option value="foul">Foul</option>
          {!doesInclude("game_end") && (
            <option value="game_end">Game-End</option>
          )}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Team</Label>
        {console.log("provjera je ", check())}
        {check() ? (
          <Select ref={register} name="team">
            <option value="home">Home</option>
            <option value="away">Away</option>
          </Select>
        ) : (
          <Select ref={register} name="team">
            <option value="global">Global</option>
          </Select>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Time :</Label>
        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          onChange={(e) => {
            setValue("time", e.target.value);
            setTime(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Additional Information</Label>
        <Input ref={register} type="text" name="text" id="text" />
      </FormGroup>

      <Button type="submit">Edit Event</Button>
    </LForm>
  );
};

export default EditEventForm;
