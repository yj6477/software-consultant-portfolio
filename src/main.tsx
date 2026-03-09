
  import { createRoot } from "react-dom/client"; //load function React
  import App from "./app/App.tsx";
  import "./styles/index.css"; //load global styles. CSS rules that apply to the whole site

  createRoot(document.getElementById("root")!).render(<App />);

  /*Notes:
    1. Import React's mountin tool 'createRoot'
    2. Import the main UI component 'App'
    3. Import global styles
    4. Tell React to display the app inside the page */