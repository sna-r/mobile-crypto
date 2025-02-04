import React, { useState } from 'react';

const Connexion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gérer la soumission du formulaire ici (appel API, etc.)
    console.log('Email:', email, 'Mot de passe:', password);
  };

  return (
    <div className="form-container" style={styles.formContainer}>
      <div className="form-wrapper" style={styles.formWrapper}>
        <h2 className="form-title" style={styles.formTitle}>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="email" className="form-label" style={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              style={styles.formInput}
            />
          </div>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="password" className="form-label" style={styles.formLabel}>
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={styles.formInput}
            />
          </div>
          <button type="submit" className="form-button" style={styles.formButton}>
            Se connecter
          </button>
          <div className="form-footer" style={styles.formFooter}>
            <a href="#" style={styles.formFooterLink}>
              Mot de passe oublié ?
            </a>
          </div>
          <div className="form-footer" style={styles.formFooter}>
            <a href="/inscription" style={styles.formFooterLink}>
              Créer un compte
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#171717',
    fontFamily: 'sans-serif',
  },
  formWrapper: {
    backgroundColor: '#282c34',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '400px',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#61dafb',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    color: '#eee',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #555',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: '#3f444e',
    color: '#eee',
  },
  formButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#61dafb',
    color: '#282c34',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  formButtonHover: {
    backgroundColor: '#4db3ff',
  },
  formFooter: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#999',
  },
  formFooterLink: {
    color: '#61dafb',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  formFooterLinkHover: {
    color: '#4db3ff',
  },
};

export default Connexion;