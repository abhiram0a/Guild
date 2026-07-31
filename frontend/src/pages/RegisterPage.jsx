// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const RegisterPage = () => {

//     const { register } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         display_name: "",
//     });

//     const [message, setMessage] = useState("");

//     const [error, setError] = useState("");


//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         const result = await register(formData);

//         if (result.success) {

//             setMessage("Registration successful");
//             setError("");
//             navigate("/login");

//         } else {

//             setError("Registration failed");
//         }
//     };


//     return (

//         <div className="container mt-5">

//             <h2>Register</h2>

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
//                     name="username"
//                     placeholder="Username"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="text"
//                     name="display_name"
//                     placeholder="Display Name"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <button className="btn btn-success">
//                     Register
//                 </button>

//             </form>

//         </div>
//     );
// };


// export default RegisterPage;





import {
    useContext,
    useState,
} from "react";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import "./RegisterPage.css";


const RegisterPage = () => {


    const {
        register,
    } = useContext(AuthContext);


    const navigate =
        useNavigate();


    const [
        formData,
        setFormData,
    ] = useState({

        username:"",
        email:"",
        password:"",
        display_name:"",

    });


    const [
        message,
        setMessage,
    ] = useState("");


    const [
        error,
        setError,
    ] = useState("");



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        const result =
            await register(formData);



        if(result.success){

            setMessage(
                "Account created successfully"
            );

            setError("");

            navigate("/login");

        }

        else{

            setError(
                "Registration failed. Please check your details."
            );

        }

    };



    return (

        <div className="auth-page">


            <div className="auth-brand">


                <div className="auth-brand-content">


                    <div className="brand-logo">

                        Guild

                    </div>


                    <h1>

                        Build your freelance
                        journey with confidence.

                    </h1>


                    <p>

                        Connect with clients,
                        discover projects,
                        collaborate with talented
                        professionals and grow your
                        career.

                    </p>


                    <div className="auth-features">


                        <div>

                            ✓ Find quality projects

                        </div>


                        <div>

                            ✓ Work with skilled teams

                        </div>


                        <div>

                            ✓ Manage everything in one place

                        </div>


                    </div>


                </div>


            </div>



            <div className="auth-form-area">


                <div className="register-box">


                    <div className="register-header">


                        <h2>

                            Create Account

                        </h2>


                        <p>

                            Join Guild and start building your profile.

                        </p>


                    </div>



                    {
                        message && (

                            <div className="auth-alert success">

                                {message}

                            </div>

                        )
                    }



                    {
                        error && (

                            <div className="auth-alert error">

                                {error}

                            </div>

                        )
                    }



                    <form
                        onSubmit={handleSubmit}
                    >


                        <div className="form-group">

                            <label>

                                Username

                            </label>


                            <input

                                type="text"

                                name="username"

                                value={formData.username}

                                placeholder="Enter username"

                                onChange={handleChange}

                                required

                            />

                        </div>



                        <div className="form-group">

                            <label>

                                Display Name

                            </label>


                            <input

                                type="text"

                                name="display_name"

                                value={formData.display_name}

                                placeholder="Your public name"

                                onChange={handleChange}

                                required

                            />

                        </div>




                        <div className="form-group">

                            <label>

                                Email

                            </label>


                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                placeholder="example@email.com"

                                onChange={handleChange}

                                required

                            />

                        </div>




                        <div className="form-group">

                            <label>

                                Password

                            </label>


                            <input

                                type="password"

                                name="password"

                                value={formData.password}

                                placeholder="Create password"

                                onChange={handleChange}

                                required

                            />

                        </div>




                        <button
                            className="register-btn"
                        >

                            Create Account

                        </button>



                    </form>



                    <div className="auth-footer">


                        Already have an account?


                        <Link
                            to="/login"
                        >

                            Login

                        </Link>


                    </div>


                </div>


            </div>



        </div>

    );

};


export default RegisterPage;
