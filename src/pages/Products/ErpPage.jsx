import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function ErpPage() {
  const product = products.find(p => p.id === 'erp')
  return <ProductDetailTemplate product={product} />
}
