// import {
//     useContext,
//     useEffect,
//     useState,
// } from "react";

// import {
//     Link,
// } from "react-router-dom";

// import {
//     AuthContext,
// } from "../context/AuthContext";

// import {
//     getDashboard,
// } from "../api/accountApi";


// const DashboardPage = () => {

//     const {
//         token,
//     } = useContext(AuthContext);

//     const [
//         dashboard,
//         setDashboard,
//     ] = useState(null);

//     useEffect(() => {

//         fetchDashboard();

//     }, []);

//     const fetchDashboard = async () => {

//         try {

//             const response =
//                 await getDashboard(token);

//             setDashboard(
//                 response.data
//             );

//         }

//         catch (error) {

//             console.error(error);

//         }

//     };

//     if (!dashboard) {

//         return (

//             <div className="container mt-5">

//                 Loading...

//             </div>

//         );

//     }

//     return (

//         <div className="container py-4">

//             <div className="mb-4">

//                 <h2>

//                     Welcome back,
//                     {" "}
//                     {dashboard.user.display_name}

//                 </h2>

//                 <p className="text-muted">

//                     Here's a quick overview of your account.

//                 </p>

//             </div>

//             {/* Analytics */}

//             <div className="row g-3 mb-4">

//                 <div className="col-md-3">

//                     <div className="card h-100">

//                         <div className="card-body">

//                             <h6>

//                                 Workspaces

//                             </h6>

//                             <h2>

//                                 {dashboard.workspace_count}

//                             </h2>

//                         </div>

//                     </div>

//                 </div>

//                 <div className="col-md-3">

//                     <div className="card h-100">

//                         <div className="card-body">

//                             <h6>

//                                 Projects

//                             </h6>

//                             <h2>

//                                 {dashboard.project_count}

//                             </h2>

//                         </div>

//                     </div>

//                 </div>

//                 {

//                     dashboard.user.is_freelancer &&

//                     <>

//                         <div className="col-md-3">

//                             <div className="card h-100">

//                                 <div className="card-body">

//                                     <h6>

//                                         My Gigs

//                                     </h6>

//                                     <h2>

//                                         {dashboard.gig_count}

//                                     </h2>

//                                 </div>

//                             </div>

//                         </div>

//                         <div className="col-md-3">

//                             <div className="card h-100">

//                                 <div className="card-body">

//                                     <h6>

//                                         Rating

//                                     </h6>

//                                     <h2>

//                                         ⭐

//                                         {" "}

//                                         {dashboard.avg_rating}

//                                     </h2>

//                                     <small>

//                                         {

//                                             dashboard.review_count

//                                         }

//                                         {" "}

//                                         reviews

//                                     </small>

//                                 </div>

//                             </div>

//                         </div>

//                     </>

//                 }

//             </div>

//             {

//                 dashboard.user.is_freelancer ?

//                 (

//                     <div className="row">

//                         <div className="col-lg-8">

//                             <div className="card mb-4">

//                                 <div className="card-header">

//                                     Freelancer Shortcuts

//                                 </div>

//                                 <div className="card-body d-flex flex-wrap gap-2">

//                                     <Link
//                                         to="/my-gigs"
//                                         className="btn btn-primary"
//                                     >

//                                         My Gigs

//                                     </Link>

//                                     <Link
//                                         to="/create-gig"
//                                         className="btn btn-success"
//                                     >

//                                         Create Gig

//                                     </Link>

//                                     <Link
//                                         to="/my-applications"
//                                         className="btn btn-outline-primary"
//                                     >

//                                         Applications

//                                     </Link>

//                                     <Link
//                                         to="/received-proposals"
//                                         className="btn btn-outline-secondary"
//                                     >

//                                         Client Proposals

//                                     </Link>

//                                     <Link
//                                         to="/friends"
//                                         className="btn btn-outline-dark"
//                                     >

//                                         Friends

//                                     </Link>

//                                     <Link
//                                         to="/my-projects"
//                                         className="btn btn-outline-secondary"
//                                     >

//                                         My Projects

//                                     </Link>

//                                 </div>

//                             </div>

//                         </div>

//                         <div className="col-lg-4">

