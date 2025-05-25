import React from 'react';

const ProductShowcaseFallback = () => {
  // Static data for when API is not available
  const fallbackData = [
    {
      category: "Hair Care",
      products: [
        {
          _id: "fallback-1",
          name: "Premium Hair Shampoo",
          price: "120,000đ",
          image: "/assets/products/shampoo-placeholder.jpg",
          description: "Professional hair shampoo for all hair types"
        },
        {
          _id: "fallback-2", 
          name: "Hair Styling Wax",
          price: "85,000đ",
          image: "/assets/products/wax-placeholder.jpg",
          description: "Long-lasting hair styling wax"
        },
        {
          _id: "fallback-3",
          name: "Hair Conditioner",
          price: "95,000đ", 
          image: "/assets/products/conditioner-placeholder.jpg",
          description: "Moisturizing hair conditioner"
        }
      ]
    },
    {
      category: "Beard Care",
      products: [
        {
          _id: "fallback-4",
          name: "Beard Oil",
          price: "150,000đ",
          image: "/assets/products/beard-oil-placeholder.jpg", 
          description: "Premium beard oil for grooming"
        },
        {
          _id: "fallback-5",
          name: "Beard Balm",
          price: "130,000đ",
          image: "/assets/products/beard-balm-placeholder.jpg",
          description: "Styling and conditioning beard balm"
        }
      ]
    }
  ];

  return (
    <section className="py-5 category-showcase">
      <div className="container">        
        <div className="text-center mb-5">
          <h1 className="display-4" style={{ fontFamily: 'Playfair Display, serif' }}>Our Products</h1>
          <p className="lead">Discover our premium collection of professional hair and beard care products</p>
          <div className="alert alert-info mt-3" role="alert">
            <small>⚠️ Currently showing sample products. Please refresh the page or contact us for the latest product catalog.</small>
          </div>
        </div>
        
        {fallbackData.map((categoryData) => (
          <div key={categoryData.category} className="mb-5">
            <h2 className="text-start mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {categoryData.category}
            </h2>
            <hr className="mb-4" />
            <div className="row justify-content-center">
              {categoryData.products.map((product) => (
                <div key={product._id} className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                  <div className="card h-100" style={{ width: '100%', maxWidth: '300px' }}>
                    <div 
                      className="card-img-top bg-light d-flex align-items-center justify-content-center"
                      style={{ height: '200px' }}
                    >
                      <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text flex-grow-1">{product.description}</p>
                      <div className="mt-auto">
                        <p className="card-text">
                          <strong className="text-primary">{product.price}</strong>
                        </p>
                        <button className="btn btn-outline-primary w-100" disabled>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-outline-dark px-4" disabled>
                More Products (Coming Soon)
              </button>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-5">
          <div className="card border-warning">
            <div className="card-body">
              <h5 className="card-title text-warning">
                <i className="bi bi-exclamation-triangle"></i> Connection Issue
              </h5>
              <p className="card-text">
                We're having trouble loading the latest product information. 
                Please contact us directly for the most up-to-date catalog.
              </p>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <p><strong>📞 Hotline:</strong> 0123-456-789</p>
                  <p><strong>📧 Email:</strong> contact@barberstore.com</p>
                  <p><strong>🏪 Address:</strong> 123 Main Street, Ho Chi Minh City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseFallback;
