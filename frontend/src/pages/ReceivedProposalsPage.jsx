import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getReceivedProposals,
    updateProposalStatus,
} from "../api/projectApi";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import "./ReceivedProposalsPage.css";


const ReceivedProposalsPage = () => {

    const { token } = useContext(AuthContext);


    const [
        proposals,
        setProposals,
    ] = useState([]);


    const [
        expanded,
        setExpanded,
    ] = useState(null);


    const [
        showCounterModal,
        setShowCounterModal,
    ] = useState(false);


    const [
        selectedProposal,
        setSelectedProposal,
    ] = useState(null);


    const [
        counterMessage,
        setCounterMessage,
    ] = useState("");



    useEffect(() => {

        if(token){

            fetchProposals();

        }

    }, [token]);



    const fetchProposals = async () => {

        try{

            const response =
                await getReceivedProposals(
                    token
                );


            setProposals(
                response.data
            );

        }

        catch(error){

            console.error(error);

        }

    };



    const updateStatus = async (
        proposalId,
        status,
        message=""
    ) => {

        try{

            await updateProposalStatus(

                proposalId,

                {
                    status,
                    counter_message:message,
                },

                token
            );


            fetchProposals();

        }

        catch(error){

            console.error(error);

        }

    };



    const openCounterModal = (proposal)=>{

        setSelectedProposal(
            proposal
        );

        setCounterMessage("");

        setShowCounterModal(true);

    };



    const submitCounter = async()=>{

        await updateStatus(

            selectedProposal.id,

            "COUNTERED",

            counterMessage

        );


        setShowCounterModal(false);

    };



    const getStatusClass = (status)=>{

        switch(status){

            case "ACCEPTED":
                return "accepted";


            case "REJECTED":
                return "rejected";


            case "COUNTERED":
                return "countered";


            default:
                return "pending";

        }

    };



    const pendingCount =
        proposals.filter(
            p=>p.status==="PENDING"
        ).length;


    const acceptedCount =
        proposals.filter(
            p=>p.status==="ACCEPTED"
        ).length;


    const rejectedCount =
        proposals.filter(
            p=>p.status==="REJECTED"
        ).length;



    return (

        <div className="received-page">


            <div className="received-header">

                <div>

                    <h1>
                        Received Proposals
                    </h1>


                    <p>
                        Review offers from clients, negotiate pricing, and choose the projects that fit your skills.
                    </p>

                </div>

            </div>




            <div className="received-summary">


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
                        Accepted
                    </span>

                    <strong>
                        {acceptedCount}
                    </strong>

                </div>



                <div>

                    <span>
                        Rejected
                    </span>

                    <strong>
                        {rejectedCount}
                    </strong>

                </div>


            </div>





            {
                proposals.length === 0 ?


                (

                    <div className="received-empty">

                        <div className="empty-icon">
                            📩
                        </div>


                        <h2>
                            No Proposals Received
                        </h2>


                        <p>
                            When clients send you work proposals, they will appear here.
                        </p>


                    </div>

                )


                :


                (

                    <div className="proposal-timeline">


                        {
                            proposals.map(proposal=>(


                                <div
                                    key={proposal.id}
                                    className="proposal-item"
                                >


                                    <div
                                        className={
                                            `proposal-dot ${getStatusClass(proposal.status)}`
                                        }
                                    />



                                    <div className="proposal-card">



                                        <div
                                            className="proposal-row"
                                            onClick={()=>


                                                setExpanded(

                                                    expanded===proposal.id

                                                    ?

                                                    null

                                                    :

                                                    proposal.id

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

                                                    Client • 
                                                    {" "}
                                                    {
                                                        proposal.sender.display_name
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
                                                className={
                                                    `proposal-status ${getStatusClass(proposal.status)}`
                                                }
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
                                                    expanded===proposal.id
                                                    ?
                                                    "−"
                                                    :
                                                    "+"
                                                }

                                            </div>



                                        </div>





                                        {
                                            expanded===proposal.id &&


                                            (

                                                <div className="proposal-details">


                                                    <div className="detail-grid">


                                                        <div>

                                                            <span>
                                                                Client
                                                            </span>


                                                            <strong>
                                                                {
                                                                    proposal.sender.display_name
                                                                }
                                                            </strong>

                                                        </div>



                                                        <div>

                                                            <span>
                                                                Offered Price
                                                            </span>


                                                            <strong>
                                                                ₹
                                                                {
                                                                    proposal.proposed_price
                                                                }
                                                            </strong>

                                                        </div>



                                                        <div>

                                                            <span>
                                                                Project
                                                            </span>


                                                            <strong>
                                                                {
                                                                    proposal.project.title
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


                                                    </div>





                                                    <div className="proposal-message-box">


                                                        <h4>
                                                            Client Proposal
                                                        </h4>


                                                        <p>
                                                            {
                                                                proposal.message
                                                            }
                                                        </p>


                                                    </div>




                                                    {
                                                        proposal.counter_message &&


                                                        (

                                                            <div className="counter-box">

                                                                <h4>
                                                                    Your Counter Message
                                                                </h4>


                                                                <p>
                                                                    {
                                                                        proposal.counter_message
                                                                    }
                                                                </p>

                                                            </div>

                                                        )

                                                    }





                                                    {
                                                        proposal.status==="PENDING" &&


                                                        (

                                                            <div className="proposal-actions">


                                                                <button

                                                                    className="accept-btn"

                                                                    onClick={()=>
                                                                        updateStatus(
                                                                            proposal.id,
                                                                            "ACCEPTED"
                                                                        )
                                                                    }

                                                                >

                                                                    Accept

                                                                </button>




                                                                <button

                                                                    className="reject-btn"

                                                                    onClick={()=>
                                                                        updateStatus(
                                                                            proposal.id,
                                                                            "REJECTED"
                                                                        )
                                                                    }

                                                                >

                                                                    Reject

                                                                </button>




                                                                <button

                                                                    className="counter-btn"

                                                                    onClick={()=>
                                                                        openCounterModal(
                                                                            proposal
                                                                        )
                                                                    }

                                                                >

                                                                    Counter

                                                                </button>



                                                            </div>

                                                        )

                                                    }



                                                </div>

                                            )

                                        }


                                    </div>



                                </div>


                            ))

                        }


                    </div>


                )

            }






            <Modal

                show={showCounterModal}

                onHide={()=>
                    setShowCounterModal(false)
                }

            >


                <Modal.Header closeButton>

                    <Modal.Title>
                        Counter Offer
                    </Modal.Title>

                </Modal.Header>



                <Modal.Body>


                    <Form.Group>


                        <Form.Label>

                            Message

                        </Form.Label>



                        <Form.Control

                            as="textarea"

                            rows={4}

                            value={counterMessage}

                            onChange={(e)=>
                                setCounterMessage(
                                    e.target.value
                                )
                            }


                            placeholder="Explain your counter offer..."

                        />


                    </Form.Group>


                </Modal.Body>



                <Modal.Footer>


                    <Button

                        variant="secondary"

                        onClick={()=>
                            setShowCounterModal(false)
                        }

                    >

                        Cancel

                    </Button>



                    <Button

                        variant="warning"

                        onClick={submitCounter}

                    >

                        Submit Counter

                    </Button>


                </Modal.Footer>



            </Modal>



        </div>

    );

};


export default ReceivedProposalsPage;