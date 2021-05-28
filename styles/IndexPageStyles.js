import styled from 'styled-components'
export const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-top:85px;
margin-bottom:85px;
z-index:1;

`;
export const TitlePage=styled.h1`
font-size:2rem;
text-align:center;
`
export const ContainerGames = styled.div`
  position: relative;
  width: 80vw;
  height: 70px;
  background: whitesmoke;
  margin-top: 20px;
  padding: 0 70px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  &:hover {
    background: lightgray;
  }
  @media (max-width: 768px) {
    padding:0 10px;

  }
`;

export const AddGameButton = styled.button`
  position: absolute;
  top: 90px;
  left: 10px;
  padding: 10px 50px;
  font-size: 1.3rem;
  @media (max-width: 768px) {
    position:relative;
    top:10px;
  }
`;
export const GameTeamName = styled.h2`
  @media (max-width: 768px) {
    font-size:0.8rem;
  }
`;
export const GameInfo = styled.div`
  position: absolute;
  left: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    left: 40%;
  }
  @media (max-width: 600px) {
    left: 35%;
  }
`;
export const GameTime = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  font-weight: lighter;
  @media (max-width: 600px) {
    font-size:10px;
  }
`;
export const GameResult = styled.h4`
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center
  @media (max-width: 600px) {
    font-size:0.7rem;
  }
`;
