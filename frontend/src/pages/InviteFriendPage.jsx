// import {
//     useContext,
//     useEffect,
//     useState,
// } from "react";

// import {
//     useParams,
// } from "react-router-dom";

// import {
//     AuthContext,
// } from "../context/AuthContext";

// import {
//     getFriends,
// } from "../api/collaborationApi";

// import {
//     sendCollaborationInvite,
// } from "../api/collaborationApi";

// const InviteFriendPage = () => {

//     const {
//         projectId,
//         roleId,
//     } = useParams();

//     const { token } =
//         useContext(AuthContext);

//     const [friends, setFriends] =
//         useState([]);

//     useEffect(() => {

//         fetchFriends();

//     }, []);

//     const fetchFriends = async () => {

//         const response =
//             await getFriends(token);

//         setFriends(response.data);
//     };

//     const handleInvite =
//         async (friendId) => {

//             await sendCollaborationInvite(
//                 {
//                     receiver_id:
//                         friendId,

//                     project_id:
//                         projectId,

//                     role_requirement_id:
//                         roleId,
//                 },
//                 token
//             );

//             alert(
//                 "Invite sent"
//             );
//         };

//     return (

//         <div className="container mt-4">

//             <h2>
//                 Invite Friend
//             </h2>

//             <hr />

//             {friends.map(friend => (

//                 <div
//                     key={friend.id}
//                     className="card mb-2"
//                 >

//                     <div
//                         className="card-body"
//                     >

//                         <strong>
//                             {
//                                 friend.display_name
//                             }
//                         </strong>

//                         <button
//                             className="btn btn-primary float-end"
//                             onClick={() =>
//                                 handleInvite(
//                                     friend.id
//                                 )
//                             }
//                         >
//                             Invite
//                         </button>

//                     </div>

//                 </div>

//             ))}

//         </div>
//     );
// };

// export default InviteFriendPage;








import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getFriends,
    sendCollaborationInvite,
} from "../api/collaborationApi";

import "./InviteFriendPage.css";

const InviteFriendPage = () => {

    const {
        projectId,
        roleId,
    } = useParams();

    const {
        token,
    } = useContext(AuthContext);

    const [
        friends,
        setFriends,
    ] = useState([]);

    const [
        invited,
        setInvited,
    ] = useState([]);

    useEffect(() => {

        fetchFriends();

    }, []);

    const fetchFriends = async () => {

        try {

            const response =
                await getFriends(token);

            setFriends(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleInvite =
        async (friendId) => {

            try {

                await sendCollaborationInvite(

                    {

                        receiver_id:
                            friendId,

                        project_id:
                            projectId,

                        role_requirement_id:
                            roleId,

                    },

                    token

                );

                setInvited(prev => [

                    ...prev,
                    friendId,

                ]);

            }

            catch (error) {

                console.error(error);

            }

        };

    return (

        <div className="invite-page fade-up">

            <div className="invite-header">

                <div>

                    <h1>

                        Invite a Friend

                    </h1>

                    <p>

                        Choose one of your freelancer friends to collaborate on this project role.

                    </p>

                </div>

                <Link

                    to={`/projects/${projectId}`}

                    className="invite-back-btn"

                >

                    ← Back to Project

                </Link>

            </div>

            {

                friends.length === 0 ?

                (

                    <div className="invite-empty">

                        <div className="invite-empty-icon">

                            👥

                        </div>

                        <h3>

                            No friends available

                        </h3>

                        <p>

                            Connect with freelancers first before inviting them to projects.

                        </p>

                    </div>

                )

                :

                (

                    <div className="invite-list">

                        {

                            friends.map(friend => (

                                <div

                                    key={friend.id}

                                    className="invite-card"

                                >

                                    <div className="invite-avatar">

                                        {

                                            friend.display_name
                                                .charAt(0)
                                                .toUpperCase()

                                        }

                                    </div>

                                    <div className="invite-info">

                                        <h4>

                                            {

                                                friend.display_name

                                            }

                                        </h4>

                                        <span>

                                            Freelancer Friend

                                        </span>

                                    </div>

                                    {

                                        invited.includes(friend.id)

                                        ?

                                        (

                                            <button

                                                className="invite-sent-btn"

                                                disabled

                                            >

                                                ✓ Invited

                                            </button>

                                        )

                                        :

                                        (

                                            <button

                                                className="invite-page-btn"

                                                onClick={() =>
                                                    handleInvite(
                                                        friend.id
                                                    )
                                                }

                                            >

                                                Invite

                                            </button>

                                        )

                                    }

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default InviteFriendPage;