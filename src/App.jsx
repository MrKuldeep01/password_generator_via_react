import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [len, setLen] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isSym, setIsSym] = useState(false);
  const [pass, setPass] = useState("");
  let passRef = useRef(null)
  function copyToClip(e){
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(pass);

  }
  let passGenerator = useCallback(() => {
    // password will generated here....
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) str += "1234567890";
    if (isSym) str += "@#$%^&*()_:";
    let passTxt='';
    for (let i = 1; i <= len; i++) {
      // const element = array[i];
      let char = Math.floor(Math.random() * str.length + 1);
     passTxt += str.charAt(char);
      setPass(passTxt);
      
    }
  }, [len, isNum, isSym, setPass]);

  useEffect(passGenerator,[len,isNum,isSym ]);
  return (
    <>
      <div className="hero flex flex-col max-w-md max-h-md justify-between items-center bg-zinc-700 rounded-xl">
        <div className="textBar flex justify-center items-center w-full  rounded-xl p-6 bg-red-800 ">
          <input
            type="text"
            value={pass}
            ref={passRef}
            readOnly
            className="outline-none border-none w-1/2 px-4 py-2 rounded-l-full"
          />
          <button className="rounded-r-full bg-blue-800 px-4 py-2 w-1/6" onClick={
            copyToClip
          }>
            copy
          </button>
        </div>
        <div
          className="bottombox h-full  
         w-full p-4 flex justify-center items-center gap-4 rounded-md bg-slate-600"
        >
          <label htmlFor="len"> Length : {len} </label>
          <input
            type="range"
            name="len"
            id="len"
            min={8}
            max={16}
            value={len}
            onChange={(evt)=>{
              setLen(evt.target.value)
            }}
          />
          <label htmlFor="isNum">Is Num. allowed</label>
          <input type="checkbox" defaultChecked={isNum}  onChange={(evt)=>{
              setIsNum((pre)=> !pre)

            }} name="isNum" id="isNum" />
        
          <label htmlFor="isSym">Is Symbols allowed</label>
          <input  onChange={(evt)=>{
              setIsSym((pre)=> !pre)
            }} type="checkbox" name="isSym" defaultChecked={isSym} id="isSym"  />
        </div>
      </div>
    </>
  );
}

export default App;
