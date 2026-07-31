// import {
//     useEffect,
//     useState,
//     useContext,
// } from "react";

// import {
//     Link,
//     useParams,
// } from "react-router-dom";

// import {
//     AuthContext,
// } from "../context/AuthContext";

// import {
//     getFriendInviteFeed,
//     acceptCollaborationInvite,
//     rejectCollaborationInvite,
// } from "../api/collaborationApi";

// import {
//     getMyGigs,
// } from "../api/projectApi";



// const FriendWorkspacePage = () => {

//     const { friendId } = useParams();

//     const { token, user } =
//         useContext(AuthContext);

//     const [invites, setInvites] =
//         useState([]);

//     const [myGigs, setMyGigs] = useState([]);

//     const [acceptData, setAcceptData] = useState({

//         selected_gig: "",

//         proposed_price: "",

//         response_note: "",

//     });

//     useEffect(() => {

//         fetchInvites();
//         fetchMyGigs();

//     }, [friendId, token]);

//     const fetchInvites = async () => {

//         try {

//             const response =
//                 await getFriendInviteFeed(
//                     friendId,
//                     token
//                 );

//             setInvites(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const fetchMyGigs = async () => {

//         try {

//             const response =
//                 await getMyGigs(token);

//             setMyGigs(response.data);

//         } catch (error) {

//             console.error(error);

//         }

//     };

//     const handleAccept = async(id)=>{

//         try{

//             await acceptCollaborationInvite(

//                 id,

//                 acceptData,

//                 token

//             );

//             // fetchWorkspace();
//             setAcceptData({
//                 selected_gig: "",
//                 proposed_price: "",
//                 response_note: "",
//             });

//             fetchInvites();

//         }

//         catch(error){

//             console.error(error);

//         }

//     };

//     const handleReject =
//         async (inviteId) => {

//             await rejectCollaborationInvite(
//                 inviteId,
//                 token
//             );

//             fetchInvites();
//         };

//     return (

//         <div className="container mt-4">

//             <h2>
//                 Friend Workspace
//             </h2>

//             <hr />

//             {invites.map(invite => (

//                 <div
//                     key={invite.id}
//                     className="card mb-3"
//                 >

//                     <div className="card-body">

//                         <h5>
//                             Collaboration Invite
//                         </h5>
                        
//                         <p>

//                             <strong>Project</strong>

//                             <br />

//                             <Link
//                                 to={`/projects/${invite.project.id}`}
//                             >
//                                 {invite.project.title}
//                             </Link>

//                         </p>

//                         <p>
//                             <strong>Role</strong>
//                             <br />
//                             {invite.role_requirement.job_category.name}
//                         </p>

//                         <p>
//                             <strong>Allocated Budget</strong>
//                             <br />
//                             ₹{invite.role_requirement.allocated_budget}
//                         </p>

//                         <p>
//                             Status:
//                             {" "}
//                             {invite.status}
//                         </p>

//                         {
//                             invite.status ===
//                             "PENDING" &&

//                             invite.receiver.id ===
//                             user.id && (

//                                 <>
//                                     <div className="card p-3 mt-2">

//                                         <h6>

//                                             Accept Invite

//                                         </h6>

//                                         {
//                                             myGigs.filter(
//                                                 gig =>
//                                                     invite.role_requirement &&
//                                                     invite.role_requirement.job_category &&
//                                                     gig.job_category.id ===
//                                                         invite.role_requirement.job_category.id
//                                             ).length === 0 ? (

//                                                 <div className="alert alert-warning mb-2">

//                                                     You don't have a gig matching this role.
//                                                     Please create one first.

//                                                 </div>

//                                             ) : (

//                                                 <select
//                                                     className="form-control mb-2"
//                                                     value={acceptData.selected_gig}
//                                                     onChange={(e) =>
//                                                         setAcceptData({
//                                                             ...acceptData,
//                                                             selected_gig: e.target.value,
//                                                         })
//                                                     }
//                                                 >

