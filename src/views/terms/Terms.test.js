import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Terms';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Terms />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Terms />);
});
