import { describe, expect, test } from 'vitest';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('deletes a task', async () => {
    render(<App />);
    const deleteButton = await screen.getByText('Delete');
  
    fireEvent.click(deleteButton);
  
    expect(await screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
  
  test('edits a task', async () => {
    render(<App />);
    const editButton = await screen.getByText('Edit');
  
    fireEvent.click(editButton);
    const editInput = await screen.getByDisplayValue('Learn React');
    fireEvent.change(editInput, { target: { value: 'Learning React' } });
  });
  
  test('saves changes to a task', async () => {
    render(<App />);
    const editButton = await screen.getByText('Edit');
  
    fireEvent.click(editButton);
    const saveButton = await screen.getByText('Save changes');
    const editInput = await screen.getByDisplayValue('Learn React');
    fireEvent.change(editInput, { target: { value: 'Learning React' } });
  
    fireEvent.click(saveButton);
  
    expect(await screen.getByText('Learning React')).toBeInTheDocument();
  });
});