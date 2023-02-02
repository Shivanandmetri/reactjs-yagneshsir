import React, { Component } from 'react';
import Child1 from './Child1';
import Child2 from './Child2';

// let count = 0;

// eslint-disable-next-line react/prefer-stateless-function
export default class Test extends Component {
  // state = {
  //   count: 0,
  //   name: 'shivanand',
  // };

  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      // eslint-disable-next-line react/prop-types
      count: props.count,
      name: 'shivanand',
    };

    // this.increment = this.increment.bind(this);
    // this.decrement = this.decrement.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    if (state.count === 0) {
      return { count: props.count };
    }
    return null;
  }

  async componentDidMount() {
    console.log('componentDidMount');
    // document.getElementById('test').style.backgroundColor = 'yellow';
    document.addEventListener('copy', () => {
      console.log('copied');
    });
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await res.json();
      this.setState({ name: json.title });
    } catch (error) { }
  }

  increment = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  decrement = () => {
    this.setState((state) => ({
      count: state.count - 1,
    }));
  };

  render() {
    console.log('render');
    const { count, name } = this.state;
    return (
      <div id="test">
        <p>{name}</p>
        <button type="button" onClick={this.increment}>
          +
        </button>

        <p>{count}</p>
        <button type="button" onClick={this.decrement}>
          -
        </button>
        <div>
          <Child1 count={count} />
          <Child2 count={count} />
          <button
            type="button"
            onClick={() => { this.setState({ name: 'virat' }); }}
          >
            Change Name

          </button>
        </div>
      </div>
    );
  }
}
