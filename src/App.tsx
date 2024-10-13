import { ChakraProvider } from "@chakra-ui/react";

import { customTheme } from "./theme";
import { AuthProvider } from "@libs/auth";
import { AuthLoadingScreen } from "@features/auth";
import { RouterProviderWithContext } from "@features/routing";
import { ViewportHeightProvider } from "@contexts/ViewportHeightContext";

export const App = () => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <AuthProvider>
        <AuthLoadingScreen>
          <ViewportHeightProvider>
            <RouterProviderWithContext />
          </ViewportHeightProvider>
        </AuthLoadingScreen>
      </AuthProvider>
    </ChakraProvider>
  );
};
