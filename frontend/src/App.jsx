import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateDeckPage from "./pages/CreateDeckPage";
import CreateCardsPage from "./pages/CreateDeckPage";
import DashBoard from "./components/Dashboard/DashBoard";
import EditDeckForm from "./components/EditDeckForm";
import StudyLayout from "./components/StudyLayout/StudyLayout";
import Summary from "./components/Summary/Summary";
import FrontBackCard from "./components/FrontBackCard/FrontBackCard";
import McqCard from "./components/McqCard";
import McqKidsCard from "./components/McqKidsCard/McqKidsCard";
import LoginPage from "./pages/LoginPage/LoginPage";
import StagingArea from "./components/StagingArea/StagingArea";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import JoshStagingArea from "./components/Temp/JoshStaging";

const mockUser = {
  id: "66d6a9f4c379f471b1db852b",
  userName: "hello",
  email: "hello@gmail.com",
  role: "user",
  __v: 0,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />}>
        <Route path="dashboard" element={<DashBoard />} />
      </Route>
      <Route path="/profile" element={<ProfilePage user={mockUser} />} />
      <Route path="/decks/:deckId/session" element={<StudyLayout />}>
        {/* done */}
        <Route index element={<StagingArea />} /> {/* done */}
        <Route path="front-back" element={<FrontBackCard />} />
        <Route path="mcq" element={<McqCard />} /> {/* done */}
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
