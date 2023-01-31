import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function App(props) {
  const { title, desc } = props;
  return (
    <>
      <h1 style={{ backgroundColor: 'red', color: 'yellow' }} className="container">{title}</h1>
      <h2>{desc}</h2>
      <input type="text" />
    </>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

App.defaultProps = {
  desc: 'N/A',
};

export default App;
