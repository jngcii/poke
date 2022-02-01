export interface Post {
  id: string,
  userId: string,
  order: string,
  title: string,
  created: number,
  updated: number,
  active: boolean
}

export interface Item {
  id: string,
  order: string,
  postId: string,
  content: string,
  done: boolean,
  memoryId: string | null,
  added: number,
  updated: number
}

export interface Memory {
  id: string,
  userId: string,
  content: string,
  order: string,
  fixed: boolean,
  parentId: string | null,
  created: number,
  updated: number,
  level: number
}

export interface User {
  id: string,
  nickname: string,
  type: 'normal' | 'business',
  created: number,
  updated: number,
  currentPostId: string | null,
}
