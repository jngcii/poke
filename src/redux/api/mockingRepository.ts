import { createItem, createPost } from '../utils/objectCreator';
import { Item, Post } from '../../types/object';

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
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    resolve();
  })),
  updateItem: (item: Item): Promise<void> => new Promise((resolve) => {
    items = items.map((it) => (it.id === item.id ? item : it));
    console.log('Item updated!');

    resolve();
  }),
};

export default mockingRepository;
