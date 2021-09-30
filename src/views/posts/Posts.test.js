import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Posts';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Posts />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Posts />);
});
