import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import BecomeFreelancerPage from "./pages/BecomeFreelancerPage";
import CreateGigPage from "./pages/CreateGigPage";
import MyGigsPage from "./pages/MyGigsPage";
import GigDetailPage from "./pages/GigDetailPage";
import EditGigPage from "./pages/EditGigPage";
import ExploreGigsPage from "./pages/ExploreGigsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import ExploreProjectsPage from "./pages/ExploreProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import EditProjectPage from "./pages/EditProjectPage";
import ApplyProjectPage from "./pages/ApplyProjectPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ProjectApplicationsPage from "./pages/ProjectApplicationsPage";
import ReceivedProposalsPage from "./pages/ReceivedProposalsPage";
import SentProposalsPage from "./pages/SentProposalsPage";
import UserProfilePage from "./pages/UserProfilePage";
import FriendsPage from "./pages/FriendsPage";
import SentRequestsPage from "./pages/SentRequestsPage";
import ReceivedRequestsPage from "./pages/ReceivedRequestsPage";
import FriendWorkspacePage from "./pages/FriendWorkspacePage";
import InviteFriendPage from "./pages/InviteFriendPage";
import WorkspaceListPage from "./pages/WorkspaceListPage";
import WorkspacePage from "./pages/WorkspacePage";
import EditProfilePage from "./pages/EditProfilePage";

import ProtectedRoute from "./routes/ProtectedRoute";
import FreelancerRoute from "./routes/FreelancerRoute";


function App() {

    const { user } = useContext(AuthContext);
    
    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={
                        user
                            ? <DashboardPage />
                            : <LandingPage />
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>

                            <DashboardPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>

                            <ProfilePage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/become-freelancer"
                    element={
                        <ProtectedRoute>

                            <BecomeFreelancerPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-gig"
                    element={
                        <FreelancerRoute>

                            <CreateGigPage />

                        </FreelancerRoute>
                    }
                />

                <Route
                    path="/my-gigs"
                    element={
                        <FreelancerRoute>

                            <MyGigsPage />

                        </FreelancerRoute>
                    }
                />

                <Route
                    path="/gigs/:id/edit"
                    element={
                        <FreelancerRoute>
                            <EditGigPage />
                        </FreelancerRoute>
                    }
                />

                <Route
                    path="/gigs"
                    element={<ExploreGigsPage />}
                />

                <Route
                    path="/gigs/:id"
                    element={<GigDetailPage />}
                />

                <Route
                    path="/projects"
                    element={<ExploreProjectsPage />}
                />

                <Route
                    path="/projects/:id"
                    element={<ProjectDetailPage />}
                />

                <Route
                    path="/create-project"
                    element={
                        <ProtectedRoute>
                            <CreateProjectPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-projects"
                    element={
                        <ProtectedRoute>
                            <MyProjectsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/:id/edit"
                    element={
                        <ProtectedRoute>

                            <EditProjectPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/:id/apply"
                    element={
                        <ProtectedRoute>
                            <ApplyProjectPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-applications"
                    element={
                        <ProtectedRoute>
                            <MyApplicationsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/:id/applications"
                    element={
                        <ProtectedRoute>
                            <ProjectApplicationsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/received-proposals"
                    element={
                        <ProtectedRoute>
                            <ReceivedProposalsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sent-proposals"
                    element={
                        <ProtectedRoute>
                            <SentProposalsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/:id"
                    element={
                        <ProtectedRoute>
                            <UserProfilePage />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/friends"
                    element={
                        <FreelancerRoute>
                            <FriendsPage />
                        </FreelancerRoute>
                    }
                />

                <Route
                    path="/friends/sent-requests"
                    element={
                        <FreelancerRoute>
                            <SentRequestsPage />
                        </FreelancerRoute>
                    }
                />

                <Route
                    path="/friends/received-requests"
                    element={
                        <FreelancerRoute>
                            <ReceivedRequestsPage />
                        </FreelancerRoute>
                    }
                />
                
                <Route
                    path="/friends/:friendId"
                    element={
                        <ProtectedRoute>
                            <FriendWorkspacePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/:projectId/roles/:roleId/invite"
                    element={
                        <ProtectedRoute>
                            <InviteFriendPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/workspace"
                    element={<WorkspaceListPage />}
                />

                <Route
                    path="/workspace/:id"
                    element={<WorkspacePage />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;