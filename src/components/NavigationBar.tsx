import { Link, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NavigationBar.module.css';
import { login, logout, selectIsAuth } from '../store';

const NavigationBar = () => {
  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.link}>Главная страница</Link>
        <Link to="/services" className={styles.link}>Услуги компании</Link>
      </div>
      <div className={styles.rightSection}>
        {isAuthenticated ? (
          <>
            <div className={styles.userInfo}>
              <span className={styles.userName}>ФИО</span>
            </div>
            <button className={styles.logoutButton} onClick={() => dispatch(logout())}>Выйти</button>
          </>
        ) : (
          <div className={styles.loginButton}>
            <button className={styles.loginButton} onClick={() => redirect('/login')}>Войти</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
