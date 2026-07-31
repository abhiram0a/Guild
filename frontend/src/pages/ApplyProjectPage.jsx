// import {
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import {
//     useParams,
//     useNavigate
// } from "react-router-dom";

// import { AuthContext }
// from "../context/AuthContext";

// import {
//     getMatchingGigs,
//     applyToProject,
//     getAcceptedTeam,
//     submitTeamApplication,
//     getMyGigs,
// }
// from "../api/projectApi";



// const ApplyProjectPage = () => {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const { token } =
//         useContext(AuthContext);

//     const [gigs, setGigs] =
//         useState([]);

//     const [teamFormData, setTeamFormData] = useState({
//         selected_gig: "",
//         proposed_price: "",
//         cover_letter: "",
//     });


//     const [
//         acceptedTeam,
//         setAcceptedTeam,
//     ] = useState([]);

//     const [
//         myGigs,
//         setMyGigs,
//     ] = useState([]);

    
//     const isTeamAvailable = acceptedTeam.length > 0;

//     const [formData, setFormData] =
//         useState({
//             selected_gig: "",
//             proposed_price: "",
//             cover_letter: "",
//         });

//     const [error, setError] =
//         useState("");
        
//     const [formMode, setFormMode] = useState("individual");

// useEffect(() => {
//     fetchGigs();
//     fetchAcceptedTeam();
//     fetchMyGigs();
// }, []);


//     const fetchGigs = async () => {

//         try {

//             const response =
//                 await getMatchingGigs(
//                     id,
//                     token
//                 );
            
//             console.log("Gigs:", response.data);

//             setGigs(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     const fetchAcceptedTeam = async()=>{

//         try{
//             const response =
//                 await getAcceptedTeam(
//                     id,
//                     token
//                 );

//             setAcceptedTeam(
//                 response.data
//             );
//         }

//         catch(error){
//             console.error(error);
//         }
//     };


//     const fetchMyGigs = async()=>{

//         try{
//             const response =
//                 await getMyGigs(token);

//             setMyGigs(
//                 response.data
//             );
//         }

//         catch(error){
//             console.error(error);
//         }
//     };


//     const handleGigChange = (e) => {

//         const gigId =
//             Number(e.target.value);

//         const selectedGig =
//             gigs.find(
//                 gig =>
//                     gig.id === gigId
//             );

//         setFormData({
//             ...formData,
//             selected_gig: gigId,
//             proposed_price:
//                 selectedGig.price,
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };


//     const handleTeamChange = (e) => {
//         setTeamFormData({
//             ...teamFormData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleIndividualSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await applyToProject(id, formData, token);
//             navigate("/my-applications");
//         } catch (error) {
//             setError(
//                 error.response?.data?.error ||
//                 "Failed to apply"
//             );
//         }
//     };

//     const handleTeamSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await submitTeamApplication(
//                 id,
//                 teamFormData,
//                 token
//             );

//             navigate("/my-applications");

//         } catch (error) {
//             setError(
//                 error.response?.data?.error ||
//                 "Failed to submit team application"
//             );
//         }
//     };



//     return (
//         <div className="container mt-4">

//             <h2 className="mb-3">Apply To Project</h2>

//             {acceptedTeam.length > 0 && (
//                 <div className="btn-group mb-3">
//                     <button
//                         className={`btn btn-sm ${!isTeamAvailable || formMode === "individual" ? "btn-primary" : "btn-outline-primary"}`}
//                         onClick={() => setFormMode("individual")}
//                     >
//                         Apply as Individual
//                     </button>

//                     <button
//                         className={`btn btn-sm ${formMode === "team" ? "btn-success" : "btn-outline-success"}`}
//                         onClick={() => setFormMode("team")}
//                     >
//                         Apply as Team
//                     </button>
//                 </div>
//             )}
//             {error && (
//                 <div className="alert alert-danger">
//                     {error}
//                 </div>
//             )}

//             {formMode === "team" && (
//                 <>
                  
//                     <h4>Team Members</h4>

