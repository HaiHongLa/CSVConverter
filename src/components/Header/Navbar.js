import classes from "./Navbar.module.css";
import logo from "../assets/file-csv-solid.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a
        id="brandName"
        className={`"navbar-brand" ${classes.brandName}`}
        href="#"
      >
        <img src={logo} alt="Logo" height={25} style={{"padding-right": "7px", "padding-bottom": "3px"}} />
        CSV Converter
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Help
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
