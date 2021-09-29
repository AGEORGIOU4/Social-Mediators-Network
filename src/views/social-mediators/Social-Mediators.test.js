import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Social-Mediators';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Social-Mediators />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Social-Mediators />);
});
