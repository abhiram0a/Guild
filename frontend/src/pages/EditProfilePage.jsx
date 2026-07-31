// import { useEffect, useState, useContext } from "react";

// import { useNavigate } from "react-router-dom";

// import api from "../api/axios";

// import { AuthContext } from "../context/AuthContext";


// const EditProfilePage = () => {

//     const { token, user, fetchProfile } = useContext(AuthContext);

//     const navigate = useNavigate();


//     const [formData, setFormData] = useState({
//         display_name: "",
//         bio: "",
//         profile_picture: null,

//         tagline: "",
//         experience_description: "",
//         years_of_experience: "",
//         availability_status: true,
//         portfolio_link: "",
//     });


//     const [loading, setLoading] = useState(true);


//     useEffect(() => {

//         loadProfile();

//     }, []);


//     const loadProfile = async () => {

//         try {

//             const res = await api.get(
//                 "accounts/profile/",
//                 {
//                     headers: {
//                         Authorization: `Token ${token}`
//                     }
//                 }
//             );


//             const data = res.data;


//             setFormData({
//                 display_name: data.display_name || "",
//                 bio: data.bio || "",

//                 tagline: data.freelancer_profile?.tagline || "",
//                 experience_description: data.freelancer_profile?.experience_description || "",
//                 years_of_experience: data.freelancer_profile?.years_of_experience || "",
//                 availability_status: data.freelancer_profile?.availability_status ?? true,
//                 portfolio_link: data.freelancer_profile?.portfolio_link || "",
//             });


//             setLoading(false);

//         } catch (err) {

//             console.error(err);

//         }

//     };

//     const handleChange = (e) => {

//         const { name, value, type, checked, files } = e.target;

//         setFormData({
//             ...formData,
//             [name]:
//                 type === "checkbox"
//                     ? checked
//                     : type === "file"
//                     ? files[0]
//                     : value
//         });

//     };


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         const data = new FormData();

//         Object.keys(formData).forEach((key) => {

//             if (
//                 formData[key] !== null &&
//                 formData[key] !== ""
//             ) {
//                 data.append(key, formData[key]);
//             }

//         });

//         try {

