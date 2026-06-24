import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function SecurityPage() {
  const product = products.find(p => p.id === 'security')
  return <ProductDetailTemplate product={product} />
}
