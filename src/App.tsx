import { ChakraProvider } from "@chakra-ui/react";

import { customTheme } from "./theme";
import { AuthProvider } from "./libs/auth/AuthContext";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthLoadingScreen } from "@features/auth";

// Create a new router instance
const router = createRouter({
  routeTree
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <AuthLoadingScreen>
          <RouterProvider router={router} />{" "}
        </AuthLoadingScreen>
      </AuthProvider>
    </ChakraProvider>
  );
};
