import * as React from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useAuth } from "@libs/auth";

export const AuthLoadingScreen: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { loaded } = useAuth();
  if (!loaded) {
    return (
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
        bg="gray.50"
      >
        <Spinner size="xl" thickness="4px" color="teal.500" />
        <Text mt={4} fontSize="lg" color="gray.600">
          Loading...
        </Text>
      </Flex>
    );
  }

  return <>{children}</>;
};
