// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import { AuthContext } from "../context/AuthContext";
// import { getMyGigs } from "../api/projectApi";

// const MyGigsPage = () => {

//     const { token } = useContext(AuthContext);

//     const [gigs, setGigs] = useState([]);

//     useEffect(() => {
//         if (token) {
//             fetchGigs();
//         }
//     }, [token]);

//     const fetchGigs = async () => {

//         try {

//             const response =
//                 await getMyGigs(token);

//             setGigs(response.data);

//         } catch (error) {

//             console.error(error);
//         }
//     };

//     return (
//         <div className="container mt-4">

//             <h2>My Gigs</h2>

//             {gigs.length === 0 ? (
//                 <p>No gigs created yet.</p>
//             ) : (
//                 <ul className="list-group">

//                     {gigs.map(gig => (

//                         <li
//                             key={gig.id}
//                             className="list-group-item"
//                         >

//                             <Link
//                                 to={`/gigs/${gig.id}`}
//                             >
//                                 {gig.title}
//                             </Link>

//                             <div>
//                                 {gig.job_category.name}
//                             </div>

//                             <div>
//                                 ₹{gig.price}
//                             </div>

//                             <div>
//                                 {gig.status}
//                             </div>

//                         </li>
//                     ))}

//                 </ul>
//             )}

//         </div>
//     );
// };

// export default MyGigsPage;



import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    Plus,
    Briefcase,
    IndianRupee,
    Star,
    ArrowRight,
    ClipboardList,
    Inbox,
} from "lucide-react";

import {
    AuthContext,
} from "../context/AuthContext";

import {
    getMyGigs,
} from "../api/projectApi";

import "./MyGigsPage.css";

const MyGigsPage = () => {

    const { token } =
        useContext(AuthContext);

    const [
        gigs,
        setGigs,
    ] = useState([]);

    useEffect(() => {

        if (token) {

            fetchGigs();

        }

    }, [token]);

    const fetchGigs = async () => {

        try {

            const response =
                await getMyGigs(token);

            setGigs(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="my-gigs-page">

            <div className="my-gigs-header">

                <div>

                    <h1>

                        My Gigs

                    </h1>

                    <p>

                        Manage your freelance services and keep them ready for new clients.

                    </p>

                </div>

                <div className="my-gigs-actions">

                    <Link
                        to="/create-gig"
                        className="primary-action-btn"
                    >

                        <Plus size={18} />

                        Create Gig

                    </Link>

                    <Link
                        to="/my-applications"
                        className="secondary-action-btn"
                    >

                        <ClipboardList size={18} />

                        My Applications

                    </Link>

                    <Link
                        to="/received-proposals"
                        className="secondary-action-btn"
                    >

                        <Inbox size={18} />

                        Proposals

                    </Link>

                </div>

            </div>

            <div className="my-gigs-summary">

                <Briefcase size={18} />

                <span>

                    {gigs.length}

                    {" "}

                    Gig

                    {gigs.length !== 1 && "s"}

                    {" "}

                    Created

                </span>

            </div>

            {

                gigs.length === 0 ?

                (

                    <div className="my-gigs-empty">

                        <Briefcase
                            size={60}
                        />

                        <h3>

                            You haven't created any gigs yet

                        </h3>

                        <p>

                            Create your first gig and start receiving project applications from clients.

                        </p>

                        <Link
                            to="/create-gig"
                            className="primary-action-btn"
                        >

                            <Plus size={18} />

                            Create Your First Gig

                        </Link>

                    </div>

                )

                :

                (

                    <div className="my-gigs-grid">
                        {

                            gigs.map(gig => {

                                const rating =
                                    gig.average_rating;

                                const reviewCount =
                                    gig.reviews
                                        ? gig.reviews.length
                                        : 0;

                                return (

                                    <Link

                                        key={gig.id}

                                        to={`/gigs/${gig.id}`}

                                        className="my-gig-card"

                                    >

                                        <div className="my-gig-top">

                                            <div className="my-gig-category">

                                                <Briefcase
                                                    size={15}
                                                />

                                                {

                                                    gig.job_category.name

                                                }

                                            </div>

                                            <div
                                                className={`gig-status ${gig.status.toLowerCase()}`}
                                            >

                                                {

                                                    gig.status

                                                }

                                            </div>

                                        </div>

                                        <h3 className="my-gig-title">

                                            {

                                                gig.title

                                            }

                                        </h3>

                                        <div className="my-gig-rating">

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

                                        <div className="my-gig-price">

                                            <IndianRupee
                                                size={18}
                                            />

                                            <span>

                                                {

                                                    gig.price

                                                }

                                            </span>

                                        </div>

                                        <div className="my-gig-footer">

                                            <span>

                                                Manage Gig

                                            </span>

                                            <ArrowRight
                                                size={18}
                                            />

                                        </div>

                                    </Link>

                                );

                            })

                        }

                    </div>

                )

            }

        </div>

    );

};

export default MyGigsPage;