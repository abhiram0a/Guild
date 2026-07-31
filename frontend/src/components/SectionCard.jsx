const SectionCard = ({
    title,
    children,
}) => {

    return (

        <div className="guild-card mb-4">

            {title && (

                <h4 className="mb-4">

                    {title}

                </h4>

            )}

            {children}

        </div>

    );

};

export default SectionCard;