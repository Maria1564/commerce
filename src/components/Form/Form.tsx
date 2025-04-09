import React, { useCallback, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import style from './Form.module.scss';

type FormState = {
  username?: string;
  login: string;
  password: string;
  errorMessage: string;
};

export type FormData = Omit<FormState, 'errorMessage'>;

type FormProps = {
  sendFormValues: (data: FormData) => void;
  link?: React.ReactNode;
  text: string;
  isRegister?: boolean;
};

const Form: React.FC<FormProps> = ({ sendFormValues, link, text, isRegister = false }) => {
  const [formData, setFormData] = useState<FormState>({
    ...(isRegister && { username: '' }),
    login: '',
    password: '',
    errorMessage: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.login.trim() === '' || formData.password.trim() === '') {
      setFormData((prev) => ({
        ...prev,
        errorMessage: 'Некорректно введён логин/пароль',
      }));
    } else {
      const { errorMessage: _, ...otherData } = formData;
      sendFormValues(otherData);
      setFormData({
        username: '',
        login: '',
        password: '',
        errorMessage: '',
      });
    }
  };

  const changeLogin = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      login: value,
    }));
  }, []);

  const changePassword = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
  }, []);

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {isRegister && (
        <Input
          placeholder="имя пользователя"
          onChange={(value) => setFormData((prev) => ({ ...prev, username: value }))}
          value={formData.username!}
          className={style.form__input}
        />
      )}
      <Input
        placeholder="почта (логин)"
        type="email"
        onChange={changeLogin}
        value={formData.login}
        className={style.form__input}
      />
      <Input
        placeholder="пароль"
        type="password"
        onChange={changePassword}
        value={formData.password}
        className={style.form__input}
      />
      {formData.errorMessage && (
        <Text className={style.form__error} view="p-14" tag="span" weight="medium">
          {formData.errorMessage}
        </Text>
      )}
      <Button>{text}</Button>
      {link}
    </form>
  );
};

export default React.memo(Form);
