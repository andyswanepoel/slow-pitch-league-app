import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  Flex
} from "@chakra-ui/react";
import { TextLink } from "@libs/ui";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { PUBLIC_LINKS as LINKS } from "../navLinks";

export const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={10}>
      <Container maxW="8xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
        >
          {/* Navigation Links */}
          <Stack direction="column" spacing={4} mb={{ base: 6, md: 0 }}>
            {LINKS.map(link => (
              <TextLink key={link}>{link}</TextLink>
            ))}
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={4}>
            <IconButton
              as="a"
              href="#"
              target="_blank"
              aria-label="Twitter"
              icon={<FaTwitter />}
              bg="gray.500"
              _hover={{ bg: "gray.400" }}
              isRound
            />

            <IconButton
              as="a"
              href="#"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              bg="gray.500"
              _hover={{ bg: "gray.400" }}
              isRound
            />
          </Stack>
        </Flex>

        {/* Copyright Text */}
        <Text textAlign="center" mt={6} fontSize="sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};
