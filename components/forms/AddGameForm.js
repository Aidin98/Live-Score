import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Message, Button, LForm } from "./Forms";
import { useForm } from "react-hook-form";
import { Title } from "../UserCardStyle";
import TextField from "@material-ui/core/TextField";
const AddGameForm = ({ onSubmit, user }) => {
  const [time_start, setTimeStart] = useState("");
  const { handleSubmit, register,setValue } = useForm();
  useEffect(() => {
    register({ name: "time_start" });
    setValue("time_start", "2017-05-20T10:30");
  },[]);
 console.log('izabrano vrijeme je ',time_start)
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
        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          onChange={(e) => {
            setValue("time_start", e.target.value);
            setTimeStart(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
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

export default AddGameForm;
