import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Navbar from "react-bootstrap/Navbar";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
function NavbarComponent() {
  const navigate = useNavigate();
  const navToPage = (url) => {
    navigate(url);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <ReportProblemIcon sx={{ color: "#fff", fontSize: 40 }} />{" "}
      <Container fluid>
        <Navbar.Brand>DocBlock</Navbar.Brand>
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
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
