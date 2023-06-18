
import React, {useState} from "react";
import './App.css';
function App() {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        alert("File uploaded successfully and emails sent!")
      } else {
        console.error('Error uploading file:', response.status);
        alert("Invalid CSV format")
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
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
