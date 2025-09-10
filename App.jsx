import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"


export default function App(){
    const [dieValues, setDieValues] = React.useState(randomizeAllDice())

    //Check win
    const gameWon = dieValues.every(d => d.value===dieValues[0].value) &&
        dieValues.every(d => d.isHeld)
    // console.log(gameWon)

    function randomizeAllDice(){
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false, 
                id: nanoid(),
            }))
    }

    function hold(id){
        setDieValues(oldDice => oldDice.map(d => { 
            return d.id===id ? {...d, isHeld: !d.isHeld} : d
        }))
    }
    
    function rollDice(){
        if(!gameWon){
            setDieValues(prevDice => prevDice.map(d => {
                return d.isHeld ? d : {...d, value: Math.ceil(Math.random() * 6)} 
            }))
        }else{
            setDieValues(randomizeAllDice())
        }
    }

    const tenDice = dieValues.map(n => (
        <Die 
            key={n.id}
            value={n.value} 
            isHeld={n.isHeld}
            onClick={() => hold(n.id)}
        />
    ))

    return(
        <main>
            {gameWon && <Confetti 
                recycle={false}
                numberOfPieces={1000}
            />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
            
            <div className="dice-container">{tenDice}</div>
            <button className="roll-button" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}

