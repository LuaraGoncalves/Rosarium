import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./providers/ThemeProvider";
export default function App() {
    return (_jsx(ThemeProvider, { defaultTheme: "light", storageKey: "vite-ui-theme", children: _jsx(RouterProvider, { router: router }) }));
}
