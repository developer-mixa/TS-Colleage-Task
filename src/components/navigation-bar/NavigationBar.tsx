import { Link, useNavigate } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import { logout, selectIsAuth } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

const NavigationBar = () => {
  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных пользователя');
        }

        const data = await response.json() as User;
        setUser(data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.link}>Главная страница</Link>
        <Link to="/services" className={styles.link}>Услуги компании</Link>
      </div>
      <div className={styles.rightSection}>
        {isAuthenticated ? (
          <>
            {user && (
              <button className={styles.profileButton} onClick={() => navigate('/profile')}>
                {user.firstName} {user.lastName}
              </button>
            )}
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
