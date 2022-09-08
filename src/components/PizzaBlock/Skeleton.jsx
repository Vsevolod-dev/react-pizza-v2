import React from 'react';
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton = () => {
    return (
        <ContentLoader
            className={"pizza-block"}
            speed={2}
            width={290}
            height={490}
            viewBox="0 0 290 490"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="130" cy="130" r="130"/>
            <rect x="0" y="280" rx="0" ry="0" width="280" height="24"/>
            <rect x="0" y="324" rx="10" ry="10" width="280" height="84"/>
            <rect x="5" y="429" rx="0" ry="0" width="90" height="27"/>
            <rect x="166" y="446" rx="0" ry="0" width="1" height="0"/>
            <rect x="134" y="422" rx="30" ry="30" width="150" height="44"/>
            <rect x="185" y="451" rx="0" ry="0" width="0" height="1"/>
        </ContentLoader>
    )
};

export default PizzaBlockSkeleton;
