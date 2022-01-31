export interface Post {
  id: string,
  userId: string,
  order: string,
  title: string,
  created: Date,
  updated: Date,
  active: boolean
}

export interface Item {
  id: string,
  order: string,
  postId: string,
  content: string,
  done: boolean,
  memoryId: string | null,
  added: Date,
  updated: Date
}

export interface Memory {
  id: string,
  userId: string,
  content: string,
  order: string,
  fixed: boolean,
  parentId: string | null,
  created: Date,
  updated: Date,
  level: number
}

export interface User {
  id: string,
  nickname: string,
  type: 'normal' | 'business',
  created: Date,
  updated: Date,
  currentPostId: string | null,
}
