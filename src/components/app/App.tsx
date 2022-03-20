import React from 'react';
import appStyles from './app.module.css';

function App() {
  return (
      <div className={appStyles.app}>
        <AppHeader />
        <BurgerIngredients />
      </div>
  );
}

export default App;
