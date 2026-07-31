// import { useEffect, useState, useContext } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// import { AuthContext } from "../context/AuthContext";

// import {
//     getGigDetails,
//     getMyProjects,
//     sendProposal,
//     deleteGig,
// } from "../api/projectApi";

// const GigDetailPage = () => {

//     const { id } = useParams();

//     const [gig, setGig] = useState(null);

//     useEffect(() => {
//         fetchGig();
//     }, [id]);

//     const fetchGig = async () => {

//         try {

//             const response =
//                 await getGigDetails(id);

//             setGig(response.data);
//             setReviews(response.data.reviews || []);
//             setAverageRating(response.data.average_rating);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const { user, token } =
//         useContext(AuthContext);

//     const navigate = useNavigate();

//     const isOwner =
//         user?.id === gig?.freelancer?.id;

//     const [showProposalModal,
//         setShowProposalModal] =
//         useState(false);

//     const [projects, setProjects] =
//         useState([]);

//     const [proposalData,
//         setProposalData] =
//         useState({
//             project: "",
//             proposed_price: "",
//             message: "",
//         });

//     const [reviews, setReviews] =
//         useState([]);

//     const [averageRating, setAverageRating] =
//         useState(null);

        
        
//     useEffect(() => {

//         if (
//             user &&
//             !user.is_freelancer
//         ) {
//             fetchProjects();
//         }

//     }, [user]);

//     const fetchProjects = async () => {

//         try {

//             const response =
//                 await getMyProjects(token);

//             setProjects(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const handleDelete =
//         async () => {

//             const confirmed =
//                 window.confirm(
//                     "Delete this gig?"
//                 );

//             if (!confirmed) return;

//             try {

//                 await deleteGig(
//                     gig.id,
//                     token
//                 );

//                 navigate("/my-gigs");

//             } catch (error) {

//                 console.error(error);

//             }

//         };

//     const handleSendProposal =
//         async () => {

//         try {

//             await sendProposal(
//                 {
//                     project:
//                         proposalData.project,

//                     receiver:
//                         gig.freelancer.id,

//                     proposed_price:
//                         proposalData.proposed_price,

//                     message:
//                         proposalData.message,
//                 },
//                 token
//             );

//             alert(
//                 "Proposal sent successfully"
//             );

//             setShowProposalModal(false);

//         } catch (error) {

//             alert(
//                 error.response?.data?.error
//             );
//         }
//     };

//     if (!gig) {
//         return (
//             <div className="container mt-4">
//                 Loading...
//             </div>
//         );
//     }

    

//     return (
//         <div className="container mt-4">

//             <h2>{gig.title}</h2>
//             {

//                 averageRating && (

//                     <span
//                         className="badge bg-warning text-dark fs-6"
//                     >

//                         ★ {averageRating}

//                     </span>

//                 )

//             }
//             {
//                 user &&
//                 gig.freelancer.id === user.id && (

//                     <div className="mb-4">

//                         <Link
//                             to={`/gigs/${gig.id}/edit`}
//                             className="btn btn-warning me-2"
//                         >
//                             Edit
//                         </Link>

//                         <button
//                             className="btn btn-danger"
//                             onClick={handleDelete}
//                         >
//                             Delete
//                         </button>

//                     </div>

//                 )
//             }
//             <hr />

//             <p>
//                 <strong>Category:</strong>{" "}
//                 {gig.job_category.name}
//             </p>

//             <p>
//                 <strong>Description:</strong>{" "}
//                 {gig.description}
//             </p>

//             <p>
//                 <strong>Experience:</strong>{" "}
//                 {gig.experience_level}
//             </p>

//             <p>
//                 <strong>Price:</strong> ₹{gig.price}
//             </p>

//             <p>
//                 <strong>Delivery Time:</strong>{" "}
//                 {gig.delivery_time} days
//             </p>

//             <p>
//                 <strong>Revisions:</strong>{" "}
//                 {gig.revisions === null
//                     ? "Unlimited"
//                     : gig.revisions}
//             </p>

//             <p>
//                 <strong>Freelancer:</strong>{" "}
//                 {gig.freelancer.display_name}
//             </p>

//             <h5>Skills</h5>

//             <ul>
//                 {gig.skills.map(skill => (
//                     <li key={skill.id}>
//                         {skill.name}
//                     </li>
//                 ))}
//             </ul>

