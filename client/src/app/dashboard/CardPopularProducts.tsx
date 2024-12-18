import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import Ratings from "../(components)/Ratings";
import Image from "next/image";

const CardPopularProducts = () => {
  const { isLoading, data: dashboardMetrics } = useGetDashboardMetricsQuery();
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                key={product.productId}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`https://s3-inventorymanagement-nextjs.s3.ca-central-1.amazonaws.com/product${Math.floor(
                      Math.random() * 3 + 1
                    )}.png`}
                    width={48}
                    height={48}
                    className="rounded-large w-14 h-14"
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-1 justify-between">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-small items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Ratings ratings={product.rating || 0} />
                    </div>
                  </div>
                </div>
                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
