import { createItem, createPost } from '../utils/objectCreator';
import { Item, Post } from '../../types/object';

const posts = [
  createPost(1, 'first'),
  createPost(2, 'second'),
  createPost(3, 'third'),
  createPost(4, 'fourth'),
  createPost(5, 'fifth'),
];

const items = [
  createItem(1, 1, 'work', true),
  createItem(2, 1, 'fitness', false),
  createItem(3, 1, 'read book', false),

  createItem(4, 2, 'work', true),
  createItem(5, 2, 'shopping', true),
  createItem(6, 2, 'fitness', true),
  createItem(7, 2, 'read book', false),

  createItem(8, 5, 'egg', false),
  createItem(9, 5, 'milk', false),
  createItem(10, 5, 'yogurt', false),
  createItem(11, 5, 'cereal', false),
  createItem(12, 5, 'salmon', false),
];

const mockingRepository = {
  getAllPost: (): Promise<Post[]> => new Promise((resolve) => { resolve(posts); }),

  getAllItem: (): Promise<Item[]> => new Promise((resolve) => { resolve(items); }),
};

export default mockingRepository;
