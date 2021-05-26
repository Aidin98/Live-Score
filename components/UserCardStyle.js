import styled from 'styled-components'

export const Card = styled.div`
  background-color: white;


  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.7);
  color: black;
  background: lightgray;
  width: 300px;
  margin: auto;
  margin-top: 20px;
`;
export const Title = styled.p`

    margin-top: 15px;
    font-size: 1.5em;

`;
export const Image = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 50%;
  border: 5px solid #272133;
  margin-top: 20px;
  box-shadow: 0 10px 50px rgba(235, 25, 110, 1);
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1rem "Roboto Slab", sans-serif;
  padding: 0.6rem 1.5em;
  letter-spacing: 0.05rem;
  cursor: pointer;

  width: 10rem;
  &:focus {
    outline: 2px dotted #55d7dc;
  }
`;

export const UserContainer=styled.div`
margin-top:87px;
margin-bottom:87px;
`
