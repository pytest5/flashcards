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
import JoshStagingArea from "./components/Temp/JoshStaging"

const mockUser = {
  "_id": "66d17ae8e1a667e4592afeea",
  "userName": "test",
  "email": "josh1@test.com",
  "role": "user",
  "__v": 0
}

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
