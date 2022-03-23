import { Avatar, Box, Flex, Text } from "@chakra-ui/react";


export function Profile (){
    return(
        <Flex align="center">
        <Box mr="4" textAlign="right">
          <Text>Luciano JR</Text>
          <Text color="gray.300" fontSize="small">luciano@github.com</Text>
        </Box>

        <Avatar size="md" name="LJ" src="https://avatars.githubusercontent.com/u/67230056?s=400&u=5a96831188a73f22640dc05eb1f91bb480eca11a&v=4" />
      </Flex>
    )
}