import images from "../constants/images";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ username }) => {
  return (
    <div
      className="row"
      style={{
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        padding: "0 2rem",
        gap:"10rem"
      }}
    >
      <div
        className="inner-container"
        style={{
          alignItems: "flex-start",
          gap: "1.5rem",
          border: "1px solid gray",
          padding: "3rem",
          borderRadius : "50px"
        }}
      >
        <h1>
          Hey {username} <br />
          Start your journey by one click, <br />
          explore beautiful world!
        </h1>
        <p>
          Plan and book your perfect trip with expert advice, <br />travel tips,
          destination information and inspiration from us!
        </p>
        <div className="row">
          <Link className="link" to={"/profile"}  style={{backgroundColor:"black" , color:"white"}}>
            Plan now
          </Link>
         
        </div>
      </div >
      <img src={images.illustration} alt="illustartion" height={500} width={500} />
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
