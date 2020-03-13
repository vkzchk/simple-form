import React from 'react';
import styles from './App.module.css';
import Header from './components/header/header'

const App = ({children}) => {
  return (
    <div className={styles.App}>
      <Header />
      {children}
    </div>
  );
}

export default App;
