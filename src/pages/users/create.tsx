import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";


export default function CreateUser(){
    const router = useRouter()

    const createUser = useMutation(async(user:any)=>{
       
        const response = await api.post('users',{
            user:{
                ///...user,
                name:'luciano2',
                email:'luciano2@teste.com',
                created_at:new Date(),
            }
        })
        return response.data.user;
    },{
        onSuccess:()=>{queryClient.invalidateQueries(['users'])}
    })

    return(
        <Box>
            <Header/>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />
                <Box flex="1" borderRadius={8} bg="gray.800" p={["6","8"]}>
                    <Heading size="lg" fontWeight="normal" >Criar usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%" >
                            <Input name="name" label="Nome completo"/>                 
                            <Input name="e" label="Nome completo"/>                 
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%" >
                            <Input name="password" type="password" label="Senha"/>                 
                            <Input name="password_confirmation" type="password" label="Confirmação da senha"/>                 
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                           <Link href='/users' passHref>
                           <Button  as='a' colorScheme="whiteAlpha">Cancelar</Button>
                           </Link>
                            <Button onClick={async ()=>{
                                await createUser.mutateAsync('user')
                                router.push('users')
                            }} colorScheme="pink">Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}