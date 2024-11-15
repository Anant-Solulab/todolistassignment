import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider,useAuth } from "../context/authcontext";  // Authentication Context Provider
import { ThemeProvider } from "../context/themecontext";  // Custom Theme Context Provider
import RoutesConfig from "../routes/routes";
import GlobalStyle from "../theme/styler";  // GlobalStyle for global CSS styling
import { useTheme } from "../context/themecontext";  // Custom useTheme hook

function App() {
  // Using your custom ThemeContext hook
    const {isAuthenticated} = useAuth();


    return (
        
           <>
               
                <BrowserRouter>
                    <RoutesConfig isAuthenticated={isAuthenticated} />
                </BrowserRouter>
                </>
        
    );
}

export default App;
