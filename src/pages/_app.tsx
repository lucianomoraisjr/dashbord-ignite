import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerPrivider } from '../contexts/SidebarDrawerContext'

function MyApp({ Component, pageProps }:AppProps) {
  return ( 
  <ChakraProvider  theme={theme}>
    <SidebarDrawerPrivider>
    <Component {...pageProps} />
    </SidebarDrawerPrivider>
  </ChakraProvider>
  )
}

export default MyApp
