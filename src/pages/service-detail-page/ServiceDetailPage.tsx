import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@consta/uikit/Card';
import { Grid } from '@consta/uikit/Grid';
import styles from './ServiceDetailPage.module.css';
import ServiceApi from '../../api/ServiceApi';

type Service = {
  id: number;
  name: string;
  image: string;
  description: string;
  createdAt: string;
};

let serviceApi = new ServiceApi();

function ServiceDetailPage() {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await serviceApi.getServiceDetail(id);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Не удалось загрузить информацию об услуге. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  return (
    <>
      <h1 className={styles.serviceTitle}>{service.name}</h1>
      <Card className={styles.serviceCard}>
        <Grid cols={2} className={styles.serviceGrid}>
          <div className={styles.imageContainer}>
            <img src={service.image} alt={service.name} className={styles.serviceImage} />
          </div>
          <div className={styles.infoContainer}>
            <h3 className={styles.serviceName}>{service.name}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
            <div className={styles.createdAt}>Дата создания: {service.createdAt}</div>
          </div>
        </Grid>
      </Card>
    </>
  );
}

export default ServiceDetailPage;
