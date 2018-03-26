import * as React from "react";
import classNames from 'classnames';
console.log(classNames);
import PropTypes from 'prop-types';
import Button from '../Button';
import './index.scss';
import Mask from './mask';

interface ModalProps  {
  visible : boolean;
  width: any;
  height: any;
  closeBtn: boolean|undefined;
  title: string|undefined;
  footerType: string|undefined;
  footer: any;
  children: any;
  canMaskClick: boolean|undefined;
  autoClose: boolean|undefined;
  closeTimeout: number|undefined;
  onCancel: any;
  onOk: any;
}

interface ModalState {
   visible : boolean;
   width: any;
   height: any;
   closeBtn: boolean|undefined;
   title: string|undefined;
   footerType: string|undefined;
   footer: any;
   children: any;  // 弹窗内容 必传
   canMaskClick: boolean|undefined;
   autoClose: boolean|undefined;
   closeTimeout: number|undefined;
}

export default class Model extends React.Component<ModalProps, ModalState> {
  public state : ModalState;

  constructor(props: ModalProps){
    super(props);
    this.state = {
      visible: props.visible,  // 是否展示 默认不展示
      width: props.width != undefined ? (props.width + 'px') : '520px',  // 弹层宽度 默认520px
      height: props.height != undefined ? (props.height + 'px') : '350px',  // 弹层高度 默认520px
      closeBtn: props.closeBtn != undefined ? props.closeBtn : true, // 关闭按钮 默认展示
      title: props.title || '提示',  // 弹窗title 默认 提示
      footerType: props.footerType || 'default', // 弹窗底部 none/self/default 默认 展示默认底部
      footer: props.footer || [], // 弹窗底部 默认空
      children: props.children,  // 弹窗内容 必传
      canMaskClick: props.canMaskClick != undefined ? props.canMaskClick : true, // 弹窗遮罩是否可点击 默认可点击
      autoClose: props.autoClose != undefined ? props.autoClose : false, // 弹窗是否自动关闭 默认不自动关闭
      closeTimeout: props.closeTimeout || 3000 // 自动关闭时间 默认3000毫秒
    };
  }
  public componentDidMount(){
    if(this.state.autoClose){
      setTimeout(()=>{
        this.setState({
          visible: false
        });
      }, this.state.closeTimeout);
    }
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
  }
  public handleCancel(){
    console.log('默认 cancel');
    this.props.onCancel();
    // this.closeModal();
  }
  public handleOk(){
    console.log('默认 ok');
    this.props.onOk();
    // this.closeModal(this.props.onOk);
  }
  public render(){
    let { closeBtn, title, footerType, footer, children, height, width, canMaskClick, visible } = this.state;
    // classnames + typescript 结合有问题 不知如何给默认类型
    // const collapsePanelClassName:string = classNames({
    //   "gome-modal": true,
    //   "hide": !visible
    // });

    let isHide:string = !visible ? 'hide': '';
    return (
      <div className={"gome-modal " + isHide}>
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
                  <Button className="ok" onClick={this.handleOk.bind(this)}>ok</Button>
                  {/*<Button className="cancel" onClick={this.handleCancel.bind(this)} type="primary">Cancel</Button>*/}
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
