import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [prevCount, setPrevCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(10);
  let allData = [];
  const limit = 10;
  const getData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://dummyjson.com/products", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        const data = JSON.parse(result).products?.filter((x, i) => {
          if (i >= prevCount && i < prevCount + limit) {
            return i < limit;
          }
          return false;
        });
        allData = JSON.parse(result).products;
        setProducts(data);
      })
      .catch((error) => console.error(error));
  };

  const handleNext = (prev, next) => {
    const filterProducts = allData?.filter((x, i) => prev <= i < next);
    setProducts(filterProducts);
    setPrevCount(next);
  };

  console.log(products, prevCount, limit, "????");

  useEffect(() => {
    getData();
  }, [prevCount]);
  const data = [];
  return (
    <div>
      <button>prev</button>
      <button
        onClick={() => {
          setPrevCount((prev) => prev + limit);
        }}
      >
        next
      </button>
      <table>
        <tr>
          <th>
            <button
              onClick={() => {
                setProducts(
                  products.sort((a, b) => {
                    if (a.title < b.title) {
                      return -1;
                    }
                    if (a.title > b.title) {
                      return 1;
                    }
                    return 0;
                  })
                );
              }}
            >
              Title
            </button>
          </th>
          <th>Description</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Stock</th>
          <th>Brand</th>
          <th>Category</th>
        </tr>
        {products?.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.title}</td>
              <td>{val.description}</td>
              <td>{val.price}</td>
              <td>{val.rating}</td>
              <td>{val.stock}</td>
              <td>{val.brand}</td>
              <td>{val.category}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Products;
