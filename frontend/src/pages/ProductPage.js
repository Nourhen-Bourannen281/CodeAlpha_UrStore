import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)); // ✅ CORRIGÉ

  if (!product) return <h2>Produit non trouvé</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <ProductCard product={product} addToCart={addToCart} />
    </div>
  );
}

export default ProductPage;
