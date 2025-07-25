const API = import.meta.env.VITE_API_URL;
console.log(`${API}/farms`)

// Create a new farm
export const createFarm = async (body, token) => {
  try {
    const res = await fetch(`${API}/farms`, {
      method: 'POST',
      headers: {
         'credentials': 'include',
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
    console.log("Expense Created Sucessfully:", data);

    if (!res.ok) {
      console.error("Unable to Add Expense:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error("Unable to Add Expense", error);
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
