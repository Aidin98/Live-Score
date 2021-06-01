import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Message, Button, LForm,Select } from "../../styles/FormStyles";
import { useForm,Controller } from "react-hook-form";
import { useGetEventsByGameId } from "../../apollo/actions";
import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";
import TP, { TimePickerProps } from "react-time-picker/dist/entry.nostyle";
import { dateDifferenceMinute, formatDate, getCurrentTime, getDateFormat, getDateOnly, getTimeOnly } from "../../utils/dateFormat";
import moment from "moment";

const AddEventForm = ({ onSubmit, user,id,gameStart }) => {
  const { handleSubmit, register,control,setValue } = useForm();
  const [state, setState] = useState("halftime_start");
  const { data } = useGetEventsByGameId({ variables: { id: id } });

const [value, onChange] = useState();

 const doesInclude=(type)=>{
    if(data && data.eventsByGameId){
      const{eventsByGameId}=data
      let eventTypes =[]
       eventsByGameId.forEach((element) => eventTypes.push({eventType:element.eventType,time:element.time}));
        for (let i = 0; i < eventTypes.length; i++) {
          if(eventTypes[i].eventType===type){
            return eventTypes[i]
          }

        }
        return false
    }
  }
  const hlaftime_start=doesInclude('halftime_start')
  console.log('halftime je ',hlaftime_start)
  const check=()=>{
    if(state !== "halftime_start" &&
        state !== "halftime_end" &&
        state !== "game_end"){
          return true
        }else{
          return false
        }
  }
  useEffect(()=>{
    register({name:'time'})

  })
  const a =new Date(getDateFormat(gameStart));


  const after =a.setHours(a.getHours() + 2);

const eventContitons=(minute)=>{
  if(dateDifferenceMinute(getCurrentTime(),gameStart)>minute) {
    return true
  }
  return false
}
  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Event Type : </Label>
        {doesInclude("halftime_end") && !doesInclude("halftime_start") ? (
          <Select
            ref={register}
            name="eventType"
            onChange={(e) => setState(e.target.value)}
          >
            <option value="halftime_start">Halftime-Start</option>
          </Select>
        ) : (
          <Select
            ref={register}
            name="eventType"
            onChange={(e) => setState(e.target.value)}
          >
            {!doesInclude("halftime_start") && doesInclude("halftime_end") && (
              <option value="halftime_start">Halftime-Start</option>
            )}
            {!doesInclude("halftime_end") && eventContitons(45) && (
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
        )}
      </FormGroup>
      <FormGroup>
        <Label>Team : </Label>

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
            }}
            locale="sv-sv"
            minTime={
              !hlaftime_start
                ? getTimeOnly(new Date(getDateFormat(gameStart)))
                : getTimeOnly(new Date(getDateFormat(hlaftime_start.time)))
            }
            maxTime={getTimeOnly(a)}
          />
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="label">Additional Information :</Label>
        <Input ref={register} type="text" name="text" id="text" />
      </FormGroup>

      <Button type="submit">Add Event</Button>
    </LForm>
  );
};

export default AddEventForm;



//
//
