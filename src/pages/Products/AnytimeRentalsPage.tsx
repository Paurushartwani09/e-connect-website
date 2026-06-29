import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function AnytimeRentalsPage() {
  const product = products.find(p => p.id === 'anytime-rentals')!
  return <ProductDetailTemplate product={product} />
}
