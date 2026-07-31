// import {
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import { useParams }
// from "react-router-dom";
// import { Link } from "react-router-dom";


// import { AuthContext }
// from "../context/AuthContext";

// import {
//     getProjectApplications
// } from "../api/projectApi";

// import {
//     sendProposal
// } from "../api/projectApi";

// import {
//     Modal,
//     Button
// } from "react-bootstrap";

// const ProjectApplicationsPage = () => {

//     const { id } = useParams();

//     const { token } =
//         useContext(AuthContext);

//     const [applications,
//         setApplications] =
//         useState([]);

//     useEffect(() => {

//         fetchApplications();

//     }, []);

//     const [showModal, setShowModal] =
//         useState(false);

//     const [selectedApplication,
//         setSelectedApplication] =
//         useState(null);

//     const [proposalData,
//         setProposalData] =
//         useState({
//             proposed_price: "",
//             message: "",
//         });

//     const [isMultiRole, setIsMultiRole] =
//         useState(false);

//     const openProposalModal = (
//         application
//     ) => {

//         setSelectedApplication(
//             application
//         );

//         setProposalData({
//             proposed_price:
//                 application.proposed_price,
//             message: "",
//         });

//         setShowModal(true);
//     };

// const handleSendProposal = async () => {

//     try {
//         await sendProposal(

//             {
//                 project: id,

//                 application:
//                     selectedApplication.id,

//                 receiver:
//                     selectedApplication.applicant_user.id,

//                 proposed_price:
//                     proposalData.proposed_price,

//                 message:
//                     proposalData.message,

//             },

//             token

//         );

//         setShowModal(false);

//         alert("Proposal sent");

//     }

//     catch (error) {

//         console.error(error);

//         alert(
//             error.response?.data?.error ||
//             "Failed to send proposal"
//         );

//     }

// };

//     const fetchApplications =
//         async () => {

//             const response =
//                 await getProjectApplications(
//                     id,
//                     token
//                 );

//             setApplications(response.data);

//             if (response.data.length > 0) {

//                 if (response.data[0].team) {

//                     setIsMultiRole(true);

//                 }

//             }
//         };

//     return (
//         <div className="container mt-4">

//             <h2>
//                 Project Applications
//             </h2>

//             <ul className="list-group">

//                 {/* {applications.map(app => (

//                     <li
//                         key={app.id}
//                         className="list-group-item"
//                     >

//                         <h5>

//                             <Link
//                                 to={`/profile/${app.applicant_user.id}`}
//                             >
//                                 {app.applicant_user.display_name}
//                             </Link>

//                         </h5>

//                         <p>

//                             Gig:

//                             {" "}

//                             <Link
//                                 to={`/gigs/${app.selected_gig.id}`}
//                             >
//                                 {app.selected_gig.title}
//                             </Link>

//                         </p>

//                         <p>
//                             Price:
//                             ₹{app.proposed_price}
//                         </p>

//                         <p>
//                             Status:
//                             {app.status}
//                         </p>

//                         <p>
//                             Cover Letter:
//                             {app.cover_letter}
//                         </p>
                        
//                         <button
//                             className="btn btn-primary mt-2"
//                             onClick={() =>
//                                 openProposalModal(app)
//                             }
//                         >
//                             Send Proposal
//                         </button>
//                     </li>


//                 ))} */}

//                 {applications.map(app => (
//                 <li key={app.id} className="list-group-item">
//                     {!isMultiRole && (
//                     <>
//                         <h5>
//                         <Link to={`/profile/${app.applicant_user.id}`}>
//                             {app.applicant_user.display_name}
//                         </Link>
//                         </h5>

//                         <p>
//                         Gig{" "}
//                         <Link to={`/gigs/${app.selected_gig.id}`}>
//                             {app.selected_gig.title}
//                         </Link>
//                         </p>

//                         <p>Price ₹{app.proposed_price}</p>

//                         <p>Status {app.status}</p>

//                         <p>Cover Letter {app.cover_letter}</p>
//                     </>
//                     )}

//                     {isMultiRole && (
//                     <>
//                         <h4>Team Application</h4>

//                         <p>
//                         <strong>Leader</strong>
//                         <br />
//                         <Link to={`/profile/${app.applicant_user.id}`}>
//                             {app.applicant_user.display_name}
//                         </Link>
//                         </p>

//                         <hr />

