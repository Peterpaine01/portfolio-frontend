import { Link } from "react-router-dom";

// Images

// Je récupère les props
const Header = ({ logo }) => {
  return (
    <>
      <header>
        <div className="top-menu">
          <div className="containe-full flex-parent">
            <Link className="logo" to="/">
              <p>
                <strong>Fanny Carlier </strong>- Portfolio
              </p>
            </Link>

            <nav className="flex-parent">
              <Link
                className="btn-light"
                onClick={() => (window.location = "mailto:facarlier@gmail.com")}
              >
                Contact
              </Link>
              <Link className="btn-outlined" to={`/`}>
                <i class="fa-solid fa-download fa-bounce"></i> Télécharger le cv
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
