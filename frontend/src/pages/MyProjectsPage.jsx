// import {
//     useContext,
//     useEffect,
//     useState,
// } from "react";

// import {
//     getMyProjects,
// } from "../api/projectApi";

// import {
//     AuthContext
// } from "../context/AuthContext";

// import { Link } from "react-router-dom";

// const MyProjectsPage = () => {

//     const { token } =
//         useContext(AuthContext);

//     const [projects, setProjects] =
//         useState([]);

//     useEffect(() => {

//         if (token) {
//             fetchProjects();
//         }

//     }, [token]);

//     const fetchProjects =
//         async () => {

//         try {

//             const response =
//                 await getMyProjects(
//                     token
//                 );

//             setProjects(
//                 response.data
//             );

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     return (

//         <div className="container mt-4">

//             <h2>My Projects</h2>

//             {projects.length === 0 ? (

//                 <p>
//                     No projects yet.
//                 </p>

//             ) : (

//                 <ul className="list-group">

//                     {projects.map(
//                         project => (

//                             <li
//                                 key={project.id}
//                                 className="list-group-item"
//                             >

//                                 <Link
//                                     to={`/projects/${project.id}`}
//                                 >
//                                     {project.title}
//                                 </Link>

//                             </li>
//                         )
//                     )}

//                 </ul>

//             )}

//         </div>
//     );
// };

// export default MyProjectsPage;

import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getMyProjects,
} from "../api/projectApi";

import "./MyProjectsPage.css";


const MyProjectsPage = () => {

    const { token } = useContext(AuthContext);

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (token) {

            fetchProjects();

        }

    }, [token]);


    const fetchProjects = async () => {

        try {

            setLoading(true);

            const response =
                await getMyProjects(token);

            setProjects(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };


    const totalBudget = projects.reduce(

        (total, project) =>

            total + Number(project.total_budget || 0),

        0

    );


    return (

        <div className="my-projects-page fade-up">


            <div className="my-projects-header">

                <div>

                    <h1>

                        My Projects

                    </h1>

                    <p>

                        Manage your posted projects,
                        review applications and collaborate
                        with freelancers.

                    </p>

                </div>


                <div className="project-actions">

                    <Link

                        to="/create-project"

                        className="primary-action"

                    >

                        + Create Project

                    </Link>


                    <Link

                        to="/sent-proposals"

                        className="secondary-action"

                    >

                        Sent Proposals

                    </Link>

                </div>

            </div>



            <div className="project-summary-grid">


                <div className="summary-card">

                    <small>

                        Total Projects

                    </small>

                    <h2>

                        {projects.length}

                    </h2>

                </div>


                <div className="summary-card">

                    <small>

                        Total Budget

                    </small>

                    <h2>

                        ₹{totalBudget}

                    </h2>

                </div>


                <div className="summary-card">

                    <small>

                        Active Projects

                    </small>

                    <h2>

                        {
                            projects.filter(

                                project =>

                                    project.status === "OPEN"

                            ).length
                        }

                    </h2>

                </div>


            </div>



            {

                loading ?

                (

                    <div className="loading-box">

                        Loading projects...

                    </div>

                )

                :

                projects.length === 0 ?

                (

                    <div className="empty-projects-box">


                        <div className="empty-icon">

                            📁

                        </div>


                        <h3>

                            No projects created yet

                        </h3>


                        <p>

                            Start your first project and
                            find talented freelancers.

                        </p>


                        <Link

                            to="/create-project"

                            className="primary-action"

                        >

                            Create Your First Project

                        </Link>


                    </div>

                )

                :

                (

                    <div className="my-projects-grid">


                        {

                            projects.map(project => (


                                <div

                                    key={project.id}

                                    className="my-project-card"


                                >

                                    <div className="project-card-header">


                                        <h3>

                                            {project.title}

                                        </h3>


                                        <span

                                            className={

                                                project.status === "OPEN"

                                                ?

                                                "project-status open"

                                                :

                                                "project-status"

                                            }

                                        >

                                            {project.status}

                                        </span>


                                    </div>



                                    <p className="project-description">


                                        {

                                            project.description?.length > 160

                                            ?

                                            project.description.substring(
                                                0,
                                                95
                                            ) + "..."

                                            :

                                            project.description

                                        }


                                    </p>




                                    <div className="project-info">


                                        <div>

                                            <small>

                                                Budget

                                            </small>


                                            <strong>

                                                ₹
                                                {
                                                    project.total_budget
                                                }

                                            </strong>


                                        </div>


                                        <div>

                                            <small>

                                                Deadline

                                            </small>


                                            <strong>

                                                {
                                                    new Date(
                                                        project.deadline
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day:"numeric",
                                                            month:"short",
                                                            year:"numeric"
                                                        }
                                                    )
                                                }

                                            </strong>


                                        </div>


                                    </div>




                                    <div className="roles-preview">


                                        <h5>

                                            Required Roles

                                        </h5>


                                        {

                                            project.role_requirements?.slice(
                                                0,
                                                3
                                            ).map(role => (


                                                <div

                                                    key={role.id}

                                                    className="role-preview-item"

                                                >

                                                    <span>

                                                        {
                                                            role.job_category.name
                                                        }

                                                    </span>


                                                    {/* <small>

                                                        {
                                                            role.required_count
                                                        }
                                                        {" "}
                                                        Needed

                                                    </small> */}


                                                </div>


                                            ))

                                        }


                                    </div>




                                    <Link

                                        to={`/projects/${project.id}`}

                                        className="view-project-btn"

                                    >

                                        Manage Project →

                                    </Link>



                                </div>


                            ))

                        }


                    </div>

                )

            }


        </div>

    );

};


export default MyProjectsPage;