//                     {acceptedTeam.length === 0 ? (
//                         <div className="alert alert-warning">
//                             No teammates have accepted yet.
//                         </div>
//                     ) : (
//                         acceptedTeam.map(member => (
//                             <div key={member.id} className="card mb-3">
//                                 <div className="card-body">
//                                     <h5>{member.receiver.display_name}</h5>

//                                     <p>
//                                         <strong>Role</strong><br />
//                                         {member.role_requirement.job_category.name}
//                                     </p>

//                                     <p>
//                                         <strong>Gig</strong><br />
//                                         {member.selected_gig?.title || "Not selected yet"}
//                                     </p>

//                                     <p>
//                                         <strong>Price</strong><br />
//                                         ₹{member.proposed_price || "Not set"}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </>
//             )}

//             {formMode === "individual" && (
//                 <form onSubmit={handleIndividualSubmit}>

//                     <select
//                         className="form-control mb-3"
//                         value={formData.selected_gig}
//                         onChange={handleGigChange}
//                     >
//                         <option value="">Select Gig</option>

//                         {gigs.map(gig => (
//                             <option key={gig.id} value={gig.id}>
//                                 {gig.title}
//                             </option>
//                         ))}
//                     </select>

//                     <input
//                         type="number"
//                         name="proposed_price"
//                         value={formData.proposed_price}
//                         className="form-control mb-3"
//                         onChange={handleChange}
//                     />

//                     <textarea
//                         name="cover_letter"
//                         placeholder="Cover Letter"
//                         className="form-control mb-3"
//                         onChange={handleChange}
//                     />

//                     <button className="btn btn-primary">
//                         Apply as Individual
//                     </button>

//                 </form>
//             )}


//             {formMode === "team" && (
//                 <form onSubmit={handleTeamSubmit}>

//                     <select
//                         name="selected_gig"
//                         className="form-control mb-3"
//                         onChange={handleTeamChange}
//                     >
//                         <option value="">Select your Gig</option>

//                         {myGigs.map(gig => (
//                             <option key={gig.id} value={gig.id}>
//                                 {gig.title}
//                             </option>
//                         ))}
                        
//                     </select>

//                     <input
//                         type="number"
//                         name="proposed_price"
//                         className="form-control mb-3"
//                         placeholder="Team Price"
//                         onChange={handleTeamChange}
//                     />

//                     <textarea
//                         name="cover_letter"
//                         className="form-control mb-3"
//                         placeholder="Cover Letter"
//                         rows={5}
//                         onChange={handleTeamChange}
//                     />

//                     {acceptedTeam.length > 0 ? (
//                         <button className="btn btn-success">
//                             Apply as Team
//                         </button>
//                     ) : (
//                         <div className="alert alert-info">
//                             Waiting for teammates to accept.
//                         </div>
//                     )}

//                 </form>
//             )}

      
//         </div>
//     );
// };

// export default ApplyProjectPage;







import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useParams,
    useNavigate,
} from "react-router-dom";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getMatchingGigs,
    applyToProject,
    getAcceptedTeam,
    submitTeamApplication,
    getMyGigs,
} from "../api/projectApi";

import {
    FaUser,
    FaUsers,
    FaRupeeSign,
    FaBriefcase,
    FaArrowRight,
    FaCheckCircle,
} from "react-icons/fa";

import "./ApplyProjectPage.css";

const ApplyProjectPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { token } =
        useContext(AuthContext);

    const [
        gigs,
        setGigs,
    ] = useState([]);

    const [
        acceptedTeam,
        setAcceptedTeam,
    ] = useState([]);

    const [
        myGigs,
        setMyGigs,
    ] = useState([]);

    const [
        error,
        setError,
    ] = useState("");

    const [
        formMode,
        setFormMode,
    ] = useState("individual");

    const [
        formData,
        setFormData,
    ] = useState({

        selected_gig: "",

        proposed_price: "",

        cover_letter: "",

    });

    const [
        teamFormData,
        setTeamFormData,
    ] = useState({

        selected_gig: "",

        proposed_price: "",

        cover_letter: "",

    });

    const isTeamAvailable =
        acceptedTeam.length > 0;

    useEffect(() => {

        fetchGigs();

        fetchAcceptedTeam();

        fetchMyGigs();

    }, []);

    const fetchGigs = async () => {

        try {

            const response =
                await getMatchingGigs(
                    id,
                    token
                );

            setGigs(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const fetchAcceptedTeam = async () => {

        try {

            const response =
                await getAcceptedTeam(
                    id,
                    token
                );

            setAcceptedTeam(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const fetchMyGigs = async () => {

        try {

            const response =
                await getMyGigs(token);

            setMyGigs(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleGigChange = (e) => {

        const gigId =
            Number(e.target.value);

        const selectedGig =
            gigs.find(
                gig =>
                    gig.id === gigId
            );

        setFormData({

            ...formData,

            selected_gig: gigId,

            proposed_price:
                selectedGig?.price || "",

        });

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleTeamChange = (e) => {

        setTeamFormData({

            ...teamFormData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleIndividualSubmit = async (e) => {

        e.preventDefault();

        try {

            await applyToProject(

                id,

                formData,

                token

            );

            navigate(
                "/my-applications"
            );

        }

        catch (error) {

            setError(

                error.response?.data?.error ||

                "Failed to apply"

            );

        }

    };

    const handleTeamSubmit = async (e) => {

        e.preventDefault();

        try {

            await submitTeamApplication(

                id,

                teamFormData,

                token

            );

            navigate(
                "/my-applications"
            );

        }

        catch (error) {

            setError(

                error.response?.data?.error ||

                "Failed to submit team application"

            );

        }

    };

    return (

        <div className="apply-project-page">

            <div className="apply-wrapper">

                <div className="apply-header">

                    <div>

                        <span className="apply-tag">

                            Project Application

                        </span>

                        <h1>

                            Apply to Project

                        </h1>

                        <p>

                            Submit your proposal and introduce why you're the right freelancer for this project.

                        </p>

                    </div>

                </div>

                {
                    isTeamAvailable && (

                        <div className="application-mode-switch">

                            <button

                                className={
                                    formMode === "individual"

                                        ? "mode-btn active"

                                        : "mode-btn"
                                }

                                onClick={() =>
                                    setFormMode("individual")
                                }

                            >

                                <FaUser />

                                Individual

                            </button>

                            <button

                                className={
                                    formMode === "team"

                                        ? "mode-btn active"

                                        : "mode-btn"
                                }

                                onClick={() =>
                                    setFormMode("team")
                                }

                            >

                                <FaUsers />

                                Team

                            </button>

                        </div>

                    )
                }

                {
                    error && (

                        <div className="apply-error">

                            {error}

                        </div>

                    )
                }

                {
                    formMode === "team" && (

                        <div className="team-preview-card">

                            <div className="section-heading">

                                <h3>

                                    <FaUsers />

                                    Team Members

                                </h3>

                                <span>

                                    {acceptedTeam.length} member(s)

                                </span>

                            </div>

                            {
                                acceptedTeam.length === 0 ? (

                                    <div className="team-empty">

                                        Waiting for teammates to accept your collaboration invite.

                                    </div>

                                )

                                : (

                                    <div className="team-grid">

                                        {acceptedTeam.map(member => (

                                            <div

                                                key={member.id}

                                                className="team-member-card"

                                            >

                                                <div className="member-avatar">

                                                    {

                                                        member.receiver.display_name
                                                            ?.charAt(0)
                                                            .toUpperCase()

                                                    }

                                                </div>

                                                <div className="member-content">

                                                    <h4>

                                                        {

                                                            member.receiver.display_name

                                                        }

                                                    </h4>

                                                    <p>

                                                        {

                                                            member.role_requirement.job_category.name

                                                        }

                                                    </p>

                                                    <div className="member-meta">

                                                        <span>

                                                            <FaBriefcase />

                                                            {

                                                                member.selected_gig?.title ||

                                                                "Gig not selected"

                                                            }

                                                        </span>

                                                        <span>

                                                            <FaRupeeSign />

                                                            {

                                                                member.proposed_price ||

                                                                "-"

                                                            }

                                                        </span>

                                                    </div>

                                                </div>

                                                <FaCheckCircle className="accepted-icon" />

                                            </div>

                                        ))}

                                    </div>

                                )

                            }

                        </div>

                    )

                }
                        {/* </div>

                    </div>

                )} */}

                <div className="apply-form-card">

                    <div className="apply-form-header">

                        <div>

                            <h3>

                                {

                                    formMode === "individual"

                                        ? "Individual Application"

                                        : "Team Application"

                                }

                            </h3>

                            <p>

                                {

                                    formMode === "individual"

                                        ? "Submit your proposal using one of your matching gigs."

                                        : "Submit one proposal for your whole team."

                                }

                            </p>

                        </div>

                    </div>

                    {

                        formMode === "individual" ? (

                            <form
                                onSubmit={handleIndividualSubmit}
                                className="apply-form"
                            >

                                <div className="form-group">

                                    <label>

                                        Select Matching Gig

                                    </label>

                                    <select
                                        className="form-select"
                                        value={formData.selected_gig}
                                        onChange={handleGigChange}
                                        required
                                    >

                                        <option value="">

                                            Choose your gig

                                        </option>

                                        {

                                            gigs.map(gig => (

                                                <option
                                                    key={gig.id}
                                                    value={gig.id}
                                                >

                                                    {gig.title}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                <div className="form-group">

                                    <label>

                                        Proposed Price (₹)

                                    </label>

                                    <input
                                        type="number"
                                        name="proposed_price"
                                        className="form-control"
                                        value={formData.proposed_price}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>

                                        Cover Letter

                                    </label>

                                    <textarea
                                        rows={7}
                                        name="cover_letter"
                                        className="form-control"
                                        placeholder="Introduce yourself, explain why you're a good fit for this project and mention anything the client should know..."
                                        value={formData.cover_letter}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="apply-submit">

                                    <button
                                        className="apply-submit-btn"
                                    >
                                        Submit Application
                                    </button>

                                </div>

                            </form>

                        ) : (

                            <form
                                onSubmit={handleTeamSubmit}
                                className="apply-form"
                            >

                                <div className="form-group">

                                    <label>

                                        Select Your Gig

                                    </label>

                                    <select
                                        name="selected_gig"
                                        className="form-select"
                                        value={teamFormData.selected_gig}
                                        onChange={handleTeamChange}
                                        required
                                    >

                                        <option value="">

                                            Choose your gig

                                        </option>

                                        {

                                            myGigs.map(gig => (

                                                <option
                                                    key={gig.id}
                                                    value={gig.id}
                                                >

                                                    {gig.title}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                <div className="form-group">

                                    <label>

                                        Total Team Price (₹)

                                    </label>

                                    <input
                                        type="number"
                                        name="proposed_price"
                                        className="form-control"
                                        value={teamFormData.proposed_price}
                                        onChange={handleTeamChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>

                                        Team Cover Letter

                                    </label>

                                    <textarea
                                        rows={7}
                                        name="cover_letter"
                                        className="form-control"
                                        placeholder="Explain how your team will complete this project, your workflow and why your collaboration is the best choice."
                                        value={teamFormData.cover_letter}
                                        onChange={handleTeamChange}
                                        required
                                    />

                                </div>

                                <div className="apply-submit">

                                    {

                                        acceptedTeam.length > 0 ? (

                                            <button
                                                className="apply-submit-btn team-submit"
                                            >
                                                Submit Team Application
                                            </button>

                                        ) : (

                                            <div className="alert alert-info mb-0">

                                                Waiting for teammates to accept your collaboration invite.

                                            </div>

                                        )

                                    }

                                </div>

                            </form>

                        )

                    }

                </div>

            </div>

        </div>

    );

};

export default ApplyProjectPage;
