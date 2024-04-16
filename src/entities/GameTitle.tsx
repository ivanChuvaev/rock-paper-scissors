import { useGlobalContext } from '../contexts/globalContext'
import Paper from '../ui/Paper';

export default function GameTitle() {
  const { score, game } = useGlobalContext();

  return (
    <div className='game-title'>
      <div className='game-title-title'>
        {{
          BONUS: (
            <img src="/images/logo-bonus.svg" height="85px" />
          ),
          ORIGINAL: (
            <img src="/images/logo.svg" height="50px" />
          )
        }[game]}
      </div>
      <Paper className='game-title-score'>
        <div className='game-title-score-label'>
          СЧЕТ
        </div>
        <div className='game-title-score-value'>
          {score}
        </div>
      </Paper>
    </div>
  )
}
