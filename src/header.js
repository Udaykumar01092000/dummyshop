import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import App from './App';
import Home from './home';
import styles from './navcss.style.module.css';
const ProductSpec = lazy(() => import("./productspec"));
const Products = lazy(() => import("./Products"));
const gifUrl = process.env.PUBLIC_URL + '/gallery/loader.gif';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    setIsLoggedIn(false);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <BrowserRouter>
      <div className={styles.header}>
        <div className={styles.navcss}>
          <button className={styles.menuToggle} onClick={toggleMenu}>
            ☰
          </button>
          <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
            <NavLink to="/home" activeClassName={styles.active} onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/Products" activeClassName={styles.active} onClick={toggleMenu}>Products</NavLink>
            {isLoggedIn ? (
              <button onClick={() => {handleLogout(); toggleMenu();}} className={styles.logout}>Logout</button>
            ) : (
              <button onClick={() => {setIsLoggedIn(true); toggleMenu();}} className={styles.login}>Login</button>
            )}
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/Products"
          element={isLoggedIn ? (
            <Suspense fallback={<div style={{ textAlign: 'center' }}><img src={gifUrl} alt="Loading" /></div>}>
              <Products />
            </Suspense>
          ) : ""}
        />
        <Route
          path="/Products/:id"
          element={isLoggedIn ? (
            <Suspense fallback={<div style={{ textAlign: 'center' }}><img src={gifUrl} alt="Loading" /></div>}>
              <ProductSpec />
            </Suspense>
          ) : <Navigate to="/" />}
        />
        <Route path="/*" element={<h1 style={{ textAlign: 'center', marginTop: '100px', color: '#D10024' }}>404 Page Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Header;
