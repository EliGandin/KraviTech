const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} KraviTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
