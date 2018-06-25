# 入门

> 创建一个项目

``` javascript
npm install -g create-react-app // 已安装可忽略
create-react-app gome-demo
cd gome-demo
```

> 安装

``` javascript
yarn add gome-react-ui
或者
npm install gome-react-ui
```





# 引入
> demo

``` javascript
import GomeReactUI from 'gome-react-ui';
let {Modal, Button} = GomeReactUI; // 导入相应组件
```




# modal
> demo

``` javascript
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import GomeReactUI from '../../../gome-react-ui/dist/gome-react-ui';
let {Modal, Button} = GomeReactUI;

export default class ModelTest extends Component{
  constructor(props){
    super();
    this.state = {
      visible: false,
      footerType: 'default',
      arr: ['aaa', 'bbb', 'ccc']
    }
  }
  static childContextTypes = {
    arr: PropTypes.array
  }
  getChildContext(){
    return {arr: this.state.arr}
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    console.log('自定义 ok回调');
    this.setState({ visible: false });
  }
  handleCancel = () => {
    console.log('自定义 cancel回调');
    this.setState({ visible: false });
  }
  componentDidMount(){
    setTimeout(()=>{
      this.showModal();
    }, 1000);
  }
  render(){
    let { footerType, visible } = this.state;
    const options = {
      visible,
      title: '自定义标题',
      footerType,
      closeBtn: true,
      canMaskClick: true,
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      // width: 800,
      // height: 500,
      // autoClose: true,
      // closeTimeout: 5000,
      footer: [
        <Button key="back" onClick={this.handleCancel}>return</Button>,
        <Button key="submit" onClick={this.handleOk} type="primary">submit</Button>
      ]
    };
    return (
      <div>
        <Modal {...options} >
          <p>第1行文字</p>
          <p>第2行文字</p>
          <p>第3行文字</p>
          <p>第3行文字</p>
          <p>第3行文字</p>
          <p>第3行文字</p>
          <p>第3行文字</p>
          <p>第4行文字</p>
        </ Modal>
      </div>
    )
  }
}


```

> modal参数列表

| 参数             |    说明       | 类型        | 默认值        |
| :--------       | --------:      | :--:       | :--:       |
| visible        | 是否展示弹层       |  boolean         | 无          |
| title           |   弹窗头部内容展示       |  string       | '提示'          |
| closeBtn           |   是否需要关闭按钮       |  boolean       | true          |
| width            |    弹层宽度      | number       | 无          |
| height            |    弹层高度      | number       | 无          |
| footerType            |    弹层底部是否展示     | boolean       | true          |
| 组件中间内容           |    弹层主体内容      | dom       | 无          |
| onOk           |    点击底部确定按钮回调      | function       | 无          |
| onCancel           |    点击底部取消按钮回调      | function       | 无          |
| canMaskClick           |    点击遮罩是否隐藏弹窗      | boolean       | true          |
| autoClose           |    点击自动关闭      | boolean       | false          |
| closeTimeout           |    自动关闭时间（autoClose为true时生效）      | number       | 3000          |
| btnType         |    按钮类型 'sure'/'cancel'/'both'       | string       | 'sure'   |  
| okText         |    确定按钮文字       | string       | '确定'   |  
| cancelText         |    取消按钮文字       | string       | '取消'   |  
| btnArr



























> other
