import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function MsaasPage() {
  const product = products.find(p => p.id === 'msaas')
  return <ProductDetailTemplate product={product} />
}
