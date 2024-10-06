"use client";
import { useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

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
    </div>
  );
};

export default Products;
