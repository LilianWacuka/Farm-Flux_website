import { error } from "console";

const API= process.env.VITE_API_URL;

export const createFarm = async (body, token) =>{
    try {
        const res = await fetch(`${API}/farms`,{
            method: 'POST',
            headers: {
                'content-type':'application/json',
                'authorization':`bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        if(!res.ok) {
            throw data.message
        }
        return data
    } catch (error) {
      throw error
    }
}
export const addExpense = async (body, token) =>{
    try {
        const res = await fetch(`${API}/transactions`,{
            method: 'POST',
            headers: {
                'content-type':'application/json',
                'authorization':`bearer ${token}`
            },
            body: JSON.stringify({...body, type:'expense'})
        })
        const data = await res.json()
        if(!res.ok){
            throw data.message
        }
    } catch (error) {
        throw error
    }
}
export const addIncome = async (body, token) => {
    try {
        const res = await fetch(`${API}/transactions`,{
            method: 'POST',
            headers:{
                'content-type':'application/json',
                'authorization':`bearer ${token}`
            },
            body: JSON.stringify({...body, type:'income'})
        })
    } catch (error) {
        throw error
    }
}

export const getTransactions = async (token) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw data.message;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
