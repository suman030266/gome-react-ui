import * as React from 'react';
import * as classNames from 'classnames';
import './index.scss';
import Button from '../Button';

import Mask from './mask';

interface Props {
  visible : boolean;
  width?: string;
  height?: any;
  closeBtn?: boolean;
  title?: string;
  footerType?: string;
  footer: any;
  children: any;
  canMaskClick?: boolean;
  autoClose?: boolean;
  closeTimeout?: number;
  onCancel: any;
  onOk: any;
  autoCloseCb?: any;
}

interface State {
   visible : boolean;
   width?: string;
   height?: any;
   closeBtn?: boolean;
   title?: string;
   footerType?: string;
   footer: any;
   children: any;
   canMaskClick?: boolean;
   autoClose?: boolean;
   closeTimeout?: number;
   autoCloseCb?: any;
   timer: any;
}

export default class Modal extends React.Component<Props, State> {
  public state : State;
  constructor(props: Props){
    super(props);
    this.state = {
      visible: props.visible,  // 是否展示 默认不展示
      width: props.width != undefined ? (props.width + 'px') : null,  // 弹层宽度
      height: props.height != undefined ? (props.height + 'px') : null,  // 弹层高度
      closeBtn: props.closeBtn != undefined ? props.closeBtn : true, // 关闭按钮 默认展示
      title: props.title || '提示',  // 弹窗title 默认 提示
      footerType: props.footerType || 'default', // 弹窗底部 none/self/default 默认 展示默认底部
      footer: props.footer || [], // 弹窗底部 默认空
      children: props.children,  // 弹窗内容 必传
      canMaskClick: props.canMaskClick != undefined ? props.canMaskClick : true, // 弹窗遮罩是否可点击 默认可点击
      autoClose: props.autoClose != undefined ? props.autoClose : false, // 弹窗是否自动关闭 默认不自动关闭
      closeTimeout: props.closeTimeout || 3000, // 自动关闭时间 默认3000毫秒
      autoCloseCb: props.autoCloseCb, // 自动关弹层后回调
      timer: null
    };
  }
  public componentDidMount(){
    if(this.state.autoClose){
      this.state.timer = setTimeout(()=>{
        this.setState({
          visible: false
        }, ()=>{
          this.state.autoCloseCb && this.state.autoCloseCb();
        });
      }, this.state.closeTimeout);
    }
  }
  public clearTimeouts(){
    clearTimeout(this.state.timer);
  }
  public componentWillUnmount(){
    this.clearTimeouts();
  }
  public componentWillReceiveProps(newProps, newState){
    this.setState({
      visible: newProps.visible
    });
  }
  public closeModal(cb){
    this.setState({
      visible: false
    },()=>{
      cb && cb();
    });
  }
  public handleClose(){
    this.closeModal(function(){});
    this.clearTimeouts();
  }
  public handleCancel(){
    console.log('默认 cancel回调');
    this.props.onCancel();
    this.clearTimeouts();
  }
  public handleOk(){
    console.log('默认 ok回调');
    this.props.onOk();
    this.clearTimeouts();
  }
  public xx(fn){
    return ()=>{
      fn && fn();
      this.clearTimeouts();
    }
  }
  public render(){
    let { closeBtn, title, footerType, footer, height, width, canMaskClick, visible } = this.state;
    let { children } = this.props;
    return (
      <div className={classNames('gome-modal', { "hide": !visible })} >
        <Mask clickCb={this.handleClose.bind(this)} canClick={canMaskClick} />
        <div id="modalContent" className="gome-modal-content" style={{width, height}}>
          {closeBtn ? (<a className="gome-modal-close" onClick={this.handleClose.bind(this)}>x</a>) : null}
          <h3 className="gome-modal-header">
            <span>{title}</span>
          </h3>
          <div className="gome-modal-body">
            {children ? (Object.prototype.toString.call(children) === '[object Array]' ? children.map((item)=>item) : children) : null}
          </div>
          {footerType !== 'none' ? (
            <div className="gome-modal-foot">
              {footerType !== 'self' ? (
                <div>
                  {/*<button class="sure-default" onClick={this.handleClose.bind(this)}>确定</button>*/}
                  {<Button className="ok" onClick={this.handleOk.bind(this)}>确定</Button>}
                  {<Button className="cancel" onClick={this.handleCancel.bind(this)} type="primary">取消</Button>}
                </div>
              ) : (footer.length && <div>{footer.map((item)=>item)}</div>)
              }
            </div>) : null
          }
        </div>
      </div>
    );
  }
}