//                                                     <option value="">
//                                                         Select Gig
//                                                     </option>

//                                                     {
//                                                         myGigs
//                                                             .filter(
//                                                                 gig =>
//                                                                     invite.role_requirement &&
//                                                                     invite.role_requirement.job_category &&
//                                                                     gig.job_category.id ===
//                                                                         invite.role_requirement.job_category.id
//                                                             )
//                                                             .map(gig => (

//                                                                 <option
//                                                                     key={gig.id}
//                                                                     value={gig.id}
//                                                                 >
//                                                                     {gig.title}
//                                                                 </option>

//                                                             ))
//                                                     }

//                                                 </select>

//                                             )
//                                         }

//                                         <input

//                                             className="form-control mb-2"

//                                             placeholder="Your Price"

//                                             type="number"

//                                             value={acceptData.proposed_price}

//                                             onChange={(e)=>

//                                                 setAcceptData({

//                                                     ...acceptData,

//                                                     proposed_price:e.target.value,

//                                                 })

//                                             }

//                                         />

//                                         <textarea

//                                             className="form-control mb-2"

//                                             placeholder="Optional note"

//                                             value={acceptData.response_note}

//                                             onChange={(e)=>

//                                                 setAcceptData({

//                                                     ...acceptData,

//                                                     response_note:e.target.value,

//                                                 })

//                                             }

//                                         />

//                                         <button

//                                             className="btn btn-success"

//                                             onClick={()=>

//                                                 handleAccept(invite.id)

//                                             }

//                                         >

//                                             Accept Invite

//                                         </button>

//                                     </div>

//                                     <button
//                                         className="btn btn-danger"
//                                         onClick={() =>
//                                             handleReject(
//                                                 invite.id
//                                             )
//                                         }
//                                     >
//                                         Reject
//                                     </button>
//                                 </>
//                             )
//                         }


//                         {
//                             invite.status === "ACCEPTED" && (
//                                 <div className="card mt-3 p-3">

//                                     <h6>
//                                         Invite Accepted
//                                     </h6>

//                                     <p>
//                                         <strong>Gig</strong>
//                                         <br />
//                                         {invite.selected_gig
//                                             ? invite.selected_gig.title
//                                             : "Not selected"}
//                                     </p>

//                                     <p>
//                                         <strong>Proposed Price</strong>
//                                         <br />
//                                         {invite.proposed_price
//                                             ? `₹${invite.proposed_price}`
//                                             : "Not specified"}
//                                     </p>

//                                     {
//                                         invite.response_note && (
//                                             <>
//                                                 <strong>Note</strong>
//                                                 <p>{invite.response_note}</p>
//                                             </>
//                                         )
//                                     }

//                                 </div>
//                             )
//                         }

//                     </div>

//                 </div>

//             ))}

//         </div>
//     );
// };


// export default FriendWorkspacePage;








import {
    useEffect,
    useState,
    useContext,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getFriendInviteFeed,
    acceptCollaborationInvite,
    rejectCollaborationInvite,
} from "../api/collaborationApi";

import {
    getMyGigs,
} from "../api/projectApi";

import "./FriendWorkspacePage.css";