//                         <h5>Team Members</h5>

//                         {app.team.members.map(member => (
//                         <div key={member.id} className="border rounded p-2 mb-2">
//                             <p>
//                             <strong>Freelancer</strong>
//                             <br />
//                             <Link to={`/profile/${member.user.id}`}>
//                                 {member.user.display_name}
//                             </Link>
//                             </p>

//                             <p>
//                             <strong>Gig</strong>
//                             <br />
//                             {member.gig ? (
//                                 <Link to={`/gigs/${member.gig.id}`}>
//                                 {member.gig.title}
//                                 </Link>
//                             ) : (
//                                 <Link to={`/gigs/${app.selected_gig.id}`}>
//                                     {app.selected_gig.title}
//                                 </Link>
                                
//                             )}
//                             </p>
//                         </div>
//                         ))}

//                         <hr />

//                         <p>
//                         <strong>Team Price</strong>
//                         <br />
//                         ₹{app.proposed_price}
//                         </p>

//                         <p>
//                         <strong>Cover Letter</strong>
//                         <br />
//                         {app.cover_letter}
//                         </p>
//                     </>
//                     )}

//                     <button
//                     className="btn btn-primary mt-3"
//                     onClick={() => openProposalModal(app)}
//                     >
//                     Send Proposal
//                     </button>
//                 </li>
//                 ))}
//             </ul>
//             <Modal
//                 show={showModal}
//                 onHide={() =>
//                     setShowModal(false)
//                 }
//             >

//                 <Modal.Header closeButton>

//                     <Modal.Title>

//                         Send Proposal

//                     </Modal.Title>

//                 </Modal.Header>

//                 <Modal.Body>

//                     {selectedApplication && (

//                         <>

//                             {!isMultiRole ? (
//                             <>
//                                 <p>
//                                 <strong>Freelancer:</strong>{" "}
//                                 {selectedApplication.applicant_user.display_name}
//                                 </p>

//                                 <p>
//                                 <strong>Gig:</strong>{" "}
//                                 {selectedApplication.selected_gig.title}
//                                 </p>
//                             </>
//                             ) : (
//                             <>

//                                 <h6>Team Members</h6>

//                                 <ul>
//                                 {selectedApplication.team.members.map(member => (
//                                     <li key={member.id}>
//                                     {member.user.display_name}
//                                     </li>
//                                 ))}
//                                 </ul>
//                             </>
//                             )}

//                             <input
//                                 type="number"
//                                 className="form-control mb-3"
//                                 value={
//                                     proposalData.proposed_price
//                                 }
//                                 onChange={(e) =>
//                                     setProposalData({
//                                         ...proposalData,
//                                         proposed_price:
//                                             e.target.value,
//                                     })
//                                 }
//                             />

//                             <textarea
//                                 className="form-control"
//                                 placeholder="Message"
//                                 value={
//                                     proposalData.message
//                                 }
//                                 onChange={(e) =>
//                                     setProposalData({
//                                         ...proposalData,
//                                         message:
//                                             e.target.value,
//                                     })
//                                 }
//                             />

//                         </>

//                     )}

//                 </Modal.Body>

//                 <Modal.Footer>

//                     <Button
//                         variant="secondary"
//                         onClick={() =>
//                             setShowModal(false)
//                         }
//                     >
//                         Cancel
//                     </Button>

//                     <Button
//                         variant="primary"
//                         onClick={
//                             handleSendProposal
//                         }
//                     >
//                         Send
//                     </Button>

//                 </Modal.Footer>

//             </Modal>
//         </div>
//     );
// };

// export default ProjectApplicationsPage;










import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useParams,
    Link,
} from "react-router-dom";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getProjectApplications,
    sendProposal,
} from "../api/projectApi";

import {
    Modal,
    Button,
} from "react-bootstrap";

import "./ProjectApplicationsPage.css";


