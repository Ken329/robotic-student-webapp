import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
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
      // Hide the page scrollbar (scrolling still works) so it can't shift or
      // clip the layout when content height changes between pages.
      "html, body": {
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      },
      "html::-webkit-scrollbar, body::-webkit-scrollbar": {
        display: "none",
      },
      body: {
        bg: props.colorMode === "dark" ? "dark.background" : "light.background",
        color: props.colorMode === "dark" ? "dark.text" : "light.text",
      },
    }),
  },
});

export default theme;
