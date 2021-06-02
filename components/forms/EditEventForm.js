import React, { useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Message,
  Button,
  LForm,
  Select,
} from "../../styles/FormStyles";
import { useForm } from "react-hook-form";
import { useGetEventsByGameId } from "../../apollo/actions";

import "react-time-picker/dist/TimePicker.css";
import TP, { TimePickerProps } from "react-time-picker/dist/entry.nostyle";
import {
  dateDifferenceMinute,
  doesInclude,
  formatDate,
  getCurrentTime,
  getDateFormat,
  getDateOnly,
  getTimeOnly,
} from "../../utils/functions";
import moment from "moment";
const EditEventForm = ({ onSubmit, user, id, gameStart }) => {

  const { handleSubmit, register, setValue } = useForm();
  const [action, setAction] = useState("");
  const [value, onChange] = useState(getTimeOnly(getCurrentTime()));
  const { data } = useGetEventsByGameId({ variables: { id: id } });
   const events = (data && data.eventsByGameId) || [];

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
    register({ name: "time" ,});
  });
  let haha = check();
  const a = new Date(getDateFormat(gameStart));

  const after = a.setHours(a.getHours() + 2);

  const eventContitons = (minute) => {
    if (dateDifferenceMinute(getCurrentTime(), gameStart) > minute) {
      return true;
    }
    return false;
  };
  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Event Type</Label>
        <Select
          ref={register}
          name="eventType"
          onChange={(e) => setAction(e.target.value)}
        >
          {!doesInclude("halftime_start",events) && (
            <option value="halftime_start">Halftime-Start</option>
          )}
          {!doesInclude("halftime_end",events) && (
            <option value="halftime_end">Halftime-End</option>
          )}
          <option value="goal">Goal</option>
          <option value="yellow_card">Yellow Card</option>
          <option value="red_card">Red Card</option>
          <option value="substitution">Substitution</option>
          <option value="foul">Foul</option>
          {!doesInclude("game_end",events) && (
            <option value="game_end">Game-End</option>
          )}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Team</Label>
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
        <Label>Time : </Label>
        {gameStart && (
          <TP
            value={value}
            onChange={(value) => {
              setValue(
                "time",
                moment(
                  `${getDateOnly(gameStart)} ${value}`,
                  "DD-MM-YYYY HH:mm ss"
                ).format()
              );
              onChange()
            }}
            locale="sv-sv"
            minTime={getTimeOnly(new Date(getDateFormat(gameStart)))}
            maxTime={getTimeOnly(a)}

          />
        )}
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
