
import React, {useState} from "react";
import './App.css';
function App() {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async (event) => {
    // call api here
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: formData,
        }).then(response => {
          if (response.ok) {
            console.log(response)
          } else {
            throw new Error("Invalid Document");
          }
        })
        .catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
  }
  return (
    <div className="App">
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
    </div>
  );
}

export default App;
