import React from 'react'
import Link from 'next/link'
import { FooterBar,Image,Copyright ,Links} from '../styles/FooterStyle'
const AppLink = ({ children, href, as }) => (
  <Link href={href} as={as}>
    <a>{children}</a>
  </Link>
);
const Footer = () => {
  return (
    <FooterBar>
      <Image
        src="https://res.cloudinary.com/dmva5v21w/image/upload/v1621495645/live-score-logo_pihmjz.png"
        alt="logo"
      />
      <Copyright>Live Score © 2021</Copyright>
      <AppLink href='/'>
      <Links>Home</Links>
      </AppLink>
    </FooterBar>
  );
}

export default Footer

