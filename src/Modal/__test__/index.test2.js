import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../index';
import Button from '../../Button/index';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
// import TestUtils from 'react-addons-test-utils';
import ReactTestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });
(function (){
  const setup = () => {
    const props = {
      onAddClick: jest.fn()
    };
    const wrapper = shallow(
      <Modal
        visible={true}
        title={"第一个弹窗"}
        footerType={'none'}
      >
        <p>第1行文字</p>
        <p>第2行文字</p>
      </ Modal>);
    return {
      props,
      wrapper
    }
  };
  describe('测试组件是否正常挂载', () => {
    const { wrapper } = setup();
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
  console.log('tree----before');
  console.log(JSON.stringify(tree));
  console.log('tree----after');
});

test('测试第2个 默认标题 尾部展示默认 宽600', () => {
  const component2 = renderer.create(
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
  let tree = component2.toJSON();
  expect(tree).toMatchSnapshot();
  console.log('tree----before');
  console.log(JSON.stringify(tree));
  console.log('tree----after');
});

test('测试第3个自定义展示尾部', () => {
  const component3 = renderer.create(
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
  let tree = component3.toJSON();
  expect(tree).toMatchSnapshot();
  console.log('tree----before');
  console.log(JSON.stringify(tree));
  console.log('tree----after');
});

describe('点击关闭', () => {
  it('测试是否关闭', () => {
    const component = renderer.create(
      <Modal
        visible={true}
        title={"即将关闭"}
        footerType={'none'}
      >
        <p>第1行文字</p>
      </ Modal>
    );

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();

    ReactTestUtils.Simulate.click('.gome-modal-close',);
    snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
    console.log('-=-=-=-=-=-=-=-=-=-=');
    console.log(snapshot);
  });
});

//---------------------jest 实现第一版











//
