// import { useEffect, useState } from "react";

// import {
//     getAllGigs,
//     getCategories,
//     getSkills,
// } from "../api/projectApi";

// import { Link } from "react-router-dom";

// const ExploreGigsPage = () => {

//     const [gigs, setGigs] = useState([]);

//     const [categories, setCategories] = useState([]);

//     const [skills, setSkills] = useState([]);

//     const [filters, setFilters] = useState({
//         search: "",
//         category: "",
//         skill: "",
//         experience: "",
//     });

//     useEffect(() => {
//         fetchFiltersData();
//     }, []);

//     useEffect(() => {
//         fetchGigs();
//     }, [filters]);

//     const fetchFiltersData = async () => {

//         try {

//             const categoriesRes =
//                 await getCategories();

//             const skillsRes =
//                 await getSkills();

//             setCategories(categoriesRes.data);

//             setSkills(skillsRes.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const fetchGigs = async () => {

//         try {

//             const response =
//                 await getAllGigs(filters);

//             setGigs(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const handleChange = (e) => {

//         setFilters({
//             ...filters,
//             [e.target.name]: e.target.value,
//         });
//     };

//     return (

//         <div className="container mt-4">

//             <h2 className="mb-4">
//                 Explore Gigs
//             </h2>

//             <div className="row mb-4">

//                 <div className="col-md-3">

//                     <input
//                         type="text"
//                         name="search"
//                         placeholder="Search gigs..."
//                         className="form-control"
//                         onChange={handleChange}
//                     />

//                 </div>

//                 <div className="col-md-3">

//                     <select
//                         name="category"
//                         className="form-control"
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             All Categories
//                         </option>

//                         {categories.map(category => (

//                             <option
//                                 key={category.id}
//                                 value={category.id}
//                             >
//                                 {category.name}
//                             </option>

//                         ))}

//                     </select>

//                 </div>

//                 <div className="col-md-3">

//                     <select
//                         name="skill"
//                         className="form-control"
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             All Skills
//                         </option>

//                         {skills.map(skill => (

//                             <option
//                                 key={skill.id}
//                                 value={skill.id}
//                             >
//                                 {skill.name}
//                             </option>

//                         ))}

//                     </select>

//                 </div>

//                 <div className="col-md-3">

//                     <select
//                         name="experience"
//                         className="form-control"
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             All Levels
//                         </option>

//                         <option value="BEGINNER">
//                             Beginner
//                         </option>

//                         <option value="INTERMEDIATE">
//                             Intermediate
//                         </option>

//                         <option value="EXPERT">
//                             Expert
//                         </option>

//                     </select>

//                 </div>

//             </div>

//             <div className="row">
                
//                 {gigs.length === 0 && (

//                     <div className="col-12">

//                         <div className="alert alert-info">

//                             No gigs found.

//                         </div>

//                     </div>

//                 )}

//                 {gigs.map(gig => (

//                     <div
//                         key={gig.id}
//                         className="col-md-4 mb-4"
//                     >

//                         <div className="card h-100">

//                             <div className="card-body">

//                                 <h5>
//                                     {gig.title}
//                                 </h5>

//                                 <p>
//                                     {gig.job_category.name}
//                                 </p>

//                                 <p>
//                                     ₹{gig.price}
//                                 </p>

//                                 <p>
//                                     {gig.experience_level}
//                                 </p>

//                                 <Link
//                                     to={`/gigs/${gig.id}`}
//                                     className="btn btn-primary"
//                                 >
//                                     View Gig
//                                 </Link>

//                             </div>

//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </div>
//     );
// };

// export default ExploreGigsPage;





import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import Select from "react-select";

import {
    Search,
    Briefcase,
    Star,
    IndianRupee,
    User,
    Filter,
} from "lucide-react";

import {
    getAllGigs,
    getCategories,
    getSkills,
} from "../api/projectApi";

import "./ExploreGigsPage.css";

const experienceOptions = [

    {
        value: "",
        label: "All Levels",
    },

    {
        value: "BEGINNER",
        label: "Beginner",
    },

    {
        value: "INTERMEDIATE",
        label: "Intermediate",
    },

    {
        value: "EXPERT",
        label: "Expert",
    },

];

const selectStyles = {

    control: (base, state) => ({

        ...base,

        minHeight: 48,

        borderRadius: 12,

        borderColor: state.isFocused
            ? "#4f46e5"
            : "#e5e7eb",

        boxShadow: state.isFocused
            ? "0 0 0 4px rgba(79,70,229,.12)"
            : "none",

        "&:hover": {

            borderColor: "#4f46e5",

        },

    }),

    menu: (base) => ({

        ...base,

        borderRadius: 12,

        overflow: "hidden",

        zIndex: 20,

    }),

};

