import { Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout/HomeLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateDeckPage from "./pages/CreateDeckPage/CreateDeckPage";
import CreateCardsPage from "./pages/CreateCardsPage/CreateCardsPage";
import DashBoard from "./components/Dashboard/DashBoard";
import EditDeckForm from "./components/EditDeckForm";
import StudyLayout from "./components/StudyLayout/StudyLayout";
import Summary from "./components/Summary/Summary";
import FrontBackCard from "./components/FrontBackCard/FrontBackCard";
import McqCard from "./components/McqCard";
import McqKidsCard from "./components/McqKidsCard/McqKidsCard";
import LoginPage from "./pages/LoginPage/LoginPage";
import StagingArea from "./components/StagingArea/StagingArea";
import HomeContent from "./components/HomeContent/HomeContent";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import JoshStagingArea from "./components/Temp/JoshStaging";
import DynamicForm from "./components/DynamicForm/DynamicForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* styled */}
      <Route path="/signup" element={<SignUpPage />} /> {/* styled */}
      <Route path="/login" element={<LoginPage />} /> {/* styled */}
      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<HomeContent />} /> {/* styled */}
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/decks/:deckId/session" element={<StudyLayout />}>
        {/* styled but some functions not done*/}
        <Route index element={<StagingArea />} /> {/* done */}
        <Route path="front-back" element={<FrontBackCard />} />
        <Route path="mcq" element={<McqCard />} /> {/* done */}
        <Route path="mcq-kids" element={<McqKidsCard />} />
        <Route path="summary" element={<Summary />} /> {/* styled */}
      </Route>
      <Route path="/decks/new" element={<CreateDeckPage />} />
      <Route path="/decks/:deckId/edit" element={<DynamicForm />} />
      <Route path="/decks/:deckId/new" element={<CreateCardsPage />} />
      <Route path="josh/staging" element={<JoshStagingArea />} />
    </Routes>
  );
}

export default App;
