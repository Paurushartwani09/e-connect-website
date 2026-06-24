import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function SelctPage() {
  const product = products.find(p => p.id === 'selct')
  return <ProductDetailTemplate product={product} />
}
