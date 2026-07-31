// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getCategories } from "../api/projectApi";

// import { getProjects } from "../api/projectApi";

// const ExploreProjectsPage = () => {

//     const [projects, setProjects] = useState([]);

//     const [search, setSearch] = useState("");

//     const [category, setCategory] = useState("");

//     const [budget, setBudget] = useState("");

//     const [categories, setCategories] = useState([]);

//     const fetchCategories = async () => {
//         try {
//             const response = await getCategories();
//             setCategories(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     useEffect(() => {
//         fetchProjects();
//     }, [search, category, budget]);

//     const fetchProjects = async () => {

//         try {

//             const response = await getProjects({
//                 search,
//                 category,
//                 budget,
//             });

//             setProjects(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     return (

//         <div className="container mt-4">

//             <h2>Explore Projects</h2>

//             <hr />
//             <div className="row mb-4">

//                 <div className="col-md-4">

//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search projects..."
//                         value={search}
//                         onChange={(e) =>
//                             setSearch(e.target.value)
//                         }
//                     />

//                 </div>

//                 <div className="col-md-4">

//                     <select
//                         className="form-control"
//                         value={category}
//                         onChange={(e) =>
//                             setCategory(e.target.value)
//                         }
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

//                 <div className="col-md-4">

//                     <select
//                         className="form-control"
//                         value={budget}
//                         onChange={(e) =>
//                             setBudget(e.target.value)
//                         }
//                     >

//                         <option value="">
//                             All Budgets
//                         </option>

//                         <option value="1">
//                             ₹0 - ₹1,000
//                         </option>

//                         <option value="2">
//                             ₹1,001 - ₹5,000
//                         </option>

//                         <option value="3">
//                             ₹5,001 - ₹10,000
//                         </option>

//                         <option value="4">
//                             ₹10,000+
//                         </option>

//                     </select>

//                 </div>

//             </div>

//             {projects.length === 0 ? (

//                 <div className="alert alert-info">

//                     No projects available.

//                 </div>

//             ) : (

//                 <div className="row">

//                     {projects.map(project => (

//                         <div
//                             key={project.id}
//                             className="col-md-6 col-lg-4 mb-4"
//                         >

//                             <div className="card h-100">

//                                 <div className="card-body">

//                                     <h5 className="card-title">
//                                         {project.title}
//                                     </h5>

//                                     <p>
//                                         <strong>Total Budget:</strong>
//                                         ₹{project.total_budget}
//                                     </p>


//                                     <p>
//                                         <strong>Status:</strong>{" "}
//                                         {project.status}
//                                     </p>

//                                     <Link
//                                         to={`/projects/${project.id}`}
//                                         className="btn btn-primary"
//                                     >
//                                         View Details
//                                     </Link>

//                                 </div>

//                             </div>

//                         </div>

//                     ))}

//                 </div>

//             )}

//         </div>
//     );
// };

// export default ExploreProjectsPage;








import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import {
    getCategories,
    getProjects,
} from "../api/projectApi";

import "./ExploreProjectsPage.css";

import {
    Search,
    Filter,
} from "lucide-react";



