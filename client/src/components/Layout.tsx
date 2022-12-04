import { Box, ChakraProvider, Grid, theme } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        {children}
      </Grid>
    </Box>
  </ChakraProvider>
);
