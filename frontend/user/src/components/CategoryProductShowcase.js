import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductShowcaseFallback from './ProductShowcaseFallback';
import { apiService } from '../services/apiService';

const CategoryProductShowcase = () => {
  const [showcaseData, setShowcaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useFallback, setUseFallback] = useState(false);
  
  useEffect(() => {
    const fetchShowcaseData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getShowcaseProducts();
        setShowcaseData(data);
        setUseFallback(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || 'Failed to fetch showcase products. Please try refreshing the page.');
        setShowcaseData([]);
        
        // Use fallback after 3 seconds if error persists
        setTimeout(() => {
          setUseFallback(true);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcaseData();
  }, []);
  if (loading) {
    return <div className="text-center p-5">Loading products...</div>;
  }

  if (error && useFallback) {
    return <ProductShowcaseFallback />;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">Error loading products: {error}</div>;
  }

  if (showcaseData.length === 0) {
    return <div className="text-center p-5">No products to display.</div>;
  }

  return (
    <section className="py-5 category-showcase">
      <div className="container">        
        <div className="text-center mb-5">
          <h1 className="display-4" style={{ fontFamily: 'Playfair Display, serif' }}>Our Products</h1>
          <p className="lead">Discover our premium collection of professional hair and beard care products</p>
        </div>
        
        {showcaseData.map((categoryData) => (          <div key={categoryData.category} className="mb-5">
            <h2 className="text-start mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {categoryData.category} {/* Assuming category is the name string */}
            </h2>
            <hr className="mb-4" />
            <div className="row justify-content-center">              {categoryData.products.map((product) => (
                // Use Bootstrap columns for responsiveness
                <div key={product._id} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link to={'/products'} className="btn btn-outline-dark px-4">
                More Products
              </Link>
            </div>
            {/* Optional: Add a divider or more spacing between categories */}
            {/* <hr className="my-5" /> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProductShowcase;