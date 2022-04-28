import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostForm from 'components/PostForm';
import useUser from 'hooks/useUser';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useSWR from 'swr';
import { Post } from 'types';
import api, { fetcher } from 'utils/api';
import getPostFormData from 'utils/getPostFormData';

const EditPost: NextPage = () => {
  const { isLoading, user } = useUser({
    redirectTo: '/',
    redirectWhen: 'unauthorized',
  });
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<Post>(id ? `/post/${id}` : null, fetcher);

  const isAuthor = useCallback(() => {
    if (!user || !data) return true;
    return data.member.nickname === user.nickname;
  }, [user, data]);

  return (
    <Layout title="글 수정 - creddit">
      {(error || !isAuthor()) && <NotFound />}
      {!isLoading && user && data && id !== undefined && (
        <PostForm
          title="수정"
          initialValues={{ title: data.title, content: data.content }}
          onSubmit={async (values) => {
            const formData = getPostFormData(values);
            await api.post(`/post/${id}/edit`, formData);
            router.back();
          }}
        />
      )}
    </Layout>
  );
};

export default EditPost;
