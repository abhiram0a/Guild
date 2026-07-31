// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import {
//     Link,
//     useNavigate,
// } from "react-router-dom";

// import {
//     AuthContext,
// } from "../context/AuthContext";

// import {
//     getProjectDetails,
//     getProjectRoles,
//     deleteProject,  
// } from "../api/projectApi";

// // import { sendCollaborationInvite } from "../api/inviteApi";

// import { getAcceptedProjectInvites } from "../api/collaborationApi";



// const ProjectDetailPage = () => {

//     const { id } = useParams();

//     const [project, setProject] =
//         useState(null);

//     const { user, token } =
//         useContext(AuthContext);

//     const navigate =
//         useNavigate();

//     const [roles, setRoles] =
//         useState([]);

//     const [
//         acceptedInvites,
//         setAcceptedInvites,
//     ] = useState([]);

//     useEffect(() => {
        
//         fetchProject();

//         if (token) {
//             fetchAcceptedInvites();
//         }
//     }, [id, token]);


//     const fetchProject = async () => {

//         try {

//             const projectResponse =
//                 await getProjectDetails(id);

//             const roleResponse =
//                 await getProjectRoles(id);

//             setProject(
//                 projectResponse.data
//             );

//             setRoles(
//                 roleResponse.data
//             );

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const handleDelete =
//         async () => {

//         const confirmed =
//             window.confirm(
//                 "Delete this project?"
//             );

//         if (!confirmed) return;

//         try {

//             await deleteProject(
//                 project.id,
//                 token
//             );

//             navigate(
//                 "/my-projects"
//             );

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const fetchAcceptedInvites = async () => {

//         try {

//             const response =
//                 await getAcceptedProjectInvites(
//                     id,
//                     token
//                 );

//             setAcceptedInvites(
//                 response.data
//             );

//         }

//         catch (error) {

//             // console.error(error);

//         }

//     };

//     if (!project) {

//         return (

//             <div className="container mt-4">

//                 Loading...

//             </div>
//         );
//     }

//     return (

//         <div className="container mt-4">

//             <h2>
//                 {project.title}
//             </h2>

//             <hr />

//             <p>
//                 <strong>Client:</strong>{" "}
//                 {project.client}
//             </p>


//             <p>
//                 <strong>Description:</strong>{" "}
//                 {project.description}
//             </p>


//             <p>
//                 <strong>Deadline:</strong>{" "}
//                 {project.deadline}
//             </p>

//             <p>
//                 <strong>Total Budget:</strong>
//                 ₹{project.total_budget}
//             </p>

//             <p>
//                 <strong>Status:</strong>{" "}
//                 {project.status}
//             </p>

//             {
//                 user &&
//                 project.client_id === user.id && (
                    
//                     <div className="mb-3">

//                         <Link
//                             to={`/projects/${project.id}/applications`}
//                             className="btn btn-info me-2"
//                         >
//                             View Applications
//                         </Link>

//                         <Link
//                             to={`/projects/${project.id}/edit`}
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

//             <h4>
//                 Required Roles
//             </h4>

//             {roles.length === 0 ? (

//                 <div className="alert alert-info">

//                     No role requirements added.

//                 </div>

//             ) : (

//                 <ul className="list-group">

//                     {roles.map(role => (

//                         <li
//                             key={role.id}
//                             className="list-group-item"
//                         >

//                             <strong>
//                                 {role.job_category.name}
//                             </strong>

//                             {" "}×{" "}
//                             {role.required_count}

//                             <br />

//                             Budget:
//                             {" "}
//                             ₹{role.allocated_budget}

//                             {
//                                 user &&
//                                 user.is_freelancer &&
//                                 project.client_id !== user.id &&
//                                 project.status === "OPEN" && 
//                                 roles.length > 1 &&(

//                                     <div className="mt-2">

//                                         <button
//                                             className="btn btn-outline-primary btn-sm"
//                                             onClick={() =>
//                                                 navigate(
//                                                     `/projects/${project.id}/roles/${role.id}/invite`
//                                                 )
//                                             }
//                                         >
//                                             Invite Friend
//                                         </button>

//                                         {
//                                             acceptedInvites
//                                                 .filter(
//                                                     invite =>
//                                                         invite.role_requirement.id === role.id
//                                                 )
//                                                 .map(invite => (

//                                                     <div
//                                                         key={invite.id}
//                                                         className="border rounded p-2 mt-2 bg-light"
//                                                     >

//                                                         <div className="text-success fw-bold">
//                                                             ✓ {invite.receiver.display_name} accepted
//                                                         </div>

//                                                         <div>
//                                                             Gig:
//                                                             {" "}
//                                                             {invite.selected_gig.title}
//                                                         </div>

//                                                         <div>
//                                                             Price:
//                                                             {" "}
//                                                             ₹{invite.proposed_price}
//                                                         </div>

//                                                         {
//                                                             invite.response_note && (
//                                                                 <div className="text-muted">
//                                                                     {invite.response_note}
//                                                                 </div>
//                                                             )
//                                                         }

//                                                     </div>

//                                                 ))
//                                         }


//                                     </div>
//                                 )
//                             }


//                         </li>

//                     ))}

//                 </ul>

//             )}

//             {
//                 user &&
//                 user.is_freelancer &&
//                 project.client_id !== user.id &&
//                 project.status === "OPEN" && (

//                     <div className="mb-3">

//                         <Link
//                             to={`/projects/${project.id}/apply`}
//                             className="btn btn-success"
//                         >
//                             Apply To Project
//                         </Link>

//                     </div>
//                 )
//             }  

//         </div>
//     );
// };

// export default ProjectDetailPage;



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
    getProjectDetails,
    getProjectRoles,
    deleteProject,
} from "../api/projectApi";

