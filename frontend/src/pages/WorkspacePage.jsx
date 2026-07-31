// import {
//     useContext,
//     useEffect,
//     useRef,
//     useState,
// } from "react";

// import {
//     useParams,
// } from "react-router-dom";

// import {
//     Modal,
//     Button,
//     Form,
// } from "react-bootstrap";

// import {
//     AuthContext,
// } from "../context/AuthContext";

// import {
//     getWorkspace,
//     sendWorkspaceMessage,
//     uploadWorkspaceFile,
//     getWorkspacePayment,
//     updateWorkspacePayment,
//     getWorkspaceReviewTargets,
//     submitWorkspaceReview,
// } from "../api/collaborationApi";



// const MEDIA_URL = "http://localhost:8000";


// const WorkspacePage = () => {

//     const { id } = useParams();

//     const { token, user } = useContext(AuthContext);

//     const [workspace, setWorkspace] =
//         useState(null);

//     const [payment, setPayment] = 
//         useState(null);

//     const [showPaymentModal, setShowPaymentModal] = 
//         useState(false);

//     const [timeline, setTimeline] =
//         useState([]);

//     const [message, setMessage] =
//         useState("");

//     const [file, setFile] =
//         useState(null);


//     const [reviewTargets, setReviewTargets] = 
//         useState([]);


//     const [ showReviewModal, setShowReviewModal] =
//         useState(false);


//     const [selectedTarget, setSelectedTarget] = 
//         useState(null);


//     const [reviewData, setReviewData] = 
//         useState({

//             rating: 5,
//             comment: "",

//         });

//     const bottomRef =
//         useRef(null);

//     useEffect(() => {

//         fetchWorkspace();

//     }, [id]);

//     useEffect(() => {

//         bottomRef.current?.scrollIntoView({

//             behavior: "smooth",

//         });

//     }, [timeline]);

    

//     const fetchWorkspace = async () => {

//         try {

//             const response =
//                 await getWorkspace(
//                     id,
//                     token
//                 );

//             setWorkspace(
//                 response.data.workspace
//             );
            

//             setTimeline(
//                 response.data.timeline
//             );

//             fetchPayment();

//             fetchReviewTargets();
//         }

//         catch (error) {
//             console.error(error);
//         }
//     };

    

//     const fetchPayment = async () => {

//         try{
//             const response =

//                 await getWorkspacePayment(

//                     id,
//                     token
//                 );

//             setPayment(
//                 response.data
//             );
//         }

//         catch(error){
//             console.error(error);
//         }
//     };

//     const fetchReviewTargets = async () => {
//         try {
//             const response =
//                 await getWorkspaceReviewTargets(id, token);

//             setReviewTargets(response.data || []);
//         } catch (error) {

//             // IMPORTANT: ignore expected backend state (payment not released)
//             if (error?.response?.status === 400) {
//                 setReviewTargets([]);
//                 return;
//             }

//             console.error("Unexpected Review API error:", error);
//             setReviewTargets([]);
//         }
//     };
    
//     const openReviewModal = (

//         target

//     ) => {

//         setSelectedTarget(
//             target
//         );

//         setReviewData({

//             rating: 5,
//             comment: "",
//         });

//         setShowReviewModal(true);
//     };

// // 

// const submitReview = async () => {

//     try {

//         await submitWorkspaceReview(

//             id,

//             {
//                 freelancer: selectedTarget.freelancer_id,
//                 gig: selectedTarget.gig_id,
//                 rating: reviewData.rating,
//                 comment: reviewData.comment,
//             },

//             token
//         );

//         setShowReviewModal(false);

//         fetchReviewTargets();

//     } catch (error) {

//         console.error(error);

//     }

// };

//     const handleSend = async () => {
//         if (!message.trim()) return;
//         await sendWorkspaceMessage(

//             id,

//             {
//                 message,
//             },
//             token
//         );

//         setMessage("");
//         fetchWorkspace();
//     };

//     const handleUpload = async () => {

