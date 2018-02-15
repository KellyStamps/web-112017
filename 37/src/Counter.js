import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
  // componentWillMount() {
  //   store.subscribe(() => this.setState({}));
  // }
  render() {
    console.log(this.props);
    return (
      <div className="Counter">
        { <h1>{this.props.count}</h1> }
        <button onClick={this.props.decrement}> - </button>
        <button onClick={this.props.increment}> + </button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    counter: state.counters
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    decrement: () => {
      dispatch({
        type: 'DECREMENT',
        index: ownProps.index
      });
    },

    increment: () => {
      dispatch({
        type: 'INCREMENT',
        index: ownProps.index
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
