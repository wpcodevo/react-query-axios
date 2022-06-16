import { authApi } from './authApi';
import { GenericResponse, IPostResponse, IPostsResponse } from './types';

export const getAllPostsFn = async () => {
  const response = await authApi.get<IPostsResponse>(`posts`);
  return response.data;
};

export const getPostFn = async (id: string) => {
  const response = await authApi.get<IPostResponse>(`posts/${id}`);
  return response.data;
};

export const createPostFn = async (formData: FormData) => {
  const response = await authApi.post<IPostResponse>(`posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updatePostFn = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await authApi.patch<IPostResponse>(`posts/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deletePostFn = async (id: string) => {
  const response = await authApi.delete<GenericResponse>(`posts/${id}`);
  return response.data;
};
