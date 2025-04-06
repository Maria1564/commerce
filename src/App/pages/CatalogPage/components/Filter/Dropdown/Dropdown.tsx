import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { useRootStoreContext } from 'store/RootStore/rootStoreProvider';
import { SortOptionsStore } from 'store/SortOptionsStore/SortOptionsStore';
import { useClickOutside } from 'utils/hooks/useClickOutside';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import OptionItem from './OptionItem';
import style from './Dropdown.module.scss';

const Dropdown: React.FC = () => {
  const refSelect = useRef<null | HTMLDivElement>(null);
  const { openModal, setOpenModal } = useClickOutside(refSelect);
  const rootStore = useRootStoreContext();
  const sortStore = useLocalStore(() => new SortOptionsStore());

  useEffect(() => {
    sortStore.updateSelectedNameOption(rootStore.queryParams.params.sort);
  }, [rootStore.queryParams.params.sort, sortStore]);

  const handleClick = useCallback(() => setOpenModal(!openModal), [openModal, setOpenModal]);

  return (
    <div className={style.dropdown}>
      <div className={style.dropdown__field} onClick={handleClick} ref={refSelect}>
        <div className={style[`dropdown__select-item`]}>{sortStore.selectedNameOption}</div>
        <ArrowDownIcon />
      </div>
      <ul className={classNames(style.dropdown__menu, { [style.dropdown__menu_open]: openModal })}>
        {sortStore.listOptions.map((item, index) => (
          <OptionItem key={index} option={item} selectedOption={sortStore.selectedNameOption} />
        ))}
      </ul>
    </div>
  );
};

export default observer(Dropdown);
