import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import './index.scss';
import Button from '../Button';

import Mask from './mask';

interface Props {
  id: number;
  visible : boolean;
  width?: string;
  height?: any;
  closeBtn?: boolean;
  title?: string;
  footerShow?: boolean;
  children: any;
  canMaskClick?: boolean;
  autoClose?: boolean;
  closeTimeout?: number;
  onCancel: any;
  onOk: any;
  autoCloseCb?: any;
  btnType?: string;
  okText?: string;
  cancelText?: string;
  btnArr?: any;
  dong?: boolean;
}

interface State {
  id: number;
  visible : boolean;
  width?: string;
  height?: any;
  closeBtn?: boolean;
  title?: string;
  footerShow?: boolean;
  children: any;
  canMaskClick?: boolean;
  autoClose?: boolean;
  closeTimeout?: number;
  autoCloseCb?: any;
  timer: any;
  btnType?: string;
  okText?: string;
  cancelText?: string;
  btnArr?: any;
  dong?: boolean;
}

interface Utils {
  handleClose: any;
  handleCancel: any;
  handleOk: any;
}

export default class Modal extends React.Component<Props, State> {
  public state : State;
  public wrap : any;
  public ele : any;
  // public utils : Utils;
  constructor(props: Props){
    super(props);
    this.state = {
      id: props.id,  // 每个弹窗都有自己的id 是一个传入的随机数
      visible: props.visible,  // 是否展示 默认不展示
      width: props.width != undefined ? (props.width + 'px') : null,  // 弹层宽度
      height: props.height != undefined ? (props.height + 'px') : null,  // 弹层高度
      closeBtn: props.closeBtn != undefined ? props.closeBtn : true, // 关闭按钮 默认展示
      title: props.title || '提示',  // 弹窗title 默认 提示
      footerShow: props.footerShow || true, // 弹窗底部 true/false 是否展示 默认true
      children: props.children,  // 弹窗内容 必传
      canMaskClick: props.canMaskClick != undefined ? props.canMaskClick : true, // 弹窗遮罩是否可点击 默认可点击
      autoClose: props.autoClose != undefined ? props.autoClose : false, // 弹窗是否自动关闭 默认不自动关闭
      closeTimeout: props.closeTimeout || 3000, // 自动关闭时间 默认3000毫秒
      autoCloseCb: props.autoCloseCb, // 自动关弹层后回调
      timer: null, // 存储自动关闭弹窗定时器
      btnType: props.btnType || 'sure',  // 按钮展示类型 默认只展示一个确定按钮
      okText: props.okText || '确定',  // 确定按钮文字 默认确定
      cancelText: props.cancelText || '取消', // 取消按钮文字 默认取消
      btnArr: props.btnArr || [],  // 自定义按钮可传入一个数组
    };
    this.wrap = null;
    // this.utils;
    // this.hadlesArr: any[] = ['Close', 'Cancel', 'Ok'];
  }
  public append(){
    if(this.state.visible){
      this.wrap = document.createElement('div');
      this.wrap.className = 'ele' + this.props.id;
      ReactDOM.render(this._render(), this.wrap);
      document.body.appendChild(this.wrap);
      if(document.getElementsByClassName('ele' + this.state.id).length == 2){
        document.body.removeChild(document.getElementsByClassName('ele' + this.state.id)[1]);
      }
      if(this.state.autoClose){
        this.state.timer = setTimeout(()=>{
          this.closeModal();
          this.state.autoCloseCb && this.state.autoCloseCb();
        }, this.state.closeTimeout);
      }
    }else{
      console.log('append 不让元素创建');
    }
  }
  public componentDidMount(){
    console.log('componentDidMount');
    this.append();
    // this.hadlesArr.forEach(item =>{
    //   this.utils[`handle ${item}`] = this.handle(item);
    // });
  }
  public clearTimeouts(){
    clearTimeout(this.state.timer);
  }
  public componentWillUnmount(){
    this.clearTimeouts();
  }
  public componentWillReceiveProps(newProps, newState){
    let eles = document.getElementsByClassName('ele' + newProps.id)[0];
    console.log(eles, newProps.visible);
    console.dir(newProps.id);
    if(newProps.visible){
      this.setState({
        visible: newProps.visible,
        id: newProps.id
      }, ()=>{
        console.log('接收到新的props 要创建组件了');
        this.append();
      });
    }else{
      console.log('销毁');
      this.setState({
        id: newProps.id
      }, ()=>{
        this.closeModal();
      });

    }
  }
  public closeModal(cb=()=>{}){
    try{
      document.body.removeChild(document.getElementsByClassName('ele' + this.state.id)[0]);
    }catch(e){
      console.log(e);
    }
    cb && cb();
  }
  public handleClose(){
    this.closeModal();
    this.clearTimeouts();
  }
  public handleCancel(){
    console.log('默认 cancel回调');
    this.props.onCancel && this.props.onCancel();
    this.handleClose();
  }
  public handleOk(){
    console.log('默认 ok回调');
    this.props.onOk && this.props.onOk();
    this.handleClose();
  }
  // 高阶函数 待修改
  // public handle(str){
  //   return ()=>{
  //     console.log('默认 ${str}回调');
  //     this.props[`on${str}`] && this.props[`on${str}`]();
  //     this.clearTimeouts();
  //   }
  // }
  public _render(){
    let { closeBtn, title, footerShow, height, width, canMaskClick, visible, btnType, okText, cancelText, btnArr } = this.state;
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
          {footerShow ? (
            <div className="gome-modal-foot">
              {
                (btnType == 'sure' || btnType == 'cancel' || btnType == 'both') && !btnArr.length ? (
                  btnType == 'sure' ? <Button className="ok" onClick={this.handleOk.bind(this)}>{okText}</Button> : (
                    btnType == 'cancel' ? (
                      <Button className="cancel" onClick={this.handleCancel.bind(this)} type="primary">{cancelText}</Button>
                    ) : btnType == 'both' ? (
                      <React.Fragment>
                        <Button className="ok" onClick={this.handleOk.bind(this)}>{okText}</Button>
                        <Button className="cancel" onClick={this.handleCancel.bind(this)} type="primary">{cancelText}</Button>
                      </React.Fragment>
                    ) : null
                  )
                ) : (
                  btnArr.length && (btnArr.map( item =>{
                    return <Button key={item.index} {...item} className={item.classNames} onClick={item.click.bind(this)}>{item.text}</Button>;
                  }))
                )
              }
              {/*footerShow !== 'self' ? (
                <div>
                  {<Button className="ok" onClick={this.handleOk.bind(this)}>确定</Button>}
                  {<Button className="cancel" onClick={this.handleCancel.bind(this)} type="primary">取消</Button>}
                </div>
              ) : (footer.length && <div>{footer.map((item)=>item)}</div>)
              */}
            </div>) : null
          }
        </div>
      </div>
    );
  }
  public render(){
    return null;
  }
}
