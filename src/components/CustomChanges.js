import { useState } from "react";

const CustomChanges = ({allocation, changeAllocations}) => {
    const [department, setDepartment] = useState(allocation[0].name);
    const [allocationType, setAllocationType] = useState("Add");

    const handleAllocation = (e) => {
        e.preventDefault();
        console.log("Hi");
    }

    const changeDepartment = (e) => {
        e.preventDefault();
        setDepartment(document.getElementById("departmentDropdown"));
    }

    const changeAllocationType = (e) => {
        e.preventDefault();
        setAllocationType(document.getElementById("allocationType"));
    }

    return (
        <div>
            <h2>Change Allocation</h2>
            <form onSubmit={handleAllocation}>
                <div style={{ display: 'flex', gap: '1.5em'}}>
                    <button className="btn btn-secondary" disabled>Department</button>
                    <select className="form-control dropdowns" id="departmentDropdown" value={department} onChange={changeDepartment}>
                        {allocation.map(item => (
                            <option key={item.name} defaultValue value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <button className="btn btn-secondary" disabled>Allocation</button>
                    <select className="form-control dropdowns" id="allocationType" value={allocationType} onChange={changeAllocationType}>
                        <option defaultValue value="add">Add</option>
                        <option value="remove">Remove</option>
                    </select>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
            
        </div>
    )
}

export default CustomChanges;