//             {
//                 user &&
//                 !isOwner &&
//                  (

//                     <button
//                         className="btn btn-success mb-3"
//                         onClick={() =>
//                             setShowProposalModal(true)
//                         }
//                     >
//                         Send Proposal
//                     </button>
//                 )
//             }

// {
//     showProposalModal && (

//         <div
//             className="modal d-block"
//             tabIndex="-1"
//             style={{
//                 backgroundColor:
//                     "rgba(0,0,0,0.5)"
//             }}
//         >

//             <div className="modal-dialog">

//                 <div className="modal-content">

//                     <div className="modal-header">

//                         <h5 className="modal-title">
//                             Send Proposal
//                         </h5>

//                         <button
//                             type="button"
//                             className="btn-close"
//                             onClick={() =>
//                                 setShowProposalModal(
//                                     false
//                                 )
//                             }
//                         />

//                     </div>

//                     <div className="modal-body">

//                         <p>
//                             <strong>
//                                 Freelancer:
//                             </strong>{" "}
//                             {
//                                 gig.freelancer
//                                     .display_name
//                             }
//                         </p>

//                         <p>
//                             <strong>
//                                 Gig:
//                             </strong>{" "}
//                             {gig.title}
//                         </p>

//                         <select
//                             className="form-control mb-3"
//                             value={
//                                 proposalData.project
//                             }
//                             onChange={(e) =>
//                                 setProposalData({
//                                     ...proposalData,
//                                     project:
//                                         e.target.value,
//                                 })
//                             }
//                         >

//                             <option value="">
//                                 Select Project
//                             </option>

//                             {
//                                 projects.map(
//                                     project => (
//                                         <option
//                                             key={
//                                                 project.id
//                                             }
//                                             value={
//                                                 project.id
//                                             }
//                                         >
//                                             {
//                                                 project.title
//                                             }
//                                         </option>
//                                     )
//                                 )
//                             }

//                         </select>

//                         <input
//                             type="number"
//                             className="form-control mb-3"
//                             placeholder="Price"
//                             value={
//                                 proposalData.proposed_price
//                             }
//                             onChange={(e) =>
//                                 setProposalData({
//                                     ...proposalData,
//                                     proposed_price:
//                                         e.target.value,
//                                 })
//                             }
//                         />

//                         <textarea
//                             className="form-control"
//                             placeholder="Message"
//                             value={
//                                 proposalData.message
//                             }
//                             onChange={(e) =>
//                                 setProposalData({
//                                     ...proposalData,
//                                     message:
//                                         e.target.value,
//                                 })
//                             }
//                         />

//                     </div>

//                     <div className="modal-footer">

//                         <button
//                             className="btn btn-secondary"
//                             onClick={() =>
//                                 setShowProposalModal(
//                                     false
//                                 )
//                             }
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             className="btn btn-primary"
//                             onClick={
//                                 handleSendProposal
//                             }
//                         >
//                             Send Proposal
//                         </button>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     )
// }


// <hr className="mt-5"/>

// <h3>

//     Reviews

// </h3>

// {

//     reviews.length === 0 ?

//     (

//         <p className="text-muted">

//             No reviews yet.

//         </p>

//     )

//     :

//     (

//         reviews.map(review => (

//             <div

//                 key={review.id}

//                 className="card mb-3"

//             >

//                 <div className="card-body">

//                     <div className="d-flex justify-content-between">

//                         <strong>

//                             {

//                                 review.reviewer.display_name

//                             }

//                         </strong>

//                         <span>

//                             ★ {review.rating}

//                         </span>

//                     </div>

//                     {

//                         review.comment && (

//                             <p className="mt-2 mb-0">

//                                 {review.comment}

//                             </p>

//                         )

//                     }

//                 </div>

//             </div>

//         ))

//     )

// }
//         </div>
//     );
// };

// export default GigDetailPage;


import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getGigDetails,
    getMyProjects,
    sendProposal,
    deleteGig,
} from "../api/projectApi";

import "./GigDetailPage.css";