//         if (!file) return;

//         const formData =
//             new FormData();

//         formData.append(
//             "file",
//             file
//         );

//         await uploadWorkspaceFile(
//             id,
//             formData,
//             token
//         );

//         setFile(null);
//         fetchWorkspace();
//     };

//     const handlePaymentAction = async (
//         action
//     ) => {

//         try{
//             await updateWorkspacePayment(

//                 id,
//                 {action},
//                 token
//             );

//             fetchPayment();
//             setShowPaymentModal(false);
//         }

//         catch(error){
//             console.error(error);
//         }
//     };

//     if (!workspace)
//         return (
//             <div className="container mt-4">
//                 Loading...
//             </div>
//         );

//     return (
//         <div className="container mt-4">
        
//             <hr />

//             <div className="d-flex justify-content-between align-items-center mb-3">

//                 <h2>

//                     {workspace.project.title}

//                 </h2>

//                 <button

//                     className="btn btn-warning"

//                     onClick={()=>

//                         setShowPaymentModal(true)

//                     }
//                 >
//                     Payment
//                 </button>
//             </div>

//             <div

//                 className="border rounded p-3"
//                 style={{
//                     height: "500px",
//                     overflowY: "auto",
//                     background: "#fafafa",
//                 }}

//             >

//                 {timeline.map(item => (

//                     <div
//                         key={item.type + item.id}
//                         className="d-flex mb-3"
//                     >

//                         <div
//                             className="p-3 rounded shadow-sm"
//                             style={{
//                                 maxWidth: "70%",
//                                 backgroundColor: "#f8f9fa",
//                             }}
//                         >

//                             <div className="fw-bold">
//                                 {item?.sender?.display_name || "System"}
//                             </div>


//                             <small className="text-muted">

//                                 {
//                                     new Date(
//                                         item.created_at
//                                     ).toLocaleString()
//                                 }

//                             </small>

//                             <hr className="my-2"/>

//                             {
//                                 item.type === "message" && (

//                                     <div>

//                                         {item.message}

//                                     </div>

//                                 )
//                             }

//                             {
//                                 item.type === "file" && (

//                                     <div>

//                                         📎

//                                         <a
//                                             href={`${MEDIA_URL}${item.file}`}
//                                             target="_blank"
//                                             rel="noreferrer"
//                                             className="ms-2"
//                                         >
//                                             Download File
//                                         </a>

//                                     </div>

//                                 )
//                             }

//                         </div>

//                     </div>

//                 ))}
//                 <div ref={bottomRef}></div>

//             </div>

// <hr />

//     {payment && payment.status === "RELEASED" && (
//         <>
//             <h5>

//                 Reviews

//             </h5>

//             {
//                 reviewTargets.length === 0 ? (
//                     <div className="text-muted">
//                         No pending reviews.
//                     </div>
//                 ) : (
//                     reviewTargets.map((target, index) => (
//                         <div
//                             key={target?.gig?.id || index}
//                             className="card p-3 mb-2"
//                         >
//                         <h6>
//                             {target?.freelancer_name || "Unknown freelancer"}
//                         </h6>

//                             <p>
//                                 Gig: {target?.gig_title || "Unknown gig"}
//                             </p>

//                             <button
//                                 className="btn btn-warning"
//                                 onClick={() => openReviewModal(target)}
//                                 disabled={
//                                     !target?.gig_id ||
//                                     target.already_reviewed
//                                 }
//                             >
//                                 {
//                                     target.already_reviewed
//                                         ? "Reviewed"
//                                         : "Leave Review"
//                                 }
//                             </button>
//                         </div>
//                     ))
//                 )
//             }
//         </>
//     )}
  
//             <div className="mt-3">

//                 <textarea
//                     className="form-control"
//                     rows={3}
//                     placeholder="Type a message..."
//                     value={message}
//                     onChange={e =>

//                         setMessage(
//                             e.target.value
//                         )
//                     }

//                 />

