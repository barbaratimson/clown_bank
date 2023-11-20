import {useKeycloak} from "@react-keycloak/web";

function Navbar() {
    return (
      <div className="navbar">
          <div className="logo">BEERBANK</div>
          <div className="settings-icon">Settings</div>
      </div>  
    );
  }
  
  export default Navbar;
  