// import {
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// import {
//     getMyApplications
// } from "../api/projectApi";

// const MyApplicationsPage = () => {

//     const { token } =
//         useContext(AuthContext);

//     const [applications,
//         setApplications] =
//         useState([]);

//     useEffect(() => {

//         fetchApplications();

//     }, []);

//     const fetchApplications =
//         async () => {

//             const response =
//                 await getMyApplications(
//                     token
//                 );

//             setApplications(
//                 response.data
//             );
//         };

//     return (
//         <div className="container mt-4">

//             <h2>
//                 My Applications
//             </h2>

//             <ul className="list-group">

//                 {applications.map(app => (

//                     <li
//                         key={app.id}
//                         className="list-group-item"
//                     >

//                         <strong>Project:</strong>{" "}

//                         <Link
//                             to={`/projects/${app.project.id}`}
//                         >
//                             {app.project.title}
//                         </Link>

//                         <br />

//                         <strong>Client:</strong>{" "}
//                         {app.project.client}

//                         <br />

//                         <strong>Status:</strong>{" "}
//                         {app.status}

//                     </li>

//                 ))}

//             </ul>

//         </div>
//     );
// };

// export default MyApplicationsPage;


import {
    useContext,
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
    getMyApplications,
} from "../api/projectApi";

import "./MyApplicationsPage.css";

const MyApplicationsPage = () => {

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

    useEffect(() => {

        if (token) {

            fetchApplications();

        }

    }, [token]);

    const fetchApplications = async () => {

        try {

            const response =
                await getMyApplications(token);

            setApplications(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const pendingCount =
        applications.filter(
            app => app.status === "PENDING"
        ).length;

    const acceptedCount =
        applications.filter(
            app => app.status === "ACCEPTED"
        ).length;

    const rejectedCount =
        applications.filter(
            app => app.status === "REJECTED"
        ).length;

    const getStatusClass = (status) => {

        switch (status) {

            case "ACCEPTED":
                return "accepted";

            case "REJECTED":
                return "rejected";

            default:
                return "pending";

        }

    };

    return (

        <div className="applications-page">

            <div className="applications-header">

                <div>

                    <h1>

                        My Applications

                    </h1>

                    <p>

                        Follow every proposal you've submitted and keep track of your hiring progress.

                    </p>

                </div>

            </div>

            <div className="applications-summary">

                <div>

                    <span>Total</span>

                    <strong>

                        {applications.length}

                    </strong>

                </div>

                <div>

                    <span>Pending</span>

                    <strong>

                        {pendingCount}

                    </strong>

                </div>

                <div>

                    <span>Accepted</span>

                    <strong>

                        {acceptedCount}

                    </strong>

                </div>

                <div>

                    <span>Rejected</span>

                    <strong>

                        {rejectedCount}

                    </strong>

                </div>

            </div>

            {

                applications.length === 0 ?

                (

                    <div className="applications-empty">

                        <div className="empty-icon">

                            📄

                        </div>

                        <h2>

                            No Applications Yet

                        </h2>

                        <p>

                            Start applying to projects and they'll appear here.

                        </p>

                        <Link
                            to="/projects"
                            className="browse-btn"
                        >

                            Explore Projects

                        </Link>

                    </div>

                )

                :

                (

                    <div className="application-timeline">

                        {

                            applications.map(app => (

                                <div
                                    key={app.id}
                                    className="timeline-item"
                                >

                                    <div
                                        className={`timeline-dot ${getStatusClass(app.status)}`}
                                    />

                                    <div className="timeline-card">

                                        <div
                                            className="timeline-row"
                                            onClick={() =>
                                                setExpanded(

                                                    expanded === app.id

                                                        ? null

                                                        : app.id

                                                )
                                            }
                                        >

                                            <div className="timeline-main">

                                                <h3>

                                                    {app.project.title}

                                                </h3>

                                                <p>

                                                    Client • {app.project.client}

                                                </p>

                                            </div>

                                            <div className="timeline-price">

                                                ₹{app.proposed_price}

                                            </div>

                                            <div
                                                className={`timeline-status ${getStatusClass(app.status)}`}
                                            >

                                                {app.status}

                                            </div>

                                            <div className="timeline-date">

                                                {

                                                    new Date(
                                                        app.created_at
                                                    ).toLocaleDateString()

                                                }

                                            </div>

                                            <div className="timeline-expand">

                                                {

                                                    expanded === app.id

                                                        ? "−"

                                                        : "+"

                                                }

                                            </div>

                                        </div>

                                        {

                                            expanded === app.id && (

                                                <div className="timeline-details">

                                                    <div className="detail-grid">

                                                        <div>

                                                            <span>

                                                                Applied Gig

                                                            </span>

                                                            <strong>

                                                                {

                                                                    app.selected_gig

                                                                        ? app.selected_gig.title

                                                                        : "Not Available"

                                                                }

                                                            </strong>

                                                        </div>

                                                        <div>

                                                            <span>

                                                                Team

                                                            </span>

                                                            <strong>

                                                                {

                                                                    app.team

                                                                        ? app.team.name

                                                                        : "Solo"

                                                                }

                                                            </strong>

                                                        </div>
                                                        <div>

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

                                                        <div>

                                                            <span>

                                                                Proposed Price

                                                            </span>

                                                            <strong>

                                                                ₹{app.proposed_price}

                                                            </strong>

                                                        </div>

                                                    </div>

                                                    {

                                                        app.cover_letter && (

                                                            <div className="cover-letter-box">

                                                                <h4>

                                                                    Cover Letter

                                                                </h4>

                                                                <p>

                                                                    {app.cover_letter}

                                                                </p>

                                                            </div>

                                                        )

                                                    }

                                                    <div className="timeline-actions">

                                                        <Link
                                                            to={`/projects/${app.project.id}`}
                                                            className="view-project-btn"
                                                        >

                                                            View Project

                                                        </Link>

                                                    </div>

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

        </div>

    );

};

export default MyApplicationsPage;