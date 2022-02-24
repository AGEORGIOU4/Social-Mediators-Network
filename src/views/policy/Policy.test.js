import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Policy';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Policy />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Policy />);
});
