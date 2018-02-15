import React, { Component } from 'react';
import Header from './Header';
import Counter from './Counter';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {console.log(this.props)}
        {this.props.counters.map((counter, index) => {
          return (
            <Counter
              key={index}
              index={index}
              count={counter.count}
            />
          );
        }) }
        <Counter />
      </div>
    );
  }

}


const mapStateToProps = function(state) {
  return {
    counters: state.counters
  };
};


export default connect(mapStateToProps)(App);
