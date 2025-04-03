import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M15.09 19.92L8.57 13.4C7.8 12.63 7.8 11.37 8.57 10.6L15.09 4.07999"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
};

export default ArrowLeftIcon;
