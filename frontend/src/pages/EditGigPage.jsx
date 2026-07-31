// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//     getGigDetails,
//     getSkills,
//     createSkill,
//     updateGig,
// } from "../api/projectApi";

// import { AuthContext } from "../context/AuthContext";

// const EditGigPage = () => {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const { token } = useContext(AuthContext);

//     const [skills, setSkills] = useState([]);

//     const [newSkill, setNewSkill] = useState("");

//     const [error, setError] = useState("");

//     const [loading, setLoading] = useState(true);

//     const [categoryName, setCategoryName] = useState("");

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         skill_ids: [],
//         experience_level: "BEGINNER",
//         price: "",
//         delivery_time: "",
//         revisions: "",
//     });

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {

//         try {

//             const gigRes = await getGigDetails(id);

//             const skillsRes = await getSkills();

//             const gig = gigRes.data;

//             setSkills(skillsRes.data);

//             setCategoryName(gig.job_category.name);

//             setFormData({

//                 title: gig.title,

//                 description: gig.description,

//                 skill_ids: gig.skills.map(skill => skill.id),

//                 experience_level: gig.experience_level,

//                 price: gig.price,

//                 delivery_time: gig.delivery_time,

//                 revisions: gig.revisions,

//             });

//         } catch (error) {

//             console.error(error);

//         }

//         setLoading(false);

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

//             const skillsRes = await getSkills();

//             setSkills(skillsRes.data);

//             setNewSkill("");

//         }

//         catch (error) {

//             console.error(error);

//         }

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             await updateGig(

//                 id,

//                 formData,

//                 token

//             );

//             navigate("/my-gigs");

//         }

//         catch (error) {

//             setError("Failed to update gig");

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

//             <h2>Edit Gig</h2>

//             {error &&

//                 <div className="alert alert-danger">

//                     {error}

//                 </div>

//             }

//             <form onSubmit={handleSubmit}>

//                 <input
//                     className="form-control mb-3"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                 />

//                 <textarea
//                     className="form-control mb-3"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                 />

//                 <input
//                     className="form-control mb-3"
//                     value={categoryName}
//                     disabled
//                 />

//                 <h5>Skills</h5>

//                 <select
//                     multiple
//                     className="form-control mb-3"
//                     value={formData.skill_ids}
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

//                 <input
//                     className="form-control mb-2"
//                     value={newSkill}
//                     placeholder="New Skill"
//                     onChange={(e)=>setNewSkill(e.target.value)}
//                 />

//                 <button
//                     type="button"
//                     className="btn btn-secondary mb-3"
//                     onClick={handleCreateSkill}
//                 >
//                     Add Skill
//                 </button>

//                 <select
//                     className="form-control mb-3"
//                     name="experience_level"
//                     value={formData.experience_level}
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
//                     className="form-control mb-3"
//                     name="price"
//                     type="number"
//                     value={formData.price}
//                     onChange={handleChange}
//                 />

//                 <input
//                     className="form-control mb-3"
//                     name="delivery_time"
//                     type="number"
//                     value={formData.delivery_time}
//                     onChange={handleChange}
//                 />

//                 <input
//                     className="form-control mb-3"
//                     name="revisions"
//                     type="number"
//                     value={formData.revisions}
//                     onChange={handleChange}
//                 />

//                 <button className="btn btn-primary">

//                     Save Changes

//                 </button>

//             </form>

//         </div>

//     );

// };

// export default EditGigPage;









import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getGigDetails,
    getSkills,
    createSkill,
    updateGig,
} from "../api/projectApi";

import {
    AuthContext,
} from "../context/AuthContext";

import "./EditGigPage.css";


const EditGigPage = () => {


    const { id } = useParams();

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);



    const [skills, setSkills] =
        useState([]);


    const [selectedSkills, setSelectedSkills] =
        useState([]);


    const [skillSearch, setSkillSearch] =
        useState("");


    const [newSkill, setNewSkill] =
        useState("");


    const [categoryName, setCategoryName] =
        useState("");


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");



    const [formData, setFormData] =
        useState({

            title:"",
            description:"",
            skill_ids:[],
            experience_level:"BEGINNER",
            price:"",
            delivery_time:"",
            revisions:"",

        });



    useEffect(() => {

        fetchData();

    }, []);



    const fetchData = async () => {

        try {


            const gigResponse =
                await getGigDetails(id);


            const skillsResponse =
                await getSkills();



            const gig =
                gigResponse.data;



            setSkills(
                skillsResponse.data
            );


            setCategoryName(
                gig.job_category.name
            );



            setSelectedSkills(
                gig.skills
            );



            setFormData({

                title:gig.title,

                description:gig.description,

                skill_ids:
                    gig.skills.map(
                        skill => skill.id
                    ),

                experience_level:
                    gig.experience_level,

                price:
                    gig.price,

                delivery_time:
                    gig.delivery_time,

                revisions:
                    gig.revisions,

            });


        }

        catch(error){

            console.error(error);

        }


        setLoading(false);

    };



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };



    const addSkill = (skill) => {


        if(
            formData.skill_ids.includes(skill.id)
        )
            return;



        setSelectedSkills([

            ...selectedSkills,

            skill

        ]);



        setFormData({

            ...formData,

            skill_ids:[

                ...formData.skill_ids,

                skill.id

            ]

        });


    };



    const removeSkill = (id) => {


        setSelectedSkills(

            selectedSkills.filter(

                skill =>
                    skill.id !== id

            )

        );



        setFormData({

            ...formData,

            skill_ids:

                formData.skill_ids.filter(

                    skillId =>
                        skillId !== id

                )

        });


    };
    const handleCreateSkill = async () => {

        if (!newSkill.trim())
            return;


        try {


            await createSkill(

                {
                    name:newSkill
                },

                token

            );


            const response =
                await getSkills();


            setSkills(
                response.data
            );


            setNewSkill("");


        }

        catch(error){

            console.error(error);

        }

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            await updateGig(

                id,

                formData,

                token

            );


            navigate(
                "/my-gigs"
            );


        }

        catch(error){

            setError(
                "Failed to update gig"
            );

        }

    };



    const filteredSkills =
        skills.filter(skill =>

            skill.name
            .toLowerCase()
            .includes(
                skillSearch.toLowerCase()
            )

        );



    if(loading){

        return (

            <div className="edit-gig-loading">

                Loading gig details...

            </div>

        );

    }



    return (

        <div className="edit-gig-page">


            <div className="edit-gig-container">


                <div className="edit-gig-header">

                    <h1>
                        Edit Gig
                    </h1>

                    <p>
                        Update your service details and keep your gig information accurate.
                    </p>

                </div>



                {
                    error && (

                        <div className="edit-gig-error">

                            {error}

                        </div>

                    )
                }




                <form
                    className="edit-gig-form"
                    onSubmit={handleSubmit}
                >



                    <section className="form-section">


                        <h3>
                            Basic Information
                        </h3>



                        <label>
                            Gig Title
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

                            className="form-input"

                        />




                        <label>
                            Description
                        </label>


                        <textarea

                            name="description"

                            value={
                                formData.description
                            }

                            onChange={
                                handleChange
                            }

                            className="form-input textarea"

                            rows="6"

                        />



                    </section>




                    <section className="form-section">


                        <h3>
                            Category & Skills
                        </h3>



                        <label>
                            Job Category
                        </label>


                        <input

                            value={
                                categoryName
                            }

                            disabled

                            className="form-input disabled-input"

                        />



                        <label>
                            Skills
                        </label>



                        <div className="skill-box">


                            <div className="selected-skills">


                                {
                                    selectedSkills.map(skill => (

                                        <div

                                            key={skill.id}

                                            className="skill-tag"

                                        >

                                            {skill.name}


                                            <button

                                                type="button"

                                                onClick={() =>
                                                    removeSkill(skill.id)
                                                }

                                            >

                                                ×

                                            </button>


                                        </div>

                                    ))
                                }


                            </div>



                            <input

                                type="text"

                                value={
                                    skillSearch
                                }

                                onChange={(e)=>
                                    setSkillSearch(
                                        e.target.value
                                    )
                                }

                                placeholder="Search skills..."

                                className="skill-search"

                            />



                            {
                                skillSearch && (

                                    <div className="skill-dropdown">


                                        {
                                            filteredSkills.map(skill => (

                                                <button

                                                    type="button"

                                                    key={skill.id}

                                                    onClick={() =>
                                                        addSkill(skill)
                                                    }

                                                >

                                                    {skill.name}

                                                </button>


                                            ))
                                        }


                                    </div>

                                )
                            }


                        </div>





                        <div className="create-skill-box">


                            <input

                                type="text"

                                value={
                                    newSkill
                                }

                                onChange={(e)=>
                                    setNewSkill(
                                        e.target.value
                                    )
                                }

                                placeholder="Create new skill"

                                className="form-input"

                            />


                            <button

                                type="button"

                                onClick={
                                    handleCreateSkill
                                }

                                className="secondary-action"

                            >

                                Add Skill

                            </button>


                        </div>



                    </section>





                    <section className="form-section">


                        <h3>
                            Pricing Details
                        </h3>



                        <div className="form-grid">


                            <div>

                                <label>
                                    Experience Level
                                </label>


                                <select

                                    name="experience_level"

                                    value={
                                        formData.experience_level
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="form-input"

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




                            <div>

                                <label>
                                    Price
                                </label>


                                <input

                                    type="number"

                                    name="price"

                                    value={
                                        formData.price
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="form-input"

                                />

                            </div>



                            <div>

                                <label>
                                    Delivery Time (Days)
                                </label>


                                <input

                                    type="number"

                                    name="delivery_time"

                                    value={
                                        formData.delivery_time
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="form-input"

                                />

                            </div>




                            <div>

                                <label>
                                    Revisions
                                </label>


                                <input

                                    type="number"

                                    name="revisions"

                                    value={
                                        formData.revisions
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="form-input"

                                />

                            </div>



                        </div>



                    </section>




                    <div className="form-actions">


                        <button

                            type="button"

                            className="cancel-button"

                            onClick={() =>
                                navigate("/my-gigs")
                            }

                        >

                            Cancel

                        </button>




                        <button

                            className="save-button"

                        >

                            Save Changes

                        </button>


                    </div>



                </form>



            </div>


        </div>

    );

};


export default EditGigPage;