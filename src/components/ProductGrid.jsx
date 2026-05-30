const ProductCard = ({ name, price }) => {
  return (
    <div className="group cursor-pointer">
      <div 
        className="relative w-full aspect-square overflow-hidden transition-transform duration-300 ease-out"
        style={{ backgroundColor: '#e8e4df' }}
      >
        <div 
          className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          style={{ backgroundColor: '#e8e4df' }}
        >
          <span style={{ color: '#aaa', fontFamily: "'Cormorant Garamond', serif" }}>
            Product Image
          </span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 
          className="text-sm mb-1"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#1a1a1a'
          }}
        >
          {name}
        </h3>
        <p 
          className="text-sm"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            color: '#888'
          }}
        >
          {price}
        </p>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const products = [
    { name: 'Classic Leather Bomber', price: '₹28,500' },
    { name: 'Heritage Biker Jacket', price: '₹32,000' },
    { name: 'Suede Safari Jacket', price: '₹25,500' },
    { name: 'Vintage Aviator', price: '₹29,900' },
    { name: 'Distressed Café Racer', price: '₹31,500' },
    { name: 'Minimalist Trench', price: '₹35,000' },
  ];

  return (
    <section 
      className="w-full px-6 lg:px-12 pb-20"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {products.map((product, index) => (
          <ProductCard 
            key={index} 
            name={product.name} 
            price={product.price} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
