const Footer = () => {
    const year: number = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>Shopping Cart &copy; {year}</p>
        </footer>
    );
};

export default Footer;
