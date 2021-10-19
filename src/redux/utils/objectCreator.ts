import { nanoid } from '@reduxjs/toolkit';
import { Item, Post } from '../../types/object';

export function createPost(order: string, title: string, id?: string): Post {
  return { id: !id ? nanoid() : id, order, title };
}

export function createItem(order: string, postId: string, content: string, isDone: boolean): Item {
  return {
    id: nanoid(), order, postId, content, isDone,
  };
}
