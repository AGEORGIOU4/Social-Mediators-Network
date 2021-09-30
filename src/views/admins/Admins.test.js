import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Admins';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Admins />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Admins />);
});
