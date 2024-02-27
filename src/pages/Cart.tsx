import { useState } from "react";
import useCart from "../hooks/useCart";
import CartLineItem from "../components/CartLineItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState<boolean>(false);
    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } =
        useCart();

    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT });
        setConfirm(true);
    };
    const onClearCart = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT });
        navigate("/");
    };
    const onBackToProducts = () => {
        navigate("/");
    };

    const pageContent = confirm ? (
        <h2>Thank you for your order.</h2>
    ) : (
        <>
            <h2 className="">Cart</h2>
            <ul className="cart">
                <li className="cart__item">
                    <div className="cart__img"></div>
                    <div className="cart__title">Product Name</div>
                    <div>Price</div>
                    <div className="cart__qty-control">Quantity</div>
                    <div className="cart__item-subtotal">Total</div>
                    <div>Delete</div>
                </li>
                {cart.map((item) => {
                    return (
                        <CartLineItem
                            key={item.id}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTIONS={REDUCER_ACTIONS}
                        />
                    );
                })}
            </ul>
            <div className="cart__totals">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice}</p>
                <div className="cart__totals-buttons">
                    <button
                        className="cartSubmit"
                        disabled={!totalItems}
                        onClick={onSubmitOrder}
                    >
                        Place Order
                    </button>
                    {cart.length ? (
                        <button
                            className="cartSubmit"
                            disabled={!totalItems}
                            onClick={onClearCart}
                        >
                            Clear Cart
                        </button>
                    ) : (
                        <button
                            className="cartSubmit"
                            onClick={onBackToProducts}
                        >
                            Back to Products
                        </button>
                    )}
                </div>
            </div>
        </>
    );

    const content = <main className="main main--cart">{pageContent}</main>;

    return content;
};

export default Cart;
