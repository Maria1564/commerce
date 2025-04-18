import classNames from 'classnames';
import React from 'react';
import { Text } from 'components/Text';
import style from './SummaryRow.module.scss';

type SummaryRowProps = {
  label: string;
  content: string;
  className?: string;
};

const SummaryRow: React.FC<SummaryRowProps> = ({ label, content, className = '' }) => {
  return (
    <div className={classNames(style.row, className)}>
      <Text view="p-16" color="secondary" tag="span">
        {label}
      </Text>
      <Text weight="medium" color="primary" view="p-16">
        {content}
      </Text>
    </div>
  );
};

export default SummaryRow;
