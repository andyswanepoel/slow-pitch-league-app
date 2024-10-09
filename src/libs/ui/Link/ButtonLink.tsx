/* eslint-disable react/display-name */
import * as React from "react";
import {
  Link as RouterLink,
  createLink,
  type LinkProps as RouterLinkProps
} from "@tanstack/react-router";
import { Button, ButtonProps } from "@chakra-ui/react";

export const ButtonLink = createLink(
  React.forwardRef(
    (
      props: RouterLinkProps & ButtonProps,
      ref: React.ForwardedRef<HTMLAnchorElement>
    ) => {
      return <Button as={RouterLink} {...props} ref={ref} preload="intent" />;
    }
  )
);
