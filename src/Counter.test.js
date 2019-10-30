import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Counter from "./components/Counter";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { incrementCounter } from './actions';
import { counterReducer } from './reducers';

import { createStore } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

describe("Counter redux pieces", () => {
  let store;

  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it("sends an increment counter action", () => {
    store.dispatch(incrementCounter());
    expect(store.getActions()).toEqual([{ type: "INCREMENT_COUNTER" }]);
  });

  it('applies the counter reducer for increment correctly', () => {
    // given
    const beforeState = {count: 0};
    const action = {type: 'INCREMENT_COUNTER'};
    // when
    const afterState = counterReducer(beforeState, action);
    // then
    expect(afterState).toEqual({count: 1});
  });
})

describe('Counter integration test', () => {
    let store;
  
    beforeEach(() => {
      store = createStore(counterReducer);
    });
  
    it('increments the counter text when the button is clicked', () => {
      const wrapper = mount(<Provider store={store}><App /></Provider>);
      wrapper.find('button').simulate('click');
      wrapper.update();
      expect(wrapper.find('h1').text()).toEqual('1');
      wrapper.find('button').simulate('click');
      wrapper.update();
      expect(wrapper.find('h1').text()).toEqual('2');
    })
  })
