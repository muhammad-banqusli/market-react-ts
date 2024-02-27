import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { ReactElement } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart();
    const { products } = useProducts();

    let pageContent: ReactElement | ReactElement[] = <p className="main__loading">Loading...</p>;

    if (products?.length) {
        pageContent = products.map((product) => {
            const inCart: boolean = cart.some((item) => item.id === product.id);

            return (
                <ProductCard
                    key={product.id}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                />
            );
        });
    }

    const content = (
        <>
            <h2>Products</h2>
            <main className="main main--products">{pageContent}</main>
        </>
    );

    return content;
};

export default Home;
