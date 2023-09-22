import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import letterImages from "../../assets/letterImages.json";
import testWords from "../../assets/testWords.json";
import alfhabet from "../../assets/alphabet.json"
import Letter from "../Letter";

const Challenge = () => {
    // let letterImg = letterImages[0].Аа;
    const [word, setWord] = useState(testWords[0].word);
    const [testLetter, setTestLetter] = useState(alfhabet[0].let);
    const [letterImg, setletterImg] = useState(letterImages[0].img)
    const [colorLet, setColorLet] = useState(false);
    const [letterInWord, setLetterInWord] = useState();
    const arrWords = [];

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

    useEffect(() => {
        if (testLetter) {
            const arrWords = [];
            testWords.forEach(el => {
                if (el.word.toLowerCase().includes(testLetter)) {
                    arrWords.push(el.word)
                }
            });
            setWord(arrWords[Math.floor(Math.random() * arrWords.length)]);
        }
    }, [testLetter])

    useEffect(() => {
        if(letterInWord===testLetter){
            setColorLet(true)
        } else setColorLet(false)
    }, [letterInWord])
    const selectLetterInWord = (letter) => {
        setLetterInWord(letter);
        console.log(colorLet)
    }

    const selectLetter = (key, l) => {
        setTestLetter(key);
        letterImages.forEach(el => {
            if (el.letter === l) {
                setletterImg(el.img)
            }
        })
    }

    return (
        <Container className="text-center w-75 d-flex justify-content-center flex-column">
            <Row>
                <Image src={letterImg}
                    thumbnail className="w-75" />
            </Row>
            <Row className="border p-4 mt-4 w-75 justify-content-md-center">
                <Row>
                    <p>
                        Найдите(кликните) букву <span className="fs-1 text-danger">{testLetter}</span> в слове:
                    </p>
                </Row>
                <Row className="justify-content-md-center p-1">
                    {word.split("").map((el, i) =>
                        <Col md={1} key={i} className="p-0"><Button 
                        onClick={() => selectLetterInWord(el.toLowerCase())}
                        className={`letter fw-bold text-dark p-2 bg-transparent`}
                        variant={`${colorLet ? "success" : "light"}`}>{el}</Button></Col>)}
                </Row>
            </Row>
            <Row className="w-80 justify-content-md-start mt-4 p-4 border">
                {alfhabet.map((el, i) => <Col md={2} key={i}>
                    <Button className = "letter text-primary" variant="outline-light"
                        onClick={() => selectLetter(el.let, el.letter)}>{el.letter}</Button></Col>)}
            </Row>
        </Container>
    )
}

export default Challenge;