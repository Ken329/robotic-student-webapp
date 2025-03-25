import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Figtree', sans-serif",
    body: "'Figtree', sans-serif",
  },
  colors: {
    light: {
      background: "#ffffff",
      text: "#1a202c",
    },
    dark: {
      background: "#1a202c",
      text: "#f0e7db",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark.background" : "light.background",
        color: props.colorMode === "dark" ? "dark.text" : "light.text",
      },
    }),
  },
});

export default theme;
