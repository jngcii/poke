import React from "react";
import {MuuriComponent} from "muuri-react";
import {useContextState} from "../../utils/MainContextProvider";
import "./style.css";

export default React.memo(() => {
    const {plans} = useContextState();

    return (
        <MuuriComponent {...girdProps}>
            {plans.map(plan => <PostListItem key={plan.id} title={plan.title}/>)}
        </MuuriComponent>
    );
})

const PostListItem = React.memo(({title}) => {
    return (
        <div className="post-list-item-outer">
            <div className="post-list-item-inner">
                <strong>{title}</strong>
            </div>
        </div>
    );
})

const girdProps = {
    dragEnabled: true,
    dragFixed: true,
    dragSortHeuristics: {
        sortInterval: 0
    },
    dragContainer: document.body,
    dragAxis: 'y',

    // ClassNames
    containerClass: "post-list-container",
    itemClass: "post-list-item-outer",
    itemVisibleClass: "post-list-item-outer-shown",
    itemHiddenClass: "post-list-item-outer-hidden",
    itemPositioningClass: "post-list-item-outer-positioning",
    itemDraggingClass: "post-list-item-outer-dragging",
    itemReleasingClass: "post-list-item-outer-releasing",
    itemPlaceholderClass: "post-list-item-outer-placeholder"
}
