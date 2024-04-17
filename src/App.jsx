import { useCallback, useState, useEffect, useRef  } from 'react';

import './App.css';

function App() {
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');


  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (number) str += '0123456789';
    if (character) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character]);


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
      <div className="flex h-screen justify-center text-white font-sans">
        <div className="w-5/12 h-2/3 border border-solid border-[#0A0F1D] bg-[#030711]">
          <h1 className="text-left mt-4 mx-6 text-lg">Password Generator</h1>
          <p className="text-left text-[#495464] mt-1.5 mx-6">
            Enter the necessary checkbox to generate the new password and copy.
          </p>

          <input
            type="text"
            value={password}
            className="outline-none w-9/12 mt-3 p-1.5 bg-transparent border border-solid border-[#0A0F1D] bg-[#030711]"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-transparent text-white p-1.5 mx-3 border border-solid border-[#0A0F1D] bg-[#0C1425]"
          >
            Copy
          </button>

          <br />

          <button
            onClick={() => passwordGenerator()}
            className="w-11/12 mt-3 outline-none bg-transparent text-white p-1.5 mx-3 border border-solid border-[#0A0F1D] bg-[#0C1425]"
          >
            Generate Password
          </button>

          <div className="w-11/12 mt-1.5 mx-6 border border-solid border-[#0A0F1D] bg-[#030711]">
            <div className="flex items-center gap-x-1 p-1.5">
              <label>Length: {length}</label>
              <br />
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(parseInt(e.target.value));
                }}
                style={{ width: '90%' }}
              />
            </div>
          </div>

          <div className="w-11/12 mt-1.5 mx-6 border border-solid border-[#0A0F1D] bg-[#030711]">
            <div className="flex items-center gap-x-1 p-1.5">
              <label htmlFor="numberInput">Numbers</label>
              <br />
              <input
                type="checkbox"
                defaultChecked={number}
                className="cursor-pointer"
                id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
                style={{ width: '90%' }}
              />
            </div>
          </div>

          <div className="w-11/12 mt-1.5 mx-6 border border-solid border-[#0A0F1D] bg-[#030711]">
            <div className="flex items-center gap-x-1 p-1.5">
              <label htmlFor="characterInput">Characters</label>
              <br />
              <input
                type="checkbox"
                id="characterInput"
                defaultChecked={character}
                className="cursor-pointer"
                style={{ width: '90%' }}
                onChange={() => {
                  setCharacter((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
