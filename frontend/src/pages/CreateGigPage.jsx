// import { useContext, useEffect, useState } from "react";
// import {
//     getCategories,
//     getSkills,
//     createSkill,
//     createGig,
// } from "../api/projectApi";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";


// const CreateGigPage = () => {

//     const { token } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [categories, setCategories] = useState([]);
//     const [skills, setSkills] = useState([]);

//     const [newSkill, setNewSkill] = useState("");

//     const [error, setError] = useState("");

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         job_category_id: "",
//         skill_ids: [],
//         experience_level: "BEGINNER",
//         price: "",
//         delivery_time: "",
//         revisions: "",
//     });

//     useEffect(() => {
//         fetchData();
//     }, [token]);

//     const fetchData = async () => {
//         try {
//             const categoriesRes = await getCategories();
//             const skillsRes = await getSkills();

//             setCategories(categoriesRes.data);
//             setSkills(skillsRes.data);

//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSkillSelect = (e) => {

//         const selected = Array.from(
//             e.target.selectedOptions,
//             option => Number(option.value)
//         );

//         setFormData({
//             ...formData,
//             skill_ids: selected,
//         });
//     };

//     const handleCreateSkill = async () => {

//         if (!newSkill.trim()) return;

//         try {

//             await createSkill(
//                 { name: newSkill },
//                 token
//             );

//             setNewSkill("");

//             fetchData();

//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             await createGig(
//                 formData,
//                 token
//             );

//             navigate("/my-gigs");

//         } catch (error) {

//             setError("Failed to create gig");
//         }
//     };

//     return (
//         <div className="container mt-4">

//             <h2>Create Gig</h2>

//             {error &&
//                 <div className="alert alert-danger">
//                     {error}
//                 </div>
//             }



//             <form onSubmit={handleSubmit}>

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

//                 <select
//                     name="job_category_id"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 >
//                     <option value="">
//                         Select Category
//                     </option>

//                     {categories.map(category => (
//                         <option
//                             key={category.id}
//                             value={category.id}
//                         >
//                             {category.name}
//                         </option>
//                     ))}
//                 </select>

//                 <h5>Skills</h5>

//                 <select
//                     multiple
//                     className="form-control mb-3"
//                     onChange={handleSkillSelect}
//                 >
//                     {skills.map(skill => (
//                         <option
//                             key={skill.id}
//                             value={skill.id}
//                         >
//                             {skill.name}
//                         </option>
//                     ))}
//                 </select>

//             <div className="mb-4">

//                 <input
//                     type="text"
//                     className="form-control mb-2"
//                     value={newSkill}
//                     onChange={(e) =>
//                         setNewSkill(e.target.value)
//                     }
//                     placeholder="Skill name"
//                 />

//                 <button
//                     className="btn btn-secondary"
//                     onClick={handleCreateSkill}
//                 >
//                     Add Skill
//                 </button>

//             </div>

//                 <select
//                     name="experience_level"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 >
//                     <option value="BEGINNER">
//                         Beginner
//                     </option>

//                     <option value="INTERMEDIATE">
//                         Intermediate
//                     </option>

//                     <option value="EXPERT">
//                         Expert
//                     </option>
//                 </select>

//                 <input
//                     type="number"
//                     name="price"
//                     placeholder="Price"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="number"
//                     name="delivery_time"
//                     placeholder="Delivery Time (days)"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="number"
//                     name="revisions"
//                     placeholder="Revisions"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <button
//                     className="btn btn-primary"
//                 >
//                     Create Gig
//                 </button>

//             </form>

//         </div>
//     );
// };

// export default CreateGigPage;









import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import CreatableSelect from "react-select/creatable";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getCategories,
    getSkills,
    createSkill,
    createGig,
} from "../api/projectApi";

import "./CreateGigPage.css";

