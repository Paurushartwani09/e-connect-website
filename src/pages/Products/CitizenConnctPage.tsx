import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function CitizenConnctPage() {
  const product = products.find(p => p.id === 'citizen-connct')!
  return <ProductDetailTemplate product={product} />
}
