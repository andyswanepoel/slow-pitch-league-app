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
  Container
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LINKS } from "../navLinks";
import { TextLink } from "../../auth/components/TextLink";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.800" color="white">
      <Container maxW="8xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box as="a" href="#" fontWeight="bold" fontSize="xl">
            Your Logo
          </Box>

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {LINKS.map(link => (
              <TextLink key={link}>{link}</TextLink>
            ))}
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
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
};
