import { useState, useEffect, useCallback } from "react";
import increase from '../images/increase.png';
import decrease from '../images/decrease.png';
import CustomChanges from "./CustomChanges";
import { IconButton } from "rsuite";
import WarningRoundIcon from '@rsuite/icons/WarningRound';

const BudgetTable = ({currency, moneySpent, budget, onSpentChange}) => {
    const [allocation, setAllocation] = useState([
        {name: "Marketing", amount: 0},
        {name: "Finance", amount: 0},
        {name: "Sales", amount: 0},
        {name: "Human Resources", amount: 0},
        {name: "IT", amount: 0}
    ]);
    
    // Calculate the total amount spent by summing up each allocation value
    const calculateTotalSpent = useCallback(() => {
        let total = 0;
        for (let i = 0; i < allocation.length; i++) {
            total += allocation[i].amount;
        }

        return total;
    }, [allocation]);

    useEffect(() => {
        onSpentChange(calculateTotalSpent());
    }, [allocation, onSpentChange, calculateTotalSpent])

    useEffect(() => {
        if (moneySpent !== 0 || budget !== 0) {
            return;
        }
        setAllocation([
            {name: "Marketing", amount: 0},
            {name: "Finance", amount: 0},
            {name: "Sales", amount: 0},
            {name: "Human Resources", amount: 0},
            {name: "IT", amount: 0}
        ]);
    }, [budget, moneySpent])

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
            allocationItem = allocationItem.replace("_increase", "");
            change = 10;
        } else if (allocationItem.includes("decrease")) {
            if (moneySpent === 0) {
                alert("Cannot decrease spent money to negative values.");
                return;
            }
            allocationItem = allocationItem.replace("_decrease", "");
            change = -10;
        }
        
        let newAllocation = allocation.map((originalItem) => allocationItem === originalItem.name ? 
        {name: originalItem.name, amount: originalItem.amount + change} : originalItem)

        setAllocation(newAllocation);
        let totalSpent = calculateTotalSpent();
        onSpentChange(totalSpent);
    }

    const deleteItem = (e) => {
        if (allocation.length === 1) {
            alert("You must have at least one department to budget for.");
            return;
        }

        let itemToDelete = e.target.id.replace("_delete", "");
        let modifiedAllocation = allocation.filter(item => item.name !== itemToDelete);
        setAllocation(modifiedAllocation);
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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {allocation.map(item => (
                        <tr key={item.name} style={{alignItems: 'center'}}>
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
                            <td>
                                <IconButton icon={<WarningRoundIcon />} id={item.name + "_delete"} style={{width: '40%', height: '100%'}} onClick={deleteItem}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CustomChanges budget={budget} moneySpent={moneySpent} allocation={allocation} changeAllocations={setAllocation} currency={currency}/>
        </div>
    )
}

export default BudgetTable;