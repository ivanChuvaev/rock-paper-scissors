import { useReducer } from "react"
import { useGlobalContext } from "../contexts/globalContext"
import VariantButton from "../entities/VariantButton"

const variants = ['ROCK', 'PAPER', 'SCISSORS'] as const
type TVariant = typeof variants[number]

const winMap: Record<TVariant, TVariant> = {
  SCISSORS: 'PAPER',
  PAPER: 'ROCK',
  ROCK: 'SCISSORS'
}

const calculateWinner = (your: TVariant, computer: TVariant): 'NONE' | 'YOU' | 'COMPUTER' => {
  if (your === computer) {
    return 'NONE'
  }
  return winMap[your] === computer ? 'YOU' : 'COMPUTER' 
}
type TWinner = ReturnType<typeof calculateWinner>

type TStage =
  | {
    stage: 'SELECT'
  }
  | {
    stage: 'OVER'
    computer: TVariant
    your: TVariant
    winner: TWinner
  }

export default function Original() {
  const { incrementScore, decrementScore } = useGlobalContext();

  const [stage, setStage] = useReducer((_prev: TStage, next: TStage) => {
    if (next.stage === 'OVER') {
      if (next.winner === 'YOU') {
        incrementScore();
      } else if (next.winner === 'COMPUTER') {
        decrementScore()
      }
    }
    return next;
  }, { stage: 'SELECT' })

  const handleSelect = (newYourSelected: TVariant) => {
    const newComputerSelected = variants[Math.floor(Math.random() * variants.length)];
    const newWinner = calculateWinner(newYourSelected, newComputerSelected);
    setStage({
      stage: 'OVER',
      computer: newComputerSelected,
      your: newYourSelected,
      winner: newWinner
    })
  }

  return (
    <div className="original-game">
      {{
        SELECT: () => stage.stage === 'SELECT' && (
          <div className="select-variants">
            {variants.map((variant, i) => {
              const angle = i * (360 / (variants.length)) + 90;
              return (
                <VariantButton
                  style={{
                    position: 'absolute',
                    transformOrigin: 'center',
                    transform: `translate(calc(cos(${angle}deg) * var(--radius) - 50%), calc(sin(${angle}deg) * var(--radius) - 50%))`
                  }}
                  key={variant}
                  variant={variant}
                  onClick={() => handleSelect(variant)}
                />
              )
            })}
          </div>
        ),
        OVER: () => stage.stage === 'OVER' && (
          <div className="over-message">
            <div className="over-message-variant">
              <label>Вы выбрали</label>
              <VariantButton variant={stage.your} />
            </div>

            <div className="over-message-middle">
              <label>
                {{
                  NONE: 'Ничья',
                  COMPUTER: 'Вы проиграли',
                  YOU: 'Вы выйграли'
                }[stage.winner]}
              </label>
              <button onClick={() => setStage({ stage: 'SELECT' })}>
                Играть снова
              </button>
            </div>

            <div className="over-message-variant">
              <label>Компьютер выбрал</label>
              <VariantButton variant={stage.computer} />
            </div>
          </div>
        )
      }[stage.stage]()}
    </div>
  )
}
