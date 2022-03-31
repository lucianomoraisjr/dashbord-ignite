import {
  Button,
  Heading,
  Box,
  Flex,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Link
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useQuery } from 'react-query'
import { useEffect, useState } from "react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { GetServerSideProps } from "next";

type User = {
  id:string
  name:string
  email:string
  created_at:string
}

type getUsersResponse= {
 
  users:User[]

}

interface IUseUsers {

  isLoading:boolean
  isFetching:boolean
  error:any
  
}


export default function UserList({users}:getUsersResponse) {
  const [page,setPage]=useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page,{
    initialData:users
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })


  async function handlePrefetchUser(userId:string){
        await queryClient.prefetchQuery(['user',userId], async ()=>{
          const response = await api.get(`users/${userId}`)
          return response.data
        },{
          staleTime:1000*60*10 //10minutos
        })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários
              {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>
            <NextLink href='/users/create' passHref>
              <Button as="a" size="sm" fontSize="small" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? <Flex justify='center'>
            <Spinner />
          </Flex>
            : error ? <><Flex justify='center'><Heading color='red'>Erro</Heading></Flex></>
              : <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && (<Th>Data de cadastro</Th>)}
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.users.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]} >
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color='purple.400' onMouseEnter={()=>handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="small" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.created_at}</Td>}
                        <Td>
                          <Button as="a" size="sm" fontSize="small" colorScheme="purple" leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                            Editar
                          </Button>
                        </Td>
                      </Tr>

                    ))}
                  </Tbody>
                </Table>

                <Pagination  totalCountOfRegisters={data.totalCount}
                onPageChange={setPage}
                currentPage={page}/>

              </>}
        </Box>
      </Flex>
    </Box>
  )
}


export const getServerSideProrps:GetServerSideProps = async () =>{
  const {users}:getUsersResponse = await getUsers(1)

  return{
    props:{
      users, 
    }
  }
}