import useCart from "../hooks/useCart";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { IconButton } from "@mui/material";

const Header = () => {
    const { totalItems } = useCart();
    const { pathname } = useLocation();

    const content = (
        <header className="header">
            <h1>Acme Co.</h1>
            <nav>
                {pathname === "/cart" ? (
                    <Link to="/">Products</Link>
                ) : (
                    <Link to="/cart">
                        <IconButton
                            sx={{
                                color: "white",
                                ":disabled": {
                                    color: "lightgray",
                                },
                            }}
                            disabled={!totalItems}
                        >
                            <ShoppingCartOutlinedIcon
                                fontSize="large"
                                sx={{ position: "relative" }}
                            />
                            {totalItems ? (
                                <div className="header__cart-count">
                                    <span className="header__total-items">
                                        {totalItems}
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                        </IconButton>
                    </Link>
                )}
            </nav>
        </header>
    );

    return content;
};

export default Header;