const ExploreGigsPage = () => {

    const [gigs, setGigs] = useState([]);

    const [categories, setCategories] = useState([]);

    const [skills, setSkills] = useState([]);

    const [filters, setFilters] = useState({

        search: "",

        category: "",

        skill: "",

        experience: "",

    });

    useEffect(() => {

        fetchFiltersData();

    }, []);

    useEffect(() => {

        fetchGigs();

    }, [filters]);

    const fetchFiltersData = async () => {

        try {

            const categoryResponse =
                await getCategories();

            const skillResponse =
                await getSkills();

            setCategories(
                categoryResponse.data
            );

            setSkills(
                skillResponse.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const fetchGigs = async () => {

        try {

            const response =
                await getAllGigs(filters);

            setGigs(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const categoryOptions = [

        {

            value: "",

            label: "All Categories",

        },

        ...categories.map(category => ({

            value: category.id,

            label: category.name,

        })),

    ];

    const skillOptions = [

        {

            value: "",

            label: "All Skills",

        },

        ...skills.map(skill => ({

            value: skill.id,

            label: skill.name,

        })),

    ];

    return (

        <div className="explore-gigs-page">

            <div className="explore-gigs-header">

                <div>

                    <h1>

                        Explore Freelancers

                    </h1>

                    <p>

                        Find talented freelancers ready to join your project.

                    </p>

                </div>

            </div>

            <div className="gigs-filter-card">

                <div className="filter-title">

                    <Filter size={18} />

                    Search & Filters

                </div>

                <div className="gigs-filter-grid">

                    <div className="filter-field">

                        <Search
                            size={18}
                            className="filter-icon"
                        />

                        <input

                            type="text"

                            placeholder="Search gigs, skills or categories..."

                            value={filters.search}

                            onChange={(e) =>
                                setFilters({

                                    ...filters,

                                    search: e.target.value,

                                })
                            }

                        />

                    </div>

                    <Select

                        styles={selectStyles}

                        options={categoryOptions}

                        isSearchable

                        value={

                            categoryOptions.find(

                                option =>
                                    String(option.value) ===
                                    String(filters.category)

                            )

                        }

                        onChange={(option) =>
                            setFilters({

                                ...filters,

                                category: option.value,

                            })
                        }

                    />

                    <Select

                        styles={selectStyles}

                        options={skillOptions}

                        isSearchable

                        value={

                            skillOptions.find(

                                option =>
                                    String(option.value) ===
                                    String(filters.skill)

                            )

                        }

                        onChange={(option) =>
                            setFilters({

                                ...filters,

                                skill: option.value,

                            })
                        }

                    />

                    <Select

                        styles={selectStyles}

                        options={experienceOptions}

                        value={

                            experienceOptions.find(

                                option =>
                                    option.value ===
                                    filters.experience

                            )

                        }

                        onChange={(option) =>
                            setFilters({

                                ...filters,

                                experience:
                                    option.value,

                            })
                        }

                    />

                </div>

            </div>

            <div className="gigs-results-bar">

                <span>

                    {gigs.length}

                    {" "}

                    Freelancer

                    {gigs.length !== 1 && "s"}

                    {" "}

                    Available

                </span>

            </div>

            {

                gigs.length === 0 ?

                (

                    <div className="gigs-empty-state">

                        <Search size={54} />

                        <h3>

                            No Freelancers Found

                        </h3>

                        <p>

                            Try changing your search
                            keywords or filters.

                        </p>

                    </div>

                )

                :

                (

                    <div className="gigs-grid">
                        {

                            gigs.map(gig => {

                                const rating =
                                    gig.average_rating;

                                const reviewCount =
                                    gig.reviews
                                        ? gig.reviews.length
                                        : 0;

                                return (

                                    <div

                                        key={gig.id}

                                        className="gig-card"

                                    >

                                        <div className="gig-card-header">

                                            <div className="explore-gig-category">

                                                <Briefcase
                                                    size={16}
                                                />

                                                {

                                                    gig.job_category.name

                                                }

                                            </div>

                                            <div
                                                className={`experience-badge ${gig.experience_level.toLowerCase()}`}
                                            >

                                                {

                                                    gig.experience_level

                                                }

                                            </div>

                                        </div>

                                        <h3 className="gig-title">

                                            {gig.title}

                                        </h3>

                                        <div className="gig-freelancer">

                                            <User
                                                size={16}
                                            />

                                            {

                                                gig.freelancer.display_name

                                            }

                                        </div>

                                        <div className="gig-rating">

                                            {

                                                rating ?

                                                <>

                                                    <Star
                                                        size={17}
                                                        fill="currentColor"
                                                    />

                                                    <span>

                                                        {

                                                            rating

                                                        }

                                                    </span>

                                                    <small>

                                                        (

                                                        {

                                                            reviewCount

                                                        }

                                                        {" "}
                                                        Reviews)

                                                    </small>

                                                </>

                                                :

                                                <>

                                                    <Star
                                                        size={17}
                                                    />

                                                    <small>

                                                        No Reviews Yet

                                                    </small>

                                                </>

                                            }

                                        </div>

                                        <div className="gig-price">

                                            <IndianRupee
                                                size={18}
                                            />

                                            <span>

                                                {

                                                    gig.price

                                                }

                                            </span>

                                        </div>

                                        <div className="gig-skills">

                                            {

                                                gig.skills
                                                    .slice(0, 4)
                                                    .map(skill => (

                                                        <span
                                                            key={skill.id}
                                                            className="skill-pill"
                                                        >

                                                            {

                                                                skill.name

                                                            }

                                                        </span>

                                                    ))

                                            }

                                            {

                                                gig.skills.length > 4 && (

                                                    <span className="skill-pill more">

                                                        +

                                                        {

                                                            gig.skills.length - 4

                                                        }

                                                    </span>

                                                )

                                            }

                                        </div>

                                        <div className="gig-card-footer">

                                            <Link

                                                to={`/gigs/${gig.id}`}

                                                className="view-gig-btn"

                                            >

                                                View Gig →

                                            </Link>

                                        </div>

                                    </div>

                                );

                            })

                        }

                    </div>

                )

            }

        </div>

    );

};

export default ExploreGigsPage;