"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const Inventory = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Product Name", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      type: "number",
      valueGetter: (value, row) => `$${row.price}`,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 110,
      type: "number",
      valueGetter: (value, row) => (row.rating ? `${row.rating}` : "N/A"),
    },
    {
      field: "stockQuantity",
      headerName: "Stock Quantity",
      width: 50,
      type: "number",
    },
  ];

  if (isLoading) return <div className="py-4">Loading...</div>;
  if (isError || !products)
    return (
      <div className="text-center py-4 text-red-500 font-bold text-2xl">
        Failed to fetch products
      </div>
    );
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
