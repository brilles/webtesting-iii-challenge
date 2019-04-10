import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from 'react-testing-library';
import Dashboard from './Dashboard.js';

afterEach(() => {
  cleanup();
});

describe('<Dashboard />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
