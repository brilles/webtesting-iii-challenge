// Test away!
import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Display from './Display.js';

describe('<Display />', () => {
  it('displays if gate is open and if it is unlocked, with correct props', () => {
    const { queryByText } = render(<Display locked={false} closed={false} />);

    expect(queryByText(/Open/i)).not.toBeNull();
    expect(queryByText(/Unlocked/i)).not.toBeNull();
  });

  it('displays if gate is closed and if it is locked, with correct props', () => {
    const { getByText } = render(<Display locked={true} closed={true} />);
    getByText(/UnLocked/i);
    getByText(/Closed/i);
  });

  it('when locked or closed use the red-led class', () => {
    const { container } = render(<Display locked={true} closed={true} />);
    expect(container.firstChild.firstChild).toHaveClass('red-led');
  });

  it('when unlocked or open use the green-led class', () => {
    const { container } = render(<Display locked={false} closed={false} />);
    expect(container.firstChild.firstChild).toHaveClass('green-led');
  });
});
