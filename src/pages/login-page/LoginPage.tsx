import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Button } from '@consta/uikit/Button';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store';

function LoginPage() {
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const validatePassword = (password: string) => {
    return password.length >= 6 && /[a-zA-Z]/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      username: '',
      password: ''
    });

    if (!validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум одну букву и цифру' }));
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Не удалось войти. Проверьте данные и попробуйте снова.';
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors[0].message || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch(login());

      setUsername('');
      setPassword('');
      console.log('Авторизация успешна');
      navigate('/');
    } catch (error) {
      console.error('Произошла ошибка:', error);
      handleError('Не удалось войти. Проверьте данные и попробуйте снова.');
    }
  };

  const handleError = (error: string) => {
    setErrors(prev => ({ ...prev, password: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход в систему</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <Button type="submit" className={styles.button} label={"Войти"}/>
      </form>
    </div>
  );
}

export default LoginPage;
