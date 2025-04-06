import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import Text from 'components/Text';
import { Routes } from 'config/routes';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import Form from './components/Form';
import { FormData } from './components/Form/Form';
import style from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const rootStore = useRootStoreContext();
  const navigate = useNavigate();

  const sendDataUser = useCallback((dataForm: FormData) => {
    rootStore.auth.register(dataForm);
    navigate(Routes.login, { replace: true });
  }, [navigate, rootStore.auth])

  return (
    <div className={style.register}>
      <div className={style.register__wrapper}>
        <Text className={style.register__title} color="accent" view="title" tag="h1">
          Регистрация
        </Text>
        <Text className={style.register__subtitle} view="p-18" color="secondary">
          Добро пожаловать!
        </Text>
        <Form
          sendFormValues={sendDataUser}
          text="Зарегистрироваться"
          link={<Link to={Routes.login}>Войти</Link>}
          isRegister
        />
      </div>
    </div>
  );
};

export default observer(RegisterPage);
