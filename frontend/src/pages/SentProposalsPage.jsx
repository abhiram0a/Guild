// import {
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import {
//     getSentProposals,
//     // sendProposal,
//     resendProposal as resendProposalAPI,
// }
// from "../api/projectApi";

// import {
//     AuthContext
// }
// from "../context/AuthContext";


// import {
//     Modal,
//     Button,
//     Form,
// } from "react-bootstrap";



// const SentProposalsPage = () => {

//     const { token } =
//         useContext(AuthContext);

//     const [proposals,
//         setProposals] =
//         useState([]);

//     const [
//         showModal,
//         setShowModal,
//     ] = useState(false);

//     const [
//         selectedProposal,
//         setSelectedProposal,
//     ] = useState(null);

//     const [
//         proposalData,
//         setProposalData,
//     ] = useState({
//         proposed_price: "",
//         message: "",
//     });

//     useEffect(() => {
//         fetchProposals();
//     }, []);

//     const fetchProposals =
//         async () => {

//             const response =
//                 await getSentProposals(
//                     token
//                 );

//             setProposals(
//                 response.data
//             );
//         };

//     const openResendModal = (proposal) => {
//         setSelectedProposal(proposal);
//         setProposalData({

//             proposed_price:
//                 proposal.proposed_price,

//             message:
//                 proposal.message,
//         });
//         setShowModal(true);
//     };

//     const resendProposal = async () => {
//         try {
//             await resendProposalAPI(
//                 selectedProposal.id,
//                 {
//                     proposed_price: proposalData.proposed_price,
//                     message: proposalData.message,
//                 },
//                 token
//             );

//             setShowModal(false);
//             fetchProposals();
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     // const resendProposal = async () => {
//     //     try{
//     //         await sendProposal({

//     //             project:
//     //                 selectedProposal.project.id,

//     //             receiver:
//     //                 selectedProposal.receiver.id,

//     //             application:
//     //                 selectedProposal.application,

//     //             proposed_price:
//     //                 proposalData.proposed_price,

//     //             message:
//     //                 proposalData.message,
//     //         },

//     //         token);
//     //         setShowModal(false);
//     //         fetchProposals();
//     //     }

//     //     catch(error){
//     //         console.error(error);
//     //     }
//     // };

//     return (
//         <div className="container mt-4">

//             <h2>
//                 Sent Proposals
//             </h2>

//             {proposals.map(p => (

//                 <div
//                     key={p.id}
//                     className="card mb-3 p-3"
//                 >

//                     <p>
//                         {p.message}
//                     </p>

//                     <p>
//                         ₹
//                         {
//                             p.proposed_price
//                         }
//                     </p>

//                     <p>
//                         {p.status}
//                     </p>

//                     {

//                         p.status === "COUNTERED"

//                         &&

//                         p.counter_message && (

//                             <div className="alert alert-warning">

//                                 <strong>

//                                     Freelancer's message:

//                                 </strong>

//                                 <br/>

//                                 {p.counter_message}
//                                 <br/>

                            
//                             {

//                                 p.status === "COUNTERED" && (
                                    
//                                     <button
                                    
//                                         className="btn btn-primary"

//                                         onClick={() =>

//                                             openResendModal(p)

//                                         }

//                                     >

//                                         Send New Proposal

//                                     </button>

//                                 )

//                             }
//                             </div>
//                         )
//                     }
                    

//                 </div>

//             ))}

//             <Modal

//                 show={showModal}

//                 onHide={() =>

//                     setShowModal(false)

//                 }

//             >

//                 <Modal.Header closeButton>

//                     <Modal.Title>

//                         Send New Proposal

//                     </Modal.Title>

//                 </Modal.Header>

//                 <Modal.Body>

//                     <Form.Group className="mb-3">

//                         <Form.Label>

//                             Proposed Price

//                         </Form.Label>

//                         <Form.Control

//                             type="number"

//                             value={proposalData.proposed_price}

//                             onChange={(e)=>

//                                 setProposalData({

//                                     ...proposalData,

//                                     proposed_price:

//                                     e.target.value,

//                                 })

//                             }

//                         />

//                     </Form.Group>

//                     <Form.Group>

//                         <Form.Label>

//                             Message

//                         </Form.Label>

//                         <Form.Control

//                             as="textarea"

//                             rows={4}

//                             value={proposalData.message}

//                             onChange={(e)=>

//                                 setProposalData({

//                                     ...proposalData,

//                                     message:

//                                     e.target.value,

//                                 })

//                             }

//                         />

//                     </Form.Group>

//                 </Modal.Body>

//                 <Modal.Footer>

//                     <Button

//                         variant="secondary"

//                         onClick={()=>

//                             setShowModal(false)

//                         }

//                     >

//                         Cancel

//                     </Button>

//                     <Button

//                         variant="primary"

//                         onClick={resendProposal}

//                     >

//                         Send Proposal

//                     </Button>

//                 </Modal.Footer>

//             </Modal>
//         </div>
//     );
// };

// export default SentProposalsPage;





import {
    useContext,
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";

import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getSentProposals,
    resendProposal as resendProposalAPI,
} from "../api/projectApi";

import "./SentProposalsPage.css";

const SentProposalsPage = () => {

    const { token } =
        useContext(AuthContext);

    const [
        proposals,
        setProposals,
    ] = useState([]);

    const [
        expanded,
        setExpanded,
    ] = useState(null);

    const [
        showModal,
        setShowModal,
    ] = useState(false);

    const [
        selectedProposal,
        setSelectedProposal,
    ] = useState(null);

    const [
        proposalData,
        setProposalData,
    ] = useState({
        proposed_price: "",
        message: "",
    });

    useEffect(() => {

        if (token) {

            fetchProposals();

        }

    }, [token]);

    const fetchProposals = async () => {

        try {

            const response =
                await getSentProposals(
                    token
                );

            setProposals(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const openResendModal = (
        proposal
    ) => {

        setSelectedProposal(
            proposal
        );

        setProposalData({

            proposed_price:
                proposal.proposed_price,

            message:
                proposal.message,

        });

        setShowModal(true);

    };

    const resendProposal =
        async () => {

            try {

                await resendProposalAPI(

                    selectedProposal.id,

                    {

                        proposed_price:
                            proposalData.proposed_price,

                        message:
                            proposalData.message,

                    },

                    token

                );

                setShowModal(false);

                fetchProposals();

            }

            catch (error) {

                console.error(error);

            }

        };

    const pendingCount =
        proposals.filter(
            p => p.status === "PENDING"
        ).length;

    const acceptedCount =
        proposals.filter(
            p => p.status === "ACCEPTED"
        ).length;

    const counteredCount =
        proposals.filter(
            p => p.status === "COUNTERED"
        ).length;

    const rejectedCount =
        proposals.filter(
            p => p.status === "REJECTED"
        ).length;

    const getStatusClass =
        (status) => {

            switch (status) {

                case "ACCEPTED":
                    return "accepted";

                case "COUNTERED":
                    return "countered";

                case "REJECTED":
                    return "rejected";

                default:
                    return "pending";

            }

        };

    return (

        <div className="sent-proposals-page">

            <div className="sent-header">

                <div>

                    <h1>

                        Sent Proposals

                    </h1>

                    <p>

                        Review every proposal you've sent to freelancers,
                        continue negotiations and track responses.

                    </p>

                </div>

            </div>

            <div className="proposal-summary">

                <div>

                    <span>

                        Total

                    </span>

                    <strong>

                        {proposals.length}

                    </strong>

                </div>

                <div>

                    <span>

                        Pending

                    </span>

                    <strong>

                        {pendingCount}

                    </strong>

                </div>

                <div>

                    <span>

                        Countered

                    </span>

                    <strong>

                        {counteredCount}

                    </strong>

                </div>

                <div>

                    <span>

                        Accepted

                    </span>

                    <strong>

                        {acceptedCount}

                    </strong>

                </div>

            </div>

            {

                proposals.length === 0 ?

                (

                    <div className="proposal-empty">

                        <div className="empty-icon">

                            🤝

                        </div>

                        <h2>

                            No Proposals Sent

                        </h2>

                        <p>

                            Once you start negotiating with freelancers,
                            your proposals will appear here.

                        </p>

                        <Link

                            to="/projects"

                            className="browse-projects-btn"

                        >

                            Browse Projects

                        </Link>

                    </div>

                )

                :

                (

                    <div className="proposal-list">

                        {

                            proposals.map(

                                proposal => (

                                    <div

                                        key={proposal.id}

                                        className="proposal-card"

                                    >

                                        <div

                                            className="proposal-top"

                                            onClick={() =>

                                                setExpanded(

                                                    expanded === proposal.id

                                                        ? null

                                                        : proposal.id

                                                )

                                            }

                                        >

                                            <div className="proposal-main">

                                                <h3>

                                                    {

                                                        proposal.project.title

                                                    }

                                                </h3>

                                                <p>

                                                    Freelancer • {" "}

                                                    {

                                                        proposal.receiver.display_name

                                                    }

                                                </p>

                                            </div>

                                            <div className="proposal-price">

                                                ₹

                                                {

                                                    proposal.proposed_price

                                                }

                                            </div>

                                            <div

                                                className={`proposal-status ${getStatusClass(
                                                    proposal.status
                                                )}`}

                                            >

                                                {

                                                    proposal.status

                                                }

                                            </div>

                                            <div className="proposal-date">

                                                {

                                                    new Date(
                                                        proposal.created_at
                                                    ).toLocaleDateString()

                                                }

                                            </div>

                                            <div className="proposal-expand">

                                                {

                                                    expanded === proposal.id

                                                        ? "−"

                                                        : "+"

                                                }

                                            </div>

                                        </div>

                                        {

                                            expanded === proposal.id && (

                                                <div className="proposal-details">

                                                    <div className="detail-grid">

                                                        <div>

                                                            <span>

                                                                Freelancer

                                                            </span>

                                                            <strong>

                                                                {

                                                                    proposal.receiver.display_name

                                                                }

                                                            </strong>

                                                        </div>

                                                        <div>

                                                            <span>

                                                                Offered Price

                                                            </span>

                                                            <strong>

                                                                ₹{

                                                                    proposal.proposed_price

                                                                }

                                                            </strong>

                                                        </div>

                                                        <div>

                                                            <span>

                                                                Sent On

                                                            </span>

                                                            <strong>

                                                                {

                                                                    new Date(
                                                                        proposal.created_at
                                                                    ).toLocaleDateString()

                                                                }

                                                            </strong>

                                                        </div>

                                                        <div>

                                                            <span>

                                                                Status

                                                            </span>

                                                            <strong>

                                                                {

                                                                    proposal.status

                                                                }

                                                            </strong>

                                                        </div>

                                                    </div>

                                                    <div className="conversation-box">

                                                        <div className="message client-message">

                                                            <div className="message-label">

                                                                Your Proposal

                                                            </div>

                                                            <p>

                                                                {

                                                                    proposal.message

                                                                }

                                                            </p>

                                                        </div>
                                                        {

                                                            proposal.counter_message && (

                                                                <div className="message freelancer-message">

                                                                    <div className="message-label">

                                                                        Freelancer Response

                                                                    </div>

                                                                    <p>

                                                                        {

                                                                            proposal.counter_message

                                                                        }

                                                                    </p>

                                                                </div>

                                                            )

                                                        }

                                                    </div>


                                                    <div className="proposal-actions">

                                                        <Link

                                                            to={`/projects/${proposal.project.id}`}

                                                            className="view-project-btn"

                                                        >

                                                            View Project

                                                        </Link>


                                                        {

                                                            proposal.status === "COUNTERED" && (

                                                                <button

                                                                    className="resend-btn"

                                                                    onClick={() =>
                                                                        openResendModal(
                                                                            proposal
                                                                        )
                                                                    }

                                                                >

                                                                    Send New Proposal

                                                                </button>

                                                            )

                                                        }

                                                    </div>


                                                </div>

                                            )

                                        }


                                    </div>

                                )

                            )

                        }

                    </div>

                )

            }


            <Modal

                show={showModal}

                onHide={() =>
                    setShowModal(false)
                }

                centered

            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        Send New Proposal

                    </Modal.Title>

                </Modal.Header>


                <Modal.Body>

                    <Form.Group className="mb-3">

                        <Form.Label>

                            Proposed Price

                        </Form.Label>


                        <Form.Control

                            type="number"

                            value={
                                proposalData.proposed_price
                            }

                            onChange={(e) =>

                                setProposalData({

                                    ...proposalData,

                                    proposed_price:
                                        e.target.value,

                                })

                            }

                        />

                    </Form.Group>


                    <Form.Group>

                        <Form.Label>

                            Message

                        </Form.Label>


                        <Form.Control

                            as="textarea"

                            rows={5}

                            value={
                                proposalData.message
                            }

                            onChange={(e) =>

                                setProposalData({

                                    ...proposalData,

                                    message:
                                        e.target.value,

                                })

                            }

                        />

                    </Form.Group>


                </Modal.Body>


                <Modal.Footer>

                    <Button

                        variant="secondary"

                        onClick={() =>
                            setShowModal(false)
                        }

                    >

                        Cancel

                    </Button>


                    <Button

                        variant="primary"

                        onClick={resendProposal}

                    >

                        Send Proposal

                    </Button>


                </Modal.Footer>


            </Modal>


        </div>

    );

};


export default SentProposalsPage;