import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/ProductApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("Out of Stock");
    } else {
      dispatch(addToCart(cartItem));
      toast.success("Added to cart");
    }
  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  useEffect(() => {
    if (isError && error) {
      const err = error as CustomError;
      toast.error(`Category error: ${err.data.message}`);
    }
  }, [isError, error]);

  useEffect(() => {
    if (productIsError && productError) {
      const err = productError as CustomError;
      toast.error(`Product error: ${err.data.message}`);
    }
  }, [productIsError, productError]);

  return (
    <div className="productSearchPage">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (Hight to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""} </h4>
          <input
            type="range"
            min={100}
            max={1000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((categorie) => (
                <option key={categorie} value={categorie}>
                  {categorie.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="search"
          placeholder="Search by name...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="searchProductList">
            {searchedData?.products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                handler={addToCartHandler}
                photo={product.photo}
              />
            ))}
          </div>
        )}

        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
