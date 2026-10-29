import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { getProductById, ProductsApiError } from "@/lib/products";
import type { Product } from "@/lib/types";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  let product: Product;

  try {
    product = await getProductById(id);
  } catch (error) {
    if (error instanceof ProductsApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return <ProductDetails product={product} />;
}