//                             <div className="card">

//                                 <div className="card-header">

//                                     Balance

//                                 </div>

//                                 <div className="card-body">

//                                     <h3>

//                                         ₹

//                                         {

//                                             dashboard.user.balance

//                                         }

//                                     </h3>

//                                     <p className="text-muted mb-0">

//                                         Total earnings

//                                     </p>

//                                 </div>

//                             </div>

//                         </div>

//                     </div>

//                 )

//                 :

//                 (
//                     <div>
//                         <div className="card mb-4">

//                             <div className="card-header">

//                                 Quick Actions

//                             </div>

//                             <div className="card-body d-flex flex-wrap gap-2">

//                                 <Link
//                                     to="/create-project"
//                                     className="btn btn-success"
//                                 >

//                                     Create Project

//                                 </Link>

//                                 <Link
//                                     to="/my-projects"
//                                     className="btn btn-primary"
//                                 >

//                                     My Projects

//                                 </Link>

//                                 <Link
//                                     to="/projects"
//                                     className="btn btn-outline-primary"
//                                 >

//                                     Browse Projects

//                                 </Link>

//                                 <Link
//                                     to="/gigs"
//                                     className="btn btn-outline-dark"
//                                 >

//                                     Browse Freelancers

//                                 </Link>

//                                 <Link
//                                     to="/become-freelancer"
//                                     className="btn btn-primary"
//                                 >
//                                     Become Freelancer
//                                 </Link>


//                             </div>
                            
//                         </div>
//                     </div>

//                 )

//             }

//             <div className="col-lg-6">

//                 {

//                     dashboard.user.is_freelancer ?

//                     (

//                         <div className="card mb-4">

//                             <div className="card-header d-flex justify-content-between align-items-center">

//                                 <h5 className="mb-0">

//                                     Recent Gigs

//                                 </h5>

//                                 <Link
//                                     to="/my-gigs"
//                                     className="small"
//                                 >

//                                     View All →

//                                 </Link>

//                             </div>

//                             <ul className="list-group list-group-flush">

//                                 {

//                                     dashboard.recent_gigs.length === 0 ?

//                                     (

//                                         <li className="list-group-item">

//                                             No gigs yet.

//                                         </li>

//                                     )

//                                     :

//                                     (

//                                         dashboard.recent_gigs.map(

//                                             gig => (

//                                                 <li
//                                                     key={gig.id}
//                                                     className="list-group-item d-flex justify-content-between"
//                                                 >

//                                                     <span>

//                                                         {gig.title}

//                                                     </span>

//                                                     <Link
//                                                         to={`/gigs/${gig.id}`}
//                                                     >

//                                                         View

//                                                     </Link>

//                                                 </li>

//                                             )

//                                         )

//                                     )

//                                 }

//                             </ul>

//                         </div>

//                     )

//                     :

//                     (

//                         <div className="card mb-4">

//                             <div className="card-header d-flex justify-content-between align-items-center">

//                                 <h5 className="mb-0">

//                                     Recent Projects

//                                 </h5>

//                                 <Link
//                                     to="/my-projects"
//                                     className="small"
//                                 >

//                                     View All →

//                                 </Link>

//                             </div>

//                             <ul className="list-group list-group-flush">

//                                 {

//                                     dashboard.latest_projects.length === 0 ?

//                                     (

//                                         <li className="list-group-item">

//                                             No projects yet.

//                                         </li>

//                                     )

//                                     :

//                                     (

//                                         dashboard.latest_projects.map(

//                                             project => (

//                                                 <li
//                                                     key={project.id}
//                                                     className="list-group-item d-flex justify-content-between"
//                                                 >

//                                                     <span>

//                                                         {project.title}

//                                                     </span>

//                                                     <Link
//                                                         to={`/projects/${project.id}`}
//                                                     >

//                                                         View

//                                                     </Link>

//                                                 </li>

//                                             )

//                                         )

//                                     )

//                                 }

//                             </ul>

//                         </div>

//                     )

//                 }

//             </div>

//             <div className="row">

//                 <div className="col-lg-6">

//                 </div>

//                 <div className="col-lg-6">

//                     <div className="card mb-4">

