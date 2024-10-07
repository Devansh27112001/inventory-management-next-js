"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Ratings from "../(components)/Ratings";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    <div className="text-center py-4 text-red-500 font-bold text-2xl">
      Failed to fetch products
    </div>;
  }
  return (
    <div className="mx-auto w-full pb-5">
      {/* SEARCH BAR */}
      <div className="mb-6 relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Products"
          className="transition duration-300 ease-in-out w-full py-2 px-4 pl-10 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="text-gray-500" size={20} />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 font-bold text-gray-200 py-2 px-4 rounded"
          onClick={() => setIsModelOpen(true)}
        >
          <PlusCircleIcon className="size-5 mr-2 text-gray-200" />
          Create Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="felx flex-col items-center">
                img
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Ratings ratings={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* MODAL */}
      <CreateProductModal
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
