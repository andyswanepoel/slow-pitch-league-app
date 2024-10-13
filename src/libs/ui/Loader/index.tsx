import { AbsoluteCenter, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <AbsoluteCenter>
      <Spinner size="xl" thickness="4px" color="teal.500" />
    </AbsoluteCenter>
  );
};
