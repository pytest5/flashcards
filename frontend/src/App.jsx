import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import CreateDeckPage from "./pages/CreateDeckPage";
import CreateCardsPage from "./pages/CreateDeckPage";
import DashBoard from "./components/DashBoard";
import EditDeckForm from "./components/EditDeckForm";
import StudyPage from "./pages/StudyPage";
import Summary from "./components/Summary";
import FrontBackCard from "./components/FrontBackCard";
import McqCard from "./components/McqCard";
import McqKidsCard from "./components/McqKidsCard";
import LoginPage from "./pages/LoginPage";
import StagingPage from "./pages/StagingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />}>
        <Route path="dashboard" element={<DashBoard />} />
      </Route>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/decks/:deckId/staging" element={<StagingPage />} />
      <Route path="/decks/:deckId/session" element={<StudyPage />}>
        <Route path="front-back" element={<FrontBackCard />} /> {/* here */}
        <Route path="mcq" element={<McqCard />} />
        <Route path="mcq-kids" element={<McqKidsCard />} /> {/* zac */}
        <Route path="summary" element={<Summary />} />
      </Route>
      <Route path="/decks/new" element={<CreateDeckPage />} />
      <Route path="/decks/:deckId/edit" element={<EditDeckForm />} />
      <Route path="/decks/:deckId/cards/new" element={<CreateCardsPage />} />
    </Routes>
  );
}

/*  <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes> */

export default App;