const FriendWorkspacePage = () => {

    const { friendId } = useParams();

    const { token, user } =
        useContext(AuthContext);

    const [invites, setInvites] =
        useState([]);

    const [myGigs, setMyGigs] =
        useState([]);

    const [acceptForms, setAcceptForms] =
        useState({});

    useEffect(() => {

        fetchInvites();

        fetchMyGigs();

    }, [friendId, token]);

    const fetchInvites = async () => {

        try {

            const response =
                await getFriendInviteFeed(
                    friendId,
                    token
                );

            setInvites(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const fetchMyGigs = async () => {

        try {

            const response =
                await getMyGigs(token);

            setMyGigs(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const updateForm = (
        inviteId,
        field,
        value
    ) => {

        setAcceptForms(prev => ({

            ...prev,

            [inviteId]: {

                ...prev[inviteId],

                [field]: value,

            },

        }));

    };

    const handleAccept = async (
        inviteId
    ) => {

        const form =
            acceptForms[inviteId];

        if (!form) return;

        try {

            await acceptCollaborationInvite(

                inviteId,

                form,

                token

            );

            setAcceptForms(prev => ({

                ...prev,

                [inviteId]: {

                    selected_gig: "",

                    proposed_price: "",

                    response_note: "",

                },

            }));

            fetchInvites();

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleReject =
        async (inviteId) => {

            try {

                await rejectCollaborationInvite(

                    inviteId,

                    token

                );

                fetchInvites();

            }

            catch (error) {

                console.error(error);

            }

        };

    const getStatusClass = status => {

        switch (status) {

            case "PENDING":

                return "pending";

            case "ACCEPTED":

                return "accepted";

            case "REJECTED":

                return "rejected";

            default:

                return "";

        }

    };

    if (!invites.length) {

        return (

            <div className="friend-workspace">

                <div className="friend-header">

                    <h1>

                        Collaboration Workspace

                    </h1>

                    <p>

                        Invite history with this friend.

                    </p>

                </div>

                <div className="conversation-empty">

                    <div className="empty-icon">

                        🤝

                    </div>

                    <h3>

                        No collaboration yet

                    </h3>

                    <p>

                        Collaboration invitations between you
                        and this friend will appear here.

                    </p>

                </div>

            </div>

        );

    }

    const friend =

        invites[0].sender.id === user.id

            ? invites[0].receiver

            : invites[0].sender;

    return (

        <div className="friend-workspace">

            <div className="friend-header">

                <div className="friend-info">

                    <div className="friend-avatar">

                        {

                            friend.display_name

                                .charAt(0)

                                .toUpperCase()

                        }

                    </div>

                    <div>

                        <h1>

                            {friend.display_name}

                        </h1>

                        <p>

                            Collaboration Workspace

                        </p>

                    </div>

                </div>

            </div>

            <div className="conversation-feed">

                {

                    invites.map(invite => {

                        const mine =

                            invite.sender.id === user.id;

                        const form =
                            acceptForms[invite.id] || {

                                selected_gig: "",

                                proposed_price: "",

                                response_note: "",

                            };

                        const matchingGigs =

                            myGigs.filter(

                                gig =>

                                    gig.job_category.id ===

                                    invite.role_requirement.job_category.id

                            );

                        return (

                            <div

                                key={invite.id}

                                className={

                                    `conversation-row ${

                                        mine

                                            ? "mine"

                                            : "theirs"

                                    }`

                                }

                            >

                                <div className="conversation-bubble">

                                    <div className="bubble-top">

                                        <div>

                                            <small>

                                                {

                                                    mine

                                                        ? "You sent a collaboration invite"

                                                        : "Collaboration invite received"

                                                }

                                            </small>

                                        </div>

                                        <span

                                            className={`status-pill ${getStatusClass(invite.status)}`}

                                        >

                                            {invite.status}

                                        </span>

                                    </div>

                                    <Link

                                        to={`/projects/${invite.project.id}`}

                                        className="project-link"

                                    >

                                        {invite.project.title}

                                    </Link>

                                    <div className="invite-meta">

                                        <div>

                                            <span>

                                                Role

                                            </span>

                                            <strong>

                                                {

                                                    invite.role_requirement.job_category.name

                                                }

                                            </strong>

                                        </div>

                                        <div>

                                            <span>

                                                Budget

                                            </span>

                                            <strong>

                                                ₹{

                                                    invite.role_requirement.allocated_budget

                                                }

                                            </strong>

                                        </div>

                                    </div>
                                    {

                                        invite.status === "PENDING" &&

                                        !mine && (

                                            <div className="accept-panel">

                                                {

                                                    matchingGigs.length === 0 ? (

                                                        <div className="no-gig-warning">

                                                            You don't have a matching gig for this role.
                                                            Create one first to accept this invitation.

                                                        </div>

                                                    ) : (

                                                        <>

                                                            <div className="form-grid">

                                                                <div>

                                                                    <label>

                                                                        Select Gig

                                                                    </label>

                                                                    <select

                                                                        className="form-control"

                                                                        value={form.selected_gig}

                                                                        onChange={(e)=>

                                                                            updateForm(

                                                                                invite.id,

                                                                                "selected_gig",

                                                                                e.target.value

                                                                            )

                                                                        }

                                                                    >

                                                                        <option value="">

                                                                            Choose Gig

                                                                        </option>

                                                                        {

                                                                            matchingGigs.map(gig=>(

                                                                                <option

                                                                                    key={gig.id}

                                                                                    value={gig.id}

                                                                                >

                                                                                    {gig.title}

                                                                                </option>

                                                                            ))

                                                                        }

                                                                    </select>

                                                                </div>

                                                                <div>

                                                                    <label>

                                                                        Proposed Price

                                                                    </label>

                                                                    <input

                                                                        type="number"

                                                                        className="form-control"

                                                                        placeholder="₹"

                                                                        value={form.proposed_price}

                                                                        onChange={(e)=>

                                                                            updateForm(

                                                                                invite.id,

                                                                                "proposed_price",

                                                                                e.target.value

                                                                            )

                                                                        }

                                                                    />

                                                                </div>

                                                            </div>

                                                            <div className="mt-3">

                                                                <label>

                                                                    Response Note

                                                                </label>

                                                                <textarea

                                                                    className="form-control"

                                                                    rows="3"

                                                                    placeholder="Optional message..."

                                                                    value={form.response_note}

                                                                    onChange={(e)=>

                                                                        updateForm(

                                                                            invite.id,

                                                                            "response_note",

                                                                            e.target.value

                                                                        )

                                                                    }

                                                                />

                                                            </div>

                                                            <div className="invite-actions">

                                                                <button

                                                                    className="accept-btn"

                                                                    onClick={()=>

                                                                        handleAccept(

                                                                            invite.id

                                                                        )

                                                                    }

                                                                >

                                                                    Accept Invite

                                                                </button>

                                                                <button

                                                                    className="reject-btn"

                                                                    onClick={()=>

                                                                        handleReject(

                                                                            invite.id

                                                                        )

                                                                    }

                                                                >

                                                                    Reject

                                                                </button>

                                                            </div>

                                                        </>

                                                    )

                                                }

                                            </div>

                                        )

                                    }

                                    {

                                        invite.status === "ACCEPTED" && (

                                            <div className="accepted-box">

                                                <div className="accepted-header">

                                                    ✓ Collaboration Accepted

                                                </div>

                                                <div className="accepted-grid">

                                                    <div>

                                                        <span>

                                                            Selected Gig

                                                        </span>

                                                        <strong>

                                                            {

                                                                invite.selected_gig

                                                                    ? invite.selected_gig.title

                                                                    : "Not Selected"

                                                            }

                                                        </strong>

                                                    </div>

                                                    <div>

                                                        <span>

                                                            Proposed Price

                                                        </span>

                                                        <strong>

                                                            {

                                                                invite.proposed_price

                                                                    ? `₹${invite.proposed_price}`

                                                                    : "-"

                                                            }

                                                        </strong>

                                                    </div>

                                                </div>

                                                {

                                                    invite.response_note && (

                                                        <div className="accepted-note">

                                                            <span>

                                                                Note

                                                            </span>

                                                            <p>

                                                                {invite.response_note}

                                                            </p>

                                                        </div>

                                                    )

                                                }

                                            </div>

                                        )

                                    }

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

};

export default FriendWorkspacePage;