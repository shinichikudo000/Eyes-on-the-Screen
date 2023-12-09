import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const keySet = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACKSPACE' ],
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\' ],
    ['CAPSLOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT' ]
  ]
  const [drawnRow, setDrawnRow] = useState<number>() 
  const [drawnCell, setDrawnCell] = useState<number>()
  const cell = useRef('')
  const [draw, setDraw] = useState(true)

  const handleChange = async(keyClicked: string) => {
    if (draw === false && drawnRow !== undefined && drawnCell !== undefined && keyClicked.toUpperCase() === keySet[drawnRow][drawnCell]) {
      setDraw(true)
    }
  }

  const handleKeyDown = (e: { key: any }) => {
    const keyClicked = e.key;
    if(drawnCell !== undefined && drawnRow !== undefined) {
      console.log(keySet[drawnRow][drawnCell])
    }
    handleChange(keyClicked.toUpperCase())
  }
  const handleClick = async(e: any) => {
    const keyClicked = e.target.dataset.key
    await handleChange(keyClicked)
    if(drawnCell !== undefined && drawnRow !== undefined) {
      console.log(keySet[drawnRow][drawnCell])
    }
  }

  const randomNumber = () => { 
      const x = Math.floor(Math.random() * 4)
      if(x !== undefined && x !== null) {
        setDraw(false)
        setDrawnCell(Math.floor(Math.random() * keySet[x].length))
        setDrawnRow(x) 
        if(drawnCell !== undefined && drawnRow !== undefined) {
          cell.current =  keySet[drawnRow][drawnCell]
        }
      }
      
  }

  useEffect(() => {
    randomNumber()
  }, [draw])

  return (
    <>
      <div className="keyboard">
        <h1>Eyes on the Screen</h1>
         {
          keySet.map((row, indexRow) => {
            return <div className='row' key={indexRow}>{
              row.map((key, indexCell) => {
                let char
                let style
                if(drawnRow === indexRow && drawnCell === indexCell && key.length === 1) {
                  style = 'key jiggle'
                }else if(drawnRow === indexRow && drawnCell === indexCell && key.length > 1) {
                  style = 'key utility jiggle'
                } else if(key.length > 1) {
                  style = 'key utility'
                } else {
                  style = 'key'
                }
                if(key === 'BACKSPACE') {
                  char = 'DEL'
                } else if (key === 'CAPSLOCK') {
                  char = 'CAPS'
                } else {
                  char = key
                }
                return <button className={style} data-key={key} key={`${indexRow}_${indexCell}`} onClick={handleClick} onKeyDown={handleKeyDown}>{char}</button>
              })
              }
              </div>
            }) 
         }
      </div>
    </>
  )
}

export default App
