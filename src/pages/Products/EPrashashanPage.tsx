import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function EPrashashanPage() {
  const product = products.find(p => p.id === 'eprashashan')!
  return <ProductDetailTemplate product={product} />
}
