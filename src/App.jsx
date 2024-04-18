import React, { useState, useRef } from 'react';

import './App.css';

function App() {
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = () => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (number) str += '0123456789';
    if (character) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  };

  const copyPasswordToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 999);
      document.execCommand('copy');
    }
  };

  const handleGeneratePassword = () => {
    passwordGenerator();
  };

  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value));
  };

  const handleNumberChange = () => {
    setNumber((prev) => !prev);
  };

  const handleCharacterChange = () => {
    setCharacter((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto flex h-screen justify-center text-white font-sans md:max-w-6xl">
      <div className="md:w-5/12 sm:w-full md:h-2/3 sm:h-1/4 border border-solid border-[#0A0F1D] bg-[#030711]">
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
          onClick={handleGeneratePassword}
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
              onChange={handleLengthChange}
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
              checked={number}
              className="cursor-pointer"
              id="numberInput"
              onChange={handleNumberChange}
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
              checked={character}
              id="characterInput"
              onChange={handleCharacterChange}
              className="cursor-pointer"
              style={{ width: '90%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
