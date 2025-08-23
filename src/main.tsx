import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes.tsx";
import { Toaster } from "sonner";
import Loading from "./components/loading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Suspense fallback={<Loading fullScreen={true} variant="bars" />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
