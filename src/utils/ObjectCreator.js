export function createPlan(id, title) {
    return {id, title}
}

export function createItem(planId, content, isDone) {
    return {planId, content, isDone}
}
