import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.link}>Главная страница</Link>
        <Link to="/services" className={styles.link}>Услуги компании</Link>
      </div>
      <span >&copy;2024 Моя компания</span>
    </div>
  );
};

export default Footer;
