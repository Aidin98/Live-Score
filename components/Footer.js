import React from 'react'
import styled from 'styled-components'
const FooterBar=styled.footer`
position:fixed;
bottom:0;
height:80px;
background:lightgrey;
width:100%;
`
const Footer = () => {
  return (
    <FooterBar>
      This is footer!!!
    </FooterBar>
  )
}

export default Footer

