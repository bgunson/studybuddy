import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { WelcomePage } from "../pages/WelcomePage";

import { DashboardPage } from '../pages/DashboardPage';

import { TodoItemsPage } from "../pages/TodoItemsPage";
import { HomePage } from "../pages/HomePage";
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import { appId } from "../realm.json";
import "./App.css";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import { ChatPage } from '../pages/chat/ChatPage';
import { ChatRooms } from '../pages/ChatRooms';
import { Routes, Route, Link } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";

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
      {currentUser ? 
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/chatrooms" element={<ChatRooms/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<WelcomePage />} />
      </Routes> : <WelcomePage />}
    </div>
  );
}
