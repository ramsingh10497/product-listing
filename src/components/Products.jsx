import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const getData = async () => {
    await fetch("https://dummyjson.com/products", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const lists = JSON.parse(result).products;
        console.log(lists);
        setAllProducts(lists);
        lists?.length > 0 && setTotalPages(lists?.length / limit);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const lastIndex = currentPage * limit;
    const firstIndex = lastIndex - limit;
    const currentPrducts = allProducts?.slice(firstIndex, lastIndex);
    setProducts(currentPrducts);
  }, [currentPage, allProducts]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th className="px-6 py-3">Title</th>
          <th className="px-6 py-3">Description</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Rating</th>
          <th className="px-6 py-3">Stock</th>
          <th className="px-6 py-3">Brand</th>
          <th className="px-6 py-3">Category</th>
        </tr>
        {products?.map((val, key) => {
          return (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={key}
            >
              <td className="px-6 py-4">{val.title}</td>
              <td className="px-6 py-4">{val.description}</td>
              <td className="px-6 py-4">{val.price}</td>
              <td className="px-6 py-4">{val.rating}</td>
              <td className="px-6 py-4">{val.stock}</td>
              <td className="px-6 py-4">{val.brand}</td>
              <td className="px-6 py-4">{val.category}</td>
            </tr>
          );
        })}
      </table>

      <div>
        {totalPages && (
          <Pagination
            pages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
