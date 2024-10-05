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
  AbsoluteCenter
} from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

import { TextLink } from "./TextLink";

const socialLoginEnabled = import.meta.env.VITE_SUPABASE_SOCIAL_LOGIN_ENABLED;

export const SignUpForm = () => {
  return (
    <Container my="8" backgroundColor="white" p="10" rounded="md">
      <Heading as="h2">Create your account.</Heading>
      <Text fontSize="xl">
        Join to see stats, team standing, events, and more!
      </Text>
      <FormControl mt="4">
        <FormLabel>Email address</FormLabel>
        <Input type="email" borderColor="gray.400" />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mt="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" borderColor="gray.400" />
        <FormHelperText>
          Your password should be at least 8 letters and a mix of lowercase,
          uppercase letters, digits and symbols.
        </FormHelperText>
      </FormControl>
      <Box mt="8">
        <Button colorScheme="teal">Create account</Button>
      </Box>
      {socialLoginEnabled && (
        <>
          <Box position="relative" my="8">
            <Divider borderColor="gray.400" />
            <AbsoluteCenter backgroundColor="white" px="4">
              or
            </AbsoluteCenter>
          </Box>
          <HStack mt="4" justify="center">
            <Button variant="outline" borderColor="gray.400" minW="50%">
              <Icon as={FaGoogle} marginRight={2} />
              <Text fontWeight={400}>Sign up with Google</Text>
            </Button>
            <Button variant="outline" borderColor="gray.400" minW="50%">
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
    </Container>
  );
};
