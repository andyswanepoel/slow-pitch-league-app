import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.200"
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue"
      }
    }
  }
});
