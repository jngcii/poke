import { nanoid } from '@reduxjs/toolkit';
import { Item, Memory, Post } from '../../types/object';
import { key8Factory } from './keyFactory';

export function createPost(order: string, title: string, id?: string): Post {
  return {
    id: !id ? nanoid() : id,
    userId: 'tmp',
    order,
    title,
    created: Date.now(),
    updated: Date.now(),
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
    added: Date.now(),
    updated: Date.now(),
  };
}

export function createMemory(
  order: string,
  content: string,
  fixed: boolean,
  parentId: string | null,
  level: number,
): Memory {
  return {
    id: nanoid(),
    userId: 'tmp',
    content,
    order,
    fixed,
    parentId,
    created: Date.now(),
    updated: Date.now(),
    level,
  };
}

export function createInitialItem(postId: string): Item {
  return createItem(key8Factory.build(), postId, '', false);
}
