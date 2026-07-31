// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {

//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     return (

//         <div className="container mt-5">

//             <h2>Profile</h2>

//             <button
//                 className="btn btn-outline-primary mb-3"
//                 onClick={() => navigate("/edit-profile")}
//             >
//                 Edit Profile
//             </button>
//             <hr />

            

//             <div className="mb-4 text-center">

//                 <img
//                     src={`http://127.0.0.1:8000${user?.profile_picture}`}
//                     alt="Profile"
//                     className="rounded-circle"
//                     style={{
//                         width: "150px",
//                         height: "150px",
//                         objectFit: "cover",
//                     }}
//                 />

//             </div>
//             <p>
//                 <strong>Username:</strong> {user?.username}
//             </p>

//             <p>
//                 <strong>Display Name:</strong> {user?.display_name}
//             </p>

//             <p>
//                 <strong>Email:</strong> {user?.email}
//             </p>

//             <p>
//                 <strong>Bio:</strong> {user?.bio || "No bio added"}
//             </p>

//             <p>
//                 <strong>Freelancer:</strong>{" "}
//                 {user?.is_freelancer ? "Yes" : "No"}
//             </p>
// {
//     user?.is_freelancer &&
//     user?.freelancer_profile && (

//         <div className="card mt-4">

//             <div className="card-body">

//                 <h4 className="mb-3">
//                     Freelancer Information
//                 </h4>

//                 <p>
//                     <strong>Tagline:</strong>{" "}
//                     {user.freelancer_profile.tagline}
//                 </p>

//                 <p>
//                     <strong>Experience:</strong>{" "}
//                     {user.freelancer_profile.experience_description}
//                 </p>

//                 <p>
//                     <strong>Years of Experience:</strong>{" "}
//                     {user.freelancer_profile.years_of_experience}
//                 </p>

//                 <p>
//                     <strong>Availability:</strong>{" "}
//                     {
//                         user.freelancer_profile.availability_status
//                             ? "Available"
//                             : "Unavailable"
//                     }
//                 </p>

//                 <p>
//                     <strong>Portfolio:</strong>{" "}

//                     {
//                         user.freelancer_profile.portfolio_link
//                             ? (
//                                 <a
//                                     href={user.freelancer_profile.portfolio_link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     Visit Portfolio
//                                 </a>
//                             )
//                             : "Not Provided"
//                     }

//                 </p>

//             </div>

//         </div>

//     )
// }
// {
//     user?.is_freelancer && (

//         <div className="card mt-4">

//             <div className="card-body">

//                 <h5>
//                     Available Balance
//                 </h5>

//                 <h3 className="text-success">
//                     ₹{user?.balance}
//                 </h3>

//                 <small>
//                     Payments released by clients are added here.
//                 </small>

//             </div>

//         </div>

//     )
// }
//         </div>

//     );
// };


// export default ProfilePage;









import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "./ProfilePage.css";

const ProfilePage = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    return (

        <div className="profile-page">

            <div className="profile-cover">

                <div className="profile-cover-overlay">

                    <div className="profile-header">

                        <div className="profile-user">

                            <img
                                src={`http://127.0.0.1:8000${user?.profile_picture}`}
                                alt="Profile"
                                className="profile-avatar"
                            />

                            <div className="profile-main-info">

                                <div className="profile-name-row">

                                    <h1>

                                        {user?.display_name}

                                    </h1>

                                    {

                                        user?.is_freelancer && (

                                            <span className="freelancer-badge">

                                                Freelancer

                                            </span>

                                        )

                                    }

                                </div>

                                <p className="profile-username">

                                    @{user?.username}

                                </p>

                                {

                                    user?.is_freelancer &&
                                    user?.freelancer_profile?.tagline && (

                                        <p className="profile-tagline">

                                            {user.freelancer_profile.tagline}

                                        </p>

                                    )

                                }

                            </div>

                        </div>

                        <button
                            className="edit-profile-btn"
                            onClick={() => navigate("/edit-profile")}
                        >

                            ✏ Edit Profile

                        </button>

                    </div>

                </div>

            </div>

            <div className="profile-content">

                <div className="profile-main">

                    <section className="profile-section">

                        <h2>

                            About

                        </h2>

                        <p className="bio-text">

                            {

                                user?.bio ||

                                "You haven't added a bio yet."

                            }

                        </p>

                    </section>

                    {

                        user?.is_freelancer &&
                        user?.freelancer_profile && (

                            <section className="profile-section">

                                <h2>

                                    Professional Information

                                </h2>

                                <div className="profile-details">

                                    <div className="detail-row">

                                        <div className="detail-title">

                                            Tagline

                                        </div>

                                        <div className="detail-value">

                                            {

                                                user.freelancer_profile.tagline ||

                                                "Not provided"

                                            }

                                        </div>

                                    </div>

                                    <div className="detail-row">

                                        <div className="detail-title">

                                            Experience

                                        </div>

                                        <div className="detail-value">

                                            {

                                                user.freelancer_profile
                                                    .experience_description

                                            }

                                        </div>

                                    </div>

                                    <div className="detail-row">

                                        <div className="detail-title">

                                            Years of Experience

                                        </div>

                                        <div className="detail-value">

                                            {

                                                user.freelancer_profile
                                                    .years_of_experience

                                            }

                                            {" "}Years

                                        </div>

                                    </div>

                                    <div className="detail-row">

                                        <div className="detail-title">

                                            Availability

                                        </div>

                                        <div className="detail-value">

                                            {

                                                user.freelancer_profile
                                                    .availability_status ?

                                                    <span className="status available">

                                                        ● Available

                                                    </span>

                                                    :

                                                    <span className="status unavailable">

                                                        ● Unavailable

                                                    </span>

                                            }

                                        </div>

                                    </div>

                                    <div className="detail-row">

                                        <div className="detail-title">

                                            Portfolio

                                        </div>

                                        <div className="detail-value">

                                            {

                                                user.freelancer_profile
                                                    .portfolio_link ?

                                                    <a

                                                        href={
                                                            user.freelancer_profile
                                                                .portfolio_link
                                                        }

                                                        target="_blank"

                                                        rel="noreferrer"

                                                        className="portfolio-btn"

                                                    >

                                                        Visit Portfolio ↗

                                                    </a>

                                                    :

                                                    "Not Provided"

                                            }

                                        </div>

                                    </div>

                                </div>

                            </section>

                        )

                    }

                    <section className="profile-section">

                        <h2>

                            Account Information

                        </h2>

                        <div className="profile-details">

                            <div className="detail-row">

                                <div className="detail-title">

                                    Username

                                </div>

                                <div className="detail-value">

                                    {user?.username}

                                </div>

                            </div>

                            <div className="detail-row">

                                <div className="detail-title">

                                    Email

                                </div>

                                <div className="detail-value">

                                    {user?.email}

                                </div>

                            </div>

                            <div className="detail-row">

                                <div className="detail-title">

                                    Account Type

                                </div>

                                <div className="detail-value">

                                    {

                                        user?.is_freelancer ?

                                        "Freelancer"

                                        :

                                        "Client"

                                    }

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

                {

                    user?.is_freelancer && (

                        <aside className="profile-side">

                            <div className="balance-card-profile">

                                <small>

                                    Available Balance

                                </small>

                                <h2>

                                    ₹{user.balance}

                                </h2>

                                <p>

                                    Payments released by clients
                                    will appear here.

                                </p>

                            </div>

                        </aside>

                    )

                }

            </div>
        </div>

    );

};

export default ProfilePage;