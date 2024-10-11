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
import { resendConfirmationEmail } from "../api";
import { SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../constants";

interface IResendConfirmationEmailFormValues {
  email: string;
}

export const ResendConfirmationEmail: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<IResendConfirmationEmailFormValues>();

  const onSubmit: SubmitHandler<IResendConfirmationEmailFormValues> = async ({
    email
  }) => {
    const { error } = await resendConfirmationEmail(email);

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
      as="form"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Heading as="h2">Resend your confirmation email.</Heading>
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
      <Box mt="8">
        <Button
          isLoading={isSubmitting}
          width="100%"
          size="lg"
          colorScheme="blue"
          type="submit"
        >
          Resend email
        </Button>
      </Box>
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
        <TextLink to="/login">Log in here.</TextLink>
      </Box>
    </Container>
  );
};
