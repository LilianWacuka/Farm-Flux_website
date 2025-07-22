import { useState } from 'react';
import Button from '../../components/Button';
import Card from '@/components/Card';
import { addExpense, addIncome, createFarm } from '@/services/transaction';

export default function Transaction() {
  const [incomeData, setIncomeData] = useState({ name: '', quantity: '', amount: '', category: '' });
  const [expenseData, setExpenseData] = useState({ name: '', quantity: '', amount: '', category: ''});
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [farmName, setFarmName] = useState("");
  const [poultry, setPoultry] = useState("");
  const token = localStorage.getItem("token");

  const handleIncomeChange = (e) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  // ✅ Modified to include total = quantity * amount
  const handleAddIncome = async (e) => {
    e.preventDefault();
    const quantity = parseFloat(incomeData.quantity);
    const amount = parseFloat(incomeData.amount);
    const total = quantity * amount;

    if (!amount || !quantity) return;

    const incomePayload = { ...incomeData, quantity, amount, total };

    try {
      const res = await addIncome(incomePayload, token);
      alert('Income Created Successfully');
      setIncomes([...incomes, incomePayload]);
      setIncomeData({ name: '', quantity: '', amount: '', category: '' });
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Modified to include total = quantity * amount
  const handleAddExpense = async (e) => {
    e.preventDefault();
    const quantity = parseFloat(expenseData.quantity);
    const amount = parseFloat(expenseData.amount);
    const total = quantity * amount;

    if (!amount || !quantity) return;

    const expensePayload = { ...expenseData, quantity, amount, total };

    try {
      const res = await addExpense(expensePayload, token);
      alert('Expense Created Successfully');
      setExpenses([...expenses, expensePayload]);
      setExpenseData({ name: '', quantity: '', amount: '', category: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFarm = async (e) => {
    e.preventDefault();
    try {
      const body = { farmName, poultyTypes: poultry };
      const response = await createFarm(body, token);
      alert('Farm Created Successfully');
      setFarmName("");
      setPoultry("");
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Change total calculation to use item.total
  const totalIncome = incomes.reduce((sum, item) => sum + (item.total || 0), 0);
  const totalExpense = expenses.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 gap-8">
      {/* Farm Card */}
      <Card className="p-6 w-full max-w-5xl">
        <h2 className="font-bold text-xl text-center mb-4">Register Farm</h2>
        <form className="flex flex-col gap-4 mt-4">
          <input className="p-2 border rounded" type="text" placeholder="Farm Name" value={farmName} onChange={e => setFarmName(e.target.value)} />
          <label>Choose Poultry Type</label>
          <select onChange={e => setPoultry(e.target.value)} value={poultry} className="p-2 border rounded">
            <option value="">-- Select --</option>
            <option value="layers">Layers</option>
            <option value="broilers">Broilers</option>
            <option value="kienyeji">Kienyeji</option>
            <option value="all">All</option>
          </select>
          <Button label="Create Farm" backgroundColor="bg-green-600" onClick={handleAddFarm} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0Z" />
            </svg>
          } />
        </form>
      </Card>

      {/* Income & Expense Cards */}
      <div className="flex flex-col md:flex-row justify-between gap-6 w-full max-w-5xl">
        {/* Income Card */}
        <Card className="p-6 w-full md:w-1/2">
          <form onSubmit={handleAddIncome} className="flex flex-col gap-4 mt-2">
            <h3 className="text-lg font-semibold text-green-700">Add Income</h3>
            <input type="text" name="name" value={incomeData.name} onChange={handleIncomeChange} placeholder="Name" className="p-2 border rounded" />
            <input type="number" name="quantity" value={incomeData.quantity} onChange={handleIncomeChange} placeholder="Quantity" className="p-2 border rounded" />
            <input type="number" name="amount" value={incomeData.amount} onChange={handleIncomeChange} placeholder="Amount" className="p-2 border rounded" />
            <select name="category" value={incomeData.category} onChange={handleIncomeChange} className="p-2 border rounded">
              <option value="">-- Select Category --</option>
              <option value="manure">Manure</option>
              <option value="livechicken">Live Chicken / Meat</option>
              <option value="chick">Chick</option>
              <option value="feather">Feather</option>
              <option value="eggs">Eggs</option>
              
            </select>
            <Button label="Add Income" backgroundColor="bg-green-600" onClick={handleAddIncome} icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0Z" />
              </svg>
            } />
          </form>
        </Card>

        {/* Expense Card */}
        <Card className="p-6 w-full md:w-1/2">
          <form onSubmit={handleAddExpense} className="flex flex-col gap-4 mt-2">
            <h3 className="text-lg font-semibold text-red-700">Add Expense</h3>
            <input type="text" name="name" value={expenseData.name} onChange={handleExpenseChange} placeholder="Name" className="p-2 border rounded" />
            <input type="number" name="quantity" value={expenseData.quantity} onChange={handleExpenseChange} placeholder="Quantity" className="p-2 border rounded" />
            <input type="number" name="amount" value={expenseData.amount} onChange={handleExpenseChange} placeholder="Amount" className="p-2 border rounded" />
            <select name="category" value={expenseData.category} onChange={handleExpenseChange} className="p-2 border rounded">
              <option value="">-- Select Category --</option>
              <option value="feed">Feed</option>
              <option value="medicine">Medicine</option>
              <option value="labor">Labor</option>
              <option value="equipment">Equipment</option>
              <option value="electricty">Electricity Bill</option>
              <option value="water">Water Bill</option>
              <option value="transport">Transport</option>
              <option value="miscellaneous">Miscellaneous</option>
              <option value="supplements">Supplements</option>
            </select>
            <Button label="Add Expense" backgroundColor="bg-red-600" onClick={handleAddExpense} icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0Z" />
              </svg>
            } />
          </form>

          {/* Summary */}
          <div className="mt-6 text-center font-semibold text-gray-800">
            <p>Total Income: <span className="text-green-700">Ksh {totalIncome}</span></p>
            <p>Total Expenses: <span className="text-red-700">Ksh {totalExpense}</span></p>
          </div>
        </Card>
      </div>
    </div>
  );
}
