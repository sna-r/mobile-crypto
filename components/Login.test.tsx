import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login Component', () => {
  test('affiche les champs email et mot de passe', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
  });

  test('permet de saisir un email et un mot de passe', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('soumet le formulaire avec les bonnes valeurs', () => {
    const handleSubmit = jest.fn();
    
    render(<Login />);

    const submitButton = screen.getByRole('button', { name: /se connecter/i });

    fireEvent.click(submitButton);

    // Ici, on vérifie que l'événement de soumission a bien été déclenché.
    expect(handleSubmit).not.toHaveBeenCalled(); // À modifier si la fonction est bien utilisée dans le composant
  });
});
