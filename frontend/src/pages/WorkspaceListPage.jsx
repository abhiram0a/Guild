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

//     getMyWorkspaces,

// } from "../api/collaborationApi";

// const WorkspaceListPage = () => {

//     const {

//         token,

//     } = useContext(AuthContext);

//     const [

//         workspaces,

//         setWorkspaces,

//     ] = useState([]);

//     useEffect(() => {

//         fetchWorkspaces();

//     }, []);

//     const fetchWorkspaces = async () => {

//         try {

//             const response =

//                 await getMyWorkspaces(

//                     token

//                 );

//             setWorkspaces(

//                 response.data

//             );

//         }

//         catch (error) {

//             console.error(error);

//         }

//     };

//     return (

//         <div className="container mt-4">

//             <h2>

//                 Workspaces

//             </h2>

//             <hr />

//             {

//                 workspaces.length === 0 ?

//                 (

//                     <div className="alert alert-info">

//                         No active workspaces yet.

//                     </div>

//                 )

//                 :

//                 (

//                     <div className="list-group">

//                         {

//                             workspaces.map(

//                                 workspace => (

//                                     <Link

//                                         key={workspace.id}

//                                         to={`/workspace/${workspace.id}`}

//                                         className="list-group-item list-group-item-action"

//                                     >

//                                         {workspace.project.title}

//                                     </Link>

//                                 )

//                             )

//                         }

//                     </div>

//                 )

//             }

//         </div>

//     );

// };

// export default WorkspaceListPage;






import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    FiMessageSquare,
    FiUsers,
    FiChevronRight,
} from "react-icons/fi";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getMyWorkspaces,
} from "../api/collaborationApi";

import "./WorkspaceListPage.css";

const WorkspaceListPage = () => {

    const {
        token,
    } = useContext(AuthContext);

    const [
        workspaces,
        setWorkspaces,
    ] = useState([]);

    useEffect(() => {

        fetchWorkspaces();

    }, []);

    const fetchWorkspaces = async () => {

        try {

            const response =
                await getMyWorkspaces(token);

            setWorkspaces(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="workspace-list-page fade-up">

            <div className="workspace-list-header">

                <div>

                    <h1>

                        Workspaces

                    </h1>

                    <p>

                        Continue conversations with your clients,
                        freelancers and teammates.

                    </p>

                </div>

                <div className="workspace-counter">

                    {workspaces.length}

                    <span>

                        Active

                    </span>

                </div>

            </div>

            {

                workspaces.length === 0 ? (

                    <div className="workspace-empty">

                        <FiMessageSquare
                            size={56}
                        />

                        <h3>

                            No active workspaces

                        </h3>

                        <p>

                            When a project starts,
                            its workspace will appear here.

                        </p>

                    </div>

                )

                :

                (

                    <div className="workspace-feed">

                        {

                            workspaces.map(workspace => (

                                <Link

                                    key={workspace.id}

                                    to={`/workspace/${workspace.id}`}

                                    className="workspace-row"

                                >

                                    <div className="workspace-avatar">

                                        {

                                            workspace.project.title
                                                .charAt(0)
                                                .toUpperCase()

                                        }

                                    </div>

                                    <div className="workspace-content">

                                        <div className="workspace-title-row">

                                            <h3>

                                                {

                                                    workspace.project.title

                                                }

                                            </h3>

                                            <span
                                                className={`workspace-status ${workspace.project.status.toLowerCase()}`}
                                            >

                                                {

                                                    workspace.project.status

                                                }

                                            </span>

                                        </div>

                                        <div className="workspace-meta">

                                            <span>

                                                <FiMessageSquare />

                                                Workspace

                                            </span>

                                            <span>

                                                <FiUsers />

                                                {

                                                    workspace.participants.length

                                                }

                                                {" "}
                                                Participants

                                            </span>

                                        </div>

                                    </div>

                                    <div className="workspace-arrow">

                                        <FiChevronRight />

                                    </div>

                                </Link>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default WorkspaceListPage;