//                 <button
//                     className="btn btn-primary mt-2"
//                     onClick={handleSend}
//                 >
//                     Send Message
//                 </button>

//             </div>

//             <div className="mt-4">
//                 <input
//                     type="file"
//                     className="form-control"
//                     onChange={e =>
//                         setFile(
//                             e.target.files[0]
//                         )
//                     }
//                 />

//                 <button
//                     className="btn btn-success mt-2"
//                     onClick={handleUpload}
//                 >
//                     Upload File
//                 </button>

//             </div>







//             <Modal

//                 show={showPaymentModal}

//                 onHide={()=>

//                     setShowPaymentModal(false)

//                 }

//             >

//                 <Modal.Header closeButton>

//                     <Modal.Title>

//                         Workspace Payment

//                     </Modal.Title>

//                 </Modal.Header>

//                 <Modal.Body>

//                     {

//                         payment &&

//                         <>

//                             <h5>

//                                 ₹{payment.amount}

//                             </h5>

//                             <hr/>

//                             <p>

//                                 Status :

//                                 <strong>

//                                     {" "}

//                                     {payment.status}

//                                 </strong>

//                             </p>

//                             {

//                             workspace.client &&
//                             user &&
//                             workspace.client.id === user.id ?

//                                 (

//                                     <>

//                                         {

//                                             payment.status==="UNPAID" &&

//                                             <>

//                                                 <p>

//                                                     The project payment has not yet been deposited.

//                                                 </p>

//                                                 <Button

//                                                     variant="success"

//                                                     onClick={()=>

//                                                         handlePaymentAction(

//                                                             "pay"

//                                                         )

//                                                     }

//                                                 >

//                                                     Pay Now

//                                                 </Button>

//                                             </>

//                                         }

//                                         {

//                                             payment.status==="HELD" &&

//                                             <>

//                                                 <p>

//                                                     Payment is safely held by the platform.

//                                                     Release it once you're satisfied.

//                                                 </p>

//                                                 <Button

//                                                     variant="primary"

//                                                     onClick={()=>

//                                                         handlePaymentAction(

//                                                             "release"

//                                                         )

//                                                     }

//                                                 >

//                                                     Release Payment

//                                                 </Button>

//                                             </>

//                                         }

//                                         {

//                                             payment.status==="RELEASED" &&

//                                             <div

//                                                 className="alert alert-success"

//                                             >

//                                                 Payment released successfully.

//                                             </div>

//                                         }

//                                     </>

//                                 )

//                                 :

//                                 (

//                                     <>

//                                         {

//                                             payment.status==="UNPAID" &&

//                                             <div

//                                                 className="alert alert-warning"

//                                             >

//                                                 Client hasn't deposited the payment yet.

//                                                 Wait before delivering the final work.

//                                             </div>

//                                         }

//                                         {

//                                             payment.status==="HELD" &&

//                                             <div

//                                                 className="alert alert-info"

//                                             >

//                                                 Client has deposited the payment.

//                                                 Complete the project to receive it.

//                                             </div>

//                                         }

//                                         {

//                                             payment.status==="RELEASED" &&

//                                             <div

//                                                 className="alert alert-success"

//                                             >

//                                                 Client released the payment.

//                                                 Your balance has been updated.

//                                             </div>

//                                         }

//                                     </>

//                                 )

//                             }

//                         </>

//                     }

//                 </Modal.Body>

//                 <Modal.Footer>

//                     <Button

//                         variant="secondary"

//                         onClick={()=>

//                             setShowPaymentModal(false)

//                         }

//                     >

//                         Close

//                     </Button>

//                 </Modal.Footer>

//             </Modal>



//             <Modal

//                 show={showReviewModal}

//                 onHide={() =>

//                     setShowReviewModal(false)

//                 }

//             >

//                 <Modal.Header closeButton>

//                     <Modal.Title>

//                         Review Freelancer

//                     </Modal.Title>

//                 </Modal.Header>

//                 <Modal.Body>

//                     {

//                         selectedTarget && (

