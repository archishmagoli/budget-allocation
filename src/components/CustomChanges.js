import { useState, useEffect } from "react";

const CustomChanges = ({budget, moneySpent, allocation, changeAllocations, currency}) => {
    const [department, setDepartment] = useState(allocation[0].name);
    const [allocationType, setAllocationType] = useState("add");

    useEffect(() => {
        if (moneySpent !== 0 || budget !== 0) {
            return;
        } else {
            document.getElementById("customValue").value = 0;
        }
    });

    const handleAllocation = (e) => {
        e.preventDefault();
        let allocationValue = parseInt(document.getElementById("customValue").value);
        let department = document.getElementById("departmentType").value;
        let allocationType = document.getElementById("allocationType").value;
        let amountChange = allocationType === "add" ? allocationValue : 0 - allocationValue;

        if (amountChange > budget - moneySpent) {
            alert("The value cannot exceed the remaining funds " + currency + (budget - moneySpent) + ".")
        }

        let updatedAllocation = allocation.map((item) => department === item.name ? {name : item.name, amount : parseInt(item.amount + amountChange)} : item);
        changeAllocations(updatedAllocation);
    }

    const changeDepartment = (e) => {
        e.preventDefault();
        setDepartment(document.getElementById("departmentType").value);
    }

    const changeAllocationType = (e) => {
        e.preventDefault();
        setAllocationType(document.getElementById("allocationType").value);
    }

    return (
        <div>
            <h2>Change Allocation</h2>
            <form onSubmit={handleAllocation}>
                <div style={{ display: 'flex', gap: '1.5em'}}>
                    <button className="btn btn-secondary" disabled>Department</button>
                    <select className="form-control dropdowns" id="departmentType" value={department} onChange={changeDepartment}>
                        {allocation.map(item => (
                            <option key={item.name} defaultValue value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <button className="btn btn-secondary" disabled>Allocation</button>
                    <select className="form-control dropdowns" id="allocationType" value={allocationType} onChange={changeAllocationType}>
                        <option defaultValue value="add">Add</option>
                        <option value="remove">Remove</option>
                    </select>
                    <div>{currency}<input type="number" min="0" step="10" id="customValue"></input></div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CustomChanges;