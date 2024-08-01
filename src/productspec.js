import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './spec.styles.module.css'

function ProductSpec() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [smallActiveImageIndex, setSmallActiveImageIndex] = useState(0);

  useEffect(() => {
    // Access the API URL from environment variables
    const apiUrl = `${process.env.REACT_APP_API_KEY}/${id}`;
    
    axios.get(apiUrl)
      .then((res) => {
        console.log(res.data)
        setProductData(res.data);
      }).catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!productData) return <div>Loading...</div>;

  return (
    <div className={`${styles['container-my-5']} text-center`}>
      <h1 className={`${styles.heading}`}>Product Spec</h1>
      {productData != null ? 
        <div className={`${styles['card-mb-3']}`}>
          <div className="row g-0">
            <div className="col-md-6">
              <img src={`${productData.images[smallActiveImageIndex]}`} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-6">
              <div className="card-body ps-4">
                <h5 className={`${styles.cardtitle}`}><b className= {`${styles.cardheading}`}>Title : </b>{productData.title}</h5>
                <p className={`${styles.cardtext}`}><b className= {`${styles.cardheading}`}>Description : </b>{productData.description}</p>
                <p className={`${styles.cardtext}`}><b className= {`${styles.cardheading}`}>Category : </b>{productData.category}</p>
                <p className={`${styles.cardtext}`}><b className= {`${styles.cardheading}`}>Price : </b>${productData.price}</p>
                <p className={`${styles.cardtext}`}><b className= {`${styles.cardheading}`}>Rating : </b>{productData.rating}/5</p>
                <p className={`${styles.cardtext}`}><b className= {`${styles.cardheading}`}>Stock : </b>{productData.stock}</p>
                <p className={`${styles.cardtext}`}><b className= {`${styles.cardheading}`}>Discount: </b>{productData.discountPercentage + "%"}</p>
              </div>
              <div className={`${styles.smallImagesWrapper}`}>
                {productData.images.map((imageSrc, index) => {
                  return (
                    <div 
                      key={index} 
                      onClick={() => {
                        setSmallActiveImageIndex(index);
                        setProductData(prevProductData => ({
                          ...prevProductData,
                          thumbnail: imageSrc
                        }));
                      }} 
                      className={`${styles.smallImageDiv}`}
                    >
                      <img
                        className={`${smallActiveImageIndex === index ? styles.smallImageThumbnailactive : styles.smallImageThumbnail}`}
                        src={imageSrc}
                        alt={`Thumbnail ${index}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> 
      : ""}  
    </div>
  );
}

export default ProductSpec;
