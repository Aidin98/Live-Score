import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Message, Button, LForm,Select } from "./Forms";
import { useForm,Controller } from "react-hook-form";
import { useGetEventsByGameId } from "../../apollo/actions";
import TextField from "@material-ui/core/TextField";

const AddEventForm = ({ onSubmit, user,id }) => {
  const { handleSubmit, register,control,setValue } = useForm();
  const [state,setState]=useState('')
  const { data } = useGetEventsByGameId({ variables: { id: id } });
const [time,setTime]=useState()
  const doesInclude=(type)=>{
    if(data && data.eventsByGameId){
      const{eventsByGameId}=data
      let eventTypes =[]
       eventsByGameId.forEach((element) => eventTypes.push(element.eventType));

      const statement=eventTypes.includes(type)

      if(statement){
        return true;
      }else{
        return false
      }
    }
  }
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

console.log('izabrano je ',time)
  return (
    <LForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Event Type : </Label>
        <Select
          ref={register}
          name="eventType"
          onChange={(e) => setState(e.target.value)}
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
        <Label htmlFor="label">Time :</Label>
        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          onChange={(e)=>{
            setValue('time',(e.target.value))
            setTime(e.target.value)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
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
