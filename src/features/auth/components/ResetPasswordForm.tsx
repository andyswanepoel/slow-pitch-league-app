import * as React from "react";

import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container
} from "@chakra-ui/react";

import { TextLink } from "@libs/ui";
import { resetPassword } from "../api";

interface IErrorMessagesProps {
  serverError: string;
}

const ErrorMessage: React.FC<IErrorMessagesProps> = ({ serverError }) => {
  if (!serverError) {
    return null;
  }

  return (
    <Box marginTop="4" padding="4" borderRadius="md" textAlign="center">
      <Text color="red.500">Something went wrong!</Text>
    </Box>
  );
};
export const ResetPasswordForm = () => {
  const [serverError, setServerError] = React.useState("");

  // Probably want to use a form library here to deal with edge cases, etc.
  const [email, setEmail] = React.useState("");

  const handleResetPassword = async () => {
    // Probably want to do something with these returned values, put them in an error arrays, etc.
    const { error } = await resetPassword(email);

    if (error) {
      setServerError(error.code ?? "unknown_error");
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
      <Heading as="h2">Reset your password.</Heading>
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
      <Box mt="8">
        <Button
          width="100%"
          size="lg"
          colorScheme="blue"
          onClick={() => void handleResetPassword()}
        >
          Log in to account
        </Button>
      </Box>

      <Box id="form-errors" role="alert" aria-atomic="true">
        <ErrorMessage serverError={serverError} />
      </Box>

      <Box mt="8" textAlign="center">
        <TextLink to="/login">Log in here.</TextLink>
      </Box>
    </Container>
  );
};
