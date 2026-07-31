// import { useState, useContext } from "react";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";


// const BecomeFreelancerPage = () => {

//     const { token, fetchProfile } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [message, setMessage] = useState("");

//     const [error, setError] = useState("");

//     const [formData, setFormData] = useState({
//         tagline: "",
//         experience_description: "",
//         years_of_experience: 0,
//         availability_status: true,
//         portfolio_link: "",
//     });


//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             await api.post(
//                 "accounts/become-freelancer/",
//                 formData,
//                 {   
//                     headers: {
//                         Authorization: `Token ${token}`
//                     }
//                 }
//             );
//             await fetchProfile();

//             setMessage(
//                 "You are now a freelancer!"
//             );
//             navigate("/profile");

//             setError("");

//         } catch (error) {

//             setError(
//                 error.response?.data?.error ||
//                 "Something went wrong"
//             );
//         }
//     };


//     return (

//         <div className="container mt-5">

//             <h2>Become Freelancer</h2>

//             {message && (
//                 <div className="alert alert-success">
//                     {message}
//                 </div>
//             )}

//             {error && (
//                 <div className="alert alert-danger">
//                     {error}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit}>

//                 <input
//                     type="text"
//                     name="tagline"
//                     placeholder="Tagline"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <textarea
//                     name="experience_description"
//                     placeholder="Experience Description"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="number"
//                     name="years_of_experience"
//                     placeholder="Years of Experience"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="text"
//                     name="portfolio_link"
//                     placeholder="Portfolio Link"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <button className="btn btn-primary">
//                     Become Freelancer
//                 </button>

//             </form>

//         </div>
//     );
// };


// export default BecomeFreelancerPage;







import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import "./BecomeFreelancerPage.css";

const BecomeFreelancerPage = () => {

    const { token, fetchProfile } =
        useContext(AuthContext);

    const navigate = useNavigate();

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [formData, setFormData] =
        useState({
            tagline: "",
            experience_description: "",
            years_of_experience: 0,
            // availability_status: true,
            portfolio_link: "",
        });

    const handleChange = (e) => {

        const value =
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(

                "accounts/become-freelancer/",

                {
                    ...formData,
                    availability_status: true,
                },

                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }

            );

            await fetchProfile();

            setMessage(
                "Welcome to Guild Freelancers!"
            );

            setError("");

            navigate("/profile");

        }

        catch (error) {

            setError(

                error.response?.data?.error ||

                "Something went wrong."

            );

        }

    };

    return (

        <div className="freelancer-page">

            <div className="freelancer-bg-circle circle-one"></div>

            <div className="freelancer-bg-circle circle-two"></div>

            <div className="freelancer-wrapper">

                <div className="freelancer-intro">

                    <div className="intro-badge">

                        🚀 Start Your Journey

                    </div>

                    <h1>

                        Become a
                        <span>

                            {" "}
                            Guild Freelancer

                        </span>

                    </h1>

                    <p>

                        Turn your professional skills into income.

                        Create gigs, receive project applications,

                        collaborate with teams, and build your

                        reputation inside Guild.

                    </p>

                    <div className="benefit-list">

                        <div className="benefit-item">

                            <div className="benefit-icon">

                                💼

                            </div>

                            <div>

                                <h5>

                                    Create Professional Gigs

                                </h5>

                                <p>

                                    Showcase your services with pricing,

                                    categories and descriptions.

                                </p>

                            </div>

                        </div>

                        <div className="benefit-item">

                            <div className="benefit-icon">

                                🤝

                            </div>

                            <div>

                                <h5>

                                    Work Together

                                </h5>

                                <p>

                                    Invite friends, build teams and

                                    collaborate on large projects.

                                </p>

                            </div>

                        </div>

                        <div className="benefit-item">

                            <div className="benefit-icon">

                                ⭐

                            </div>

                            <div>

                                <h5>

                                    Build Reputation

                                </h5>

                                <p>

                                    Receive reviews, increase ratings

                                    and grow your freelancing career.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="freelancer-form-panel">

                    <div className="form-top">

                        <h2>

                            Freelancer Profile

                        </h2>

                        <p>

                            Tell clients about yourself.

                        </p>

                    </div>

                    {

                        message && (

                            <div className="alert alert-success">

                                {message}

                            </div>

                        )

                    }

                    {

                        error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )

                    }

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>

                                Professional Tagline

                            </label>

                            <input

                                type="text"

                                name="tagline"

                                className="form-control"

                                placeholder="Example: Creative Video Editor"

                                value={formData.tagline}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Experience

                            </label>

                            <textarea

                                name="experience_description"

                                rows="5"

                                className="form-control"

                                placeholder="Tell clients about your experience..."

                                value={formData.experience_description}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>

                                    Years of Experience

                                </label>

                                <input

                                    type="number"

                                    min="0"

                                    name="years_of_experience"

                                    className="form-control"

                                    value={formData.years_of_experience}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="form-group">

                                <label>

                                    Portfolio URL

                                </label>

                                <input

                                    type="text"

                                    name="portfolio_link"

                                    className="form-control"

                                    placeholder="https://"

                                    value={formData.portfolio_link}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                       
                        <button
                            type="submit"
                            className="freelancer-submit-btn"
                        >

                            Become a Freelancer

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default BecomeFreelancerPage;