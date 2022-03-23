import { useBreakpointValue, useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";


interface SidebarDrawerProviderProps {
    children:ReactNode
}
type SidebarDrawerContextData= UseDisclosureReturn
const SidebarDrawerContext =  createContext({}as SidebarDrawerContextData);

export function SidebarDrawerPrivider({children}:SidebarDrawerProviderProps){
    const disclosure = useDisclosure()
    const router =  useRouter()
    const isWideVersion = useBreakpointValue({
        base: false,
        lg:true
    })
    useEffect(()=>{
        disclosure.onClose()
    },[router.asPath,isWideVersion])
    return(
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = ()=> useContext(SidebarDrawerContext)