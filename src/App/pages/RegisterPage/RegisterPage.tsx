import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Form from 'components/Form';
import Text from 'components/Text';
import { Routes } from 'config/routes';
import { FormFields } from 'store/FormStore/FormStore';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { Meta } from 'utils/meta';
import style from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const rootStore = useRootStoreContext();
  const navigate = useNavigate();
  
  const sendDataUser = useCallback(
    (dataForm: FormFields) => {
      rootStore.auth.register(dataForm);
    },
    [rootStore.auth],
  );

  useEffect(() => {
    if (rootStore.auth.meta === Meta.error) {
      alert('Пользователь с таким именем/почтой уже есть');
      return;
    }

    if (rootStore.auth.meta === Meta.success) {
      navigate(Routes.login, { replace: true });
    }
  }, [navigate, rootStore.auth.meta]);

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
          link={
            <Link to={Routes.login} className={style.register__link}>
              Войти
            </Link>
          }
          isRegister
        />
      </div>
    </div>
  );
};

export default observer(RegisterPage);
