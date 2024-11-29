import styles from './not-found.module.css'

const NotFound = () => {
    return (
      <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404 Not Found</h1>
      <p className={styles.notFoundMessage}>The requested resource was not found.</p>
    </div>
    );
  };

export default NotFound