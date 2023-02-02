import React, { useState } from 'react';
import './App.css';

function App() {

  const [filedata, setFiledata] = useState("") // store the actual data in given file
  const [ActualFileDetails, setActualFileDetails] = useState({}) // store the actual file property
  const [ModFile, setModFile] = useState("") // store the modifiled file data

  const [moto, setMoto] = useState("replace")

  const [find_txt, setFind_txt] = useState("")
  const [rep_txt, setRep_txt] = useState("")

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.readAsText(e.target.files[0]);
    setActualFileDetails(e.target.files[0])

    reader.onload = (e) => {
      const text = e.target.result;
      console.log("Actual file data ::\n", text);
      setFiledata(e.target.result)
    };

  };

  const on_changeTxt = (val, type) => {
    if (type == "find")
      setFind_txt(val)
    else if (type == "replace")
      setRep_txt(val)
  }

  const onReplace = (mode) => {

    if (filedata == "") {
      alert("Choose a file")
      return true
    }

    if (filedata.includes(find_txt)) {
      var replacable_text = mode == "Replace" ? rep_txt : ""
      var res = filedata.split(find_txt).join(replacable_text);
      console.log("res", res)
      setModFile(res)
    }
  }


  const downloadModFile = () => {

    const file = new Blob([ModFile], { type: ActualFileDetails.type });

    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "mod_" + Date.now() + "_" + ActualFileDetails.name;

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }



  return (
    <div>
      <div style={{ backgroundColor: "#fff", borderRadius: 1, borderRadius: 10, marginTop: 20, marginLeft: 20 }}>

        <div style={{ marginTop: 20 }}>
          <input
            multiple={false}
            accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
            type="file" onChange={showFile} />
        </div>

        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <text>Method </text>
          <select style={{ marginLeft: 10 }} value={moto} onChange={(e) => { setMoto(e.target.value) }}>
            <option value="replace">Find & replace</option>
            <option value="delete">Find & delete</option>
          </select>
        </div>

        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <text>Find text</text>
          <input style={{ height: 20, marginLeft: 10 }} type="text" onChange={(e) => { on_changeTxt(e.target.value, "find") }} />
        </div>

        {
          moto == "replace" &&
          <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <text>Replace text</text>
            <input style={{ height: 20, marginLeft: 10 }} type="text" onChange={(e) => { on_changeTxt(e.target.value, "replace") }} />
          </div>
        }


        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          {
            moto == "replace" ?
              <button style={{ marginRight: 10 }} onClick={() => { onReplace("Replace") }} className='btn'>Replace</button> :
              <button onClick={() => { onReplace("Delete") }} className='btn'>Delete</button>
          }


        </div>

        {
          ModFile &&
          <div style={{ marginTop: 10 }}>
            <button onClick={downloadModFile} className='btn'>Download Modified File</button>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
