import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/ProductApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { useEffect } from "react";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("Out of Stock");
    } else {
      dispatch(addToCart(cartItem));
      toast.success("Added to cart");
    }
  };

  useEffect(() => {
    if (isError) toast.error("Cannot Fetch the Products");
  }, [isError]);

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products{" "}
        <Link to={"/search"} className="findmore">
          More
        </Link>{" "}
      </h1>

      <main>
        {isLoading ? (
          <>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} style={{ height: "25rem" }}>
                <Skeleton width="18.75rem" length={1} height="20rem" />
                <Skeleton width="18.75rem" length={2} height="1.95rem" />
              </div>
            ))}
          </>
        ) : (
          data?.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              handler={addToCartHandler}
              photo={product.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
