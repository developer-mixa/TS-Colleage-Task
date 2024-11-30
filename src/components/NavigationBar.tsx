import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.link}>Главная страница</Link>
        <Link to="/services" className={styles.link}>Услуги компании</Link>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>ФИО</span>
          <button className={styles.loginButton}>Вход</button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
