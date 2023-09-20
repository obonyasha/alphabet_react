import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <Container className="vh-100 vw-100 d-flex align-items-center justify-content-center">
            <Row>
                <Link to={"/challenge"}>
                    <Button size="lg">Начать</Button>
                </Link>
            </Row>
        </Container>
    )
}

export default Main;