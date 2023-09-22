import { useContext } from "react";
import Ctx from "../context";

const Letter = ({letter}) => {
    // const {letter} = useContext(Ctx);
    return (
        <div>{letter}</div>
    )
}

export default Letter;