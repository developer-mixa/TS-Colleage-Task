import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Button } from '@consta/uikit/Button';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      email: '',
      password: ''
    });

    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Некорректный email' }));
      return;
    }

    if (!validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум одну букву и цифру' }));
      return;
    }


    // Succes login
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Test
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход в систему</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
          className={styles.input}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
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
