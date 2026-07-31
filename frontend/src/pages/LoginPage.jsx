// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";


// const LoginPage = () => {

//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });

//     const [error, setError] = useState("");


//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         const result = await login(
//             formData.username,
//             formData.password
//         );

//         if (result.success) {
//             navigate("/dashboard");
//         } else {
//             setError(result.error);
//         }


//     };


//     return (

//         <div className="container mt-5">
//             <h2>Login</h2>

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
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="form-control mb-3"
//                     onChange={handleChange}
//                 />

//                 <button className="btn btn-primary">
//                     Login
//                 </button>

//             </form>
//             </div>
//     );
// };


// export default LoginPage;











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

import "./LoginPage.css";


const LoginPage = () => {


    const {
        login,
    } = useContext(AuthContext);


    const navigate =
        useNavigate();



    const [
        formData,
        setFormData,
    ] = useState({

        username:"",
        password:"",

    });



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
            await login(
                formData.username,
                formData.password
            );


        if(result.success){

            navigate("/dashboard");

        }

        else{

            setError(
                result.error ||
                "Invalid credentials"
            );

        }

    };




    return (

        <div className="login-page">



            <div className="login-form-area">


                <div className="login-box">


                    <div className="login-header">


                        <h2>

                            Welcome Back

                        </h2>


                        <p>

                            Login to continue your Guild journey.

                        </p>


                    </div>



                    {
                        error && (

                            <div className="login-alert">

                                {error}

                            </div>

                        )
                    }




                    <form
                        onSubmit={handleSubmit}
                    >


                        <div className="login-group">


                            <label>

                                Username

                            </label>


                            <input

                                type="text"

                                name="username"

                                placeholder="Enter username"

                                value={
                                    formData.username
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />


                        </div>




                        <div className="login-group">


                            <label>

                                Password

                            </label>


                            <input

                                type="password"

                                name="password"

                                placeholder="Enter password"

                                value={
                                    formData.password
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />


                        </div>




                        <button
                            className="login-btn"
                        >

                            Login

                        </button>


                    </form>




                    <div className="login-footer">


                        Don't have an account?


                        <Link
                            to="/register"
                        >

                            Create Account

                        </Link>


                    </div>



                </div>


            </div>





            <div className="login-brand">


                <div className="login-brand-content">


                    <div className="login-logo">

                        Guild

                    </div>



                    <h1>

                        Your workspace,
                        skills and opportunities
                        in one place.

                    </h1>



                    <p>

                        Manage projects,
                        collaborate with professionals,
                        and grow your freelance career
                        with Guild.

                    </p>




                    <div className="login-highlight">


                        <span>

                            ✦

                        </span>


                        Secure workspace

                    </div>



                    <div className="login-highlight">


                        <span>

                            ✦

                        </span>


                        Professional collaboration

                    </div>



                    <div className="login-highlight">


                        <span>

                            ✦

                        </span>


                        Better opportunities

                    </div>



                </div>


            </div>



        </div>

    );

};


export default LoginPage;
