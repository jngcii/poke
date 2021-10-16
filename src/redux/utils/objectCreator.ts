import {Item, Post} from '../../types/object';

export function createPost(id: string, title: string): Post {
  return { id, title };
}

export function createItem(id: string, postId: string, content: string, isDone: boolean): Item {
  return { id, postId, content, isDone };
}
