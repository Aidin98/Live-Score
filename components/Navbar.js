import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {useLazyGetUser,useSignOut} from '../apollo/actions'
import withApollo from '../hoc/withApollo';
import { useRouter } from 'next/router';
import { Button, DropdownContent, Hamburger, Image, LI, Nav, RightNav, UL } from '../styles/NavbarStyle'
const AppLink = ({ children, href, as }) => (
  <Link href={href} as={as}>
    <a>{children}</a>
  </Link>
);

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
              {user && user.role==='admin' && <LI><AppLink href='/allUsers'>All Users</AppLink></LI>}
            </UL>
          </DropdownContent>
        )}
      </RightNav>
    </Nav>
  );
}
export default withApollo(Navbar)
