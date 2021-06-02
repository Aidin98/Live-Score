import styled from 'styled-components'
export const SingleGameContainer=styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
margin-top:80px;
margin-bottom:80px;
`
export const EventContainer = styled.div`
  width: 80vw;
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 5px;
  margin-top: 10px;
  @media (max-width: 768px) {
    display:flex;
    flex-direction:column;
  }
`;
export const Teamcontainer=styled.div`


`
export const EventRow = styled.div`
  position: relative;
  height: 50px;
  background: whitesmoke;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 15px;
  padding-right: ${(p) => (p.isHome ? "55%" : "")};
  padding-left: ${(p) => (p.isHome ? "" : "55%")};
  &:hover {
    background: lightgray;
  }
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const GamePageTitle=styled.h1`

`

export const TeamTitle=styled.p`
padding-left:15px;
`
export const GlobalInfo = styled.div`
  width: 80vw;

  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  &:hover {
    background: lightgray;
  }
`;
export const Info=styled.p`
padding:3px;
margin:0;
display:flex;
`

export const EventForm=styled.div`

align-items:center;
`
export const TeamName=styled.div`
width:100%;
display:flex;
justify-content:space-around;
`
