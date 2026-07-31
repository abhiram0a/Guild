// import {
//     useEffect,
//     useState,
//     useContext,
// } from "react";

// import {
//     useParams,
// } from "react-router-dom";

// import { AuthContext }
// from "../context/AuthContext";

// import {
//     getUserProfile,
// } from "../api/accountApi";

// import {
//     getConnectionStatus,
//     sendConnectionRequest,
//     acceptConnectionRequest,
//     rejectConnectionRequest,
// } from "../api/collaborationApi";

// const UserProfilePage = () => {

//     const { id } = useParams();

//     const {
//         token,
//         user: currentUser,
//     } = useContext(AuthContext);

//     const [user,
//         setUser] = useState(null);

//     useEffect(() => {

//         fetchProfile();

//         fetchConnectionStatus();

//     }, [id]);

//     const fetchConnectionStatus =
//         async () => {

//             try {

//                 const response =
//                     await getConnectionStatus(
//                         id,
//                         token
//                     );

//                 setConnectionStatus(
//                     response.data
//                 );

//             } catch (error) {

//                 console.error(error);
//             }
//         };

//     const handleConnect =
//         async () => {

//             try {

//                 await sendConnectionRequest(
//                     id,
//                     token
//                 );

//                 fetchConnectionStatus();

//             } catch (error) {

//                 console.error(error);
//             }
//         };


//     const handleAccept =
//         async () => {

//             await acceptConnectionRequest(
//                 connectionStatus.request_id,
//                 token
//             );

//             fetchConnectionStatus();
//         };


//     const handleReject =
//         async () => {

//             await rejectConnectionRequest(
//                 connectionStatus.request_id,
//                 token
//             );

//             fetchConnectionStatus();
//         };

//     const [connectionStatus,
//         setConnectionStatus] =
//             useState(null);

//     const fetchProfile =
//         async () => {

//             const response =
//                 await getUserProfile(
//                     id,
//                     token
//                 );

//             setUser(
//                 response.data
//             );
//         };

//     if (!user) {

//         return (
//             <div className="container mt-4">
//                 Loading...
//             </div>
//         );
//     }

//     return (

//         <div className="container mt-4">

//             <div className="text-center mb-4">

//                 <img
//                     src={`http://127.0.0.1:8000${user.profile_picture}`}
//                     alt="Profile"
//                     className="rounded-circle border"
//                     style={{
//                         width: "150px",
//                         height: "150px",
//                         objectFit: "cover",
//                     }}
//                 />

//                 <h2 className="mt-3">
//                     {user.display_name}
//                 </h2>

//             </div>

//             <hr />
//             <p>
//                 Username:
//                 {" "}
//                 {user.username}
//             </p>

//             <p>
//                 Bio:
//                 {" "}
//                 {user.bio ||
//                     "No bio added"}
//             </p>

//             <p>
//                 Freelancer:
//                 {" "}
//                 {user.is_freelancer
//                     ? "Yes"
//                     : "No"}
//             </p>

//             {
//                 user.is_freelancer &&
//                 user.freelancer_profile && (

//                     <div className="card mt-4">

//                         <div className="card-body">

//                             <h4 className="mb-3">
//                                 Freelancer Information
//                             </h4>

//                             <p>
//                                 <strong>Tagline:</strong>{" "}
//                                 {user.freelancer_profile.tagline}
//                             </p>

//                             <p>
//                                 <strong>Experience:</strong>{" "}
//                                 {user.freelancer_profile.experience_description}
//                             </p>

//                             <p>
//                                 <strong>Years of Experience:</strong>{" "}
//                                 {user.freelancer_profile.years_of_experience}
//                             </p>

//                             <p>
//                                 <strong>Availability:</strong>{" "}
//                                 {
//                                     user.freelancer_profile.availability_status
//                                         ? "Available"
//                                         : "Unavailable"
//                                 }
//                             </p>

//                             <p>
//                                 <strong>Portfolio:</strong>{" "}

