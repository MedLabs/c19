import React from 'react';

import classNames from 'classnames';
import NumberFormat from 'react-number-format';

import styles from '../styles/statisticTile.scss';

export default function StatisticTile({ label, value, type }) {
  const classes = classNames(styles.tile, {
    [styles.cases]: type === 'cases',
    [styles.deaths]: type === 'deaths',
    [styles.recovered]: type === 'recovered'
  });

  return (
    <div className={classes}>
      <h3>{label}</h3>
      <h2>
      <NumberFormat
                      value={value}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
      </h2>
    </div>
  );
}