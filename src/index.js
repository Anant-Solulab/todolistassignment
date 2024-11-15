import {createRoot}from "react-dom/client";
import App from "./component/app";
import { AuthProvider } from "./context/authcontext";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/styler";

const root = createRoot(document.getElementById("root"));

root.render(
    <AuthProvider>  
       
    <App/>
    </AuthProvider>
)