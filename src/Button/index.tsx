import * as React from "react";
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './index.scss';
// enum State{ 'disable', 'able' };
// enum Shape{ 'circle', 'circle-outline' };
// enum Size{ 'large', 'default', 'small' };

interface Props {
  type?: string;
  states?: string;
  shape?: string;
  size?: string;
  onClick: any;
  className?: string;
  // children: any;
}

interface State  {
  type?: string;
  states?: string;
  shape?: string;
  size?: string;
  // children: any;
  className?: string;
  onClick?: any;
  "gome-btn-def"?: boolean;
}

export default class Button extends React.Component<Props, State> {
  public state : State;
  constructor(props: Props){
    super(props);
    this.state = {
      type: props.type || 'default',
      shape: props.shape || '',
      size: props.size || '',
      "gome-btn-def": props.type === 'default',
      states: "able",
      className: props.className || '',
      onClick: props.onClick || ''
      // children: props.children
    };
  }
  /*static defaultProps = {
    state: 'able'
  }
  */
  public _buttonClicked(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
  public render(){
    let { type, size, states } = this.state;
    let { children } = this.props;
    let obj = classNames({
      "gome-btn": true,
      "gome-btn-def": type == 'default',
      "gome-btn-primary": type == 'primary',
      "gome-btn-dashed": type == 'dashed',
      "gome-btn-danger": type == 'danger',
      "gome-btn-large": size == 'large',
      "gome-btn-small": size == 'small',
      "gome-btn-disable": states == 'disable'
    });
    return (
      <button className={obj} onClick={this._buttonClicked.bind(this)}>
        <span>{children || '按钮'}</span>
      </button>
    )
  }
}
