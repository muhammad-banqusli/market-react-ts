import { memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type PropsType = {
    item: CartItemType;
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
    const lineTotal: number = item.qty * item.price;
    const onAddQty = () => {
        dispatch({
            type: REDUCER_ACTIONS.ADD,
            payload: item,
        });
    };

    const onSubtractQty = () => {
        dispatch({
            type: REDUCER_ACTIONS.SUBTRACT,
            payload: item,
        });
    };

    const onRemoveFromCart = () => {
        dispatch({
            type: REDUCER_ACTIONS.REMOVE,
            payload: item,
        });
    };

    const content = (
        <li className="cart__item">
            <img src={item.image} alt={item.title} className="cart__img" />
            <div aria-label="Item Name" className="cart__title">
                {item.title}
            </div>
            <div aria-label="Price Per Item">
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(item.price)}
            </div>
            <div className="cart__qty-control">
                <label htmlFor="itemQty" className="offscreen">
                    Item Quantity
                </label>
                <button
                    aria-label="Increase Quantity"
                    style={{ textAlign: "start" }}
                    onClick={onAddQty}
                >
                    +
                </button>
                <p id="itemQty">{item.qty}</p>
                <button
                    disabled={item.qty <= 1}
                    style={{ textAlign: "end" }}
                    aria-label="Decrease Quantity"
                    onClick={onSubtractQty}
                >
                    -
                </button>
            </div>

            <div
                className="cart__item-subtotal"
                aria-label="Line Item Subtotal"
            >
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(lineTotal)}
            </div>
            <IconButton
                aria-label="Remove Item From Cart"
                title="Remove Item From Cart"
                onClick={onRemoveFromCart}
                sx={{color: '#dc143c',':hover':{color:'#931a32'}}}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </li>
    );

    return content;
};

function areItemsEaual(
    { item: prevItem }: PropsType,
    { item: nextItem }: PropsType
) {
    return Object.keys(prevItem).every((key) => {
        return (
            prevItem[key as keyof CartItemType] ===
            nextItem[key as keyof CartItemType]
        );
    });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
    CartLineItem,
    areItemsEaual
);

export default MemoizedCartLineItem;
