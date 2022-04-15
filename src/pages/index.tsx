import ClassifyingPosts from 'components/ClassifyingPosts';
import Layout from 'components/Layout';
import PostBox from 'components/PostBox';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from 'styles/Home.module.scss';
import dummy from '../data/posts.json';

const Home: NextPage = () => {
  const router = useRouter();

  const onClick = (id: number) => {
    router.push(`/posts/${id}`);
  };
  return (
    <Layout title="creddit">
      <div className={styles.container}>
        홈
        <div className={styles.ClassifyingPostsBox}>
          <ClassifyingPosts />
        </div>
        <div className={styles.PostBox}>
          {dummy.map((data) => (
            <PostBox
              key={data.id}
              postTitle={data.title}
              postContent={data.content}
              nickName={data.member}
              commentsCount={data.commentCount}
              likeCount={data.likeCount}
              date={data.createdDate}
              onClick={() => onClick(data.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
