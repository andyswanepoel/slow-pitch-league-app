import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  Flex
} from "@chakra-ui/react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { TextLink } from "@libs/ui";
import { useAuth } from "@libs/auth";
import { PUBLIC_LINKS, AUTHENTICATED_LINKS } from "../navLinks";
import { useViewportHeight } from "@contexts/ViewportHeightContext";

export const Footer: React.FC = () => {
  const { authenticated } = useAuth();
  const { setFooterHeight } = useViewportHeight();

  const footerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!footerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setFooterHeight(entry.target.clientHeight);
      }
    });
    resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [setFooterHeight]);

  const LINKS = authenticated ? AUTHENTICATED_LINKS : PUBLIC_LINKS;
  return (
    <Box bg="gray.800" color="white" py={10} ref={footerRef}>
      <Container maxW="8xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="flex-start"
        >
          {/* Navigation Links */}
          <Stack direction="column" spacing={4} mb={{ base: 6, md: 0 }}>
            {LINKS.map(link => (
              <TextLink to={link.to} key={link.id}>
                {link.displayName}
              </TextLink>
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

        <Text textAlign={{ base: "left", md: "center" }} mt={6} fontSize="sm">
          © {new Date().getFullYear()} All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};
