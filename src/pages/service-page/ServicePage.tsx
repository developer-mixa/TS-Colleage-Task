import { useState, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Grid } from '@consta/uikit/Grid';
import styles from './ServicePage.module.css';

type Service = {
  id: number;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  imageUrl: string;
};

function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Не удалось загрузить услуги. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className={styles.servicesTitle}>Услуги</h1>
      <Grid cols={3} className={styles.Grid}>
        {services.map((service) => (
            <Card className={styles.serviceCard}>
              <div className={styles.newsItem}>
              <img src={service.image} alt={service.name} className={styles.newsItemImage} />
              <h3 className={styles.newsItemTitle}>{service.name}</h3>
              <p className={styles.newsItemDescription}>{service.description}</p>
              <div className={styles.newsItemDate}>Дата публикации: {service.createdAt}</div>
            </div>
            </Card>
        ))}
      </Grid>
    </>
  );
}

export default ServicesPage;
