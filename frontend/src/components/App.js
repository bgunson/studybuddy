import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { WelcomePage } from "../pages/WelcomePage";
import { TodoItemsPage } from "../pages/TodoItemsPage";
import { LandingPage } from "../pages/LandingPage";
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import { appId } from "../realm.json";
import "./App.css";
import { ResponsiveAppBar } from "./ResponsiveAppBar";

export default function AppWithRealm() {
  return (
    <ThemeProvider>
      <RealmAppProvider appId={appId}>
        <App />
      </RealmAppProvider>
    </ThemeProvider>
  );
}

function App() {
  const { currentUser, logOut } = useRealmApp();
  return (
    <div className="App">
      <ResponsiveAppBar/>
     {/* <AppBar position="sticky"> */}
          {/* <AppName />
          {currentUser ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                await logOut();
              }}
            >
              <Typography variant="button">Log Out</Typography>
            </Button>
          ) : null} */}
      {/* </AppBar> */}
      {currentUser ? <LandingPage /> : <WelcomePage />}
    </div>
  );
}
