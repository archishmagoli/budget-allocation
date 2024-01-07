import { useState, useEffect } from "react";
import increase from '../images/increase.png';
import decrease from '../images/decrease.png';
import CustomChanges from "./CustomChanges";

const BudgetTable = ({currency, moneySpent, budget, onSpentChange}) => {
    const [allocation, setAllocation] = useState([
        {name: "Marketing", amount: 0},
        {name: "Finance", amount: 0},
        {name: "Sales", amount: 0},
        {name: "Human Resources", amount: 0},
        {name: "IT", amount: 0}
    ])

    // If the budget amount changes, reset all values in the allocation table
    useEffect(() => {
        setAllocation([
            {name: "Marketing", amount: 0},
            {name: "Finance", amount: 0},
            {name: "Sales", amount: 0},
            {name: "Human Resources", amount: 0},
            {name: "IT", amount: 0}
        ]);
      }, [budget]);

      // Any time the allocation changes, change the total amount spent
      useEffect(() => {
        onSpentChange(calculateTotalSpent());
      }, [allocation])

    // Handle increase and decrease button clicks
    const handleClick = (e) => {
        e.preventDefault();
        let allocationItem = e.target.id;
        let change = 0;

        if (allocationItem.includes("increase")) {
            if (budget - moneySpent < 10) {
                alert("Cannot exceed remaining funds " + currency + (budget - moneySpent) + ".");
                return;
            }
            allocationItem = allocationItem.replace("_increase", "")
            change = 10;
        } else if (allocationItem.includes("decrease")) {
            if (moneySpent === 0) {
                alert("Cannot decrease spent money to negative values.");
                return;
            }
            allocationItem = allocationItem.replace("_decrease", "")
            change = -10;
        }
        
        let newAllocation = allocation.map((originalItem) => allocationItem === originalItem.name ? 
        {name: originalItem.name, amount: originalItem.amount + change} : originalItem)

        console.log(newAllocation);

        setAllocation(newAllocation);
        let totalSpent = calculateTotalSpent();
        onSpentChange(totalSpent);
    }

    // Calculate the total amount spent by summing up each allocation value
    const calculateTotalSpent = () => {
        let total = 0;

        for (let i = 0; i < allocation.length; i++) {
            total += allocation[i].amount;
        }

        return total;
    }


    return (
        <div>
            <h2>Allocation</h2>
            <table className="table" style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th scope="col">Department</th>
                        <th scope="col">Amount Allocated</th>
                        <th scope="col">Increase by {currency}10</th>
                        <th scope="col">Decrease by {currency}10</th>
                    </tr>
                </thead>
                <tbody>
                    {allocation.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{currency}{item.amount}</td>
                            <td>
                                <form id={item.name + "_increase"} onSubmit={handleClick}>
                                    <input type="image" src={increase} alt="Increase Icon" style={{width: '15%', height: '50%'}}></input>
                                </form> 
                            </td>
                            <td>
                                <form id={item.name + "_decrease"} onSubmit={handleClick}>
                                    <input type="image" src={decrease} alt="Increase Icon" style={{width: '15%', height: '50%'}}></input>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CustomChanges allocation = {allocation} changeAllocations = {setAllocation}/>
        </div>
    )
}

export default BudgetTable;