import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductById, PRODUCTS } from '@/lib/products-data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: 'Not Found' };
  return {
    title: `${product.name} — GlamComm`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
