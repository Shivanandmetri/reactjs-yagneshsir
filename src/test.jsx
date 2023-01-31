import React, { Component } from 'react';

// let count = 0;

// eslint-disable-next-line react/prefer-stateless-function
export default class Test extends Component {
  state = {
    count: 0,
    name: 'shivanand',
  };

  render() {
    const { count, name } = this.state;
    return (
      <div id="test">
        <p>{name}</p>
        <button
          type="button"
          onClick={() => {
            this.setState((state) => ({
              count: state.count + 1,
            }));
          }}
        >
          +

        </button>
        <p>{count}</p>
        <button
          type="button"
          onClick={() => {
            this.setState((state) => ({
              count: state.count - 1,
            }));
          }}
        >
          -

        </button>
      </div>
    );
  }
}
