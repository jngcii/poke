import { nanoid } from '@reduxjs/toolkit';
import { Item, Post } from '../../types/object';
import { key8Factory } from './keyFactory';

export function createPost(order: string, title: string, id?: string): Post {
  return {
    id: !id ? nanoid() : id,
    userId: 'tmp',
    order,
    title,
    created: new Date(),
    updated: new Date(),
    active: true,
  };
}

export function createItem(order: string, postId: string, content: string, done: boolean): Item {
  return {
    id: nanoid(),
    order,
    postId,
    content,
    done,
    memoryId: null,
    added: new Date(),
    updated: new Date(),
  };
}

export function createInitialItem(postId: string): Item {
  return createItem(key8Factory.build(), postId, '', false);
}
