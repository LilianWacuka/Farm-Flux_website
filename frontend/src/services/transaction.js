const API= process.env.VITE_API_URL;
console.log("API Base URL:", API); // ✅ Log API URL

// Create Farm
export const createFarm = async (body, token) => {
  try {
    const res = await fetch(`${API}/farms`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("Create Farm Response:", data); // ✅ Log response

    if (!res.ok) {
      console.error("Create Farm Error:", data.message); // ✅ Log error
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error("Create Farm Catch:", err);
    throw err;
  }
};

// Add Expense
export const addExpense = async (body, token) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body, type: 'expense' }),
    });

    const data = await res.json();
    console.log("Add Expense Response:", data);

    if (!res.ok) {
      console.error("Add Expense Error:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error("Add Expense Catch:", err);
    throw err;
  }
};

// Add Income
export const addIncome = async (body, token) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body, type: 'income' }),
    });

    const data = await res.json();
    console.log("Add Income Response:", data);

    if (!res.ok) {
      console.error("Add Income Error:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error("Add Income Catch:", err);
    throw err;
  }
};

// Get Transactions
export const getTransactions = async (token) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Get Transactions Response:", data);

    if (!res.ok) {
      console.error("Get Transactions Error:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error("Get Transactions Catch:", err);
    throw err;
  }
};