const GigDetailPage = () => {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const { user, token } =
        useContext(AuthContext);

    const [gig, setGig] =
        useState(null);

    const [projects, setProjects] =
        useState([]);

    const [reviews, setReviews] =
        useState([]);

    const [
        averageRating,
        setAverageRating,
    ] = useState(null);

    const [
        showProposalModal,
        setShowProposalModal,
    ] = useState(false);

    const [
        proposalData,
        setProposalData,
    ] = useState({

        project: "",

        proposed_price: "",

        message: "",

    });

    useEffect(() => {

        fetchGig();

    }, [id]);

    useEffect(() => {

        if (

            user &&

            !user.is_freelancer

        ) {

            fetchProjects();

        }

    }, [user]);

    const fetchGig =
        async () => {

            try {

                const response =
                    await getGigDetails(id);

                setGig(
                    response.data
                );

                setReviews(
                    response.data.reviews || []
                );

                setAverageRating(
                    response.data.average_rating
                );

            }

            catch (error) {

                console.error(error);

            }

        };

    const fetchProjects =
        async () => {

            try {

                const response =
                    await getMyProjects(token);

                setProjects(
                    response.data
                );

            }

            catch (error) {

                console.error(error);

            }

        };

    const handleDelete =
        async () => {

            if (

                !window.confirm(
                    "Delete this gig?"
                )

            ) return;

            try {

                await deleteGig(
                    gig.id,
                    token
                );

                navigate(
                    "/my-gigs"
                );

            }

            catch (error) {

                console.error(error);

            }

        };

    const handleSendProposal =
        async () => {

            try {

                await sendProposal(

                    {

                        project:
                            proposalData.project,

                        receiver:
                            gig.freelancer.id,

                        proposed_price:
                            proposalData.proposed_price,

                        message:
                            proposalData.message,

                    },

                    token

                );

                alert(
                    "Proposal sent successfully."
                );

                setShowProposalModal(
                    false
                );

            }

            catch (error) {

                alert(
                    error.response?.data?.error
                );

            }

        };

    if (!gig) {

        return (

            <div className="gig-loading">

                Loading Gig...

            </div>

        );

    }

    const isOwner =
        user?.id === gig.freelancer.id;

    return (

        <div className="gig-page">

            <div className="gig-container">

                <div className="gig-main">

                    <header className="gig-header">

                        <div className="gig-heading">

                            <span className="gig-category">

                                {gig.job_category.name}

                            </span>

                            <h1>

                                {gig.title}

                            </h1>

                            <div className="gig-meta">
                                <span>

                                    Freelancer{" "}

                                    <Link
                                        to={`/profile/${gig.freelancer.id}`}
                                        className="freelancer-link"
                                    >
                                        {gig.freelancer.display_name}
                                    </Link>

                                </span>
               

                                {

                                    averageRating &&

                                    <>

                                        <div className="rating-pill">

                                            <i className="bi bi-star-fill"></i>

                                            <span>

                                                {averageRating}

                                            </span>

                                        </div>  

                                    </>

                                }

                            </div>

                        </div>

                        {

                            isOwner && (

                                <div className="owner-toolbar">

                                    <Link

                                        to={`/gigs/${gig.id}/edit`}

                                        className="icon-btn edit-btn"

                                        title="Edit Gig"

                                    >

                                        <i className="bi bi-pencil-square"></i>

                                    </Link>

                                    <button

                                        className="icon-btn delete-btn"

                                        onClick={handleDelete}

                                        title="Delete Gig"

                                    >

                                        <i className="bi bi-trash"></i>

                                    </button>

                                </div>

                            )

                        }

                    </header>

                    <section className="description-section">

                        <h2 className="section-heading">

                            About this Gig

                        </h2>

                        <div className="gig-description">

                            {gig.description}

                        </div>

                    </section>

                    <section className="skills-section">

                        <div className="roles-header">

                            <h2>

                                Skills & Expertise

                            </h2>

                            <span>

                                {gig.skills.length} Skills

                            </span>

                        </div>

                        <div className="skills-list">

                            {

                                gig.skills.map(

                                    skill => (

                                        <span

                                            key={skill.id}

                                            className="skill-chip"

                                        >

                                            {skill.name}

                                        </span>

                                    )

                                )

                            }

                        </div>

                    </section>
                    <section className="reviews-section">

                        <div className="roles-header">

                            <h2>

                                Reviews

                            </h2>

                            <span>

                                {reviews.length} Reviews

                            </span>

                        </div>

                        {

                            reviews.length === 0 ?

                            (

                                <div className="empty-state">

                                    No reviews yet.

                                </div>

                            )

                            :

                            (

                                reviews.map(

                                    review => (

                                        <article

                                            key={review.id}

                                            className="review-card"

                                        >

                                            <div className="review-top">

                                                <div>

                                                    <strong>

                                                        {

                                                            review.reviewer.display_name

                                                        }

                                                    </strong>

                                                    <span>

                                                        ★ {review.rating}

                                                    </span>

                                                </div>

                                            </div>

                                            {

                                                review.comment && (

                                                    <p>

                                                        {review.comment}

                                                    </p>

                                                )

                                            }

                                        </article>

                                    )

                                )

                            )

                        }

                    </section>

                </div>

                <aside className="gig-sidebar">

                    <div className="sidebar-box">

                        <h3>

                            Gig Summary

                        </h3>

                        <div className="summary-grid">

                            <div>

                                <small>

                                    Price

                                </small>

                                <strong>

                                    ₹{gig.price}

                                </strong>

                            </div>

                            <div>

                                <small>

                                    Experience

                                </small>

                                <strong>

                                    {gig.experience_level}

                                </strong>

                            </div>

                            <div>

                                <small>

                                    Delivery

                                </small>

                                <strong>

                                    {gig.delivery_time} Days

                                </strong>

                            </div>

                            <div>

                                <small>

                                    Revisions

                                </small>

                                <strong>

                                    {

                                        gig.revisions === null

                                            ? "Unlimited"

                                            : gig.revisions

                                    }

                                </strong>

                            </div>

                        </div>

                        {

                            user &&

                            !isOwner && (

                                <button

                                    className="apply-button"

                                    onClick={() =>

                                        setShowProposalModal(true)

                                    }

                                >

                                    Send Proposal

                                </button>

                            )

                        }

                    </div>

                    {

                        !isOwner &&

                        user && (

                            <div className="sidebar-tip">

                                <h4>

                                    Before Sending

                                </h4>

                                <p>

                                    Take a moment to verify the freelancer's expertise, previous ratings, and delivery expectations before sending your proposal. Choosing the right freelancer helps your project succeed from the very beginning.
                                
                                </p>

                            </div>

                        )

                    }

                </aside>

            </div>

            {

                showProposalModal && (

                    <div className="proposal-overlay">

                        <div className="proposal-modal">

                            <div className="proposal-header">

                                <h3>

                                    Send Proposal

                                </h3>

                                <button

                                    className="close-modal"

                                    onClick={() =>

                                        setShowProposalModal(false)

                                    }

                                >

                                    ×

                                </button>

                            </div>

                            <div className="proposal-body">

                                <div className="proposal-info">

                                    <div>

                                        <small>

                                            Freelancer

                                        </small>

                                        <strong>

                                            {

                                                gig.freelancer.display_name

                                            }

                                        </strong>

                                    </div>

                                    <div>

                                        <small>

                                            Gig

                                        </small>

                                        <strong>

                                            {gig.title}

                                        </strong>

                                    </div>

                                </div>

                                <select

                                    value={proposalData.project}

                                    onChange={(e) =>

                                        setProposalData({

                                            ...proposalData,

                                            project: e.target.value,

                                        })

                                    }

                                >

                                    <option value="">

                                        Select Project

                                    </option>

                                    {

                                        projects.map(

                                            project => (

                                                <option

                                                    key={project.id}

                                                    value={project.id}

                                                >

                                                    {project.title}

                                                </option>

                                            )

                                        )

                                    }

                                </select>

                                <input

                                    type="number"

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

                                    rows="5"

                                    placeholder="Write your proposal..."

                                    value={proposalData.message}

                                    onChange={(e) =>

                                        setProposalData({

                                            ...proposalData,

                                            message:

                                                e.target.value,

                                        })

                                    }

                                />

                            </div>

                            <div className="proposal-footer">

                                <button

                                    className="secondary-modal-btn"

                                    onClick={() =>

                                        setShowProposalModal(false)

                                    }

                                >

                                    Cancel

                                </button>

                                <button

                                    className="primary-modal-btn"

                                    onClick={handleSendProposal}

                                >

                                    Send Proposal

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </div>

    );

};

export default GigDetailPage;