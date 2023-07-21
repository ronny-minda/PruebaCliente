const Footer = () => {
  return (
    <>
      <footer
        className="bg-white rounded-lg shadow m-4 fixed bottom-0 left-0"
        style={{ width: "95vw" }}
      >
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2023{" "}
            <a
              href="https://ronnyminda.vercel.app/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Desarrollado por Ronny Michael Minda Vera
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
