import React, { memo } from 'react';

function Child1(props) {
  const { count } = props;

  console.log('child 1 render');

  return (<div><h1>{count}</h1></div>);
}

export default memo(Child1);
