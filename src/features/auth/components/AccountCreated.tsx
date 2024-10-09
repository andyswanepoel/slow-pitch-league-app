import { Button, Heading, Text } from "@chakra-ui/react";
import { resendConfirmationEmail } from "../api";
import React from "react";

interface IAccountCreated {
  email: string;
}

export const AccountCreated: React.FC<IAccountCreated> = ({ email }) => {
  const [sendError, setSendError] = React.useState(false);

  const handleResendConfirmationEmail = async () => {
    // Probably want to do something with these returned values, put them in an error arrays, etc.
    const { error } = await resendConfirmationEmail(email);

    if (error) {
      setSendError(true);
    }
  };

  return (
    <>
      <Heading as="h2">Account created!</Heading>
      <Text fontSize="xl" mt="2">
        You&apos;re almost there!
      </Text>
      <Text mt="4">
        We&apos;ve sent a confirmation email to the address you provided. Please
        check your inbox (and spam folder, just in case) and click the link to
        verify your email address. If you don&apos;t see the email after a few
        minutes, try resending it.
      </Text>
      <Button
        mt="4"
        width="100%"
        size="lg"
        colorScheme="blue"
        onClick={() => void handleResendConfirmationEmail()}
      >
        Resend email
      </Button>
      {sendError && (
        <Text mt="4" color="red.600">
          There was an issue resending the email.
        </Text>
      )}
    </>
  );
};
