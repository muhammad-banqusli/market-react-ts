import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ProductType } from "../context/ProductsProvider";
import React, { memo } from "react";
import { Rating, IconButton, Icon } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

type PropsType = {
    product: ProductType;
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
    inCart: boolean;
};

const ProductCard = ({
    product,
    dispatch,
    REDUCER_ACTIONS,
    inCart,
}: PropsType) => {
    const onAddToCart = () => {
        dispatch({
            type: REDUCER_ACTIONS.ADD,
            payload: { ...product, qty: 1 },
        });
    };
    const removeFromCart = () => {
        dispatch({
            type: REDUCER_ACTIONS.REMOVE,
            payload: { ...product, qty: 1 },
        });
    };

    const inCartText = inCart ? (
        <span className="product__added-to-cart light">
            added to cart{" "}
            <Icon>
                <CheckOutlinedIcon />
            </Icon>
        </span>
    ) : (
        ""
    );
    
    const Price = () => {
        const price = product.price.toFixed(2).toString();
        const decimalIndex = price.indexOf(".") + 1;

        return (
            <span className="product__price">
                <span className="small">$</span>
                <span className="">{Math.floor(product.price)}</span>
                <span className="small decimal">
                    .{price.substring(decimalIndex)}
                </span>
                
            </span>
        );
    };

    const cartButtons = !inCart ? (
        <IconButton
            onClick={onAddToCart}
            title="Add to Cart"
            sx={{
                position: "absolute",
                right: "15%",
                bottom: "5%",
                bgcolor: "white",
                width: "auto",
                padding: "10px 12px",
                color: "black",
                border: "3px solid #DC143C",
                ":hover": {
                    bgcolor: "lightgray",
                },
            }}
        >
            <AddShoppingCartOutlinedIcon fontSize="large" />
        </IconButton>
    ) : (
        <IconButton
            onClick={removeFromCart}
            title="Remove from Cart"
            sx={{
                position: "absolute",
                right: "15%",
                bottom: "5%",
                bgcolor: "white",
                width: "auto",
                padding: "10px 12px",
                color: "black",
                border: "3px solid #DC143C",
                ":hover": {
                    bgcolor: "lightgray",
                },
            }}
        >
            <RemoveShoppingCartOutlinedIcon fontSize="large" />
        </IconButton>
    );

    

    const content = (
        <article className="product">
            <div className="product__img-container">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product__img"
                />
                {cartButtons}
            </div>
            <h3>{product.title}</h3>
            <div className="product__rating">
                <Rating
                    name="read-only"
                    value={product.rating.rate}
                    readOnly
                    precision={0.1}
                    size="small"
                    sx={{
                        "& .Mui-readOnly": {
                            gap: 0,
                        },
                        "& .MuiRating-iconEmpty": {
                            color: "grey",
                        },

                        "& .MuiRating-iconFilled": {
                            color: "#DC143C",
                        },
                        "& .MuiRating-icon": {
                            width: "18px",
                        },
                    }}
                />
                <span className="light">{product.rating.count} votes</span>
            </div>
            <p><Price /> {inCartText}</p>
            <button className="product__btn" >See Details</button>
        </article>
    );

    return content;
};

function areProductsEqual(
    { product: prevProduct, inCart: prevInCart }: PropsType,
    { product: nextProduct, inCart: nextInCart }: PropsType
) {
    return (
        Object.keys(prevProduct).every((key) => {
            return (
                prevProduct[key as keyof ProductType] ===
                nextProduct[key as keyof ProductType]
            );
        }) && prevInCart === nextInCart
    );
}

const MemoizedProductCard = memo<typeof ProductCard>(
    ProductCard,
    areProductsEqual
);

export default MemoizedProductCard;
