import React from 'react';
import {Icon, IconProps } from 'components/icons/Icon';

const CheckmarkIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M6.66663 19.3548L16.4625 30L33.3333 11.6667" stroke="currentColor" stroke-width="3.33333" />
    </Icon>
  );
};

export default CheckmarkIcon;
