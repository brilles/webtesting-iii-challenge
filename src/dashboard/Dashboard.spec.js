import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Dashboard from './Dashboard.js';
import Display from '../display/Display.js';

afterEach(() => {
  cleanup();
});

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders successfully', () => {
    render(<Dashboard />);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows the controls', () => {
    const { getByText } = render(<Dashboard />);
    getByText(/Lock Gate/i);
    getByText(/Close Gate/i);
  });

  it('shows the display', () => {
    const { getByText } = render(<Dashboard />);
    getByText(/Unlocked/i);
    getByText(/Open/i);
  });

  describe('Gate', () => {
    describe('Default View', () => {
      it('should default to unlocked', () => {
        const { getByText } = render(<Dashboard />);
        getByText(/Unlocked/i);
      });

      it('should default to open', () => {
        const { getByText } = render(<Dashboard />);
        getByText(/Open/i);
      });
    });

    describe('Constraints', () => {
      it('Cannot be closed or opened if it is locked', () => {
        const { getByText } = render(<Dashboard />);

        const closeBtn = getByText(/Close Gate/i);
        fireEvent.click(closeBtn);

        const openBtn = getByText(/Open Gate/i);

        const lockBtn = getByText(/Lock Gate/i);
        fireEvent.click(lockBtn);

        expect(openBtn.disabled).toBe(true);
        expect(closeBtn.disabled).toBe(true);
      });
    });
  });
});
