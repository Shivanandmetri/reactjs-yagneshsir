import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Child2 extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
    // if (this.props !== nextProps || this.state !== nextState) {
    //   return true;
    // }
    // return false;
  }

  render() {
    console.log('child 2 render');
    const { count } = this.props;
    return (
      <div>
        <h1>Child 2</h1>
        <p>
          count:
          {count}

        </p>
      </div>
    );
  }
}
