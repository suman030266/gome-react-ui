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

> 启动项目

``` javascript
yarn start
```

> 引入&&使用

``` javascript
import React,{Component} from 'react';
import GomeReactUI from '../../../gome-react-ui/dist/gome-react-ui';
let {Modal, Button} = GomeReactUI;

export default class ModelTest extends Component{
  constructor(props){
    super();
    this.state = {
      visible: false,
      footerType: 'default',
      width: 800
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ visible: false });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  componentDidMount(){
    setTimeout(()=>{
      this.showModal();
    }, 3000);
  }
  defaultCancelCb(){
    console.log('cccccc');
  }
  defaultOkCb(){
    console.log('okokok');
  }
  render(){
    let { visible, loading, footerType, width} = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          title={"传入标题"}
          width={width}
          defaultCancelCb={this.defaultCancelCb}
          defaultOkCb={this.defaultOkCb}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footerType={footerType}
          footer={[
            <Button key="back" onClick={this.handleCancel}>return</Button>,
            <Button key="submit" onClick={this.handleOk} type="primary">submit</Button>,
          ]}
        >
          <p>第1行文字</p>
          <p>第2行文字</p>
        </ Modal>
      </div>
    )
  }
}
```

> 参数列表

| 参数             |    说明       | 类型        | 默认值        |
| :--------       | --------:      | :--:       | :--:       |
| visible        | 是否展示弹层       |  boolean         | 无          |
| title           |   弹窗头部内容展示       |  string       | 无          |
| width            |    弹层宽度      | number       | 520          |
| footerType            |    弹层底部展示  'default'默认按钮 'none'不展示底部 'self'自定义底部内容     | string       | 'default'          |
| footer            |    弹层底部内容      | Array       | 无         |
| width            |    弹层宽度      | number       | 520          |
| 组件中间内容           |    弹层主体内容      | dom       | 无          |
| onOk           |    点击底部确定按钮回调      | function       | 无          |
| onCancel           |    点击底部取消按钮回调      | function       | 无          |


































> aa
