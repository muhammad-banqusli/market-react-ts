import {
    ReactElement,
    createContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";

export type CartItemType = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    qty: number;
};

type CartStateType = { cart: CartItemType[] };

const retreivedCart = { cart: JSON.parse(localStorage.getItem("cart") || "") };

const initCartState: CartStateType = retreivedCart
    ? retreivedCart
    : { cart: [] };

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    SUBTRACT: "SUBTRACT",
    SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
    type: string;
    payload?: CartItemType;
};

const reducer = (
    state: CartStateType,
    action: ReducerAction
): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error("action.payload missing in ADD action");
            }

            const { id, title, price, image, category } = action.payload;

            const filteredCart: CartItemType[] = state.cart.filter(
                (item) => item.id !== id
            );

            const itemExists: CartItemType | undefined = state.cart.find(
                (item) => item.id === id
            );

            const qty: number = itemExists ? itemExists.qty + 1 : 1;

            return {
                ...state,
                cart: [
                    ...filteredCart,
                    { id, title, price, qty, image, category },
                ],
            };
        }

        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error("action.payload missing in REMOVE action");
            }

            const { id } = action.payload;

            const filteredCart: CartItemType[] = state.cart.filter(
                (item) => item.id !== id
            );

            return { ...state, cart: [...filteredCart] };
        }

        case REDUCER_ACTION_TYPE.SUBTRACT: {
            if (!action.payload) {
                throw new Error("action.payload missing in SUBTRACT action");
            }

            const { id, qty } = action.payload;

            const itemExists: CartItemType | undefined = state.cart.find(
                (item) => item.id === id
            );

            if (!itemExists) {
                throw new Error("Item must exist in order to subtract qty");
            }

            const updatedItem: CartItemType = { ...itemExists, qty: qty - 1 };

            const filteredCart: CartItemType[] = state.cart.filter(
                (item) => item.id !== id
            );

            return { ...state, cart: [...filteredCart, updatedItem] };
        }

        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] };
        }

        default:
            throw Error("Unidentified reducer action type");
    }
};

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state]);

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE;
    }, []);

    const totalItems: number = state.cart.length;

    const totalPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + cartItem.qty * cartItem.price;
        }, 0)
    );

    const cart = state.cart.sort((a, b) => {
        const itemA = a.title;
        const itemB = b.title;
        return itemA.localeCompare(itemB);
    });

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: "",
    cart: [],
};

const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
