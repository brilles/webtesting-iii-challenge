// Test away!
import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Controls from './Controls.js';

describe('<Controls/>', () => {
  it('provide buttons to toggle the closed and locked states', () => {
    const { getByText } = render(<Controls />);

    const closeBtn = getByText(/Close Gate/i);
    const LockBtn = getByText(/Lock Gate/i);
    expect(closeBtn).not.toBeNull();
    expect(LockBtn).not.toBeNull();
  });

  it('buttons text changes to reflect the state the door will be in if clicked', () => {
    const { getByText } = render(<Controls locked={false} closed={true} />);
    const openBtn = getByText(/Open Gate/i);
    expect(openBtn).not.toBeNull();
  });

  it('the closed toggle button is disabled if the gate is closed', () => {
    const { queryByText } = render(<Controls />);

    let closeBtn = queryByText(/Close Gate/i);
    fireEvent.click(closeBtn);
    let closeBtn2 = queryByText(/Open Gate/i);

    expect(closeBtn2.disabled).toBe(false);
  });

  it('the locked toggle button is disabled if the gate is open', () => {
    const { queryByText } = render(<Controls />);
    let closeBtn = queryByText(/Close Gate/i);
    fireEvent.click(closeBtn);
    let lockBtn = queryByText(/Lock Gate/i);
    fireEvent.click(lockBtn);
    let lockBtn2 = queryByText(/Lock Gate/i);

    expect(lockBtn2.disabled).toBe(true);
  });
});
