import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { theme } from "../chakra/theme";
import { client } from "../graphql/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <DarkMode>
            <Component {...pageProps} />
            <Toaster />
          </DarkMode>
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
