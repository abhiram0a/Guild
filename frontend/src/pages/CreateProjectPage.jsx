// import {
//     useState,
//     useEffect,
//     useContext,
// } from "react";

// import {
//     getCategories,
//     createProject,
// } from "../api/projectApi";

// import { AuthContext } from "../context/AuthContext";

// import { useNavigate } from "react-router-dom";

// const CreateProjectPage = () => {

//     const { token } = useContext(AuthContext);

//     const navigate = useNavigate();

//     const [categories, setCategories] =
//         useState([]);

//     const [error, setError] =
//         useState("");

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         deadline: "",
//         roles: [
//             {
//                 job_category: "",
//                 required_count: 1,
//                 allocated_budget: "",
//             },
//         ],
//     });

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {

//         try {

//             const response =
//                 await getCategories();

//             setCategories(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]:
//                 e.target.value,
//         });
//     };

//     const handleRoleChange = (
//         index,
//         field,
//         value
//     ) => {

//         const updatedRoles =
//             [...formData.roles];

//         updatedRoles[index][field] =
//             value;

//         setFormData({
//             ...formData,
//             roles: updatedRoles,
//         });
//     };

//     const addRole = () => {

//         setFormData({
//             ...formData,
//             roles: [
//                 ...formData.roles,
//                 {
//                     job_category: "",
//                     required_count: 1,
//                     allocated_budget: "",
//                 },
//             ],
//         });
//     };

//     const removeRole = (index) => {

//         if (formData.roles.length === 1)
//             return;

//         const updatedRoles =
//             formData.roles.filter(
//                 (_, i) => i !== index
//             );

//         setFormData({
//             ...formData,
//             roles: updatedRoles,
//         });
//     };

//     const totalBudget =
//         formData.roles.reduce(
//             (sum, role) =>
//                 sum +
//                 Number(
//                     role.allocated_budget || 0
//                 ),
//             0
//         );

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             const payload = {
//                 ...formData,

//                 roles: formData.roles.map(
//                     role => ({
//                         job_category:
//                             Number(
//                                 role.job_category
//                             ),

//                         required_count:
//                             Number(
//                                 role.required_count
//                             ),

//                         allocated_budget:
//                             role.allocated_budget,
//                     })
//                 ),
//             };

//             await createProject(
//                 payload,
//                 token
//             );

//             navigate(
//                 "/my-projects"
//             );

//         } catch (error) {

//             setError(
//                 "Failed to create project"
//             );
//         }
//     };

//     return (

//         <div className="container mt-4">

//             <h2>Create Project</h2>

//             {error && (
//                 <div className="alert alert-danger">
//                     {error}
//                 </div>
//             )}

//             <form
//                 onSubmit={handleSubmit}
//             >

//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <textarea
//                     name="description"
//                     placeholder="Description"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="date"
//                     name="deadline"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <hr />

//                 <h4>Required Roles</h4>

//                 {formData.roles.map(
//                     (role, index) => (

//                         <div
//                             key={index}
//                             className="border p-3 mb-3"
//                         >

//                             <h6>
//                                 Role {index + 1}
//                             </h6>

//                             <select
//                                 className="form-control mb-2"
//                                 value={
//                                     role.job_category
//                                 }
//                                 onChange={(e) =>
//                                     handleRoleChange(
//                                         index,
//                                         "job_category",
//                                         e.target.value
//                                     )
//                                 }
//                             >

//                                 <option value="">
//                                     Select Category
//                                 </option>

//                                 {categories.map(
//                                     category => (

//                                         <option
//                                             key={category.id}
//                                             value={category.id}
//                                         >
//                                             {category.name}
//                                         </option>
//                                     )
//                                 )}

//                             </select>

//                             <input
//                                 type="number"
//                                 placeholder="Required Count"
//                                 className="form-control mb-2"
//                                 value={
//                                     role.required_count
//                                 }
//                                 onChange={(e) =>
//                                     handleRoleChange(
//                                         index,
//                                         "required_count",
//                                         e.target.value
//                                     )
//                                 }
//                             />

//                             <input
//                                 type="number"
//                                 placeholder="Allocated Budget"
//                                 className="form-control mb-2"
//                                 value={
//                                     role.allocated_budget
//                                 }
//                                 onChange={(e) =>
//                                     handleRoleChange(
//                                         index,
//                                         "allocated_budget",
//                                         e.target.value
//                                     )
//                                 }
//                             />

//                             <button
//                                 type="button"
//                                 className="btn btn-danger"
//                                 onClick={() =>
//                                     removeRole(index)
//                                 }
//                             >
//                                 Remove Role
//                             </button>

//                         </div>
//                     )
//                 )}

//                 <button
//                     type="button"
//                     className="btn btn-secondary mb-3"
//                     onClick={addRole}
//                 >
//                     Add Another Role
//                 </button>

//                 <h5>
//                     Total Budget:
//                     ₹{totalBudget}
//                 </h5>

//                 <button
//                     className="btn btn-primary"
//                 >
//                     Create Project
//                 </button>

//             </form>

//         </div>
//     );
// };

// export default CreateProjectPage;










import {
    useState,
    useEffect,
    useContext,
} from "react";

import Select from "react-select";

import {
    getCategories,
    createProject,
} from "../api/projectApi";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

import "./CreateProjectPage.css";

const CreateProjectPage = () => {

    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        deadline: "",

        roles: [

            {

                job_category: "",

                required_count: 1,

                allocated_budget: "",

            },

        ],

    });

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const categoryOptions = categories.map(category => ({

        value: category.id,

        label: category.name,

    }));

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleRoleChange = (

        index,

        field,

        value

    ) => {

        const updated = [...formData.roles];

        updated[index][field] = value;

        setFormData({

            ...formData,

            roles: updated,

        });

    };

    const addRole = () => {

        setFormData({

            ...formData,

            roles: [

                ...formData.roles,

                {

                    job_category: "",

                    required_count: 1,

                    allocated_budget: "",

                },

            ],

        });

    };

    const removeRole = (index) => {

        if (formData.roles.length === 1)

            return;

        setFormData({

            ...formData,

            roles: formData.roles.filter(

                (_, i) => i !== index

            ),

        });

    };

    const totalBudget =

        formData.roles.reduce(

            (sum, role) =>

                sum +

                Number(

                    role.allocated_budget || 0

                ),

            0

        );

    const totalMembers =

        formData.roles.reduce(

            (sum, role) =>

                sum +

                Number(

                    role.required_count || 0

                ),

            0

        );

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {

                ...formData,

                roles:

                    formData.roles.map(

                        role => ({

                            job_category:

                                Number(

                                    role.job_category

                                ),

                            required_count:

                                Number(

                                    role.required_count

                                ),

                            allocated_budget:

                                role.allocated_budget,

                        })

                    ),

            };

            await createProject(

                payload,

                token

            );

            navigate("/my-projects");

        }

        catch (error) {

            setError(

                "Failed to create project."

            );

        }

    };

    return (

        <div className="project-create-page">

            <div className="project-create-container">

                <div className="project-create-header">

                    <div>

                        <h1>

                            Create a New Project

                        </h1>

                        <p>

                            Describe your project, define your team roles and publish it for talented freelancers.

                        </p>

                    </div>

                </div>

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}

                <form

                    onSubmit={handleSubmit}

                >

                    <div className="project-layout">

                        <div className="project-main">

                            <section className="project-panel">

                                <h3>

                                    Project Details

                                </h3>

                                <div className="form-group">

                                    <label>

                                        Project Title

                                    </label>

                                    <input

                                        type="text"

                                        name="title"

                                        className="form-control"

                                        value={formData.title}

                                        onChange={handleChange}

                                        placeholder="Example: YouTube Documentary Editing"

                                    />

                                </div>

                                <div className="form-group">

                                    <label>

                                        Description

                                    </label>

                                    <textarea

                                        rows="8"

                                        name="description"

                                        className="form-control"

                                        value={formData.description}

                                        onChange={handleChange}

                                        placeholder="Explain your project, deliverables and expectations..."

                                    />

                                </div>

                                <div className="form-group">

                                    <label>

                                        Deadline

                                    </label>

                                    <input

                                        type="date"

                                        name="deadline"

                                        className="form-control"

                                        value={formData.deadline}

                                        onChange={handleChange}

                                    />

                                </div>

                            </section>

                            <section className="project-panel">

                                <div className="roles-header">

                                    <div>

                                        <h3>

                                            Required Team Roles

                                        </h3>

                                        <p>

                                            Add every role required to complete this project.

                                        </p>

                                    </div>

                                </div>

                                {formData.roles.map(

                                    (

                                        role,

                                        index

                                    ) => (

                                        <div

                                            key={index}

                                            className="project-role-card"

                                        >

                                            <div className="role-card-header">

                                                <h4>

                                                    Role #{index + 1}

                                                </h4>

                                                {formData.roles.length > 1 && (

                                                    <button

                                                        type="button"

                                                        className="remove-role"

                                                        onClick={() =>

                                                            removeRole(index)

                                                        }

                                                    >

                                                        ✕ Remove

                                                    </button>

                                                )}

                                            </div>

                                            <div className="role-grid">

                                                <div className="form-group">

                                                    <label>

                                                        Job Category

                                                    </label>

                                                    <Select

                                                        options={categoryOptions}

                                                        value={categoryOptions.find(

                                                            option =>

                                                                option.value === Number(role.job_category)

                                                        )}

                                                        onChange={(selected) =>

                                                            handleRoleChange(

                                                                index,

                                                                "job_category",

                                                                selected?.value || ""

                                                            )

                                                        }

                                                        placeholder="Search category..."

                                                        classNamePrefix="react-select"

                                                    />

                                                </div>
                                                <div className="form-group">

                                                    <label>

                                                        Members Needed

                                                    </label>

                                                    <input

                                                        type="number"

                                                        min="1"

                                                        className="form-control"

                                                        value={role.required_count}

                                                        onChange={(e) =>

                                                            handleRoleChange(

                                                                index,

                                                                "required_count",

                                                                e.target.value

                                                            )

                                                        }

                                                    />

                                                </div>

                                                <div className="form-group">

                                                    <label>

                                                        Budget For This Role

                                                    </label>

                                                    <input

                                                        type="number"

                                                        className="form-control"

                                                        placeholder="₹"

                                                        value={role.allocated_budget}

                                                        onChange={(e) =>

                                                            handleRoleChange(

                                                                index,

                                                                "allocated_budget",

                                                                e.target.value

                                                            )

                                                        }

                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    )

                                )}

                                <button

                                    type="button"

                                    className="add-role-btn"

                                    onClick={addRole}

                                >

                                    + Add Another Role

                                </button>

                            </section>

                        </div>

                        <aside className="project-sidebar">

                            <div className="project-summary-card">

                                <h3>

                                    Project Summary

                                </h3>

                                <div className="summary-item">

                                    <span>

                                        Total Budget

                                    </span>

                                    <strong>

                                        ₹{totalBudget.toLocaleString()}

                                    </strong>

                                </div>

                                <div className="summary-item">

                                    <span>

                                        Team Roles

                                    </span>

                                    <strong>

                                        {formData.roles.length}

                                    </strong>

                                </div>

                                <div className="summary-item">

                                    <span>

                                        Members Required

                                    </span>

                                    <strong>

                                        {totalMembers}

                                    </strong>

                                </div>

                                <div className="summary-item">

                                    <span>

                                        Deadline

                                    </span>

                                    <strong>

                                        {

                                            formData.deadline ||

                                            "--"

                                        }

                                    </strong>

                                </div>

                                <hr />

                                <p className="summary-note">

                                    Your project will become visible to freelancers immediately after publishing. They can apply using their gigs or invite teammates if multiple roles are required.

                                </p>

                                <button

                                    type="submit"

                                    className="publish-project-btn"

                                >

                                    Create Project

                                </button>

                            </div>

                        </aside>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateProjectPage;