const CreateGigPage = () => {

    const { token } =
        useContext(AuthContext);

    const navigate =
        useNavigate();

    const [categories, setCategories] =
        useState([]);

    const [skills, setSkills] =
        useState([]);

    const [error, setError] =
        useState("");

    const [creatingSkill, setCreatingSkill] =
        useState(false);

    const [selectedSkills, setSelectedSkills] =
        useState([]);

    const [formData, setFormData] =
        useState({

            title: "",

            description: "",

            job_category_id: "",

            skill_ids: [],

            experience_level: "BEGINNER",

            price: "",

            delivery_time: "",

            revisions: "",

        });

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const categoriesRes =
                await getCategories();

            const skillsRes =
                await getSkills();

            setCategories(
                categoriesRes.data
            );

            setSkills(
                skillsRes.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const categoryOptions =
        categories.map(category => ({

            value: category.id,

            label: category.name,

        }));

    const skillOptions =
        skills.map(skill => ({

            value: skill.id,

            label: skill.name,

        }));

    const handleSkillChange =
        (selected) => {

            setSelectedSkills(
                selected || []
            );

            setFormData({

                ...formData,

                skill_ids:
                    selected
                        ? selected.map(
                            item => item.value
                        )
                        : [],

            });

        };

    const handleCreateSkill =
        async (inputValue) => {

            const value =
                inputValue.trim();

            if (!value)
                return;

            setCreatingSkill(true);

            try {

                const response =
                    await createSkill(

                        {
                            name: value,
                        },

                        token

                    );

                const newSkill = {

                    value:
                        response.data.id,

                    label:
                        response.data.name,

                };

                setSkills(prev => [

                    ...prev,

                    response.data,

                ]);

                const updated = [

                    ...selectedSkills,

                    newSkill,

                ];

                setSelectedSkills(
                    updated
                );

                setFormData({

                    ...formData,

                    skill_ids:
                        updated.map(
                            skill => skill.value
                        ),

                });

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setCreatingSkill(false);

            }

        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setError("");

            try {

                await createGig(

                    formData,

                    token

                );

                navigate(
                    "/my-gigs"
                );

            }

            catch (error) {

                console.error(error);

                setError(
                    "Unable to create your gig."
                );

            }

        };

    return (

        <div className="gig-editor-page">

            <div className="gig-editor-container">

                <div className="gig-editor-header">

                    <h1>

                        Create a New Gig

                    </h1>

                    <p>

                        Showcase your expertise with a professional gig that helps clients understand exactly what you offer.

                    </p>

                </div>

                {
                    error && (

                        <div className="gig-error">

                            {error}

                        </div>

                    )
                }

                <form
                    onSubmit={handleSubmit}
                    className="gig-form"
                >

                    <section className="gig-section">

                        <div className="section-heading">

                            <h3>

                                Gig Information

                            </h3>

                            <p>

                                Write a title and description that clearly explain your service.

                            </p>

                        </div>

                        <div className="form-group">

                            <label>

                                Gig Title

                            </label>

                            <input

                                type="text"

                                name="title"

                                value={formData.title}

                                onChange={handleChange}

                                placeholder="Example: Professional Video Editing for YouTube"

                                className="form-control"

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Description

                            </label>

                            <textarea

                                rows="7"

                                name="description"

                                value={formData.description}

                                onChange={handleChange}

                                className="form-control"

                                placeholder="Describe what clients receive, your workflow, communication style, and any important details..."

                                required

                            />

                        </div>

                        <div className="gig-two-column">

                            <div className="form-group">

                                <label>

                                    Category

                                </label>

                                <CreatableSelect

                                    isClearable={false}

                                    isSearchable

                                    options={categoryOptions}

                                    value={
                                        categoryOptions.find(
                                            option =>
                                                option.value ==
                                                formData.job_category_id
                                        ) || null
                                    }

                                    onChange={(selected) =>

                                        setFormData({

                                            ...formData,

                                            job_category_id:
                                                selected.value,

                                        })

                                    }

                                    placeholder="Choose category..."

                                    formatCreateLabel={() => null}

                                />

                            </div>

                            <div className="form-group">

                                <label>

                                    Experience Level

                                </label>

                                <select

                                    name="experience_level"

                                    value={
                                        formData.experience_level
                                    }

                                    onChange={handleChange}

                                    className="form-control"

                                >

                                    <option value="BEGINNER">

                                        Beginner

                                    </option>

                                    <option value="INTERMEDIATE">

                                        Intermediate

                                    </option>

                                    <option value="EXPERT">

                                        Expert

                                    </option>

                                </select>

                            </div>

                        </div>

                    </section>
                    <section className="gig-section">

                        <div className="section-heading">

                            <h3>

                                Skills

                            </h3>

                            <p>

                                Select the skills clients should expect from this gig. If a skill doesn't exist yet, simply type its name and create it.

                            </p>

                        </div>

                        <div className="form-group">

                            <label>

                                Required Skills

                            </label>

                            <CreatableSelect

                                isMulti

                                isSearchable

                                options={skillOptions}

                                value={selectedSkills}

                                onChange={handleSkillChange}

                                onCreateOption={handleCreateSkill}

                                isDisabled={creatingSkill}

                                placeholder="Search or create skills..."

                                formatCreateLabel={(input) =>

                                    `Create "${input}"`

                                }

                            />

                        </div>

                    </section>

                    <section className="gig-section">

                        <div className="section-heading">

                            <h3>

                                Pricing & Delivery

                            </h3>

                            <p>

                                Set a fair price and clearly communicate your delivery expectations.

                            </p>

                        </div>

                        <div className="gig-three-column">

                            <div className="form-group">

                                <label>

                                    Price (₹)

                                </label>

                                <input

                                    type="number"

                                    name="price"

                                    className="form-control"

                                    placeholder="2500"

                                    value={formData.price}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="form-group">

                                <label>

                                    Delivery Time (day)

                                </label>

                                <input

                                    type="number"

                                    name="delivery_time"

                                    className="form-control"

                                    placeholder="7"

                                    value={formData.delivery_time}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="form-group">

                                <label>

                                    Revisions

                                </label>

                                <input

                                    type="number"

                                    name="revisions"

                                    className="form-control"

                                    placeholder="3"

                                    value={formData.revisions}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>

                    </section>

                    <div className="gig-submit-bar">

                        <div>

                            <h4>

                                Ready to publish?

                            </h4>

                            <p>

                                Your gig will immediately become visible for clients searching in its category.

                            </p>

                        </div>

                        <button

                            type="submit"

                            className="publish-btn"

                        >

                            Create Gig

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateGigPage;