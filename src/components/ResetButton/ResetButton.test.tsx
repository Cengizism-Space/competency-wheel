import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetButton from './ResetButton';

describe('ResetButton', () => {
  test('renders ResetButton component and checks the text', () => {
    render(<ResetButton />);
    
    // Check if "Restart" text is in the document
    const resetText = screen.getByText(/Restart/i);
    expect(resetText).toBeInTheDocument();
  });
});