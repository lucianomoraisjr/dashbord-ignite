import {  Icon, Text, Link, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";



interface NavLinkProrps extends ChakraLinkProps{
    icon :ElementType,
    children:string
}
export function NavLink({icon,children,...rest}:NavLinkProrps) {
    return (
        <Link display="flex" alignItems='center' {...rest}>
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">{children}</Text>
        </Link>

    )
}