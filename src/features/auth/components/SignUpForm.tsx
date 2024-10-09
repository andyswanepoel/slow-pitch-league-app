import * as React from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
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
import type { AuthError } from "@supabase/supabase-js";

import { TextLink } from "@libs/ui";
import { signUpUser } from "../api";
import { AccountCreated } from "./AccountCreated";

const socialLoginEnabled =
  import.meta.env.VITE_SUPABASE_SOCIAL_LOGIN_ENABLED === "true";

export const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useBoolean(false);
  const [, setServerErrors] = React.useState<AuthError | null>(null);
  const [complete, setComplete] = React.useState(false);

  // Probably want to use a form library here to deal with edge cases, etc.
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleSignUp = async () => {
    // Probably want to do something with these returned values, put them in an error arrays, etc.
    const { data, error } = await signUpUser(
      email,
      password,
      firstName,
      lastName
    );

    if (data.user) {
      setComplete(true);
    }
    if (error) {
      setServerErrors(error);
    }
  };

  return (
    <Container
      maxW={["100%", "100%", "2xl"]}
      my={["0", "0", "8"]}
      backgroundColor="white"
      p="10"
      rounded="md"
    >
      {complete ? (
        <AccountCreated email={email} />
      ) : (
        <>
          <Heading as="h2">Create your account.</Heading>
          <Text fontSize="xl" mt="2">
            Join to see stats, team standing, events, and more!
          </Text>
          <FormControl mt="4">
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              size="lg"
              borderColor="gray.400"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Last name</FormLabel>
            <Input
              type="text"
              size="lg"
              borderColor="gray.400"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </FormControl>

          <FormControl mt="4">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              size="lg"
              borderColor="gray.400"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormHelperText>We&apos;ll never share your email.</FormHelperText>
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
                icon={
                  showPassword ? <FaEyeSlash size="24" /> : <FaEye size="24" />
                }
              />
            </Box>
            <FormHelperText>
              Your password should be at least 8 letters and a mix of lowercase,
              uppercase letters, digits and symbols.
            </FormHelperText>
          </FormControl>
          <Box mt="8">
            <Button
              width="100%"
              size="lg"
              colorScheme="blue"
              onClick={() => void handleSignUp()}
            >
              Create account
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
                  <Text fontWeight={400}>Sign up with Google</Text>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="gray.400"
                  minW={["100%", "50%"]}
                >
                  <Icon as={FaFacebook} marginRight={2} />
                  <Text fontWeight={400}>Sign up with Facebook</Text>
                </Button>
              </HStack>
            </>
          )}
          <Box mt="8" textAlign="center">
            <Text>Already have an account?</Text>
            <TextLink to="/login">Log in here.</TextLink>
          </Box>
        </>
      )}
    </Container>
  );
};
