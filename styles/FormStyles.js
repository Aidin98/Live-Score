import React from "react";
import styled from "styled-components";
export const LForm=styled.form``
export const FormGroup = styled.div`
  color: black;
  display: block;
  width: 300px;
  margin: 30px auto;

  margin-bottom:30px;
`;

export const Label = styled.label`
  margin-bottom: 5px;;
  color: black;

`;

export const Input = styled.input`
  padding: 0.5em;
  color: black;
  background: lightgray;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  outline:none;
  margin-top:10px;
`;

export const Message = styled.label`
  margin-bottom: 0.5em;
  color: black;
  display: block;
`;

export const Button=styled.button`
display:block;
padding:10px 50px;
font-size:1.3rem;
font-weight:bold;
background:lightgray;
width:300px;
margin:0 auto;
border-radius:35px;
&:hover{
  background:grey;
}
`
export const Select = styled.select`
  padding: 0.5em;
  color: black;
  background: lightgray;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  outline: none;
  margin-top: 10px;
`;
export const FormTitle = styled.h1`
  margin: auto;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-top: 50px;
  margin-bottom: 20px;
`;
