import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../index';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

// 测试组件是否正常挂载
(function (){
  const wrapper = shallow(
    <Button>btn</Button>
);
  describe('测试组件是否正常挂载', () => {
    it('Button Component should be render', () => {
      expect(wrapper.find('button').exists());
      expect(wrapper.find('span').exists());
    })
  });
})();
