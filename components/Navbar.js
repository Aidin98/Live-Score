import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {useLazyGetUser,useSignOut} from '../apollo/actions'
import withApollo from '../hoc/withApollo';
import { useRouter } from 'next/router';
const AppLink = ({ children, href, as }) => (
  <Link href={href} as={as}>
    <a>{children}</a>
  </Link>
);
const RightNav=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width:150px;
`
const Nav=styled.nav`
height:80px;
width:100%;
border-bottom:2px solid lightgrey;
display:flex;
justify-content:space-between;
align-items:center;
padding:0 25px;

`
const Image=styled.img`
height:77px;
`
const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const LI = styled.li`
  padding: 8px 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`;
const DropdownContent = styled.div`
  position: absolute;
  top: 80px;
  right:0;
  width: 300px;
  z-index: 999 !important;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`;
const Hamburger = styled.button`
border:0;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  outline: 0;
  font-size: 40px;

`;
const Button=styled.button`
border-radius:25px;
padding:5px 18px;
`
const Navbar = () => {
  const[user,setUser]=useState()
  const [signOut] = useSignOut();
  const router = useRouter();
const[isActive,setIsActive]=useState(false)
const [getUser, { data, error }] = useLazyGetUser();
useEffect(()=>{
  getUser()
},[])
 if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
  }
const handleButtonClick=()=>{
  setIsActive(!isActive)
}

console.log('user je ',user)
  return (
    <Nav>
      <AppLink href="/">
        <Image src="https://res.cloudinary.com/dmva5v21w/image/upload/v1621495645/live-score-logo_pihmjz.png" />
      </AppLink>
      {user && <h5> Welcome {user.email}</h5>}
      <RightNav>
        <AppLink href="/registration">
      { !user &&   <Button>SIGN UP</Button>}
        </AppLink>
        <Hamburger onClick={handleButtonClick}>☰</Hamburger>
        {isActive && (
          <DropdownContent>
            <UL>
              <LI>Edit Accout</LI>
              {!user ? (
                <LI>
                  <AppLink href="/login">Log in</AppLink>
                </LI>
              ) : (
                <LI>
                  <AppLink href="/logout">Log Out</AppLink>
                </LI>
              )}
              {user && <LI><AppLink href='/allUsers'>All Users</AppLink></LI>}
            </UL>
          </DropdownContent>
        )}
      </RightNav>
    </Nav>
  );
}
export default withApollo(Navbar)
