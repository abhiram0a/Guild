import { Link } from "react-router-dom";
import "./LandingPage.css";
import heroImage from "../assets/hero.png";
import {
    HiOutlineUsers,
    HiOutlineBriefcase,
    HiOutlineFolder,
    HiOutlineUserGroup,
    HiOutlineDocumentAdd,
    HiOutlineClipboardCheck,
} from "react-icons/hi";

import {
    FiArrowRight,
} from "react-icons/fi";


const LandingPage = () => {

    const features = [

        {
            title: "Collaborative Projects",
            description:
                "Build teams instead of hiring one freelancer at a time. Assign different roles for one project.",
            icon: <HiOutlineUsers />,
            color: "purple",
        },

        {
            title: "Professional Gigs",
            description:
                "Freelancers showcase their skills with specialized gigs and attract the right clients.",
            icon: <HiOutlineBriefcase />,
            color: "green",
        },

        {
            title: "Project Workspaces",
            description:
                "Applications, proposals, collaboration and delivery stay organized inside one workspace.",
            icon: <HiOutlineFolder />,
            color: "blue",
        },

        {
            title: "Team Invites",
            description:
                "Invite trusted freelancer friends to collaborate on projects requiring multiple skills.",
            icon: <HiOutlineUserGroup />,
            color: "orange",
        },

    ];

    const steps = [

        {
            title: "Create",
            text: "Clients publish projects with multiple required roles.",
            icon: <HiOutlineDocumentAdd />,
            color: "purple",
        },

        {
            title: "Apply",
            text: "Freelancers apply using their professional gigs.",
            icon: <HiOutlineBriefcase />,
            color: "green",
        },

        {
            title: "Collaborate",
            text: "Invite teammates and work together inside one workspace.",
            icon: <HiOutlineUsers />,
            color: "blue",
        },

        {
            title: "Complete",
            text: "Deliver the project and receive secure payment.",
            icon: <HiOutlineClipboardCheck />,
            color: "orange",
        }

    ];

    return (

        <div className="landing-page">

            {/* HERO */}

            <section className="hero-section">

                <div className="hero-left">

                    <div className="hero-badge">

                        The Future of Collaborative Freelancing

                    </div>

                    <h1>

                        Freelancing works

                        <span>

                            {" "}better together.

                        </span>

                    </h1>

                    <p>

                        Guild connects clients with talented freelancers and
                        enables multiple professionals to collaborate inside a
                        single project.

                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="hero-primary-btn"
                        >

                            Get Started

                        </Link>

                        <Link
                            to="/projects"
                            className="hero-secondary-btn"
                        >

                            Explore Projects

                        </Link>

                    </div>

                </div>

                <div className="hero-right">

                    <div className="hero-image-wrapper">

                        <img
                            src={heroImage}
                            alt="Guild Collaboration"
                            className="hero-image"
                        />

                    </div>
                    
                </div>

            </section>

            {/* STATS */}

            <section className="stats-section">

                <div className="stat-box">

                    <h2>

                        Team Based

                    </h2>

                    <p>

                        Projects built around multiple professionals.

                    </p>

                </div>

                <div className="stat-box">

                    <h2>

                        Secure

                    </h2>

                    <p>

                        Organized applications, proposals and workspaces.

                    </p>

                </div>

                <div className="stat-box">

                    <h2>

                        Modern

                    </h2>

                    <p>

                        Designed for today's collaborative freelance teams.

                    </p>

                </div>

            </section>

            {/* FEATURES */}

            <section className="features-section">

                <div className="section-heading">

                    <h2>

                        Why Guild?

                    </h2>

                    <p>

                        Everything needed to manage collaborative freelance projects.

                    </p>

                </div>

                <div className="features-grid">

                    {

                        features.map((feature) => (

                            <div
                                key={feature.title}
                                className="feature-card"
                            >

                                <div className={`feature-icon ${feature.color}`}>

                                    {feature.icon}

                                </div>

                                <h3>

                                    {feature.title}

                                </h3>

                                <p>

                                    {feature.description}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </section>

            {/* HOW IT WORKS */}

            <section className="workflow-section">

                <div className="section-heading">

                    <h2>

                        How it works

                    </h2>

                </div>

                <div className="workflow-grid">

                    {

                        steps.map((step) => (

                            <div
                                key={step.number}
                                className="workflow-card"
                            >

                                <div className={`step-icon ${step.color}`}>

                                    {step.icon}

                                </div>

                                <h3>

                                    {step.title}

                                </h3>

                                <p>

                                    {step.text}

                                </p>

                                {
                                    step.title !== "Complete" && (

                                        <FiArrowRight className="workflow-arrow" />

                                    )
                                }

                            </div>

                        ))

                    }

                </div>

            </section>

            {/* CTA */}

            <section className="cta-section">

                <div className="cta-card">

                    <h2>

                        Ready to build your next project?

                    </h2>

                    <p>

                        Whether you're hiring a team or showcasing your skills,
                        Guild helps professionals collaborate more efficiently.

                    </p>

                    <div className="cta-buttons">

                        <Link
                            to="/register"
                            className="hero-primary-btn"
                        >

                            Create Account

                        </Link>

                        <Link
                            to="/gigs"
                            className="hero-secondary-btn"
                        >

                            Explore Freelancers

                        </Link>

                    </div>

                </div>

            </section>

        </div>

    );

};

export default LandingPage;