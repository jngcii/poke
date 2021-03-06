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

export function createItemByMemory(
  order: string,
  postId: string,
  content: string,
  memory: Memory,
): Item {
  return {
    id: nanoid(),
    order,
    postId,
    content,
    done: false,
    memoryId: memory.id,
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
  id: string | undefined = undefined,
): Memory {
  return {
    id: !id ? nanoid() : id,
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

export function createSpareMemory(content: string): Memory {
  return {
    id: nanoid(),
    userId: 'tmp',
    content,
    order: '00000000',
    fixed: false,
    parentId: '0',
    created: Date.now(),
    updated: Date.now(),
    level: 1,
  };
}

export function createRootMemory(): Memory {
  return {
    id: '0',
    userId: 'tmp',
    content: 'Home',
    order: '00000000',
    fixed: true,
    parentId: null,
    created: Date.now(),
    updated: Date.now(),
    level: 0,
  };
}

export function createInitialItem(postId: string): Item {
  return createItem(key8Factory.build(), postId, '', false);
}

export function createInitialItemByMemory(postId: string, content: string, memory: Memory): Item {
  return createItemByMemory(key8Factory.build(), postId, content, memory);
}
