import { Badge, Button, Col, Container, Image, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Ctx from "../context";

const Challenge = () => {
    const { alphaStore, letterImagesStore, testWordsStore } = useContext(Ctx);
    const [word, setWord] = useState(testWordsStore[0].word.split(""));
    const [testLetter, setTestLetter] = useState(alphaStore[0].let);
    const [letterImg, setletterImg] = useState(letterImagesStore[0].img);
    const [letterInWord, setLetterInWord] = useState(null);
    const [letInWordActive, setLetInWordActive] = useState();
    const [testLetActive, setTestLetActive] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    // const [arrWords, setArrWords] = useState([]);
    const arrWords = [];
    const [err, setErr] = useState(false);


    // const addtestWord = () => {
    //     const arrWords = [];
    //     if (testLetter){
    //     testWords.forEach(el => {
    //         if (el.word.toLowerCase().includes(testLetter)) {
    //             arrWords.push(el.word)
    //         }
    //     });
    //     setWord(arrWords[Math.floor(Math.random() * arrWords.length)])
    // }
    // }

    //Скрытие уведомления через 5сек.
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [letterInWord]);

    //Выбор слова из массива слов
    useEffect(() => {
        if (testLetter) {
            testWordsStore.forEach(el => {
                if (el.word.toLowerCase().includes(testLetter)) {
                    arrWords.push(el.word)
                    // setArrWords ([...arrWords, el.word])
                }
            });
            setWord(arrWords[Math.floor(Math.random() * arrWords.length)].split(""));
        }
    }, [testLetter])

    //Выбор буквы в проверочном слове
    const selectLetterInWord = (i, letter) => {
        setIsVisible(true);
        setLetInWordActive(i);
        setLetterInWord(letter);
        if (letter === testLetter) {
            setErr(false);
        } else {
            setErr(true);
        }
    }

    //Выбор тестовой буквы
    const selectLetter = (key, l, i) => {
        setIsVisible(false);
        setErr(null);
        setLetInWordActive(null);
        setTestLetActive(i);
        setTestLetter(key);
        letterImagesStore.forEach(el => {
            if (el.letter === l) {
                setletterImg(el.img)
            }
        })
    }

    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-sm-center w-50 vh-100 container-sm">
            <Row className="row__width" >
                <Image src={letterImg}
                    thumbnail />
            </Row>
            <Row className="border p-4 m-1 mt-4 justify-content-sm-center">
                <Row>
                    <p>
                        Найдите(кликните) букву <span className="fs-1 text-danger">{testLetter}</span> в слове:
                    </p>
                </Row>
                <Row className="justify-content-sm-center p-1">
                    {word.map((el, i) =>
                        <Col sm={1} key={i} className="p-0" >
                            <Button
                                onClick={() => selectLetterInWord(i, el.toLowerCase())}
                                className={`letter fw-bold text-dark p-2 fs-6
                                ${letInWordActive === i && letterInWord === testLetter ? "letter__selected" : ""}
                                ${letInWordActive === i && err ? "letter__err" : ""}
                                `}
                                variant="light">
                                {el}
                            </Button>
                        </Col>)}
                    {letterInWord === testLetter && isVisible &&
                        <Col md={1}>
                            <Badge bg="success">
                                Правильно!
                            </Badge>
                        </Col>
                    }
                    {err && isVisible &&
                        <Col md={1}>
                            <Badge bg="danger">
                                Ошибка!
                            </Badge>
                        </Col>
                    }
                </Row>
            </Row>
            <Row className="mt-4 p-4 border">
                <Col md={12}>
                    <Row className="justify-content-sm-start ">
                        {alphaStore.map((el, i) => <Col sm={2} key={i}>
                            <Button className={`letter text-primary  fs-6
                    ${testLetActive === i ? "letter__test" : ""}`}
                                variant="outline-light"
                                onClick={() => selectLetter(el.let, el.letter, i)}>{el.letter}</Button></Col>)}
                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

export default Challenge;