//                             <>

//                                 <p>

//                                     <strong>

//                                         Freelancer

//                                     </strong>

//                                     <br/>

//                                     {

//                                         selectedTarget.freelancer_name

//                                     }

//                                 </p>

//                                 <p>

//                                     <strong>

//                                         Gig

//                                     </strong>

//                                     <br/>

//                                     {

//                                         selectedTarget.gig_title

//                                     }

//                                 </p>

//                             </>

//                         )

//                     }

//                     <Form.Group>

//                         <Form.Label>

//                             Rating

//                         </Form.Label>

//                         <div>

//                             {

//                                 [1,2,3,4,5].map(star => (

//                                     <Button

//                                         key={star}

//                                         variant={

//                                             reviewData.rating >= star

//                                             ? "warning"

//                                             : "outline-warning"

//                                         }

//                                         className="me-2 mb-2"

//                                         onClick={() =>

//                                             setReviewData({

//                                                 ...reviewData,

//                                                 rating: star,

//                                             })

//                                         }

//                                     >

//                                         ★ {star}

//                                     </Button>

//                                 ))

//                             }

//                         </div>

//                     </Form.Group>

//                     <Form.Group className="mt-3">

//                         <Form.Label>

//                             Comment

//                         </Form.Label>

//                         <Form.Control

//                             as="textarea"

//                             rows={4}

//                             value={reviewData.comment}

//                             onChange={(e)=>

//                                 setReviewData({

//                                     ...reviewData,

//                                     comment:e.target.value,

//                                 })

//                             }

//                         />

//                     </Form.Group>

//                 </Modal.Body>

//                 <Modal.Footer>

//                     <Button

//                         variant="secondary"

//                         onClick={()=>

//                             setShowReviewModal(false)

//                         }

//                     >

//                         Cancel

//                     </Button>

//                     <Button

//                         variant="warning"

//                         onClick={submitReview}

//                     >

//                         Submit Review

//                     </Button>

//                 </Modal.Footer>

//             </Modal>


//         </div>
//     );
// };

// export default WorkspacePage;










import {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getWorkspace,
    sendWorkspaceMessage,
    uploadWorkspaceFile,
    getWorkspacePayment,
    updateWorkspacePayment,
    getWorkspaceReviewTargets,
    submitWorkspaceReview,
} from "../api/collaborationApi";

import "./WorkspacePage.css";

const MEDIA_URL = "http://localhost:8000";