//                         <div className="card-header d-flex justify-content-between align-items-center mb-3">

//                             <h5 className="mb-0">
//                                 Recent Workspaces
//                             </h5>

//                             <Link
//                                 to="/workspace"
//                                 className="small"
//                             >
//                                 View All →
//                             </Link>

//                         </div>

//                         <ul className="list-group list-group-flush">

//                             {

//                                 dashboard.latest_workspaces.length === 0 ?

//                                 (

//                                     <li className="list-group-item">

//                                         No workspaces.

//                                     </li>

//                                 )

//                                 :

//                                 (

//                                     dashboard.latest_workspaces.map(

//                                         workspace => (

//                                             <li
//                                                 key={workspace.id}
//                                                 className="list-group-item d-flex justify-content-between"
//                                             >

//                                                 <span>

//                                                     {

//                                                         workspace.project_title

//                                                     }

//                                                 </span>

//                                                 <Link
//                                                     to={`/workspace/${workspace.id}`}
//                                                 >

//                                                     Open

//                                                 </Link>

//                                             </li>

//                                         )

//                                     )

//                                 )

//                             }

//                         </ul>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );

// };

// export default DashboardPage;





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
    getDashboard,
} from "../api/accountApi";

import "./DashboardPage.css";

const DashboardPage = () => {

    const { token } =
        useContext(AuthContext);

    const [
        dashboard,
        setDashboard,
    ] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response =
                await getDashboard(token);

            setDashboard(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!dashboard) {

        return (

            <div className="dashboard-loading">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="dashboard-page">

            <div className="dashboard-hero">

                <div>

                    <h1>

                        Welcome back,

                        <span>

                            {" "}
                            {dashboard.user.display_name}

                        </span>

                    </h1>

                    <p>

                        Here's what's happening on your Guild account.

                    </p>

                </div>

                {
                    dashboard.user.is_freelancer && (

                        <div className="balance-card">

                            <small>

                                Available Balance

                            </small>

                            <h2>

                                ₹{dashboard.user.balance}

                            </h2>

                        </div>

                    )
                }

            </div>

            <div className="stats-grid">


                {

                    dashboard.user.is_freelancer && (

                        <>

                            <div className="stat-card">

                                <small>

                                    My Gigs

                                </small>

                                <h2>

                                    {dashboard.gig_count}

                                </h2>

                            </div>

                            <div className="stat-card">

                                <small>

                                    Rating

                                </small>

                                <h2>

                                    ⭐ {dashboard.avg_rating}

                                </h2>

                                <span>

                                    {

                                        dashboard.review_count

                                    }

                                    {" "}
                                    Reviews

                                </span>

                            </div>

                        </>

                    )

                }


                <div className="stat-card">

                    <small>

                        Workspaces

                    </small>

                    <h2>

                        {dashboard.workspace_count}

                    </h2>

                </div>

                <div className="stat-card">

                    <small>

                        Projects

                    </small>

                    <h2>

                        {dashboard.project_count}

                    </h2>

                </div>

            </div>

            <div className="dashboard-main">

                <div className="dashboard-left">

                    <div className="dashboard-card">

                        <div className="card-title">

                            Quick Actions

                        </div>

                        <div className="quick-actions">

                            {
                                dashboard.user.is_freelancer ? (
                                    <>
                                        <Link
                                            to="/my-gigs"
                                            className="primary-btn"
                                        >
                                            My Gigs
                                        </Link>

                                        <Link
                                            to="/create-gig"
                                            className="secondary-btn"
                                        >
                                            Create Gig
                                        </Link>

                                        <Link
                                            to="/friends"
                                            className="secondary-btn"
                                        >
                                            Friends
                                        </Link>

                                        <Link
                                            to="/received-proposals"
                                            className="secondary-btn"
                                        >
                                            Proposals
                                        </Link>

                                        <Link
                                            to="/my-applications"
                                            className="secondary-btn"
                                        >
                                            Applications
                                        </Link>

                                        <Link
                                            to="/my-projects"
                                            className="secondary-btn"
                                        >
                                            My Projects
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/create-project"
                                            className="primary-btn"
                                        >
                                            Create Project
                                        </Link>

                                        <Link
                                            to="/my-projects"
                                            className="secondary-btn"
                                        >
                                            My Projects
                                        </Link>

                                        <Link
                                            to="/projects"
                                            className="secondary-btn"
                                        >
                                            Browse Projects
                                        </Link>

                                        <Link
                                            to="/gigs"
                                            className="secondary-btn"
                                        >
                                            Browse Freelancers
                                        </Link>
                                    </>
                                )
                            }

                        </div>

                    </div>
                    <div className="dashboard-card">

                        <div className="card-header-custom">

                            <h3>

                                {

                                    dashboard.user.is_freelancer

                                        ? "Recent Gigs"

                                        : "Recent Projects"

                                }

                            </h3>

                            <Link

                                to={

                                    dashboard.user.is_freelancer

                                        ? "/my-gigs"

                                        : "/my-projects"

                                }

                            >

                                View All →

                            </Link>

                        </div>

                        <div className="dashboard-list">

                            {

                                dashboard.user.is_freelancer

                                    ?

                                    (

                                        dashboard.recent_gigs.length === 0 ?

                                        (

                                            <div className="empty-state">

                                                No gigs created yet.

                                            </div>

                                        )

                                        :

                                        (

                                            dashboard.recent_gigs.map(

                                                gig => (

                                                    <Link

                                                        key={gig.id}

                                                        to={`/gigs/${gig.id}`}

                                                        className="dashboard-item"

                                                    >

                                                        <div>

                                                            <h5>

                                                                {gig.title}

                                                            </h5>

                                                            <small>

                                                                ₹{gig.price}

                                                            </small>

                                                        </div>

                                                        <span>

                                                            →

                                                        </span>

                                                    </Link>

                                                )

                                            )

                                        )

                                    )

                                    :

                                    (

                                        dashboard.latest_projects.length === 0 ?

                                        (

                                            <div className="empty-state">

                                                No projects created yet.

                                            </div>

                                        )

                                        :

                                        (

                                            dashboard.latest_projects.map(

                                                project => (

                                                    <Link

                                                        key={project.id}

                                                        to={`/projects/${project.id}`}

                                                        className="dashboard-item"

                                                    >

                                                        <div>

                                                            <h5>

                                                                {project.title}

                                                            </h5>

                                                            <small>

                                                                {

                                                                    project.status

                                                                }

                                                            </small>

                                                        </div>

                                                        <span>

                                                            →

                                                        </span>

                                                    </Link>

                                                )

                                            )

                                        )

                                    )

                            }

                        </div>

                    </div>

                </div>

                <div className="dashboard-right">

                    <div className="dashboard-card">

                        <div className="card-header-custom">

                            <h3>

                                Recent Workspaces

                            </h3>

                            <Link

                                to="/workspace"

                            >

                                View All →

                            </Link>

                        </div>

                        <div className="dashboard-list">

                            {

                                dashboard.latest_workspaces.length === 0 ?

                                (

                                    <div className="empty-state">

                                        No active workspaces.

                                    </div>

                                )

                                :

                                (

                                    dashboard.latest_workspaces.map(

                                        workspace => (

                                            <Link

                                                key={workspace.id}

                                                to={`/workspace/${workspace.id}`}

                                                className="dashboard-item"

                                            >

                                                <div>

                                                    <h5>

                                                        {

                                                            workspace.project_title

                                                        }

                                                    </h5>

                                                    <small>

                                                        Workspace

                                                    </small>

                                                </div>

                                                <span>

                                                    →

                                                </span>

                                            </Link>

                                        )

                                    )

                                )

                            }

                        </div>

                    </div>

                    {

                        !dashboard.user.is_freelancer && (

                            <div className="dashboard-card freelancer-banner">

                                <small>

                                    Looking to earn from your skills?

                                </small>

                                <h3>

                                    Become a Freelancer

                                </h3>

                                <p>

                                    Create professional gigs, collaborate with teams and receive secure payments through Guild.

                                </p>

                                <Link

                                    to="/become-freelancer"

                                    className="primary-btn"

                                >

                                    Start Freelancing

                                </Link>

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

};

export default DashboardPage;