const ProjectApplicationsPage = () => {


    const { id } =
        useParams();


    const { token } =
        useContext(AuthContext);



    const [
        applications,
        setApplications,
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
        selectedApplication,
        setSelectedApplication,
    ] = useState(null);



    const [
        proposalData,
        setProposalData,
    ] = useState({

        proposed_price:"",
        message:"",

    });



    useEffect(() => {

        fetchApplications();

    }, []);



    const fetchApplications =
        async () => {

            try {

                const response =
                    await getProjectApplications(
                        id,
                        token
                    );


                setApplications(
                    response.data
                );


            }

            catch(error){

                console.error(error);

            }

        };



    const teamApplications =
        applications.filter(
            app => app.team
        ).length;



    const individualApplications =
        applications.length -
        teamApplications;



    const openProposalModal =
        (application) => {


            setSelectedApplication(
                application
            );


            setProposalData({

                proposed_price:
                    application.proposed_price,

                message:"",

            });


            setShowModal(true);

        };



    const handleSendProposal =
        async () => {


            try {


                await sendProposal(

                    {

                        project:id,


                        application:
                            selectedApplication.id,


                        receiver:
                            selectedApplication.applicant_user.id,


                        proposed_price:
                            proposalData.proposed_price,


                        message:
                            proposalData.message,

                    },

                    token

                );


                setShowModal(false);


                fetchApplications();


            }


            catch(error){

                console.error(error);

            }

        };



    return (

        <div className="project-applications-page">


            <div className="project-applications-header">


                <div>

                    <h1>

                        Project Applications

                    </h1>


                    <p>

                        Review freelancers and teams interested in working on your project.

                    </p>


                </div>


            </div>



            {/* <div className="applications-summary">


                <div>

                    <span>

                        Total

                    </span>


                    <strong>

                        {applications.length}

                    </strong>

                </div>



                <div>

                    <span>

                        Individual

                    </span>


                    <strong>

                        {individualApplications}

                    </strong>

                </div>



                <div>

                    <span>

                        Teams

                    </span>


                    <strong>

                        {teamApplications}

                    </strong>

                </div>


            </div> */}

            <div className="applications-meta">

                <div className="applications-count">

                    <span>

                        Total Applications

                    </span>

                    <strong>

                        {applications.length}

                    </strong>

                </div>

            </div>

            {
                applications.length === 0 ?


                (

                    <div className="applications-empty">


                        <div className="empty-icon">

                            📩

                        </div>


                        <h2>

                            No Applications Yet

                        </h2>


                        <p>

                            Applications from freelancers will appear here.

                        </p>


                    </div>

                )


                :


                (

                    <div className="application-review-list">
                        {

                            applications.map(app => (

                                <div
                                    key={app.id}
                                    className="application-review-card"
                                >


                                    <div
                                        className="application-review-header"
                                        onClick={() =>
                                            setExpanded(

                                                expanded === app.id

                                                    ? null

                                                    : app.id

                                            )
                                        }
                                    >


                                        <div className="applicant-info">


                                            <div className="applicant-avatar">

                                                {
                                                    app.team
                                                        ? "👥"
                                                        : "👤"
                                                }

                                            </div>


                                            <div>


                                                <h3>

                                                    {
                                                        app.team

                                                        ? app.team.name

                                                        :

                                                        app.applicant_user.display_name

                                                    }

                                                </h3>


                                                <p>

                                                    {

                                                        app.team

                                                        ? "Team Application"

                                                        :

                                                        "Individual Freelancer"

                                                    }

                                                </p>


                                            </div>


                                        </div>



                                        <div className="application-price">


                                            ₹{app.proposed_price}


                                        </div>



                                        <div className="application-status">


                                            {app.status}


                                        </div>



                                        <div className="application-expand">


                                            {

                                                expanded === app.id

                                                ? "−"

                                                : "+"

                                            }


                                        </div>


                                    </div>




                                    {

                                        expanded === app.id && (


                                            <div className="application-details">


                                                {

                                                    app.team ? (


                                                        <div className="team-section">


                                                            <h4>

                                                                Team Members

                                                            </h4>



                                                            <div className="team-members">


                                                                {

                                                                    app.team.members.map(
                                                                        member => (



                                                                            <div
                                                                                key={member.id}
                                                                                className="team-member"
                                                                            >


                                                                                <strong>

                                                                                    <Link
                                                                                        to={`/profile/${member.user.id}`}
                                                                                    >

                                                                                        {

                                                                                            member.user.display_name

                                                                                        }

                                                                                    </Link>

                                                                                </strong>


                                                                                <span>


                                                                                    {

                                                                                        member.gig ?

                                                                                        (

                                                                                            <Link
                                                                                                to={`/gigs/${member.gig.id}`}
                                                                                            >
                                                                                                {member.gig.title}
                                                                                            </Link>

                                                                                        )

                                                                                        :

                                                                                        app.selected_gig ?

                                                                                        (

                                                                                            <Link
                                                                                                to={`/gigs/${app.selected_gig.id}`}
                                                                                            >
                                                                                                {app.selected_gig.title}
                                                                                            </Link>

                                                                                        )


                                                                                        :


                                                                                        "Gig not selected"

                                                                                    }


                                                                                </span>


                                                                            </div>
                                                                        )

                                                                    )

                                                                }


                                                            </div>


                                                        </div>


                                                    )


                                                    :


                                                    (


                                                        <div className="individual-section">


                                                            <div className="detail-row">


                                                                <span>

                                                                    Freelancer

                                                                </span>


                                                                <strong>


                                                                    <Link
                                                                        to={`/profile/${app.applicant_user.id}`}
                                                                    >

                                                                        {

                                                                            app.applicant_user.display_name

                                                                        }

                                                                    </Link>


                                                                </strong>


                                                            </div>



                                                            {

                                                                app.selected_gig && (


                                                                    <div className="detail-row">


                                                                        <span>

                                                                            Gig

                                                                        </span>


                                                                        <strong>


                                                                            <Link
                                                                                to={`/gigs/${app.selected_gig.id}`}
                                                                            >

                                                                                {

                                                                                    app.selected_gig.title

                                                                                }

                                                                            </Link>


                                                                        </strong>


                                                                    </div>


                                                                )

                                                            }


                                                        </div>


                                                    )

                                                }




                                                <div className="detail-row">


                                                    <span>

                                                        Applied On

                                                    </span>


                                                    <strong>

                                                        {

                                                            new Date(
                                                                app.created_at
                                                            ).toLocaleDateString()

                                                        }

                                                    </strong>


                                                </div>




                                                <div className="cover-letter-section">


                                                    <h4>

                                                        Cover Letter

                                                    </h4>


                                                    <p>

                                                        {

                                                            app.cover_letter

                                                                ?

                                                                app.cover_letter

                                                                :

                                                                "No cover letter provided."

                                                        }

                                                    </p>


                                                </div>




                                                <div className="application-actions">


                                                    <button

                                                        className="send-proposal-btn"

                                                        onClick={() =>
                                                            openProposalModal(app)
                                                        }

                                                    >

                                                        Send Proposal

                                                    </button>


                                                </div>


                                            </div>


                                        )

                                    }


                                </div>


                            ))

                        }


                    </div>


                )

            }



            <Modal

                show={showModal}

                onHide={() =>
                    setShowModal(false)
                }

            >


                <Modal.Header closeButton>


                    <Modal.Title>

                        Send Proposal

                    </Modal.Title>


                </Modal.Header>




                <Modal.Body>


                    {

                        selectedApplication && (


                            <>


                                {

                                    selectedApplication.team ? (


                                        <div className="modal-team-preview">


                                            <h5>

                                                Team Application

                                            </h5>


                                            <ul>


                                                {

                                                    selectedApplication.team.members.map(
                                                        member => (


                                                            <li
                                                                key={member.id}
                                                            >

                                                                {

                                                                    member.user.display_name

                                                                }

                                                            </li>


                                                        )

                                                    )

                                                }


                                            </ul>


                                        </div>


                                    )


                                    :


                                    (


                                        <div className="modal-freelancer-preview">


                                            <p>

                                                <strong>

                                                    Freelancer:

                                                </strong>


                                                {" "}

                                                {

                                                    selectedApplication.applicant_user.display_name

                                                }

                                            </p>


                                            {

                                                selectedApplication.selected_gig && (


                                                    <p>

                                                        <strong>

                                                            Gig:

                                                        </strong>


                                                        {" "}

                                                        {

                                                            selectedApplication.selected_gig.title

                                                        }

                                                    </p>


                                                )

                                            }


                                        </div>


                                    )

                                }



                                <input

                                    type="number"

                                    className="form-control mb-3"

                                    placeholder="Proposed Price"

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



                                <textarea

                                    className="form-control"

                                    rows="5"

                                    placeholder="Message to freelancer..."

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


                            </>

                        )

                    }


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

                        onClick={handleSendProposal}

                    >

                        Send Proposal

                    </Button>


                </Modal.Footer>


            </Modal>



        </div>

    );

};


export default ProjectApplicationsPage;