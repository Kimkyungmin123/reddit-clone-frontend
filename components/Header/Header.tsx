import Link from 'next/link';
import { Github, MoonOutline, EditOutline, Search } from '../../icons';
import styles from './Header.module.css';

type HeaderProps = {
  type: 'post' | 'account';
};

const Header = ({ type }: HeaderProps) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerbox}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <a>creddit</a>
          </Link>
        </div>
        {type === 'account' && <div className={styles.headerAccount}></div>}

        {type === 'post' && (
          <div className={styles.headerPostSearch}>
            <Search className={styles.searchIcon} />
            <input className={styles.headerInput} type="text" placeholder="" />
          </div>
        )}
        <div className={styles.headerNav}>
          <div className={styles.moonOutlineIcon}>
            <MoonOutline />
          </div>
          {type === 'post' && (
            <div className={styles.editOutlineIcon}>
              <EditOutline />
            </div>
          )}
          <div className={styles.gitIcon}>
            <a
              aria-label="깃허브 저장소"
              href="https://github.com/project-creddit/creddit-frontend"
            >
              <Github />
            </a>
          </div>
          <div className={styles.loginText}>
            <Link href="/login">
              <a>로그인</a>
            </Link>
          </div>
          <div className={styles.signupText}>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
