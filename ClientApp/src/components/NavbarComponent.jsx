import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Navbar from "react-bootstrap/Navbar";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

function NavbarComponent() {
  const navigate = useNavigate();
  var user = null;
  const NavbarButtons = () => {
    user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      return (
        <ButtonGroup
          size="small"
          className="me-2"
          aria-label="small button group"
        >
          <Button
            variant="outline-success"
            onClick={() => navToPage("/products")}
          >
            Products
          </Button>
          <Button
            variant="outline-success"
            onClick={() => navToPage("/userOrders")}
          >
            Orders
          </Button>
          <Button variant="outline-success" onClick={() => Logout("/login")}>
            Logout
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup className="me-2">
          <Button variant="outline-success" onClick={() => navToPage("/login")}>
            Login
          </Button>{" "}
          <Button
            variant="outline-success"
            onClick={() => navToPage("/register")}
          >
            Register
          </Button>
        </ButtonGroup>
      );
    }
  };

  const navToPage = (url) => {
    navigate(url);
  };
  const Logout = (url) => {
    localStorage.clear();
    navigate(url);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <PrecisionManufacturingIcon sx={{ color: "#fff", fontSize: 40 }} />{" "}
      <Container fluid>
        <Navbar.Brand>The Dealers</Navbar.Brand>
        {NavbarButtons()}
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
