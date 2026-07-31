// import { useContext, useEffect, useState } from "react";

// import { Link } from "react-router-dom";

// import { AuthContext } from "../context/AuthContext";

// import { getFriends } from "../api/collaborationApi";


// const FriendsPage = () => {

//     const { token } = useContext(AuthContext);

//     const [friends, setFriends] = useState([]);


//     useEffect(() => {
//         fetchFriends();
//     }, []);


//     const fetchFriends = async () => {

//         try {

//             const response =
//                 await getFriends(token);

//             setFriends(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };


//     return (

//         <div className="container mt-4">

//             <h2>Friends</h2>

//             <div className="mb-3">

//                 <Link
//                     to="/friends/sent-requests"
//                     className="btn btn-secondary me-2"
//                 >
//                     Sent Requests
//                 </Link>

//                 <Link
//                     to="/friends/received-requests"
//                     className="btn btn-secondary"
//                 >
//                     Received Requests
//                 </Link>

//             </div>

//             {friends.length === 0 ? (

//                 <p>No friends yet.</p>

//             ) : (

//                 <ul className="list-group">

//                     {friends.map(friend => (

//                         <li
//                             key={friend.id}
//                             className="list-group-item"
//                         >

//                             <Link
//                                 to={`/friends/${friend.id}`}
//                             >
//                                 {friend.display_name}
//                             </Link>

//                         </li>

//                     ))}

//                 </ul>

//             )}

//         </div>
//     );
// };

// export default FriendsPage;






import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    FiUser,
    FiChevronRight,
    FiUserPlus,
    FiInbox,
} from "react-icons/fi";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getFriends,
} from "../api/collaborationApi";

import "./FriendsPage.css";

const FriendsPage = () => {

    const { token } =
        useContext(AuthContext);

    const [
        friends,
        setFriends,
    ] = useState([]);

    useEffect(() => {

        fetchFriends();

    }, []);

    const fetchFriends = async () => {

        try {

            const response =
                await getFriends(token);

            setFriends(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="friends-page fade-up">

            <div className="friends-header">

                <div>

                    <h1>

                        Friends

                    </h1>

                    <p>

                        Build your freelancer network and collaborate
                        together on projects.

                    </p>

                </div>

                <div className="friends-counter">

                    {friends.length}

                    <span>

                        Friends

                    </span>

                </div>

            </div>

            <div className="friends-actions">

                <Link

                    to="/friends/sent-requests"

                    className="friends-action-btn"

                >

                    <FiUserPlus />

                    Sent Requests

                </Link>

                <Link

                    to="/friends/received-requests"

                    className="friends-action-btn primary"

                >

                    <FiInbox />

                    Received Requests

                </Link>

            </div>

            {

                friends.length === 0 ?

                (

                    <div className="friends-empty">

                        <FiUser size={58} />

                        <h3>

                            No friends yet

                        </h3>

                        <p>

                            Send connection requests to other freelancers.
                            Once accepted, they'll appear here.

                        </p>

                    </div>

                )

                :

                (

                    <div className="friends-feed">

                        {

                            friends.map(friend => (

                                <Link

                                    key={friend.id}

                                    to={`/friends/${friend.id}`}

                                    className="friend-row"

                                >

                                    <div className="friend-avatar">

                                        {

                                            friend.display_name
                                                .charAt(0)
                                                .toUpperCase()

                                        }

                                    </div>

                                    <div className="friend-content">

                                        <div className="friend-title">

                                            <h3>

                                                {

                                                    friend.display_name

                                                }

                                            </h3>

                                            <span>

                                                Active Friend

                                            </span>

                                        </div>

                                        <div className="friend-meta">

                                            <FiUser />

                                            Freelancer Connection

                                        </div>

                                    </div>

                                    <div className="friend-arrow">

                                        <FiChevronRight />

                                    </div>

                                </Link>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default FriendsPage; 