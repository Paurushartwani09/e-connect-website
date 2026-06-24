import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function AuctionPage() {
  const product = products.find(p => p.id === 'auction')
  return <ProductDetailTemplate product={product} />
}
