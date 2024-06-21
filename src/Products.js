import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import styles from './products.style.module.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false);
  
  const apiUrl = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get(apiUrl)
      .then((res) => {
        setProducts(res.data.products);
        setFilteredItems(res.data.products); // Set filteredItems to include all products initially
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => {
    const filtered = products.filter((item) => 
      (item.title && typeof item.title === 'string' && item.title.toLowerCase().includes(userSearch.toLowerCase())) ||
      (item.category && typeof item.category === 'string' && item.category.toLowerCase().includes(userSearch.toLowerCase())) ||
      (item.brand && typeof item.brand === 'string' && item.brand.toLowerCase().includes(userSearch.toLowerCase()))
    );
    setFilteredItems(filtered);
    setNoProductsFound(filtered.length === 0);
  }, [userSearch, products]);
  
  const handleSearchChange = (e) => {
    setUserSearch(e.target.value);
  };

  const showFilteredResult = (category) => {
    let filtered;
    if (category === "") {
      filtered = products;
      setUserSearch("");
    } else if (category === "4.5rating") {
      filtered = products.filter((item) => item.rating >= 4.5);
    } else if (category === "laptops") {
      filtered = products.filter((item) => item.category.toLowerCase() === "laptops");
    } else if (category === "ratingHighToLow") {
      filtered = [...products].sort((a, b) => b.rating - a.rating);
    } else if (category === "ratingLowToHigh") {
      filtered = [...products].sort((a, b) => a.rating - b.rating);
    } else if (category === "pricelowtohigh") {
      filtered = [...products].sort((a, b) => a.price - b.price);
    } else if (category === "pricehightolow") {
      filtered = [...products].sort((a, b) => b.price - a.price);
    } else {
      filtered = products.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    setFilteredItems(filtered);
    setNoProductsFound(filtered.length === 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-between align-items-center">
        <div className="col-12 col-md-6 col-lg-4 offset-lg-2 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start">
          <div className={styles.searchfield}>
            <input
              placeholder="Search Products by title/brand/category"
              value={userSearch}
              onChange={handleSearchChange}
              className={styles.formControl}
            />
            <p style={{ color: "#D10024", marginTop: '10px' }}>Please type the lower case letters</p>
          </div>
        </div>
        <div className="col-12 col-md-3 col-lg-2 d-flex justify-content-end">
          <div className="dropdown">
            <button className={`${styles.btn} ${styles['btn-secondary']} ${styles['dropdown-toggle']}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Filter Products <i className="bi bi-funnel"></i>
            </button>
            <ul className={`dropdown-menu ${styles.dropdownMenu}`} aria-labelledby="dropdownMenuButton1">
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("")}>Show All Products</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("pricelowtohigh")}><b>Price : </b> Low to High</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("pricehightolow")}><b>Price : </b> High to Low</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("4.5rating")}><span style={{ fontWeight: "700" }}>Rating:</span> 4.5+ products</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("ratingHighToLow")}><span style={{ fontWeight: "700" }}>Rating:</span> High to Low</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("ratingLowToHigh")}><span style={{ fontWeight: "700" }}>Rating:</span> Low to High</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("laptops")}>Laptops</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("smartphones")}>Smart Phones</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("skincare")}>Skin Care</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("fragrances")}>Fragrances</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("groceries")}>Groceries</a></li>
              <li><a className={styles.dropdownItem} href="#" onClick={() => showFilteredResult("home-decoration")}>Home Decoration</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {noProductsFound ? (
          <div className="col">
            <p className={styles.noproducts}>No products found</p>
          </div>
        ) : (
          filteredItems.map((product) => (
            <div key={product.id} className="col">
              <ProductCard
                title={product.title}
                category={product.category}
                price={product.price}
                thumbnail={product.thumbnail}
                rating={product.rating}
                id={product.id}
                brand={product.brand}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
