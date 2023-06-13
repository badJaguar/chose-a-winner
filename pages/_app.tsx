import { SessionProvider } from "next-auth/react";
import "./styles.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import createEmotionCache from "../mui/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../mui/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; }> & { emotionCache?: EmotionCache; }) {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider
        refetchOnWindowFocus={true}
        session={session}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}
