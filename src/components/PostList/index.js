import React from "react";
import {useContextState} from "../../utils/MainContextProvider";
import "./style.css";

export default React.memo(() => {
    const {plans} = useContextState();

    return (
        <>
            {plans.map(plan => <PostListItem key={plan.id} title={plan.title}/>)}
        </>
    );
})

const PostListItem = React.memo(({title}) => {
    return (
        <div className="post-list-item-outer">
            <strong>{title}</strong>
        </div>
    );
})
