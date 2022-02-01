import { createItem, createMemory, createPost } from '../utils/objectCreator';
import { Item, Memory, Post } from '../../types/object';
import { key8Factory } from '../utils/keyFactory';

let posts = [
  createPost('EEEEEEEE', 'third', '3'),
  createPost('IIIIIIII', 'fifth', '5'),
  createPost('CCCCCCCC', 'second', '2'),
  createPost('AAAAAAAA', 'first', '1'),
  createPost('GGGGGGGG', 'fourth', '4'),
];

let items = [
  createItem('B0000000', '1', 'first - 2', false),
  createItem('A0000000', '1', 'first - 1', true),
  createItem('C0000000', '1', 'first - 3', false),

  createItem('E0000000', '2', 'second - 2', true),
  createItem('G0000000', '2', 'second - 4', false),
  createItem('F0000000', '2', 'second - 3', true),
  createItem('D0000000', '2', 'second - 1', true),

  createItem('L0000000', '5', 'fifth - 5', false),
  createItem('I0000000', '5', 'fifth - 2', false),
  createItem('H0000000', '5', 'fifth - 1', false),
  createItem('J0000000', '5', 'fifth - 3', false),
  createItem('K0000000', '5', 'fifth - 4', false),
];

let memories = [
  createMemory('A0000000', 'memory-1', true, null, 0),
  createMemory('B0000000', 'memory-2', true, null, 0),
  createMemory('C0000000', 'memory-3', true, null, 0),
  createMemory('D0000000', 'memory-4', true, null, 0),
  createMemory('E0000000', 'memory-5', true, null, 0),
];

const mockingRepository = {
  getAllPost: (): Promise<Post[]> => new Promise((resolve) => { resolve(posts); }),
  addPost: (post: Post): Promise<void> => new Promise((resolve) => {
    posts = [post, ...posts];
    console.log('Post added!');

    resolve();
  }),
  removePost: (postId: string): Promise<void> => new Promise((resolve) => {
    posts = posts.filter((it) => it.id !== postId);
    console.log('Post removed!');

    resolve();
  }),

  updatePost: (post: Post): Promise<void> => new Promise((resolve) => {
    posts = posts.map((it) => (it.id === post.id ? post : it));

    console.log('Post updated!');
    posts.sort(
      (before, after) => key8Factory.compare(before.order, after.order),
    ).forEach(
      (p: Post) => { console.debug(`${p.title} - ${p.order}`); },
    );

    resolve();
  }),

  getAllItem: (): Promise<Item[]> => new Promise((resolve) => { resolve(items); }),
  checkItem: (itemId: string): Promise<void> => new Promise(((resolve, reject) => {
    const checkedItem = items.find((it) => it.id === itemId);

    if (!checkedItem) {
      console.log('Failed To Check Item');
      reject();
    }

    console.log('Item Checked!');
    items = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    resolve();
  })),
  updateItem: (item: Item): Promise<void> => new Promise((resolve) => {
    items = items.map((it) => (it.id === item.id ? item : it));

    console.log('Item updated!');
    items.filter(
      (i: Item) => i.postId === item.postId,
    ).sort(
      (before, after) => key8Factory.compare(before.order, after.order),
    ).forEach(
      (i: Item) => { console.debug(`${i.content} - ${i.order}`); },
    );

    resolve();
  }),
  addItem: (item: Item): Promise<void> => new Promise((resolve) => {
    items = [...items, item];
    console.log('Item added!');

    resolve();
  }),
  removeItem: (itemId: string): Promise<void> => new Promise((resolve) => {
    items = items.filter((it) => it.id !== itemId);
    console.log('Item removed!');

    resolve();
  }),

  getAllMemory: (): Promise<Memory[]> => new Promise((resolve) => { resolve(memories); }),
  updateMemory: (memory: Memory): Promise<void> => new Promise((resolve) => {
    memories = memories.map((it) => (it.id === memory.id ? memory : it));

    console.log('Item updated!');
    memories.sort(
      (before, after) => key8Factory.compare(before.order, after.order),
    ).forEach(
      (i: Memory) => { console.debug(`${i.content} - ${i.order}`); },
    );

    resolve();
  }),
};

export default mockingRepository;
