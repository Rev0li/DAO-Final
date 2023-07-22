import { Box, Container, Text, Flex, Button } from "@chakra-ui/react";

import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Box borderTopWidth={1} borderStyle={"solid"}>
      <Container py={4} spacing={4} justify={"space-between"} align={"center"}>
        <Text>© 2023 DAO Sports. All rights reserved</Text>
        <Box>
          <Button marginX={1}>
            <FaGithub />
          </Button>
          <Button marginX={1} colorScheme="twitter">
            <FaTwitter />
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
