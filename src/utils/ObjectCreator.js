export function createPlan(id, title) {
    return {id, title}
}

export function createItem(id, postId, content, isDone) {
    return {id, postId, content, isDone}
}
