import api from '../api';

export const getPosts = async (token: string, page: number) => {
  const { data } = await api.get(`/post?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
