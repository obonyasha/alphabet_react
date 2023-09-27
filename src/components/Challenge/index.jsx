import { Badge, Button, Col, Container, Image, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import letterImages from "../../assets/letterImages.json";
import testWords from "../../assets/testWords.json";
import alfhabet from "../../assets/alphabet.json"

const Challenge = () => {
    const [word, setWord] = useState(testWords[0].word.split(""));
    const [testLetter, setTestLetter] = useState(alfhabet[0].let);
    const [letterImg, setletterImg] = useState(letterImages[0].img)
    const [colorLet, setColorLet] = useState(false);
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
            testWords.forEach(el => {
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
            setColorLet(true);
            setErr(false);
        } else {
            setColorLet(false);
            setErr(true);
        }
        console.log(colorLet)
    }

    //Выбор тестовой буквы
    const selectLetter = (key, l, i) => {
        setColorLet(false);
        setErr(null);
        setTestLetActive(i);
        setTestLetter(key);
        letterImages.forEach(el => {
            if (el.letter === l) {
                setletterImg(el.img)
            }
        })
    }

    return (
        <Container className="text-center d-flex flex-column">
            <Row className="justify-content-md-center" >
                <Image src={letterImg}
                    thumbnail className="w-75" />
            </Row>
            <Row className="border p-4 m-1 mt-4 justify-content-md-center">
                <Row>
                    <p>
                        Найдите(кликните) букву <span className="fs-1 text-danger">{testLetter}</span> в слове:
                    </p>
                </Row>
                <Row className="justify-content-md-center p-1">
                    {word.map((el, i) =>
                        <Col md={1} key={i} className="p-0" >
                            <Button
                                onClick={() => selectLetterInWord(i, el.toLowerCase())}
                                className={`letter fw-bold text-dark p-2 
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
            <Row className="justify-content-md-start mt-4 p-4 border">
                {alfhabet.map((el, i) => <Col md={2} key={i}>
                    <Button className={`letter text-primary
                    ${testLetActive === i ? "letter__test" : ""}
                    `} variant="outline-light"
                        onClick={() => selectLetter(el.let, el.letter, i)}>{el.letter}</Button></Col>)}
            </Row>
        </Container>
    )
}

export default Challenge;