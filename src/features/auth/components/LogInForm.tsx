import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
import { logInUserWithPassword } from "../api";
import { EMAIL_REGEX } from "../constants";

const socialLoginEnabled =
  import.meta.env.VITE_SUPABASE_SOCIAL_LOGIN_ENABLED === "true";

interface ILoginFormValues {
  email: string;
  password: string;
}

export const LogInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useBoolean(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<ILoginFormValues>();

  const onSubmit: SubmitHandler<ILoginFormValues> = async ({
    email,
    password
  }) => {
    const { error } = await logInUserWithPassword(email, password);

    if (error) {
      setError("root.serverError", {
        type: error.code ?? "server_error"
      });
    }
  };

  return (
    <Container maxW={["100%", "100%", "2xl"]} py={["0", "0", "8"]}>
      <Box
        p="10"
        rounded="md"
        as="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        backgroundColor="white"
      >
        <Heading as="h2">Log in to your account.</Heading>
        <FormControl mt="4">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            size="lg"
            borderColor={errors.email ? "red.500" : "gray.400"}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email address."
              }
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <Text color="red.500" role="alert">
              {errors.email.message}
            </Text>
          )}
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Password</FormLabel>
          <Box position="relative">
            <Input
              type={showPassword ? "text" : "password"}
              size="lg"
              borderColor={errors.password ? "red.500" : "gray.400"}
              paddingRight="12"
              {...register("password", { required: "Password is required." })}
              aria-invalid={errors.password ? "true" : "false"}
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
          {errors.password && (
            <Text color="red.500" role="alert">
              {errors.password.message}
            </Text>
          )}
        </FormControl>
        <Box mt="8">
          <Button
            isLoading={isSubmitting}
            width="100%"
            size="lg"
            colorScheme="blue"
            type="submit"
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
        {errors.root?.serverError && (
          <Box
            id="form-errors"
            role="alert"
            aria-atomic="true"
            marginTop="4"
            borderRadius="md"
          >
            {errors.root?.serverError.type === "server_error" && (
              <Text color="red.500">Something went wrong!</Text>
            )}
            {errors.root?.serverError.type === "invalid_credentials" && (
              <>
                <Text color="red.500">
                  Incorrect email and password combination.
                </Text>
                <Text color="red.500">
                  <TextLink to="/reset-password">Reset your password.</TextLink>
                </Text>
              </>
            )}
            {errors.root?.serverError.type === "email_not_confirmed" && (
              <>
                <Text color="red.500">
                  You haven&apos;t confirmed your email.
                </Text>
                <Text color="red.500">
                  <TextLink to="/confirm-email">
                    Resend confirmation email.
                  </TextLink>
                </Text>
              </>
            )}
          </Box>
        )}

        <Box mt="8" textAlign="center">
          <Text>Don&apos;t have an account?</Text>
          <TextLink to="/signup">Sign up here.</TextLink>
        </Box>
      </Box>
    </Container>
  );
};
