/* eslint-disable react/display-name */
import * as React from "react";
import {
  Link as RouterLink,
  createLink,
  type LinkProps as RouterLinkProps
} from "@tanstack/react-router";
import { Link, LinkProps } from "@chakra-ui/react";

export const TextLink = createLink(
  React.forwardRef(
    (
      props: RouterLinkProps & LinkProps,
      ref: React.ForwardedRef<HTMLAnchorElement>
    ) => {
      return (
        <Link
          textDecoration="underline"
          _hover={{ textDecoration: "none" }}
          _focus={{ textDecoration: "none" }}
          as={RouterLink}
          {...props}
          ref={ref}
          preload="intent"
        />
      );
    }
  )
);
