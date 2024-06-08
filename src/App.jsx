import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    passwordRef.current.select()
    navigator.clipboard.writeText(password)
  }, [password])

  const generatePassword = useCallback(() => {
    let pass = ''
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) {
      characters += '0123456789'
    }
    if (symbolAllowed) {
      characters += '!@#$%^&*()_+'
    }
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      pass += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    setPassword(pass)
  }, [length, numberAllowed, symbolAllowed, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, symbolAllowed, generatePassword])

  return (
    <div className='w-full bg-gray-900 rounded-2xl p-4'>
      <div className='rounded-2xl p-4'>
        <h2 className='m-2 text-2xl font-bold'>Password Generator</h2>
        <div className='flex justify-center '>
          <h3 className='rounded-xl text-black  inline-block w-full bg-white p-3 font-bold text-2xl m-2' ref={passwordRef}>{password}</h3>
          <button onClick={
        copyToClipboard
          } className='bg-blue-400 m-2 p-3 rounded-xl' >Copy</button>
        </div>
        <div className='w-full p-3 m-2 flex justify-center items-center'>


          <div className='flex justify-center items-center'>
            <label htmlFor="length">Password Length :- </label>
            <input className='inline-block m-2'
              type="range"
              id="length"
              max={50}
              min={8}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <h4 className='inline-block m-2'>{length}</h4>
          </div>
          <div className='flex justify-center items-center'>
            <label htmlFor="number" className='m-2'>Number</label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
          </div>
          <div className='flex justify-center items-center'>

            <label htmlFor="symbol" className='m-3'>Symbol</label>
            <input
              type="checkbox"
              checked={symbolAllowed}
              onChange={() => setSymbolAllowed(!symbolAllowed)}
            />
          </div>





        </div>
      </div>
    </div>
  )
}


export default App
