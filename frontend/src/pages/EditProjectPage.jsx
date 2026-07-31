// import {
//     useState,
//     useEffect,
//     useContext,
// } from "react";

// import {
//     useParams,
//     useNavigate,
// } from "react-router-dom";

// import {
//     getProjectDetails,
//     updateProject,
// } from "../api/projectApi";

// import { AuthContext }
//     from "../context/AuthContext";

// const EditProjectPage = () => {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const { token } =
//         useContext(AuthContext);

//     const [loading, setLoading] =
//         useState(true);

//     const [error, setError] =
//         useState("");

//     const [formData, setFormData] =
//         useState({
//             title: "",
//             description: "",
//             deadline: "",
//         });

//     useEffect(() => {
//         fetchProject();
//     }, []);

//     const fetchProject = async () => {

//         try {

//             const response =
//                 await getProjectDetails(id);

//             setFormData({
//                 title:
//                     response.data.title,

//                 description:
//                     response.data.description,

//                 deadline:
//                     response.data.deadline,
//             });

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Failed to load project"
//             );

//         } finally {

//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]:
//                 e.target.value,
//         });
//     };

//     const handleSubmit =
//         async (e) => {

//         e.preventDefault();

//         try {

//             await updateProject(
//                 id,
//                 formData,
//                 token
//             );

//             navigate(
//                 `/projects/${id}`
//             );

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Failed to update project"
//             );
//         }
//     };

//     if (loading) {

//         return (
//             <div className="container mt-4">
//                 Loading...
//             </div>
//         );
//     }

//     return (

//         <div className="container mt-4">

//             <h2>Edit Project</h2>

//             {error && (

//                 <div
//                     className="alert alert-danger"
//                 >
//                     {error}
//                 </div>
//             )}

//             <form
//                 onSubmit={handleSubmit}
//             >

//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <textarea
//                     name="description"
//                     value={
//                         formData.description
//                     }
//                     className="form-control mb-3"
//                     rows="5"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="date"
//                     name="deadline"
//                     value={
//                         formData.deadline
//                     }
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <button
//                     className="btn btn-primary"
//                 >
//                     Save Changes
//                 </button>

//             </form>

//         </div>
//     );
// };

// export default EditProjectPage;




import {
    useState,
    useEffect,
    useContext,
} from "react";

import {
    useParams,
    useNavigate,
} from "react-router-dom";

import {
    getProjectDetails,
    updateProject,
} from "../api/projectApi";

import {
    AuthContext
} from "../context/AuthContext";

import "./EditProjectPage.css";


const EditProjectPage = () => {


    const { id } = useParams();


    const navigate =
        useNavigate();


    const { token } =
        useContext(AuthContext);



    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");



    const [formData, setFormData] =
        useState({

            title:"",
            description:"",
            deadline:"",

        });




    useEffect(() => {

        fetchProject();

    }, []);




    const fetchProject = async () => {

        try {


            const response =
                await getProjectDetails(id);



            setFormData({

                title:
                    response.data.title,


                description:
                    response.data.description,


                deadline:
                    response.data.deadline,

            });


        }

        catch(error){

            console.error(error);


            setError(
                "Failed to load project"
            );

        }

        finally{

            setLoading(false);

        }

    };





    const handleChange = (e) => {


        setFormData({

            ...formData,


            [e.target.name]:
                e.target.value,

        });


    };





    const handleSubmit = async (e) => {


        e.preventDefault();



        try {


            await updateProject(

                id,

                formData,

                token

            );



            navigate(
                `/projects/${id}`
            );


        }

        catch(error){


            console.error(error);



            setError(
                "Failed to update project"
            );


        }


    };





    if(loading){

        return (

            <div className="edit-project-loading">

                Loading project...

            </div>

        );

    }




    return (


        <div className="edit-project-page">


            <div className="edit-project-container">


                <div className="edit-project-header">


                    <h1>
                        Edit Project
                    </h1>


                    <p>
                        Update your project information and keep collaborators informed.
                    </p>


                </div>





                {
                    error && (

                        <div className="edit-project-error">

                            {error}

                        </div>

                    )
                }






                <form

                    className="edit-project-form"

                    onSubmit={handleSubmit}

                >





                    <div className="edit-project-info">


                        <div className="info-icon">
                            i
                        </div>


                        <div>

                            <h4>
                                Project structure is locked
                            </h4>


                            <p>
                                Required roles and budget allocation cannot be changed after creating the project.
                            </p>

                        </div>


                    </div>







                    <div className="project-form-section">


                        <label>
                            Project Title
                        </label>


                        <input

                            type="text"

                            name="title"

                            value={
                                formData.title
                            }

                            onChange={
                                handleChange
                            }

                            className="project-input"

                        />


                    </div>







                    <div className="project-form-section">


                        <label>
                            Project Description
                        </label>


                        <textarea

                            name="description"

                            value={
                                formData.description
                            }

                            onChange={
                                handleChange
                            }

                            rows="7"

                            className="project-input project-textarea"

                        />


                    </div>







                    <div className="project-form-section">


                        <label>
                            Deadline
                        </label>


                        <input

                            type="date"

                            name="deadline"

                            value={
                                formData.deadline
                            }

                            onChange={
                                handleChange
                            }

                            className="project-input"

                        />


                    </div>







                    <div className="edit-project-actions">


                        <button

                            type="button"

                            className="project-cancel-btn"

                            onClick={() =>
                                navigate(
                                    `/projects/${id}`
                                )
                            }

                        >

                            Cancel

                        </button>





                        <button

                            className="project-save-btn"

                        >

                            Save Changes

                        </button>



                    </div>





                </form>




            </div>


        </div>


    );

};


export default EditProjectPage;