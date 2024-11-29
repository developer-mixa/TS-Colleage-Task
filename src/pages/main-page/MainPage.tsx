import { useState, useEffect } from 'react';
import { List } from '@consta/uikit/ListCanary';
import { Card } from '@consta/uikit/Card';
import styles from './MainPage.module.css'

const NEWS_URL: string = 'https://673423afa042ab85d1190055.mockapi.io/api/v1/main';

type Item = {
  label: string;
  name: string;
  description: string;
  createdAt: string;
  id: number;
};

function MainPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(NEWS_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Не удалось загрузить новости. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className={styles.newsPageTitle}>Новости</h1>
      <Card className={styles.newsCard}>
        <List
          items={items}
          renderItem={(item) => (
            <div className={styles.newsItem}>
              <h3 className={styles.newsItemTitle}>{item.name}</h3>
              <p className={styles.newsItemDescription}>{item.description}</p>
              <div className={styles.newsItemDate}>Дата публикации: {item.createdAt}</div>
            </div>
          )}
        />
      </Card>
    </>
  );
}


export default MainPage
