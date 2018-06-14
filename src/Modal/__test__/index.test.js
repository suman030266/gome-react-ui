import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../index.tsx';
// import Button from '../../Button/index.tsx';
import { shallow, mount, render, configure } from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
configure({ adapter: new Adapter() });

// test('Jest-React-TypeScript 尝试运行', () => {
//   const renderer = shallow(<div>hello world</div>)
//   expect(renderer.text()).toEqual('hello world');
// });
describe('Modal 测试用例', () => {
  test('测试组件是否正常挂载', () => {
    var wrapper = shallow(
      <Modal
        visible={true}
        title={'第一个弹窗'}
        footerType={'none'}
      >
        <p>第1行文字</p>
        <p>第2行文字</p>
      </Modal>
    );
    expect(wrapper.find('.gome-modal-content').exists());
    expect(!wrapper.find('.gome-modal-foot').exists());
  });

  test('1. 自定义标题 无宽高', () => {
    const wrapper = shallow(
      <Modal
        visible={true}
        title={'hello'}
        footerType={'none'}
      >
        <p>第1行文字</p>
        <p>第2行文字</p>
      </ Modal>
    );
    expect(wrapper.find('.gome-modal-header span').text()).toEqual('hello');
    expect(wrapper.find('.gome-modal-close').length).toEqual(1);
  });

  test('2. 默认标题 尾部展示默认 宽600', () => {
    const wrapper = shallow(
      <Modal
        visible={true}
        footerType={'default'}
        width={600}
      >
        <p>第1行文字</p>
        <p>第2行文字</p>
        <p>第3行文字</p>
        <p>第4行文字</p>
      </ Modal>
    );
    expect(wrapper.find('.gome-modal-header span').text()).toEqual('提示');
    expect(wrapper.find('.gome-modal-foot').exists());
    expect(wrapper.find('.gome-modal-body').exists());
    expect(wrapper.find('.gome-modal-body p').length).toEqual(4);
    // expect(wrapper.find('.gome-modal-foot .gome-btn-def span').text()).toEqual('确定');
    // expect(wrapper.find('.gome-modal-foot .gome-btn-primary span').text()).toEqual('取消');
    // ??????????? 暂时无法获取width
    // console.dir(wrapper.find('.gome-modal'));
  });

  test('3. 自定义展示尾部 不展示关闭按钮', () => {
    const ModalObj = <Modal
      visible={true}
      footerType={'self'}
      closeBtn={false}
      footer={[
        // <Button key="back">return</Button>,
        // <Button key="submit" type="primary">submit</Button>
        <button key="1">return</button>
      ]}
    >
      <p>111</p>
      <p>222</p>
    </ Modal>;
    const wrapper = shallow(ModalObj);
    expect(wrapper.find('.gome-modal-close').length).toEqual(0);
    expect(wrapper.find('.gome-modal-foot').exists());
    expect(wrapper.find('.gome-modal-foot button').text()).toEqual('return');
    wrapper.find('.gome-modal-foot button').simulate('click');
    expect(wrapper.find('.gome-modal-foot').exists());
    expect(!wrapper.find('.gome-modal').exists());
  });

  test('4. 自定义展示尾部 自定义事件', () => {
    const ModalObj = <Modal
      visible={true}
      footerType={'self'}
      width={600}
      footer={[
        // <Button key="back">return</Button>,
        // <Button key="submit" type="primary">submit</Button>
        <button className="btn1" key="1">return</button>,
        <button className="btn2" key="2">submit</button>
      ]}
      title={"即将关闭"}
      onOk={()=>{console.log('ooooooo');}}
      onCancel={()=>{console.log('ccccccc');}}
    >
      <p>第1行文字</p>
    </ Modal>;
    const wrapper1 = shallow(ModalObj);
    const wrapper2 = shallow(ModalObj);
    wrapper1.find('.gome-modal-foot .btn1').simulate('click');
    expect(!wrapper1.find('.gome-modal').exists());
    wrapper2.find('.gome-modal-foot .btn2').simulate('click');
    expect(!wrapper2.find('.gome-modal').exists());
  });

  test('5. 点击关闭 默认事件', () => {
    const wrapper = mount(
      <Modal
        visible={true}
        title={"即将关闭"}
        footerType={'none'}
      >
        <p>第1行文字</p>
      </ Modal>
    );
    expect(wrapper.find('.gome-modal.hide').length).toEqual(0);
    wrapper.find('.gome-modal-close').simulate('click');
    expect(wrapper.find('.gome-modal.hide').length).toEqual(1);
  });

  test('6. 点击确定 取消', () => {
    const ModalObj = <Modal
      visible={true}
      footerType={'default'}
      title={"title"}
      onOk={()=>{console.log('自定义 ok回调');}}
      onCancel={()=>{console.log('自定义 cancel回调');}}
    >
      <p>第1行文字</p>
      <p>第2行文字</p>
    </ Modal>;
    const wrapper1 = mount(ModalObj);
    const wrapper2 = mount(ModalObj);
    expect(wrapper1.find('.gome-btn.gome-btn-def').length).toEqual(1);
    wrapper1.find('.gome-btn.gome-btn-def').simulate('click');
    expect(wrapper2.find('.gome-btn.gome-btn-primary').length).toEqual(1);
    wrapper2.find('.gome-btn.gome-btn-primary').simulate('click');
  });

  test('7. 点击遮罩层 关闭弹层', () => {
    const ModalObj = <Modal
      visible={true}
      footerType={'default'}
      title={"title"}
      canMaskClick={true}
      onOk={()=>{console.log('ooooooo');}}
      onCancel={()=>{console.log('ccccccc');}}
    >
      <p>第1行文字</p>
      <p>第2行文字</p>
    </ Modal>;
    const ModalObj2 = <Modal
      visible={true}
      footerType={'default'}
      title={"title"}
      canMaskClick={false}
      onOk={()=>{console.log('ooooooo');}}
      onCancel={()=>{console.log('ccccccc');}}
    >
      <p>第1行文字</p>
      <p>第2行文字</p>
    </ Modal>;
    const wrapper1 = mount(ModalObj);
    const wrapper2 = mount(ModalObj2);
    wrapper1.find('.gome-modal-mask').simulate('click');
    expect(wrapper1.find('.gome-modal.hide').length).toEqual(1);
    wrapper2.find('.gome-modal-mask').simulate('click');
    expect(wrapper2.find('.gome-modal.hide').length).toEqual(0);
  });

  test('8. 自动关闭 默认3000', (done) => {
    const mockFn = jest.fn();
    const ModalObj1 = <Modal
      visible={true}
      canMaskClick={true}
      autoClose={true}
      autoCloseCb={mockFn}
    >
      <p>第1行文字</p>
      <p>第2行文字</p>
    </ Modal>;
    const wrapper1 = mount(ModalObj1);
    expect(mockFn).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
    done();
  });
});
