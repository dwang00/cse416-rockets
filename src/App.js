import logo from './rocketslogo.png';
import './App.css';
import GetData from "./get_data";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <div className="StatesContainer">

            <div className="State">
                <div>ALABAMA</div>
                <GetData/>
            </div>

            <div className="State">
                <div>DELAWARE</div>
            </div>

        </div>
    </div>
  );
}

export default App;
