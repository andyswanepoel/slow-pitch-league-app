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

import { TextLink } from "@libs/ui";
import { logInUserWithPassword, resendConfirmationEmail } from "../api";

const socialLoginEnabled =
  import.meta.env.VITE_SUPABASE_SOCIAL_LOGIN_ENABLED === "true";

interface ILoginFormValues {
  email: string;
  password: string;
}
interface IErrorMessagesProps extends ILoginFormValues {
  serverError: string;
}

interface IServerErrorMessages {
  code: string;
  message: (formValues: ILoginFormValues) => JSX.Element;
}

// @TODO: refactor into separate components
const SERVER_ERROR_MESSAGES: IServerErrorMessages[] = [
  {
    code: "email_not_confirmed",
    message: formValues => (
      <>
        <Text color="red.500">You haven&apos;t confirmed your email. </Text>
        <Button
          marginTop="2"
          size="md"
          variant="outline"
          colorScheme="gray"
          onClick={() => void resendConfirmationEmail(formValues.email)}
        >
          Send the confirmation email again
        </Button>
      </>
    )
  },
  {
    code: "invalid_credentials",
    message: () => (
      <Text color="red.500">
        Incorrect email and password combination. You can{" "}
        <TextLink to="/signup">sign up</TextLink> or{" "}
        <TextLink>reset your password</TextLink>, if needed.
      </Text>
    )
  }
];

const ErrorMessage: React.FC<IErrorMessagesProps> = ({
  serverError,
  email,
  password
}) => {
  if (!serverError) {
    return null;
  }

  const error = SERVER_ERROR_MESSAGES.find(error => error.code === serverError);

  return (
    <Box marginTop="4" padding="4" borderRadius="md" textAlign="center">
      {error ? (
        error.message({ email, password })
      ) : (
        <Text color="red.500">Something went wrong!</Text>
      )}
    </Box>
  );
};
export const LogInForm = () => {
  const [showPassword, setShowPassword] = useBoolean(false);
  const [serverError, setServerError] = React.useState("");

  console.log("@@@serverError: ", serverError);
  // Probably want to use a form library here to deal with edge cases, etc.
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogIn = async () => {
    // Probably want to do something with these returned values, put them in an error arrays, etc.
    const { error } = await logInUserWithPassword(email, password);

    if (error) {
      console.log(error.code);
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
      <Box id="form-errors" role="alert" aria-atomic="true">
        <ErrorMessage
          serverError={serverError}
          email={email}
          password={password}
        />
      </Box>

      <Box mt="8" textAlign="center">
        <Text>Don&apos;t have an account?</Text>
        <TextLink to="/signup">Sign up here.</TextLink>
      </Box>
    </Container>
  );
};
