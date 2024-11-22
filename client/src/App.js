import React from 'react';
import FileManagement from './components/FileMangement';

const App = () => {
  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h1 style={styles.navTitle}>Aurva Scanner</h1>
        </div>
      </nav>
      <main style={styles.main}>
        <FileManagement />
      </main>
    </div>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  nav: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
  },
  navTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  },
};

export default App;
