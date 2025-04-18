import * as React from 'react';

import { Icon, IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M4 11.6129L9.87755 17L20  7" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
