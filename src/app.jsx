import React from 'react';

function App(props) {
  const {title, desc} = props;
  return (
    <>
      <h1 style={{ backgroundColor: 'red', color: 'yellow' }} className="container">{title}</h1>
      <h2>{desc}</h2>
      <input type="text" />
    </>
  );
}

export default App;
