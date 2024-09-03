import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import CreateDeckPage from "./pages/CreateDeckPage";
import CreateCardsPage from "./pages/CreateDeckPage";
import DashBoard from "./components/DashBoard";
import EditDeckForm from "./components/EditDeckForm";
import StudyLayout from "./components/StudyLayout/StudyLayout";
import Summary from "./components/Summary";
import FrontBackCard from "./components/FrontBackCard";
import McqCard from "./components/McqCard";
import McqKidsCard from "./components/McqKidsCard/McqKidsCard";
import LoginPage from "./pages/LoginPage";
import StagingArea from "./components/StagingArea/StagingArea";
import SignUpPage from "./pages/SignUpPage";
import JoshStagingArea from "./components/Temp/JoshStaging";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />}>
        <Route path="dashboard" element={<DashBoard />} />
      </Route>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/decks/:deckId/session" element={<StudyLayout />}>
        <Route index element={<StagingArea />} />
        <Route path="front-back" element={<FrontBackCard />} />
        <Route path="mcq" element={<McqCard />} />
        <Route path="mcq-kids" element={<McqKidsCard />} />
        <Route path="summary" element={<Summary />} />
      </Route>
      <Route path="/decks/new" element={<CreateDeckPage />} />
      <Route path="/decks/:deckId/edit" element={<EditDeckForm />} />
      <Route path="/decks/:deckId/cards/new" element={<CreateCardsPage />} />
      <Route path="josh/staging" element={<JoshStagingArea />} />
    </Routes>
  );
}

export default App;