//                                 {
//                                     user.freelancer_profile.portfolio_link
//                                         ? (
//                                             <a
//                                                 href={user.freelancer_profile.portfolio_link}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                             >
//                                                 Visit Portfolio
//                                             </a>
//                                         )
//                                         : "Not Provided"
//                                 }

//                             </p>

//                         </div>

//                     </div>

//                 )
//             }

//             {
//                 user.is_freelancer &&
//                 currentUser &&
//                 user.id !== currentUser.id &&
//                 connectionStatus && (

//                     <div className="mt-3">

//                         {
//                             connectionStatus.status ===
//                             "NONE" && (

//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={
//                                         handleConnect
//                                     }
//                                 >
//                                     Connect
//                                 </button>
//                             )
//                         }

//                         {
//                             connectionStatus.status ===
//                             "PENDING" &&

//                             connectionStatus.direction ===
//                             "sent" && (

//                                 <button
//                                     className="btn btn-secondary"
//                                     disabled
//                                 >
//                                     Request Sent
//                                 </button>
//                             )
//                         }

//                         {
//                             connectionStatus.status ===
//                             "PENDING" &&

//                             connectionStatus.direction ===
//                             "received" && (

//                                 <>
//                                     <button
//                                         className="btn btn-success me-2"
//                                         onClick={
//                                             handleAccept
//                                         }
//                                     >
//                                         Accept
//                                     </button>

//                                     <button
//                                         className="btn btn-danger"
//                                         onClick={
//                                             handleReject
//                                         }
//                                     >
//                                         Reject
//                                     </button>
//                                 </>
//                             )
//                         }

//                         {
//                             connectionStatus.status ===
//                             "ACCEPTED" && (

//                                 <button
//                                     className="btn btn-success"
//                                     disabled
//                                 >
//                                     ✓ Friends
//                                 </button>
//                             )
//                         }

//                     </div>
//                 )
//             }

//         </div>
//     );
// };

// export default UserProfilePage;









import {
    useEffect,
    useState,
    useContext,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    AuthContext
} from "../context/AuthContext";

import {
    getUserProfile,
} from "../api/accountApi";

import {
    getConnectionStatus,
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
} from "../api/collaborationApi";

import "./UserProfilePage.css";


