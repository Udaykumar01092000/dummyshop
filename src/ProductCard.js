import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './products.style.module.css';

const ProductCard = ({ title, thumbnail, id, price, rating, activeCardId, setActiveCardId, category , brand }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('Card clicked:', id); // Debug statement
    if (setActiveCardId && typeof setActiveCardId === 'function') {
      setActiveCardId(id);
    }
    navigate(`/Products/${id}`);  // Updated route to productspec
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    navigate(`/Products/${id}`);
  };

  return (
    <div className=' col'>
    <div className = 'card' onClick={handleCardClick} style={{ cursor: "pointer"}}>
      <img src={thumbnail} className="card-img-top" id={styles.thumbnail} alt="..." />
      <div className="card-body">
        <h5 className = {styles.cardTitle}>{title}</h5>
        <div className = "card-title">
          <p className = {styles.cattext}><b className = {styles.category}>Brand: </b><span className={styles.cardcat}>{brand}</span></p>
          <p className = {styles.cattext}><b className = {styles.category}>Category: </b><span className={styles.cardcat}>{category}</span></p>
        </div>
        <div className={styles.priceContainer}>
          <hr className={styles.hrLeft} />
          <span className={styles.cardPrice}>${price}</span>
          <hr className={styles.hrRight} />
        </div>
        <div className={styles.priceContainer}>
          <p><b>Rating:</b><span className={styles.cardPrice}>{" " + rating + "/5 "}</span></p>
        </div>
        <div className={styles.detailsbtndiv}>
          <button className={styles.detailsbtn} onClick={handleButtonClick}>View More Details</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
