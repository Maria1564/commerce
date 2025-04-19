import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Form } from 'components/Form';
import { Text } from 'components/Text';
import { Routes } from 'config/routes';
import { FormFields } from 'store/FormStore/FormStore';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import style from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const { auth } = useRootStoreContext();
  const navigate = useNavigate();

  const sendDataUser = useCallback(
    (dataUser: FormFields) => {
      auth.login(dataUser.email, dataUser.password);
    },
    [auth],
  );

  useEffect(() => {
    if (auth.isAuth) {
      navigate(Routes.catalog, { replace: true });
    }
  }, [auth.isAuth, auth.meta, navigate]);

  useEffect(() => {
    return () => auth.resetAuthState();
  }, [auth]);

  return (
    <div className={style.login}>
      <div className={style.login__wrapper}>
        <Text className={style.login__title} color="accent" view="title" tag="h1">
          Вход
        </Text>
        <Text className={style.login__subtitle} view="p-18" color="secondary">
          Добро пожаловать!
        </Text>
        <Form
          sendFormValues={sendDataUser}
          text="Войти"
          link={
            <Link to={Routes.register} className={style.login__link}>
              Зарегистрироваться
            </Link>
          }
          errorMessage={auth.errorMessage}
        />
      </div>
    </div>
  );
};

export default observer(LoginPage);
