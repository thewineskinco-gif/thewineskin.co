import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], heading, description }) => {
  if (!products.length) return null;

  return (
    <section className="w-full px-6 lg:px-16 py-16" style={{ backgroundColor: '#ffffff' }}>
      {(heading || description) && (
        <div className="text-center mb-12">
          {heading && (
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(24px, 4vw, 36px)',
                color: '#1a1a1a',
                fontWeight: 400,
                marginBottom: '12px'
              }}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px',
                color: '#888',
                letterSpacing: '0.04em',
                maxWidth: '480px',
                margin: '0 auto'
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
