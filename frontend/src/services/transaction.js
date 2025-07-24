const API = "https://farm-flux-website-3qls.onrender.com/api";
console.log("Error loading API Base URL:", API);

console.log("Error loading API Base URL:", API); 

// Create a new farm
export const createFarm = async (body, token) => {
  try {
    const res = await fetch(`${API}/farms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("Farm Created:", data);

    if (!res.ok) {
      console.error("Error creating farm:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error(" Error Create Farm Catch:", error);
    throw error;
  }
};

// 💸 Add Expense
export const addExpense = async (body, token) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body, type: 'expense' }),
    });

    const data = await res.json();
    console.log("✅ Add Expense Response:", data);

    if (!res.ok) {
      console.error("❌ Add Expense Error:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error("💥 Add Expense Catch:", error);
    throw error;
  }
};

// 💰 Add Income
export const addIncome = async (body, token) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body, type: 'income' }),
    });

    const data = await res.json();
    console.log("✅ Add Income Response:", data);

    if (!res.ok) {
      console.error("❌ Add Income Error:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error("💥 Add Income Catch:", error);
    throw error;
  }
};

// 📊 Get All Transactions
export const getTransactions = async (token) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("📦 Get Transactions Response:", data);

    if (!res.ok) {
      console.error("❌ Get Transactions Error:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error("💥 Get Transactions Catch:", error);
    throw error;
  }
};
