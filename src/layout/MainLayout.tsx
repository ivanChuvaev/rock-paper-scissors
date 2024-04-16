import { SetStateAction, useCallback, useMemo, useReducer, useState } from 'react';
import { globalContext } from '../contexts/globalContext';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
import Modalbody from '../ui/ModalBody';
import Paper from '../ui/Paper';
import GameTitle from '../entities/GameTitle';

export default function MainLayout() {
  const [score, setScore] = useReducer((oldValue: number, newValue: SetStateAction<number>) => {
    const newNum = typeof newValue === 'function' ? newValue(oldValue) : newValue;
    localStorage.setItem('score', newNum.toString())
    return newNum
  }, localStorage.getItem('score') ? Number(localStorage.getItem('score')) : 0)

  const [rulesOpen, setRulesOpen] = useState(false);
  const { pathname } = useLocation();
  const game = useMemo(
    () => (pathname === '/bonus' ? 'BONUS' : 'ORIGINAL'),
    [pathname]
  );

  const incrementScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const decrementScore = useCallback(() => {
    setScore((prev) => prev - 1);
  }, []);

  return (
    <globalContext.Provider
      value={{ score, game, incrementScore, decrementScore }}
    >
      <>
        <div className="main-layout">
          <Outlet />
          <GameTitle />
          <div className="main-layout-buttons">
            {
              {
                BONUS: (
                  <>
                    <Link to="/original">
                      <button style={{ width: '100%' }}>Оригинал</button>
                    </Link>
                    <button onClick={() => setRulesOpen(true)}>Правила</button>
                  </>
                ),
                ORIGINAL: (
                  <>
                    <Link to="/bonus">
                      <button style={{ width: '100%' }}>Бонус</button>
                    </Link>
                    <button onClick={() => setRulesOpen(true)}>Правила</button>
                  </>
                ),
              }[game]
            }
          </div>
        </div>
        <Modal open={rulesOpen} onClose={() => setRulesOpen(false)}>
          <Modalbody>
            <Paper className='rules-paper'>
              {
                {
                  ORIGINAL: (
                    <>
                      <img
                        src="/images/image-rules.svg"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                      <ol>
                        <li>
                          Бумага побеждает ножницы
                        </li>
                        <li>
                          Камень побеждает ножницы
                        </li>
                        <li>
                          Ножницы побеждают бумагу
                        </li>
                      </ol>
                    </>
                  ),
                  BONUS: (
                    <>
                      <img
                        src="/images/image-rules-bonus.svg"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                      <ol>
                        <li>
                          Бумага побеждает камень
                        </li>
                        <li>
                          Бумага побеждает спока
                        </li>
                        <li>
                          Камень побеждает ящерицу
                        </li>
                        <li>
                          Камень побеждает ножницы
                        </li>
                        <li>
                          Ящерица побеждает спока
                        </li>
                        <li>
                          Ящерица побеждает бумагу
                        </li>
                        <li>
                          Спок побеждает ножницы
                        </li>
                        <li>
                          Спок побеждает камень
                        </li>
                        <li>
                          Ножницы побеждают бумагу
                        </li>
                        <li>
                          Ножницы побеждают ящерицу
                        </li>
                      </ol>
                    </>
                  ),
                }[game]
              }
            </Paper>
          </Modalbody>
        </Modal>
      </>
    </globalContext.Provider>
  );
}
