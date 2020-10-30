import React from 'react';
import styles from './index.less';

interface CompProps {
  text: string
}

const Comp: React.FC<CompProps> = (props) => {
  const {text} = props;
  return (
    <div className={styles.StatusCircle}>
        <div>{text}</div>
    </div>
  );
};

export default Comp;
