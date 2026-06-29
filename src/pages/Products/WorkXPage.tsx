import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function WorkXPage() {
  const product = products.find(p => p.id === 'workx')!
  return <ProductDetailTemplate product={product} />
}
