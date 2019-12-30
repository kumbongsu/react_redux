import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
      
import Value from './Value';
import Control from './Control';
import * as actions from '../actions';
      
const propTypes = {
    number: PropTypes.number,
    color: PropTypes.shape(PropTypes.number),
    handleIncrement: PropTypes.func,
    handleDecrement: PropTypes.func,
    handleSetColor: PropTypes.func
};
      
function createWarning(funcName) {
    return () => console.warn(`${funcName} is not defined`);
}
      
const defaultProps = {
    number: 0,
    color: 255,
    handleIncrement: createWarning('handleIncrement'),
    handleDecrement: createWarning('handleDecrement'),
    handleSetColor: createWarning('handleSetColor')
};
      
class Counter extends Component {
    constructor(props) {
        super(props);
        this.setRandomColor = this.setRandomColor.bind(this);
    }
      
    setRandomColor() {  
        const color = [
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200)
        ];
      
        this.props.handleSetColor(color);
  }
      
  render() {
        const style = {
            background: `rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`
    };
      
    return (
        <div style={style}>
            <Value number={this.props.number} />
            <Control
                onPlus={this.props.handleIncrement}
                onSubtract={this.props.handleDecrement}
                onRandomizeColor={this.setRandomColor}
            />
        </div>
    );
  }
}
      
Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;
      
const mapStateToProps = state => ({
    number: state.counter.number,
    color: state.ui.color
});
      
const mapDispatchToProps = dispatch =>
    ({
        handleIncrement: () => { dispatch(actions.increment()); },
        handleDecrement: () => { dispatch(actions.decrement()); },
        handleSetColor: (color) => { dispatch(actions.setColor(color)); }
    });
    
export default connect(mapStateToProps, mapDispatchToProps)(Counter);