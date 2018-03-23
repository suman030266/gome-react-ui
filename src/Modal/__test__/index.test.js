import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../index';
import Button from '../../Button/index';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

// 测试组件是否正常挂载
(function (){
  const wrapper = shallow(
    <Modal
      visible={true}
      footerType={'none'}
    >
      <p>第1行文字</p>
      <p>第2行文字</p>
    </ Modal>);
  describe('测试组件是否正常挂载', () => {
    it('Modal Component should be render', () => {
      expect(wrapper.find('.gome-modal-content').exists());
      expect(!wrapper.find('.gome-modal-foot').exists());
    })
  });
})();

test('测试第1个 自定义标题 head不传入 无尾部 无宽度', () => {
  const component = renderer.create(
    <Modal
      visible={true}
      title={"第一个弹窗"}
      footerType={'none'}
    >
      <p>第1行文字</p>
      <p>第2行文字</p>
    </ Modal>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // console.log('tree----before');
  // console.log(JSON.stringify(tree));
  // console.log('tree----after');
});

test('测试第2个 默认标题 尾部展示默认 宽600', () => {
  const component = renderer.create(
    <Modal
      visible={true}
      footerType={'default'}
      width={600}
    >
      <p>第1行文字</p>
      <p>第2行文字</p>
      <p>第3行文字</p>
      <p>第4行文字</p>
    </ Modal>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // console.log('tree----before');
  // console.log(JSON.stringify(tree));
  // console.log('tree----after');
});

test('测试第3个自定义展示尾部', () => {
  const component = renderer.create(
    <Modal
      visible={true}
      footerType={'self'}
      width={800}
      footer={[
        <Button key="back">return</Button>,
        <Button key="submit" type="primary">submit</Button>
      ]}
    >
      <p>111</p>
    </ Modal>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // console.log('tree----before');
  // console.log(JSON.stringify(tree));
  // console.log('tree----after');
});

// 点击关闭
(function (){
  const wrapper = shallow(
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
})();




test('测试第3个自定义展示尾部', () => {
  const component = renderer.create(
    <Modal
      visible={true}
      footerType={'default'}
      footer={[
        <Button key="back">return</Button>,
        <Button key="submit" type="primary">submit</Button>
      ]}
      title={"即将关闭"}
      onOk={()=>{console.log('ooooooo');}}
      onCancel={()=>{console.log('ccccccc');}}
    >
      <p>第1行文字</p>
    </ Modal>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // console.log('tree----before');
  console.log(JSON.stringify(tree));
  // console.log('tree----after');
});

// 点击确定
(function (){
  const wrapper = mount(
    <Modal
      visible={true}
      footerType={'default'}
      footer={[
        <Button key="back">return</Button>,
        <Button key="submit" type="primary">submit</Button>
      ]}
      title={"即将关闭"}
      onOk={()=>{console.log('ooooooo');}}
      onCancel={()=>{console.log('ccccccc');}}
    >
      <p>第1行文字</p>
    </ Modal>
  );
  expect(wrapper.find('.gome-btn.gome-btn-def').length).toEqual(1);
  wrapper.find('.gome-btn.gome-btn-def').simulate('click');
  expect(wrapper.find('.gome-btn.gome-btn-primary').length).toEqual(1);
  expect(wrapper.find('.gome-modal.hide').length).toEqual(1);
})();

// 点击取消
(function (){
  const wrapper = mount(
    <Modal
      visible={true}
      footerType={'default'}
      footer={[
        <Button key="back">return</Button>,
        <Button key="submit" type="primary">submit</Button>
      ]}
      title={"即将关闭"}
      onOk={()=>{console.log('ooooooo');}}
      onCancel={()=>{console.log('ccccccc');}}
    >
      <p>第1行文字</p>
    </ Modal>
  );
  expect(wrapper.find('.gome-btn.gome-btn-def').length).toEqual(1);
  expect(wrapper.find('.gome-btn.gome-btn-primary').length).toEqual(1);
  wrapper.find('.gome-btn.gome-btn-primary').simulate('click');
  expect(wrapper.find('.gome-modal.hide').length).toEqual(1);
})();


























//
