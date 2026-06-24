import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function LoansPage() {
  const product = products.find(p => p.id === 'loans')
  return <ProductDetailTemplate product={product} />
}
