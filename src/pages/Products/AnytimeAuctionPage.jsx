import React from 'react'
import { products } from '../../data/productsData'
import ProductDetailTemplate from './ProductDetailTemplate'

export default function AnytimeAuctionPage() {
  const product = products.find(p => p.id === 'anytime-auction')
  return <ProductDetailTemplate product={product} />
}