const UserProfilePage = () => {

    const { id } = useParams();

    const {
        token,
        user: currentUser,
    } = useContext(AuthContext);


    const [user,setUser] =
        useState(null);


    const [
        connectionStatus,
        setConnectionStatus
    ] = useState(null);



    useEffect(() => {

        fetchProfile();

        if(token){

            fetchConnectionStatus();

        }

    },[id]);



    const fetchProfile = async () => {

        try{

            const response =
                await getUserProfile(
                    id,
                    token
                );

            setUser(
                response.data
            );

        }

        catch(error){

            console.error(error);

        }

    };



    const fetchConnectionStatus = async () => {

        try{

            const response =
                await getConnectionStatus(
                    id,
                    token
                );

            setConnectionStatus(
                response.data
            );

        }

        catch(error){

            console.error(error);

        }

    };



    const handleConnect = async () => {

        try{

            await sendConnectionRequest(
                id,
                token
            );

            fetchConnectionStatus();

        }

        catch(error){

            console.error(error);

        }

    };



    const handleAccept = async () => {

        await acceptConnectionRequest(
            connectionStatus.request_id,
            token
        );

        fetchConnectionStatus();

    };



    const handleReject = async () => {

        await rejectConnectionRequest(
            connectionStatus.request_id,
            token
        );

        fetchConnectionStatus();

    };



    if(!user){

        return(

            <div className="public-profile-loading">

                Loading Profile...

            </div>

        );

    }



    return (

        <div className="public-profile-page">


            <div className="public-profile-cover">


                <div className="public-profile-overlay">


                    <div className="public-profile-header">


                        <div className="public-profile-user">


                            <img

                                src={
                                    `http://127.0.0.1:8000${user.profile_picture}`
                                }

                                alt="Profile"

                                className="public-profile-avatar"

                            />


                            <div className="public-profile-info">


                                <div className="public-profile-name-row">


                                    <h1>

                                        {user.display_name}

                                    </h1>


                                    {
                                        user.is_freelancer && (

                                            <span className="public-freelancer-badge">

                                                Freelancer

                                            </span>

                                        )
                                    }


                                </div>



                                <p className="public-username">

                                    @{user.username}

                                </p>



                                {
                                    user.freelancer_profile?.tagline && (

                                        <p className="public-tagline">

                                            {
                                                user.freelancer_profile.tagline
                                            }

                                        </p>

                                    )
                                }



                            </div>


                        </div>



                        {
                            currentUser &&
                            currentUser.is_freelancer &&
                            currentUser.id !== user.id &&
                            user.is_freelancer &&
                            connectionStatus && (

                                <div className="connection-actions">


                                    {
                                        connectionStatus.status === "NONE" && (

                                            <button

                                                className="connect-btn"

                                                onClick={handleConnect}

                                            >

                                                Connect

                                            </button>

                                        )
                                    }


                                    {
                                        connectionStatus.status === "PENDING" &&
                                        connectionStatus.direction === "sent" && (

                                            <button

                                                className="connect-btn disabled"

                                                disabled

                                            >

                                                Request Sent

                                            </button>

                                        )
                                    }


                                    {
                                        connectionStatus.status === "PENDING" &&
                                        connectionStatus.direction === "received" && (

                                            <div className="request-actions">

                                                <button

                                                    className="accept-btn"

                                                    onClick={handleAccept}

                                                >

                                                    Accept

                                                </button>


                                                <button

                                                    className="reject-btn"

                                                    onClick={handleReject}

                                                >

                                                    Reject

                                                </button>

                                            </div>

                                        )
                                    }



                                    {
                                        connectionStatus.status === "ACCEPTED" && (

                                            <button

                                                className="friend-btn"

                                                disabled

                                            >

                                                ✓ Friends

                                            </button>

                                        )
                                    }


                                </div>

                            )
                        }


                    </div>


                </div>


            </div>




            <div className="public-profile-content">


                <section className="public-profile-section">


                    <h2>

                        About

                    </h2>


                    <p className="public-bio">

                        {
                            user.bio ||
                            "No bio added yet."
                        }

                    </p>


                </section>




                {
                    user.is_freelancer &&
                    user.freelancer_profile && (


                        <section className="public-profile-section">


                            <h2>

                                Professional Information

                            </h2>



                            <div className="public-details">


                                <div className="public-detail-row">

                                    <span>
                                        Experience
                                    </span>

                                    <p>
                                        {
                                            user.freelancer_profile
                                            .experience_description ||
                                            "Not provided"
                                        }
                                    </p>

                                </div>



                                <div className="public-detail-row">

                                    <span>
                                        Years of Experience
                                    </span>

                                    <p>

                                        {
                                            user.freelancer_profile
                                            .years_of_experience
                                        }

                                        {" "}Years

                                    </p>

                                </div>



                                <div className="public-detail-row">

                                    <span>
                                        Availability
                                    </span>


                                    <p>

                                        {
                                            user.freelancer_profile
                                            .availability_status ?

                                            <span className="available-status">

                                                ● Available

                                            </span>

                                            :

                                            <span className="unavailable-status">

                                                ● Unavailable

                                            </span>
                                        }

                                    </p>


                                </div>




                                <div className="public-detail-row">


                                    <span>
                                        Portfolio
                                    </span>


                                    <p>

                                        {
                                            user.freelancer_profile
                                            .portfolio_link ?

                                            <a

                                                href={
                                                    user.freelancer_profile
                                                    .portfolio_link
                                                }

                                                target="_blank"

                                                rel="noopener noreferrer"

                                                className="portfolio-link"

                                            >

                                                Visit Portfolio ↗

                                            </a>

                                            :

                                            "Not provided"

                                        }

                                    </p>


                                </div>


                            </div>


                        </section>


                    )

                }


            </div>


        </div>

    );

};


export default UserProfilePage;