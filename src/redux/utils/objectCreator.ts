import { nanoid } from '@reduxjs/toolkit';
import { Item, Post } from '../../types/object';
import { key8Factory } from './keyFactory';

export function createPost(order: string, title: string, id?: string): Post {
  return { id: !id ? nanoid() : id, order, title };
}

export function createItem(order: string, postId: string, content: string, isDone: boolean): Item {
  return {
    id: nanoid(), order, postId, content, isDone,
  };
}

export function createInitialItem(postId: string): Item {
  return {
    id: nanoid(), order: key8Factory.build(), postId, content: '', isDone: false,
  };
}
