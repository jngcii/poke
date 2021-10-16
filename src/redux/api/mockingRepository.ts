import { createItem, createPost } from '../utils/objectCreator';
import { Item, Post } from '../../types/object';

let posts = [
  createPost('EEEEEEEE', 'third'),
  createPost('IIIIIIII', 'fifth'),
  createPost('CCCCCCCC', 'second'),
  createPost('AAAAAAAA', 'first'),
  createPost('GGGGGGGG', 'fourth'),
];

let items = [
  createItem('B0000000', 'AAAAAAAA', 'first - 2', false),
  createItem('A0000000', 'AAAAAAAA', 'first - 1', true),
  createItem('C0000000', 'AAAAAAAA', 'first - 3', false),

  createItem('E0000000', 'CCCCCCCC', 'second - 2', true),
  createItem('G0000000', 'CCCCCCCC', 'second - 4', false),
  createItem('F0000000', 'CCCCCCCC', 'second - 3', true),
  createItem('D0000000', 'CCCCCCCC', 'second - 1', true),

  createItem('L0000000', 'IIIIIIII', 'fifth - 5', false),
  createItem('I0000000', 'IIIIIIII', 'fifth - 2', false),
  createItem('H0000000', 'IIIIIIII', 'fifth - 1', false),
  createItem('J0000000', 'IIIIIIII', 'fifth - 3', false),
  createItem('K0000000', 'IIIIIIII', 'fifth - 4', false),
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
};

export default mockingRepository;