//             await api.put(
//                 "accounts/profile/",
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Token ${token}`,
//                         "Content-Type": "multipart/form-data",
//                     }
//                 }
//             );

//             await fetchProfile();

//             navigate("/profile");

//         } catch (err) {

//             console.error(err);

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

//             <h2>Edit Profile</h2>

//             <hr />


//             <form onSubmit={handleSubmit}>


//                 {/* BASIC USER FIELDS */}

//                 <div className="mb-3">

//                     <label className="form-label">
//                         Display Name
//                     </label>

//                     <input
//                         type="text"
//                         className="form-control"
//                         name="display_name"
//                         value={formData.display_name}
//                         onChange={handleChange}
//                     />

//                 </div>


//                 <div className="mb-3">

//                     <label className="form-label">
//                         Bio
//                     </label>

//                     <textarea
//                         className="form-control"
//                         name="bio"
//                         value={formData.bio}
//                         onChange={handleChange}
//                     />

//                 </div>

//                 <div className="mb-3">

//                     <label className="form-label">
//                         Profile Picture
//                     </label>

//                     <input
//                         type="file"
//                         className="form-control"
//                         name="profile_picture"
//                         accept="image/*"
//                         onChange={handleChange}
//                     />

//                 </div>


//                 {/* FREELANCER FIELDS */}

//                 {user?.is_freelancer && (

//                     <>

//                         <hr />

//                         <h4>Freelancer Details</h4>


//                         <div className="mb-3">

//                             <label className="form-label">
//                                 Tagline
//                             </label>

//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="tagline"
//                                 value={formData.tagline}
//                                 onChange={handleChange}
//                             />

//                         </div>


//                         <div className="mb-3">

//                             <label className="form-label">
//                                 Experience Description
//                             </label>

//                             <textarea
//                                 className="form-control"
//                                 name="experience_description"
//                                 value={formData.experience_description}
//                                 onChange={handleChange}
//                             />

//                         </div>


//                         <div className="mb-3">

//                             <label className="form-label">
//                                 Years of Experience
//                             </label>

//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 name="years_of_experience"
//                                 value={formData.years_of_experience}
//                                 onChange={handleChange}
//                             />

//                         </div>


//                         <div className="form-check mb-3">

//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="availability_status"
//                                 checked={formData.availability_status}
//                                 onChange={handleChange}
//                             />

//                             <label className="form-check-label">
//                                 Available for Work
//                             </label>

//                         </div>


//                         <div className="mb-3">

//                             <label className="form-label">
//                                 Portfolio Link
//                             </label>

//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="portfolio_link"
//                                 value={formData.portfolio_link}
//                                 onChange={handleChange}
//                             />

//                         </div>

//                     </>

//                 )}


//                 <button className="btn btn-primary">
//                     Save Changes
//                 </button>


//                 <button
//                     type="button"
//                     className="btn btn-secondary ms-2"
//                     onClick={() => navigate("/profile")}
//                 >
//                     Cancel
//                 </button>


//             </form>

//         </div>

//     );

// };


// export default EditProfilePage;












import {
    useEffect,
    useState,
    useContext,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import api from "../api/axios";

import {
    AuthContext,
} from "../context/AuthContext";

import "./EditProfilePage.css";

const EditProfilePage = () => {

    const {
        token,
        user,
        fetchProfile,
    } = useContext(AuthContext);

    const navigate =
        useNavigate();

    const [formData, setFormData] = useState({

        display_name: "",

        bio: "",

        profile_picture: null,

        tagline: "",

        experience_description: "",

        years_of_experience: "",

        availability_status: true,

        portfolio_link: "",

    });
        
    const [
        previewImage,
        setPreviewImage,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const res = await api.get(

                "accounts/profile/",

                {

                    headers: {

                        Authorization:
                            `Token ${token}`

                    }

                }

            );

            const data = res.data;

            setPreviewImage(
                data.profile_picture
                    ? `http://127.0.0.1:8000${data.profile_picture}`
                    : null
            );

            setFormData({

                display_name:
                    data.display_name || "",

                bio:
                    data.bio || "",

                tagline:
                    data.freelancer_profile?.tagline || "",

                experience_description:
                    data.freelancer_profile?.experience_description || "",

                years_of_experience:
                    data.freelancer_profile?.years_of_experience || "",

                availability_status:
                    data.freelancer_profile?.availability_status ?? true,

                portfolio_link:
                    data.freelancer_profile?.portfolio_link || "",

                profile_picture: null,

            });

            setLoading(false);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const {

            name,

            value,

            type,

            checked,

            files,

        } = e.target;

        if (type === "file") {

            const file = files[0];

            setFormData({

                ...formData,

                profile_picture: file,

            });

            if (file) {

                setPreviewImage(

                    URL.createObjectURL(file)

                );

            }

            return;

        }

        setFormData({

            ...formData,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {

            if (

                formData[key] !== null &&

                formData[key] !== ""

            ) {

                data.append(

                    key,

                    formData[key]

                );

            }

        });

        try {

            await api.put(

                "accounts/profile/",

                data,

                {

                    headers: {

                        Authorization:
                            `Token ${token}`,

                        "Content-Type":
                            "multipart/form-data",

                    },

                }

            );

            await fetchProfile();

            navigate("/profile");

        }

        catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="edit-profile-loading">

                Loading Profile...

            </div>

        );

    }

    return (

        <div className="edit-profile-page">

            <div className="edit-profile-container">

                <div className="edit-profile-header">

                    <div>

                        <h1>

                            Edit Profile

                        </h1>

                        <p>

                            Keep your Guild profile updated so clients and collaborators know more about you.

                        </p>

                    </div>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="edit-profile-form"
                >

                    <section className="settings-section">

                        <div className="section-heading">

                            <h3>

                                Profile Picture

                            </h3>

                            <p>

                                Upload a professional photo. Supported formats: JPG, PNG and WEBP.

                            </p>

                        </div>

                        <label
                            className="upload-card"
                        >

{

    previewImage ? (

        <img

            src={previewImage}

            alt="Profile Preview"

            className="profile-preview"

        />

    ) : (

        <div className="upload-icon">

            👤

        </div>

    )

}

                            <div>

                                <h5>

                                    Edit profile picture

                                </h5>

                                <span>

                                    Click to browse your device

                                </span>

                            </div>

                            <input

                                type="file"

                                accept="image/*"

                                name="profile_picture"

                                onChange={handleChange}

                            />

                        </label>

                    </section>

                    <section className="settings-section">

                        <div className="section-heading">

                            <h3>

                                Personal Information

                            </h3>

                            <p>

                                These details are visible on your public profile.

                            </p>

                        </div>

                        <div className="form-grid">

                            <div className="input-group-full">

                                <label>

                                    Display Name

                                </label>

                                <input

                                    type="text"

                                    name="display_name"

                                    className="form-control"

                                    value={formData.display_name}

                                    onChange={handleChange}

                                    placeholder="John Doe"

                                />

                            </div>

                            <div className="input-group-full">

                                <label>

                                    Bio

                                </label>

                                <textarea

                                    rows="5"

                                    name="bio"

                                    className="form-control"

                                    value={formData.bio}

                                    onChange={handleChange}

                                    placeholder="Tell others about yourself..."

                                />

                            </div>

                        </div>

                    </section>
                    {

                        user?.is_freelancer && (

                            <section className="settings-section">

                                <div className="section-heading">

                                    <h3>

                                        Professional Information

                                    </h3>

                                    <p>

                                        Help clients understand your expertise and availability.

                                    </p>

                                </div>

                                <div className="form-grid">

                                    <div className="input-group-full">

                                        <label>

                                            Professional Tagline

                                        </label>

                                        <input

                                            type="text"

                                            className="form-control"

                                            name="tagline"

                                            value={formData.tagline}

                                            onChange={handleChange}

                                            placeholder="Example: Professional Video Editor"

                                        />

                                        <small>

                                            A short headline displayed on your profile.

                                        </small>

                                    </div>

                                    <div className="input-group-full">

                                        <label>

                                            Experience

                                        </label>

                                        <textarea

                                            rows="6"

                                            className="form-control"

                                            name="experience_description"

                                            value={formData.experience_description}

                                            onChange={handleChange}

                                            placeholder="Describe your experience, achievements and previous work..."

                                        />

                                    </div>

                                    <div className="">

                                        <label>

                                            Years of Experience

                                        </label>

                                        <input

                                            type="number"

                                            className="form-control"

                                            name="years_of_experience"

                                            value={formData.years_of_experience}

                                            onChange={handleChange}

                                            placeholder="3"

                                        />

                                    </div>

                                    <div className="">

                                        <label>

                                            Portfolio Link

                                        </label>

                                        <input

                                            type="text"

                                            className="form-control"

                                            name="portfolio_link"

                                            value={formData.portfolio_link}

                                            onChange={handleChange}

                                            placeholder="https://..."

                                        />

                                    </div>

                                </div>

                                <div className="availability-card">

                                    <div>

                                        <h5>

                                            Available for Work

                                        </h5>

                                        <p>

                                            Clients can invite you to projects while this is enabled.

                                        </p>

                                    </div>

                                    <label className="switch">

                                        <input

                                            type="checkbox"

                                            name="availability_status"

                                            checked={formData.availability_status}

                                            onChange={handleChange}

                                        />

                                        <span className="slider"></span>

                                    </label>

                                </div>

                            </section>

                        )

                    }

                    <div className="profile-action-bar">

                        <button

                            type="button"

                            className="btn btn-light profile-cancel-btn"

                            onClick={() => navigate("/profile")}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="btn btn-primary profile-save-btn"

                        >

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditProfilePage;