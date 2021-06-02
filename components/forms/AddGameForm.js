import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Message, Button, LForm } from "../../styles/FormStyles";
import { useForm } from "react-hook-form";
import { Title } from "../../styles/UserCardStyles";
import TextField from "@material-ui/core/TextField";
import { datePickerFormat, formatDate, getCurrentTime } from "../../utils/functions";
const AddGameForm = ({ onSubmit, user }) => {
  const [time_start, setTimeStart] = useState("");
  const { handleSubmit, register,setValue } = useForm();
  useEffect(() => {
    register({ name: "time_start" });

  },[]);
 console.log('izabrano vrijeme je ',getCurrentTime())
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
          defaultValue={datePickerFormat(getCurrentTime())}
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