const ExploreProjectsPage = () => {

    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [budget, setBudget] = useState("");

    useEffect(() => {

        fetchCategories();

    }, []);

    useEffect(() => {

        fetchProjects();

    }, [search, category, budget]);

    const fetchCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    
    const fetchProjects = async () => {

        try {

            setLoading(true);

            const response = await getProjects({

                search,
                category,
                budget,

            });

            setProjects(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const categoryOptions = useMemo(() => {

        return [

            {

                value: "",
                label: "All Categories",

            },

            ...categories.map(category => ({

                value: category.id,
                label: category.name,

            })),

        ];

    }, [categories]);

    const selectStyles = {

        control: (base, state) => ({

            ...base,

            minHeight:48,

            borderRadius:12,

            borderColor:state.isFocused
                ? "#4f46e5"
                : "#e5e7eb",

            boxShadow:state.isFocused
                ? "0 0 0 4px rgba(79,70,229,.12)"
                : "none",

            "&:hover":{

                borderColor:"#4f46e5",

            },

        }),

        menu:(base)=>({

            ...base,

            borderRadius:12,

            overflow:"hidden",

            zIndex:20,

        }),

    };

    const budgetOptions = [
    {
        value: "",
        label: "All Budgets",
    },
    {
        value: "1",
        label: "₹0 - ₹1,000",
    },
    {
        value: "2",
        label: "₹1,001 - ₹5,000",
    },
    {
        value: "3",
        label: "₹5,001 - ₹10,000",
    },
    {
        value: "4",
        label: "₹10,000+",
    },
    ];

    const selectedCategory = categoryOptions.find(

        option => String(option.value) === String(category)

    );

    const clearFilters = () => {

        setSearch("");
        setCategory("");
        setBudget("");

    };

    return (

        <div className="explore-projects-page fade-up">

            <div className="explore-header">

                <div>

                    <h1>

                        Explore Projects

                    </h1>

                    <p>

                        Find projects posted by clients and apply
                        using your professional gigs.

                    </p>

                </div>

                <div className="project-count-card">

                    <small>

                        Open Projects

                    </small>

                    <h2>

                        {projects.length}

                    </h2>

                </div>

            </div>

                <div className="filter-card">

                    <div className="filter-title">

                        <Filter size={18}/>

                        Search & Filters

                    </div>

                    <div className="filter-grid">

                    <div className="filter-field">

                        <Search
                            size={18}
                            className="filter-icon"
                        />

                        <input

                            type="text"

                            placeholder="Search by title, description or category..."

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                        />

                    </div>
                    <div>


                        <Select

                            options={categoryOptions}

                            value={selectedCategory}

                            onChange={(selected) =>
                                setCategory(selected?.value || "")
                            }

                            isSearchable

                            classNamePrefix="guild-select"

                        />

                    </div>

                    <div>


                        <Select
                            styles={selectStyles}
                            options={budgetOptions}
                            value={budgetOptions.find((option) => option.value === budget)}
                            onChange={(option) => setBudget(option?.value || "")}
                            isSearchable={false}
                            classNamePrefix="guild-select"
                            />

                    </div>

                    <div className="filter-button-wrapper">

                        <button

                            className="btn btn-outline-secondary"

                            onClick={clearFilters}

                        >

                            Clear Filters

                        </button>

                    </div>

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

                    <div className="empty-projects">

                        <div className="empty-icon">

                            📂

                        </div>

                        <h3>

                            No projects found

                        </h3>

                        <p>

                            Try changing your search or filters.

                        </p>

                    </div>

                )

                :

                (

                    <div className="projects-grid">

                        {

                            projects.map(project => (

                                <div

                                    key={project.id}

                                    className="project-card"

                                >

                                    <div className="project-card-top">

                                        <h3>

                                            {project.title}

                                        </h3>

                                        <span className="status-badge">

                                            OPEN

                                        </span>

                                    </div>

                                    <p className="project-description">

                                        {

                                            project.description.length > 100

                                            ?

                                            project.description.substring(0, 95) + "..."

                                            :

                                            project.description

                                        }

                                    </p>

                                    <div className="role-section">

                                        <h5>

                                            Required Roles

                                        </h5>

                                        {

                                            project.role_requirements.map(role => (

                                                <div

                                                    key={role.id}

                                                    className="role-item"

                                                >

                                                    <div>

                                                        <strong>

                                                            {

                                                                role.job_category.name

                                                            }

                                                        </strong>

                                                        <small>

                                                            {

                                                                role.required_count

                                                            }

                                                            {" "}Needed

                                                        </small>

                                                    </div>

                                                    <span>

                                                        ₹

                                                        {

                                                            role.allocated_budget

                                                        }

                                                    </span>

                                                </div>

                                            ))

                                        }

                                    </div>

                                    <div className="project-footer">

                                        <div>

                                            <small>

                                                Total Budget

                                            </small>

                                            <h4>

                                                ₹

                                                {

                                                    project.total_budget

                                                }

                                            </h4>

                                        </div>

                                        <div>

                                            <small>

                                                Deadline

                                            </small>

                                            <h6>
                                                {new Date(project.deadline).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </h6>

                                        </div>

                                    </div>

                                    <Link

                                        to={`/projects/${project.id}`}

                                        className="view-project-btn"

                                    >

                                        View Details →

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

export default ExploreProjectsPage;