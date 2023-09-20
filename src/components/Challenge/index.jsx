import { Col, Container, Image, Row } from "react-bootstrap";
import letterImages from "../../assets/letterImages.json";
import testWords from "../../assets/testWords.json";
import alfhabet from "../../assets/alphabet.json"
import Letter from "../Letter";

const Challenge = () => {
    return (
        <Container className="text-center">
            <Row>
                <Image src="https://abv.online-services.org.ua/images/rus/0/0.png" thumbnail />
            </Row>
            <Row className="border mt-4">
                <Row>
                    <p>
                        Найдите(кликните) букву а в слове:
                    </p>
                </Row>
                <Row>
                    <p>
                        {testWords[0].word}
                    </p>
                </Row>
            </Row>
            <Row>
                <Col md={8}>
                {alfhabet.map((el,i) => <Letter 
                key = {i}
                letter = {el.letter}
                />)}
                </Col>
                
            </Row>
        </Container>
    )
}

export default Challenge;