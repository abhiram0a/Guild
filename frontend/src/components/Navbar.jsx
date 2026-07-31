// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";


// const Navbar = () => {

//     const { user, logout } = useContext(AuthContext);


//     return (

//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

//             <div className="container-fluid px-4">

//                 <Link
//                     className="navbar-brand"
//                     to="/"
//                 >
//                     Guild
//                 </Link>

//                 <div>

//                     <Link
//                         className="btn btn-outline-light me-2"
//                         to="/gigs"
//                     >
//                         Explore Gigs
//                     </Link>

//                     <Link
//                         className="btn btn-outline-light me-2"
//                         to="/projects"
//                     >
//                         Explore Projects
//                     </Link>

//                     {user ? (

//                         <>
//                             <Link
//                                 className="btn btn-outline-light me-2"
//                                 to="/dashboard"
//                             >
//                                 Dashboard
//                             </Link>

//                             <Link
//                                 className="btn btn-outline-light me-2"
//                                 to="/profile"
//                             >
//                                 Profile
//                             </Link>

//                             <Link
//                                 className="btn btn-outline-success me-2"
//                                 to="/create-project"
//                             >
//                                 Create Project
//                             </Link>

//                             <Link
//                                 className="btn btn-outline-success me-2"
//                                 to="/my-projects"
//                             >
//                                 My Projects
//                             </Link>

//                             <Link
//                                 className="btn btn-outline-light me-2"
//                                 to="/sent-proposals"
//                             >
//                                 Sent Proposals
//                             </Link>

//                             <Link
//                                 className="btn btn-outline-light me-2"
//                                 to="/workspace"
//                             >
//                                 Workspaces
//                             </Link>

//                             {user.is_freelancer && (
//                                 <>


//                                     <Link
//                                         className="btn btn-outline-info me-2"
//                                         to="/friends"
//                                     >
//                                         Friends
//                                     </Link>

//                                     <Link
//                                         className="btn btn-outline-light me-2"
//                                         to="/my-applications"
//                                     >
//                                         My Applications
//                                     </Link>

//                                     <Link
//                                         className="btn btn-outline-light me-2"
//                                         to="/received-proposals"
//                                     >
//                                         Received Proposals
//                                     </Link>

//                                     <Link
//                                         className="btn btn-outline-info me-2"
//                                         to="/create-gig"
//                                     >
//                                         Create Gig
//                                     </Link>

//                                     <Link
//                                         className="btn btn-outline-info me-2"
//                                         to="/my-gigs"
//                                     >
//                                         My Gigs
//                                     </Link> 


//                                 </>
//                             )}

//                             {!user.is_freelancer && (

//                                 <Link
//                                     className="btn btn-warning me-2"
//                                     to="/become-freelancer"
//                                 >
//                                     Become Freelancer
//                                 </Link>
//                             )}


//                             <button
//                                 className="btn btn-danger"
//                                 onClick={logout}
//                             >
//                                 Logout
//                             </button>
//                         </>

//                     ) : (

//                         <>

//                             <Link
//                                 className="btn btn-outline-light me-2"
//                                 to="/login"
//                             >
//                                 Login
//                             </Link>

//                             <Link
//                                 className="btn btn-success"
//                                 to="/register"
//                             >
//                                 Register
//                             </Link>
//                         </>
//                     )}

//                 </div>

//             </div>

//         </nav>
//     );
// };


// export default Navbar;











// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {

//     const { user, logout } = useContext(AuthContext);

//     return (

//         <nav
//             className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
//         >

//             <div className="container">

//                 <Link
//                     to="/"
//                     className="navbar-brand fw-bold fs-3 text-primary"
//                 >
//                     Guild
//                 </Link>

//                 <div className="d-flex align-items-center">

//                     <Link
//                         to="/gigs"
//                         className="nav-link me-3"
//                     >
//                         Explore Gigs
//                     </Link>

//                     <Link
//                         to="/projects"
//                         className="nav-link me-4"
//                     >
//                         Explore Projects
//                     </Link>

//                     {user ? (

//                         <>

//                             <Link
//                                 to="/dashboard"
//                                 className="btn btn-primary me-2"
//                             >
//                                 Dashboard
//                             </Link>

//                             <Link
//                                 to="/profile"
//                                 className="btn btn-outline-secondary me-2"
//                             >
//                                 Profile
//                             </Link>

//                             <button
//                                 onClick={logout}
//                                 className="btn btn-danger"
//                             >
//                                 Logout
//                             </button>

//                         </>

//                     ) : (

//                         <>

//                             <Link
//                                 to="/login"
//                                 className="btn btn-outline-primary me-2"
//                             >
//                                 Login
//                             </Link>

//                             <Link
//                                 to="/register"
//                                 className="btn btn-primary"
//                             >
//                                 Register
//                             </Link>

//                         </>

//                     )}

//                 </div>

//             </div>

//         </nav>

//     );

// };

// export default Navbar;







import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const location = useLocation();

    const isActive = (path) => {

        if (path === "/") {

            return location.pathname === "/";
        }

        return location.pathname.startsWith(path);

    };

    return (

        <header className="guild-navbar">

            <div className="guild-navbar-container">

                <Link
                    to="/"
                    className="guild-logo"
                >

                    <div className="guild-logo-icon">

                        G

                    </div>

                    <span>

                        Guild

                    </span>

                </Link>

                <nav className="guild-nav-links">

                    <Link
                        to="/gigs"
                        className={
                            isActive("/gigs")
                                ? "active"
                                : ""
                        }
                    >
                        Explore Gigs
                    </Link>

                    <Link
                        to="/projects"
                        className={
                            isActive("/projects")
                                ? "active"
                                : ""
                        }
                    >
                        Explore Projects
                    </Link>

                </nav>

                <div className="guild-nav-actions">

                    {user ? (

                        <>

                            <Link
                                to="/dashboard"
                                className="nav-outline-btn"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className="nav-outline-btn"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={logout}
                                className="nav-primary-btn logout-btn"
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="nav-outline-btn"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="nav-primary-btn"
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </header>

    );

};

export default Navbar;