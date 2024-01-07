import { useState } from "react";
import './App.css';
import BudgetTable from "./components/BudgetTable";

function App() {
  const [currency, setCurrency] = useState("$");
  const [budget, setBudget] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);
    
  const handleCurrency = () => {
      setCurrency(document.getElementById("currencyDropdown").value);
  }

  const changeBudget = () => {
    setBudget(document.getElementById("userBudget").value);
  }

  const changeMoneySpent = (amount) => {
    setMoneySpent(amount);
  }

  return (
    <div className="App" style={{margin: '2em'}}>
      <h1 className="title">Company's Budget Allocation Application</h1>
      <div className="container-fluid" >
        <div className="row" style={{margin: '0.5em', gap: '0.5em'}}>
          <div className="column col-sm" style={{backgroundColor: 'lightgray'}}>
            Budget: {currency}<input type="number" value={budget} step="10" onChange={changeBudget} id="userBudget"></input>
          </div>
          <div className="money-text column col-sm" style={{backgroundColor: 'lightblue'}}>
            <p style={{color: 'navy'}}>Remaining: {currency}{budget - moneySpent}</p>
          </div>
          <div className="money-text column col-sm" style={{backgroundColor: 'lavender'}}>
            <p style={{color: 'purple'}}>Spent so far: {currency}{moneySpent}</p>
          </div>
          <div className="column col-sm" style={{backgroundColor: 'lightgreen'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <p className="money-text" style={{ marginRight: '0.25em'}}>Currency:</p>
              <select class="form-control" id="currencyDropdown" value={currency} onChange={handleCurrency} style={{color: 'white', backgroundColor: 'green'}}>
                  <option defaultValue value="$">United States Dollar ($)</option>
                  <option value="£">English Pound (£)</option>
                  <option value="€">Euro (€)</option>
                  <option value="₹">Indian Rupee (₹)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <BudgetTable currency={currency} moneySpent={moneySpent} budget={budget} onSpentChange = {changeMoneySpent}/>
    </div>
  );
}

export default App;
