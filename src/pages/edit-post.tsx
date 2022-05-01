import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostForm from 'components/PostForm';
import { usePostCardContext } from 'context/PostCardContext';
import { usePostsContext } from 'context/PostsContext';
import useUser from 'hooks/useUser';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
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
  const { data, error } = useSWRImmutable<Post>(
    id ? `/post/${id}` : null,
    fetcher
  );
  const { dispatch } = usePostsContext();
  const { setClickedPostCard } = usePostCardContext();

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
            await mutate(`/post/${id}`);
            const { title, content } = values;
            dispatch({ type: 'CHANGE_POST', post: { title, content } });
            setClickedPostCard(false);
            router.push(`/post/${id}`);
          }}
        />
      )}
    </Layout>
  );
};

export default EditPost;