import {
    getAcceptedProjectInvites,
} from "../api/collaborationApi";

import "./ProjectDetailPage.css";

const ProjectDetailPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user, token } =
        useContext(AuthContext);

    const [project, setProject] =
        useState(null);

    const [roles, setRoles] =
        useState([]);

    const [
        acceptedInvites,
        setAcceptedInvites,
    ] = useState([]);

    useEffect(() => {

        fetchProject();

        if (token) {

            fetchAcceptedInvites();

        }

    }, [id, token]);

    const fetchProject = async () => {

        try {

            const projectResponse =
                await getProjectDetails(id);

            const roleResponse =
                await getProjectRoles(id);

            setProject(projectResponse.data);

            setRoles(roleResponse.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const fetchAcceptedInvites =
        async () => {

            try {

                const response =
                    await getAcceptedProjectInvites(
                        id,
                        token
                    );

                setAcceptedInvites(
                    response.data
                );

            }

            catch {

            }

        };

    const handleDelete =
        async () => {

            if (
                !window.confirm(
                    "Delete this project?"
                )
            ) return;

            try {

                await deleteProject(
                    project.id,
                    token
                );

                navigate("/my-projects");

            }

            catch (error) {

                console.error(error);

            }

        };

    if (!project) {

        return (

            <div className="project-loading">

                Loading Project...

            </div>

        );

    }

    return (

        <div className="project-page">

            <div className="project-container">

                <div className="project-main">

                    <header className="project-header">

                        <div className="project-heading">

                            <span className="status-badge">

                                {project.status}

                            </span>

                            <h1>

                                {project.title}

                            </h1>

                            <div className="project-meta">

                                <span>

                                    Client

                                    <strong>

                                        {" "}
                                        {project.client}

                                    </strong>

                                </span>

                                <span>•</span>

                                <span>

                                    Deadline

                                    <strong>

                                        {" "}
                                        {project.deadline}

                                    </strong>

                                </span>

                            </div>

                        </div>

                        {

                            user &&
                            project.client_id === user.id && (

                                <div className="owner-toolbar">

                                    <Link
                                        to={`/projects/${project.id}/applications`}
                                        className="toolbar-primary"
                                    >

                                        View Applications

                                    </Link>

                                    <Link
                                        to={`/projects/${project.id}/edit`}
                                        className="icon-btn edit-btn"
                                        title="Edit Project"
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>

                                    <button
                                        className="icon-btn delete-btn"
                                        onClick={handleDelete}
                                        title="Delete Project"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                
                                </div>

                            )

                        }

                    </header>

                    <section className="description-section">

                        <h2 className="section-heading">

                            About this project

                        </h2>

                        <div className="project-description">

                            {project.description}

                        </div>

                    </section>

                    <section className="roles-section">

                        <div className="roles-header">

                            <h2>

                                Required Roles

                            </h2>

                            <span>

                                {roles.length} Roles

                            </span>

                        </div>

                        {

                            roles.length === 0 ?

                            (

                                <div className="empty-state">

                                    No role requirements added.

                                </div>

                            )

                            :

                            roles.map(role => (

                                <article
                                    key={role.id}
                                    className="role-card"
                                >

                                    <div className="role-card-top">

                                        <div>

                                            <h3>

                                                {role.job_category.name}

                                            </h3>

                                            <p>

                                                {role.required_count}

                                                {" "}

                                                Freelancer(s) Needed

                                            </p>

                                        </div>

                                        <div className="role-price">

                                            ₹{role.allocated_budget}

                                        </div>

                                    </div>

                                    {

                                        user &&
                                        user.is_freelancer &&
                                        project.client_id !== user.id &&
                                        project.status === "OPEN" &&
                                        roles.length > 1 && (

                                            <button
                                                className="invite-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/projects/${project.id}/roles/${role.id}/invite`
                                                    )
                                                }
                                            >

                                                Invite Friend

                                            </button>

                                        )

                                    }

                                    {

                                        acceptedInvites
                                            .filter(
                                                invite =>
                                                    invite.role_requirement.id === role.id
                                            )
                                            .map(invite => (

                                                <div
                                                    key={invite.id}
                                                    className="accepted-inline"
                                                >

                                                    <div className="accepted-left">

                                                        <div className="accepted-avatar">

                                                            ✓

                                                        </div>

                                                        <div>

                                                            <strong>

                                                                {invite.receiver.display_name}

                                                            </strong>

                                                            <small>

                                                                {invite.selected_gig.title}

                                                            </small>

                                                        </div>

                                                    </div>

                                                    <div className="accepted-right">

                                                        ₹{invite.proposed_price}

                                                    </div>

                                                </div>

                                            ))

                                    }

                                </article>

                            ))

                        }

                    </section>

                </div>

                <aside className="project-sidebar">

                    <div className="sidebar-box">
                        <h3>

                            Project Summary

                        </h3>

                        <div className="summary-grid">

                            <div>

                                <small>Total Budget</small>

                                <strong>

                                    ₹{project.total_budget}

                                </strong>

                            </div>

                            <div>

                                <small>Deadline</small>

                                <strong>

                                    {project.deadline}

                                </strong>

                            </div>

                            <div>

                                <small>Status</small>

                                <strong>

                                    {project.status}

                                </strong>

                            </div>

                            <div>

                                <small>Roles</small>

                                <strong>

                                    {roles.length}

                                </strong>

                            </div>

                        </div>

                        {

                            user &&
                            user.is_freelancer &&
                            project.client_id !== user.id &&
                            project.status === "OPEN" && (

                                <Link
                                    to={`/projects/${project.id}/apply`}
                                    className="apply-button"
                                >

                                    Apply to Project

                                </Link>

                            )

                        }
                    </div>

                    {

                        user &&
                        project.client_id !== user.id && (

                            <div className="sidebar-tip">

                                <h4>

                                    Before Applying

                                </h4>

                                <p>

                                    Read the project carefully, choose your best matching gig and send a professional application. A clear proposal greatly improves your chance of getting hired.

                                </p>

                            </div>

                        )

                    }

                </aside>

            </div>

        </div>

    );

};

export default ProjectDetailPage;