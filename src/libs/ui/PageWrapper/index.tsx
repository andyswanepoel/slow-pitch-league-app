import { Container } from "@chakra-ui/react";
import * as React from "react";

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <Container maxW="8xl" py="8">
    {children}
  </Container>
);
