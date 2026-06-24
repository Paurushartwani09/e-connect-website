import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function EgovPage() {
  const product = products.find(p => p.id === 'egov')
  return <ProductDetailTemplate product={product} />
}
