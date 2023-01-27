import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const custom = {
  colors: {
    brand: {
      100: "#3d84f7",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#2D313C",
        color: "#F7FAFC",
      },
    },
    ...config,
  },
};
export const theme = extendTheme(custom);
