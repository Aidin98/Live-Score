import styled from 'styled-components'

export const RightNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //width: 150px;
`;
export const Nav = styled.nav`
position:fixed;
top:0;
  height: 80px;
  width: 100%;
  border-bottom: 2px solid lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  z-index:100;
  background:white;
`;
export const Image = styled.img`
  height: 77px;
`;
export const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 999;
`;
export const LI = styled.li`
  padding: 8px 12px;
  z-index:999;
  &:hover {
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`;
export const DropdownContent = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  width: 300px;
  z-index: 999 !important;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  background:white;

`;
export const Hamburger = styled.button`
  border: 0;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  outline: 0;
  font-size: 40px;
`;
export const Button = styled.button`
  border-radius: 25px;
  padding: 5px 12px;
  width:100px;
  margin-right:0;
`;
export const LogLinks=styled.div`
display:flex;
width:200px;
justify-content:space-between;
margin-right:15px;
`
