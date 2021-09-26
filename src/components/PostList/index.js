import React, {useEffect} from "react";
import {MuuriComponent, useDraggable} from "muuri-react";
import {createClickPostListItemAction, useContextDispatch, useContextState} from "../../utils/MainContextProvider";
import "./style.css";

export default React.memo(() => {
    const {plans} = useContextState();

    return (
        <MuuriComponent {...girdProps}>
            {plans.map(plan => <PostListItem key={plan.id} plan={plan}/>)}
        </MuuriComponent>
    );
});

const PostListItem = React.memo(({plan}) => {
    return (
        <div className="post-list-item-outer">
            <div className="post-list-item-inner">
                <PostListItemTitle plan={plan}/>
                <PostListItemTrigger/>
            </div>
        </div>
    );
});

const PostListItemTitle = React.memo(({plan}) => {
    const dispatch = useContextDispatch();

    const onClick = () => {
        dispatch(createClickPostListItemAction(plan))
    }

    return (
        <div className="post-list-item-title" onClick={onClick}>
            <strong>{plan.title}</strong>
        </div>
    );
});

const PostListItemTrigger = React.memo(() => {
    const draggable = useDraggable();

    useEffect(() => {
        draggable(false);
    }, [])

    const enableDrag = () => draggable(true);
    const disableDrag = () => draggable(false);

    return (
        <div className="post-list-item-trigger" onMouseOver={enableDrag} onMouseLeave={disableDrag}/>
    );
});

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
};
