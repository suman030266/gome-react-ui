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
import Con1 from './con1';
import PropTypes from 'prop-types';
import GomeReactUI from 'gome-react-ui';
let {Modal, Button} = GomeReactUI;

export default class ComponentName extends Component{
  constructor(props){
    super();
    this.state = {
      visible: false,
      footerType: 'self',
      width: 800
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    console.log('自定义 ok');
    this.setState({ visible: false });
  }
  handleCancel = () => {
    console.log('自定义 cancel');
    this.setState({ visible: false });
  }
  componentDidMount(){
    this.showModal();
  }
  render(){
    let { footerType, visible } = this.state;
    const options = {
      visible,
      footerType,
      closeBtn: false,
      canMaskClick: false,
      title: "传入标题",
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      closeTimeout: 5000,
      footer: [
        <Button key="back" onClick={this.handleCancel}>return</Button>,
        <Button key="submit" onClick={this.handleOk} type="primary">submit</Button>
      ]
    };
    return (
      <div>
        <Modal {...options} >
          <p>弹窗主体内容</p>
          <p>可以是dom元素、组件</p>
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
| footerType            |    弹层底部展示  'default'默认按钮 'none'不展示底部 'self'自定义底部内容     | string       | 'default'          |
| footer            |    弹层底部内容（footerType为 'self'时生效）      | Array       | 无         |
| 组件中间内容           |    弹层主体内容      | dom       | 无          |
| onOk           |    点击底部确定按钮回调      | function       | 无          |
| onCancel           |    点击底部取消按钮回调      | function       | 无          |
| canMaskClick           |    点击遮罩是否隐藏弹窗      | boolean       | true          |
| autoClose           |    点击自动关闭      | boolean       | false          |
| closeTimeout           |    自动关闭时间（autoClose为true时生效）      | number       | 3000          |




























> other
