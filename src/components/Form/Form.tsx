import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { FormFields, FormStore } from 'store/FormStore/FormStore';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import style from './Form.module.scss';

type FormProps = {
  sendFormValues: (data: FormFields) => void;
  link?: React.ReactNode;
  text: string;
  isRegister?: boolean;
  errorMessage?: string
};

const Form: React.FC<FormProps> = ({ sendFormValues, link, text, isRegister = false, errorMessage = "" }) => {
  const formStore = useLocalStore(() => new FormStore());
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formStore.validate(sendFormValues);
  };

  useEffect(() => {
    formStore.setErrorMessage(errorMessage)
  }, [errorMessage, formStore])

  const changeUsername = useCallback(
    (value: string) => {
      formStore.setUsername(value);
    },
    [formStore],
  );

  const changeEmail = useCallback(
    (value: string) => {
      formStore.setEmail(value);
    },
    [formStore],
  );

  const changePassword = useCallback(
    (value: string) => {
      formStore.setPassword(value);
    },
    [formStore],
  );

  useEffect(() => {
    formStore.setRegisterMode(isRegister);
  }, [formStore, isRegister]);

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {formStore.isRegister && (
        <Input
          placeholder="имя пользователя"
          onChange={changeUsername}
          value={formStore.username!}
          className={style.form__input}
        />
      )}
      <Input
        placeholder="почта (логин)"
        type="email"
        onChange={changeEmail}
        value={formStore.email}
        className={style.form__input}
      />
      <Input
        placeholder="пароль"
        type="password"
        onChange={changePassword}
        value={formStore.password}
        className={style.form__input}
      />
      {formStore.errorMessage && (
        <Text className={style.form__error} view="p-14" tag="span" weight="medium">
          {formStore.errorMessage}
        </Text>
      )}
      <Button>{text}</Button>
      {link}
    </form>
  );
};

export default observer(Form);
