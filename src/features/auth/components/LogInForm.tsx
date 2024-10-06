import * as React from "react";

import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  HStack,
  Icon,
  Divider,
  AbsoluteCenter,
  useBoolean,
  IconButton
} from "@chakra-ui/react";
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

import { TextLink } from "./TextLink";
import { logInUserWithPassword } from "../api";

const socialLoginEnabled =
  import.meta.env.VITE_SUPABASE_SOCIAL_LOGIN_ENABLED === "true";

export const LogInForm = () => {
  const [showPassword, setShowPassword] = useBoolean(false);

  // Probably want to use a form library here to deal with edge cases, etc.
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogIn = async () => {
    // Probably want to do something with these returned values, put them in an error arrays, etc.
    await logInUserWithPassword(email, password);
  };

  return (
    <Container
      maxW={["100%", "100%", "2xl"]}
      my={["0", "0", "8"]}
      backgroundColor="white"
      p="10"
      rounded="md"
    >
      <Heading as="h2">Log in to your account.</Heading>
      <FormControl mt="4">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          size="lg"
          borderColor="gray.400"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mt="4">
        <FormLabel>Password</FormLabel>
        <Box position="relative">
          <Input
            type={showPassword ? "text" : "password"}
            size="lg"
            borderColor="gray.400"
            paddingRight="12"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <IconButton
            onClick={setShowPassword.toggle}
            size="sm"
            backgroundColor="white"
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            right="2"
            aria-label={showPassword ? "Hide password" : "Show password"}
            icon={showPassword ? <FaEyeSlash size="24" /> : <FaEye size="24" />}
          />
        </Box>
      </FormControl>
      <Box mt="8">
        <Button
          width="100%"
          size="lg"
          colorScheme="blue"
          onClick={() => void handleLogIn()}
        >
          Log in to account
        </Button>
      </Box>
      {socialLoginEnabled && (
        <>
          <Box position="relative" my="8">
            <Divider borderColor="gray.400" />
            <AbsoluteCenter backgroundColor="white" px="4">
              or
            </AbsoluteCenter>
          </Box>
          <HStack mt="4" justify="center" wrap="wrap">
            <Button
              size="lg"
              variant="outline"
              borderColor="gray.400"
              minW={["100%", "50%"]}
            >
              <Icon as={FaGoogle} marginRight={2} />
              <Text fontWeight={400}>Log in with Google</Text>
            </Button>
            <Button
              size="lg"
              variant="outline"
              borderColor="gray.400"
              minW={["100%", "50%"]}
            >
              <Icon as={FaFacebook} marginRight={2} />
              <Text fontWeight={400}>Log in with Facebook</Text>
            </Button>
          </HStack>
        </>
      )}

      <Box mt="8" textAlign="center">
        <Text>Don&apos;t have an account?</Text>
        <TextLink to="/signup">Sign up here.</TextLink>
      </Box>
    </Container>
  );
};