const WorkspacePage = () => {

    const { id } = useParams();

    const {
        token,
        user,
    } = useContext(AuthContext);

    const [workspace, setWorkspace] =
        useState(null);

    const [timeline, setTimeline] =
        useState([]);

    const [payment, setPayment] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [file, setFile] =
        useState(null);

    const [
        showPaymentModal,
        setShowPaymentModal,
    ] = useState(false);

    const [
        reviewTargets,
        setReviewTargets,
    ] = useState([]);

    const [
        showReviewModal,
        setShowReviewModal,
    ] = useState(false);

    const [
        selectedTarget,
        setSelectedTarget,
    ] = useState(null);

    const [
        reviewData,
        setReviewData,
    ] = useState({
        rating: 5,
        comment: "",
    });

    const bottomRef = useRef(null);

    useEffect(() => {

        fetchWorkspace();

    }, [id]);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth",

        });

    }, [timeline]);

    const fetchWorkspace = async () => {

        try {

            const response =
                await getWorkspace(
                    id,
                    token
                );

            setWorkspace(
                response.data.workspace
            );

            setTimeline(
                response.data.timeline
            );

            fetchPayment();

            fetchReviewTargets();

        }

        catch (error) {

            console.error(error);

        }

    };

    const fetchPayment = async () => {

        try {

            const response =
                await getWorkspacePayment(
                    id,
                    token
                );

            setPayment(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const fetchReviewTargets = async () => {

        try {

            const response =
                await getWorkspaceReviewTargets(
                    id,
                    token
                );

            setReviewTargets(
                response.data || []
            );

        }

        catch (error) {

            if (
                error?.response?.status === 400
            ) {

                setReviewTargets([]);

                return;

            }

            console.error(error);

            setReviewTargets([]);

        }

    };

    const handleSend = async () => {

        if (!message.trim()) return;

        await sendWorkspaceMessage(

            id,

            {
                message,
            },

            token

        );

        setMessage("");

        fetchWorkspace();

    };

    const handleUpload = async () => {

        if (!file) return;

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        await uploadWorkspaceFile(

            id,

            formData,

            token

        );

        setFile(null);

        fetchWorkspace();

    };

    const handlePaymentAction = async (

        action

    ) => {

        try {

            await updateWorkspacePayment(

                id,

                { action },

                token

            );

            fetchPayment();

            setShowPaymentModal(false);

        }

        catch (error) {

            console.error(error);

        }

    };

    const openReviewModal = (

        target

    ) => {

        setSelectedTarget(target);

        setReviewData({

            rating: 5,

            comment: "",

        });

        setShowReviewModal(true);

    };

    const submitReview = async () => {

        try {

            await submitWorkspaceReview(

                id,

                {

                    freelancer:
                        selectedTarget.freelancer_id,

                    gig:
                        selectedTarget.gig_id,

                    rating:
                        reviewData.rating,

                    comment:
                        reviewData.comment,

                },

                token

            );

            setShowReviewModal(false);

            fetchReviewTargets();

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!workspace) {

        return (

            <div className="workspace-loading">

                Loading Workspace...

            </div>

        );

    }

    return (
        <>

        <div className="workspace-page">

            <div className="workspace-header">

                <div>

                    <div className="workspace-breadcrumb">

                        Workspace

                    </div>

                    <h1>

                        {workspace.project.title}

                    </h1>

                    <div className="workspace-meta">

                        <span>

                            Client

                            <strong>

                                {workspace.client.display_name}

                            </strong>

                        </span>

                        <span>

                            Status

                            <strong>

                                {workspace.project.status}

                            </strong>

                        </span>

                    </div>

                </div>

                <button

                    className="workspace-payment-btn"

                    onClick={() =>
                        setShowPaymentModal(true)
                    }

                >

                    Payment

                </button>

            </div>

            <div className="workspace-layout">

                <div className="workspace-chat">

                    <div className="chat-header">

                        Conversation

                    </div>

                    <div className="chat-feed">
                        {timeline.length === 0 ? (

                            <div className="workspace-empty">

                                <h4>

                                    No conversation yet

                                </h4>

                                <p>

                                    Start collaborating by sending your first
                                    message or sharing a file.

                                </p>

                            </div>

                        ) : (

                            timeline.map(item => {

                                const isMine =
                                    user &&
                                    item.sender &&
                                    item.sender.id === user.id;

                                return (

                                    <div
                                        key={`${item.type}-${item.id}`}
                                        className={`chat-row ${isMine ? "mine" : ""}`}
                                    >

                                        {!isMine && (

                                            <div className="chat-avatar">

                                                {item.sender
                                                    ? item.sender.display_name
                                                          .charAt(0)
                                                          .toUpperCase()
                                                    : "S"}

                                            </div>

                                        )}

                                        <div className="chat-content">

                                            <div className="chat-info">

                                                <span className="chat-author">

                                                    {item.sender
                                                        ? item.sender.display_name
                                                        : "System"}

                                                </span>

                                                <span className="chat-time">

                                                    {new Date(
                                                        item.created_at
                                                    ).toLocaleString()}

                                                </span>

                                            </div>

                                            <div
                                                className={`chat-bubble ${
                                                    item.type === "file"
                                                        ? "file-bubble"
                                                        : ""
                                                }`}
                                            >

                                                {item.type === "message" && (

                                                    <p>

                                                        {item.message}

                                                    </p>

                                                )}

                                                {item.type === "file" && (

                                                    <div className="workspace-file">

                                                        <div className="workspace-file-icon">

                                                            📄

                                                        </div>

                                                        <div className="workspace-file-info">

                                                            <strong>

                                                                Shared File

                                                            </strong>

                                                            <a
                                                                href={`${MEDIA_URL}${item.file}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >

                                                                Download File

                                                            </a>

                                                        </div>

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                );

                            })

                        )}

                        <div ref={bottomRef}></div>

                    </div>

                    <div className="workspace-composer">

                        <textarea
                            rows={4}
                            className="form-control"
                            placeholder="Write a message to your teammates..."
                            value={message}
                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                        />

                        <div className="composer-actions">

                            <div className="upload-box">

                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files[0]
                                        )
                                    }
                                />

                                <button
                                    className="upload-btn"
                                    onClick={handleUpload}
                                >

                                    Upload File

                                </button>

                            </div>

                            <button
                                className="send-btn"
                                onClick={handleSend}
                            >

                                Send Message

                            </button>

                        </div>

                    </div>

                </div>

                <aside className="workspace-sidebar">

                    <div className="sidebar-card">

                        <h3>

                            Team Members

                        </h3>

                        <div className="participants-list">

                            {workspace.participants.map(member => (

                                <div
                                    key={member.id}
                                    className="participant-item"
                                >

                                    <div className="participant-avatar">

                                        {member.user.display_name
                                            .charAt(0)
                                            .toUpperCase()}

                                    </div>

                                    <div>

                                        <div className="participant-name">

                                            {member.user.display_name}

                                        </div>

                                        <small>

                                            {member.role}

                                        </small>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="sidebar-card">

                        <h3>

                            Payment

                        </h3>

                        {payment && (

                            <>

                                <div className="payment-amount">

                                    ₹{payment.amount}

                                </div>

                                <div
                                    className={`payment-status status-${payment.status.toLowerCase()}`}
                                >

                                    {payment.status}

                                </div>

                                <button
                                    className="workspace-payment-btn full-width"
                                    onClick={() =>
                                        setShowPaymentModal(true)
                                    }
                                >

                                    Manage Payment

                                </button>

                            </>

                        )}

                    </div>

                    {payment &&
                        payment.status === "RELEASED" &&
                        workspace.client &&
                        user &&
                        workspace.client.id === user.id && (

                            <div className="sidebar-card">

                                <h3>

                                    Reviews

                                </h3>

                                {reviewTargets.length === 0 ? (

                                    <div className="no-review">

                                        No pending reviews.

                                    </div>

                                ) : (

                                    reviewTargets.map(target => (

                                        <div
                                            key={target.gig_id}
                                            className="review-person"
                                        >

                                            <div>

                                                <strong>

                                                    {target.freelancer_name}

                                                </strong>

                                                <small>

                                                    {target.gig_title}

                                                </small>

                                            </div>

                                            <button
                                                className="review-btn"
                                                disabled={
                                                    target.already_reviewed
                                                }
                                                onClick={() =>
                                                    openReviewModal(
                                                        target
                                                    )
                                                }
                                            >

                                                {target.already_reviewed
                                                    ? "Reviewed"
                                                    : "Review"}

                                            </button>

                                        </div>

                                    ))

                                )}

                            </div>

                        )}

                </aside>
            </div>
        </div>

        {/* PAYMENT MODAL */}

        <Modal
            show={showPaymentModal}
            onHide={() =>
                setShowPaymentModal(false)
            }
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Workspace Payment

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                {

                    payment && (

                        <>

                            <div className="payment-summary">

                                <div>

                                    <small>
                                        Total Payment
                                    </small>

                                    <h3>

                                        ₹{payment.amount}

                                    </h3>

                                </div>

                                <span
                                    className={`payment-status ${payment.status.toLowerCase()}`}
                                >

                                    {payment.status}

                                </span>

                            </div>

                            <hr />

                            {

                                workspace.client &&
                                user &&
                                workspace.client.id === user.id ? (

                                    <>

                                        {

                                            payment.status === "UNPAID" && (

                                                <>

                                                    <p>

                                                        Deposit the project amount.
                                                        Guild will securely hold the payment
                                                        until work is completed.

                                                    </p>

                                                    <Button
                                                        variant="success"
                                                        onClick={() =>
                                                            handlePaymentAction(
                                                                "pay"
                                                            )
                                                        }
                                                    >
                                                        Deposit Payment
                                                    </Button>

                                                </>

                                            )

                                        }

                                        {

                                            payment.status === "HELD" && (

                                                <>

                                                    <p>

                                                        Payment is being safely
                                                        held in escrow.
                                                        Release it once the work
                                                        is completed.

                                                    </p>

                                                    <Button
                                                        variant="primary"
                                                        onClick={() =>
                                                            handlePaymentAction(
                                                                "release"
                                                            )
                                                        }
                                                    >
                                                        Release Payment
                                                    </Button>

                                                </>

                                            )

                                        }

                                        {

                                            payment.status === "RELEASED" && (

                                                <div className="alert alert-success">

                                                    Payment released successfully.

                                                </div>

                                            )

                                        }

                                    </>

                                ) : (

                                    <>

                                        {

                                            payment.status === "UNPAID" && (

                                                <div className="alert alert-warning">

                                                    Waiting for the client
                                                    to deposit payment.

                                                </div>

                                            )

                                        }

                                        {

                                            payment.status === "HELD" && (

                                                <div className="alert alert-info">

                                                    Payment has been secured.
                                                    Complete your work confidently.

                                                </div>

                                            )

                                        }

                                        {

                                            payment.status === "RELEASED" && (

                                                <div className="alert alert-success">

                                                    Payment released.
                                                    Your wallet balance has
                                                    been updated.

                                                </div>

                                            )

                                        }

                                    </>

                                )

                            }

                        </>

                    )

                }

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={() =>
                        setShowPaymentModal(false)
                    }
                >
                    Close
                </Button>

            </Modal.Footer>

        </Modal>
        {/* REVIEW MODAL */}

        <Modal
            show={showReviewModal}
            onHide={() =>
                setShowReviewModal(false)
            }
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Leave a Review

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                {

                    selectedTarget && (

                        <div className="review-header">

                            <div className="review-avatar">

                                {

                                    selectedTarget.freelancer_name
                                        ?.charAt(0)
                                        ?.toUpperCase()

                                }

                            </div>

                            <div>

                                <h5>

                                    {

                                        selectedTarget.freelancer_name

                                    }

                                </h5>

                                <small>

                                    {

                                        selectedTarget.gig_title

                                    }

                                </small>

                            </div>

                        </div>

                    )

                }

                <Form.Group
                    className="mt-4"
                >

                    <Form.Label>

                        Rating

                    </Form.Label>

                    <div className="review-stars">

                        {

                            [1, 2, 3, 4, 5].map(
                                (star) => (

                                    <button
                                        key={star}
                                        type="button"
                                        className={
                                            reviewData.rating >= star
                                                ? "star-btn active"
                                                : "star-btn"
                                        }
                                        onClick={() =>
                                            setReviewData({
                                                ...reviewData,
                                                rating: star,
                                            })
                                        }
                                    >

                                        ★

                                    </button>

                                )
                            )

                        }

                    </div>

                </Form.Group>

                <Form.Group
                    className="mt-4"
                >

                    <Form.Label>

                        Comment

                    </Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Share your experience working with this freelancer..."
                        value={reviewData.comment}
                        onChange={(e) =>
                            setReviewData({
                                ...reviewData,
                                comment: e.target.value,
                            })
                        }
                    />

                </Form.Group>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={() =>
                        setShowReviewModal(false)
                    }
                >

                    Cancel

                </Button>

                <Button
                    variant="warning"
                    onClick={submitReview}
                >

                    Submit Review

                </Button>

            </Modal.Footer>

        </Modal>
    </>
    );

};

export default WorkspacePage;
