// import {
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import { AuthContext }
// from "../context/AuthContext";

// import {
//     getReceivedRequests,
//     acceptConnectionRequest,
//     rejectConnectionRequest
// }
// from "../api/collaborationApi";


// const ReceivedRequestsPage = () => {

//     const { token } =
//         useContext(AuthContext);

//     const [requests, setRequests] =
//         useState([]);


//     useEffect(() => {
//         fetchRequests();
//     }, []);


//     const fetchRequests = async () => {

//         const response =
//             await getReceivedRequests(token);

//         setRequests(response.data);
//     };


//     const handleAccept = async (id) => {

//         await acceptConnectionRequest(
//             id,
//             token
//         );

//         fetchRequests();
//     };


//     const handleReject = async (id) => {

//         await rejectConnectionRequest(
//             id,
//             token
//         );

//         fetchRequests();
//     };


//     return (

//         <div className="container mt-4">

//             <h2>
//                 Received Requests
//             </h2>

//             <ul className="list-group">

//                 {requests.map(request => (

//                     <li
//                         key={request.id}
//                         className="list-group-item"
//                     >

//                         <strong>
//                             {
//                                 request.sender_username
//                             }
//                         </strong>

//                         <div className="mt-2">

//                             <button
//                                 className="btn btn-success me-2"
//                                 onClick={() =>
//                                     handleAccept(
//                                         request.id
//                                     )
//                                 }
//                             >
//                                 Accept
//                             </button>

//                             <button
//                                 className="btn btn-danger"
//                                 onClick={() =>
//                                     handleReject(
//                                         request.id
//                                     )
//                                 }
//                             >
//                                 Reject
//                             </button>

//                         </div>

//                     </li>

//                 ))}

//             </ul>

//         </div>
//     );
// };

// export default ReceivedRequestsPage;






import {
    useContext,
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
    getReceivedRequests,
    acceptConnectionRequest,
    rejectConnectionRequest,
} from "../api/collaborationApi";

import "./ReceivedRequestsPage.css";

const ReceivedRequestsPage = () => {

    const { token } =
        useContext(AuthContext);

    const [
        requests,
        setRequests,
    ] = useState([]);

    useEffect(() => {

        fetchRequests();

    }, []);

    const fetchRequests = async () => {

        try {

            const response =
                await getReceivedRequests(token);

            setRequests(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleAccept = async (id) => {

        try {

            await acceptConnectionRequest(
                id,
                token
            );

            fetchRequests();

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleReject = async (id) => {

        try {

            await rejectConnectionRequest(
                id,
                token
            );

            fetchRequests();

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="received-requests-page fade-up">

            <div className="received-header">

                <div>

                    <h1>

                        Friend Requests

                    </h1>

                    <p>

                        Review invitations from freelancers who want to collaborate with you.

                    </p>

                </div>

                {/* <Link
                    to="/friends"
                    className="back-friends-btn"
                >

                    ← Back to Friends

                </Link> */}

            </div>

            {

                requests.length === 0 ?

                    (

                        <div className="received-empty">

                            <div className="received-empty-icon">

                                👥

                            </div>

                            <h3>

                                No pending requests

                            </h3>

                            <p>

                                You're all caught up. New friend requests will appear here.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="received-list">

                            {

                                requests.map(request => (

                                    <div
                                        key={request.id}
                                        className="received-card"
                                    >

                                        <div className="received-avatar">

                                            {

                                                request.sender_username
                                                    .charAt(0)
                                                    .toUpperCase()

                                            }

                                        </div>

                                        <div className="received-content">

                                            <h4>

                                                {

                                                    request.sender_username

                                                }

                                            </h4>

                                            <span>

                                                Wants to connect with you

                                            </span>

                                        </div>

                                        <div className="received-actions">

                                            <button
                                                className="accept-btn"
                                                onClick={() =>
                                                    handleAccept(
                                                        request.id
                                                    )
                                                }
                                            >

                                                ✓ Accept

                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() =>
                                                    handleReject(
                                                        request.id
                                                    )
                                                }
                                            >

                                                ✕ Reject

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

};

export default ReceivedRequestsPage;