import React,{Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

export default class Button extends Component{
  constructor(props){
    super();
    this.state = {
      type: props.type || 'default'
    };
  }
  /*static defaultProps = {
    state: 'able'
  }
  static propTypes = {
      type: PropTypes.string,
      state: PropTypes.oneOf(['disable', 'able']),
      shape: PropTypes.oneOf(['circle', 'circle-outline']),
      size: PropTypes.oneOf(['large', 'default', 'small']),
      onClick: PropTypes.func,
      className: PropTypes.string,
  }*/
  _buttonClicked(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
  render(){
    let obj = classnames({
      "gome-btn": true,
      "gome-btn-def": this.state.type == 'default',
      "gome-btn-primary": this.props.type == 'primary',
      "gome-btn-dashed": this.props.type == 'dashed',
      "gome-btn-danger": this.props.type == 'danger',
      "gome-btn-large": this.props.size == 'large',
      "gome-btn-small": this.props.size == 'small',
      "gome-btn-disable": this.props.state == 'disable'
    });
    return (
      <button className={obj} onClick={this._buttonClicked.bind(this)}>
        <span>{this.props.children || '按钮'}</span>
      </button>
    )
  }
}
