import {  Icon, Text, Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import Link from "next/link";
import { ElementType } from "react";



interface NavLinkProrps extends ChakraLinkProps{
    icon :ElementType,
    children:string
    href:string
}
export function NavLink({href, icon,children,...rest}:NavLinkProrps) {
    return (
       <Link href={href} passHref >
        <ChakraLink display="flex" alignItems='center' {...rest}>
            
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">{children}</Text>
        </ChakraLink>
       </Link>

    )
}