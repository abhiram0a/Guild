// import { useContext, useEffect, useState } from "react";

// import { AuthContext } from "../context/AuthContext";

// import {
//     getSentRequests
// } from "../api/collaborationApi";


// const SentRequestsPage = () => {

//     const { token } = useContext(AuthContext);

//     const [requests, setRequests] =
//         useState([]);


//     useEffect(() => {
//         fetchRequests();
//     }, []);


//     const fetchRequests = async () => {

//         const response =
//             await getSentRequests(token);

//         setRequests(response.data);
//     };


//     return (

//         <div className="container mt-4">

//             <h2>Sent Requests</h2>

//             <ul className="list-group">

//                 {requests.map(request => (

//                     <li
//                         key={request.id}
//                         className="list-group-item"
//                     >
//                         {
//                             request.receiver_username
//                         }
//                     </li>

//                 ))}

//             </ul>

//         </div>
//     );
// };

// export default SentRequestsPage;



import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    FiClock,
    FiUser,
    FiSend,
} from "react-icons/fi";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getSentRequests,
} from "../api/collaborationApi";

import "./SentRequestsPage.css";

const SentRequestsPage = () => {

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
                await getSentRequests(token);

            setRequests(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="sent-requests-page fade-up">

            <div className="requests-header">

                <div>

                    <h1>

                        Sent Requests

                    </h1>

                    <p>

                        Track collaboration requests you've sent to other freelancers.

                    </p>

                </div>

            </div>
{/* 
            <div className="requests-summary">

                <div className="summary-icon">

                    <FiSend />

                </div>

                <div>

                    <h3>

                        {requests.length} Pending Request{requests.length !== 1 && "s"}

                    </h3>

                    <p>

                        Waiting for other freelancers to accept your invitation.

                    </p>

                </div>

            </div> */}

            {

                requests.length === 0 ?

                (

                    <div className="requests-empty">

                        <FiClock size={54} />

                        <h3>

                            No pending requests

                        </h3>

                        <p>

                            Friend requests you send will appear here until they're accepted or declined.

                        </p>

                    </div>

                )

                :

                (

                    <div className="requests-table">

                        {

                            requests.map(request => (

                                <div

                                    key={request.id}

                                    className="request-item"

                                >

                                    <div className="request-user">

                                        <div className="request-avatar">

                                            {

                                                request.receiver_username
                                                    .charAt(0)
                                                    .toUpperCase()

                                            }

                                        </div>

                                        <div>

                                            <h4>

                                                {

                                                    request.receiver_username

                                                }

                                            </h4>

                                            <div className="request-meta">

                                                <FiUser />

                                                Freelancer

                                            </div>

                                        </div>

                                    </div>

                                    <div className="request-right">

                                        <span className="status pending">

                                            Pending

                                        </span>

                                        {

                                            request.created_at && (

                                                <small>

                                                    {

                                                        new Date(
                                                            request.created_at
                                                        ).toLocaleDateString()

                                                    }

                                                </small>

                                            )

                                        }

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

export default SentRequestsPage;