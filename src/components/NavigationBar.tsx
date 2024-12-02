import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NavigationBar.module.css';
import { logout, selectIsAuth } from '../store';

const NavigationBar = () => {
  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.link}>Главная страница</Link>
        <Link to="/services" className={styles.link}>Услуги компании</Link>
      </div>
      <div className={styles.rightSection}>
        {isAuthenticated ? (
          <>
            <button className={styles.logoutButton} onClick={() => navigate('/profile')}>Профиль</button>
            <button className={styles.logoutButton} onClick={() => dispatch(logout())}>Выйти</button>
          </>
        ) : (
          <div className={styles.loginButton}>
            <button className={styles.loginButton} onClick={() => navigate('/login')}>Войти</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
