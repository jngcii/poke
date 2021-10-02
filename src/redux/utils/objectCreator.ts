import {Item, Post} from '../../types/object';

export function createPost(id: number, title: string): Post {
  return { id, title };
}

export function createItem(id: number, postId: number, content: string, isDone: boolean): Item {
  return { id, postId, content, isDone };
}
