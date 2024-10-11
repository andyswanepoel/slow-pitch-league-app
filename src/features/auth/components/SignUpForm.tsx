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
import { type SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants";

interface ISignUpFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const socialLoginEnabled =
  import.meta.env.VITE_SUPABASE_SOCIAL_LOGIN_ENABLED === "true";

export const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useBoolean(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting, isSubmitted, isValid }
  } = useForm<ISignUpFormValues>();

  const onSubmit: SubmitHandler<ISignUpFormValues> = async ({
    email,
    password,
    firstName,
    lastName
  }) => {
    const { error } = await signUpUser(email, password, firstName, lastName);

    if (error) {
      setError("root.serverError", {
        type: "server_error"
      });
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
      {isSubmitted && isValid ? (
        <AccountCreated email={getValues().email} />
      ) : (
        <>
          <Box
            as="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Heading as="h2">Create your account.</Heading>
            <Text fontSize="xl" mt="2">
              Join to see stats, team standing, events, and more!
            </Text>
            <FormControl mt="4">
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                size="lg"
                borderColor={errors.firstName ? "red.500" : "gray.400"}
                paddingRight="12"
                {...register("firstName", {
                  required: "First name is required."
                })}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <Text color="red.500" role="alert">
                  {errors.firstName.message}
                </Text>
              )}
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                size="lg"
                borderColor={errors.lastName ? "red.500" : "gray.400"}
                paddingRight="12"
                {...register("lastName", {
                  required: "Last name is required."
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <Text color="red.500" role="alert">
                  {errors.lastName.message}
                </Text>
              )}
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                size="lg"
                paddingRight="12"
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

              <FormHelperText>
                We&apos;ll never share your email.
              </FormHelperText>
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
                  paddingRight="12"
                  borderColor={errors.password ? "red.500" : "gray.400"}
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value: PASSWORD_REGEX,
                      message: "Please enter a valid email address."
                    }
                  })}
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
                    showPassword ? (
                      <FaEyeSlash size="24" />
                    ) : (
                      <FaEye size="24" />
                    )
                  }
                />
              </Box>
              <FormHelperText>
                Your password should be at least 8 letters and a mix of
                lowercase, uppercase letters, digits and symbols.
              </FormHelperText>
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
                Create account
              </Button>
            </Box>
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
          {errors.root?.serverError && (
            <Box
              id="form-errors"
              role="alert"
              aria-atomic="true"
              marginTop="4"
              borderRadius="md"
            >
              <Text color="red.500">Something went wrong!</Text>
            </Box>
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
