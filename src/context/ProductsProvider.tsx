import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

const initialState: ProductType[] = [];

export type UseProductsContextType = {
    products: ProductType[];
};

const initContextState: UseProductsContextType = {
    products: [],
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initialState);
    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch("https://fakestoreapi.com/products")
                .then((res) => res.json())
                .catch((err) => {
                    if (err instanceof Error) console.log(err);
                });
            return data;
        };

        fetchProducts().then((products) => setProducts(products));
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
