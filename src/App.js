
import './App.css';

function App() {
  const handleFileUpload = async (event) => {
    // call api here
  }
  return (
    <div className="App">
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </div>
    </div>
  );
}

export default App;
