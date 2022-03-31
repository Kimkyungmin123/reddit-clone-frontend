import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout type="account" title="creddit">
      <div className={styles.container}>
        <Link href="/login">
          <a>로그인</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
