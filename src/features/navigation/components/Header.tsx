import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Container,
  Link,
  Button
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AUTHENTICATED_LINKS, PUBLIC_LINKS } from "../navLinks";
import { TextLink, ButtonLink } from "@libs/ui";
import { useAuth } from "@libs/auth";
import { logout } from "@features/auth/api";

const AuthButtons = () => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return (
      <Button onClick={() => void logout()} marginLeft={{ md: "6" }}>
        Logout
      </Button>
    );
  }
  return (
    <>
      <ButtonLink to="/login" colorScheme="blue" marginLeft={{ md: "6" }}>
        Login
      </ButtonLink>
      <ButtonLink to="/signup" colorScheme="blue" variant="outline">
        Sign up
      </ButtonLink>
    </>
  );
};

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authenticated } = useAuth();

  const LINKS = authenticated ? AUTHENTICATED_LINKS : PUBLIC_LINKS;

  return (
    <Box bg="gray.800" color="white">
      <Container maxW="8xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link href="/" fontWeight="bold" fontSize="xl">
            TRSPL
          </Link>

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {LINKS.map(link => (
              <TextLink key={link}>{link}</TextLink>
            ))}
            <AuthButtons />
          </HStack>

          <IconButton
            size="md"
            icon={<FaBars size={20} />}
            aria-label="Open Menu"
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
          />
        </Flex>

        <Drawer size="xs" placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <HStack>
              <DrawerHeader>Menu</DrawerHeader>
              <IconButton
                size="md"
                icon={<FaTimes size={20} />}
                aria-label="Close Menu"
                display={{ base: "flex", md: "none" }}
                onClick={onClose}
                right={4}
                marginLeft="auto"
              />
            </HStack>
            <DrawerBody>
              <Stack as="nav" spacing={4}>
                {LINKS.map(link => (
                  <TextLink key={link}>{link}</TextLink>
                ))}
                <AuthButtons />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
};
