import "./PageLayout.css";

const PageLayout = ({
    title,
    subtitle,
    children,
    actions,
}) => {

    return (

        <div className="guild-page fade-up">

            <div className="container">

                {(title || subtitle || actions) && (

                    <div className="page-header">

                        <div>

                            {title && (

                                <h1 className="page-title">

                                    {title}

                                </h1>

                            )}

                            {subtitle && (

                                <p className="page-subtitle">

                                    {subtitle}

                                </p>

                            )}

                        </div>

                        {actions && (

                            <div>

                                {actions}

                            </div>

                        )}

                    </div>

                )}

                {children}

            </div>

        </div>

    );

};

export default PageLayout;