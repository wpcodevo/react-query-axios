export interface IUser {
  name: string;
  email: string;
  role: string;
  photo: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface IPostRequest {
  title: string;
  content: string;
  image: string;
  user: string;
}

export interface IPostResponse {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  user: IUser;
  created_at: string;
  updated_at: string;
}

export interface IPostsResponse {
  status: string;
  data: {
    posts: IPostResponse[];
  };
}
