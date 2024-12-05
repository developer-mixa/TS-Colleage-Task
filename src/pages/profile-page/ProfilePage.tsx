import React, { useEffect, useState } from "react";
import { Card } from "@consta/uikit/Card";
import styles from "./ProfilePage.module.css";
import UsersApi from "../../api/UsersApi";

interface ProfilePageProps {
  token: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

let profileApi = new UsersApi();

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await profileApi.getCurrentUserData()

        if (!response.ok) {
          throw new Error("Ошибка при получении данных пользователя");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        setUser(null);
      }
    };

    fetchUser();
  });

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <Card className={styles.card}>
      <h1>Профиль пользователя</h1>

      <div className={styles.userDetails}>
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h3>{user.username}</h3>
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
          <h3>{user.email}</h3>
          <h3>{user.gender}</h3>
        </div>
      </div>
    </Card>
  );
};

export default ProfilePage;
