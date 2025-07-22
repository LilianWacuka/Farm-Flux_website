const API = 'http://localhost:5000/api';

export const getIncomeReport = async () => {
  const res = await fetch(`${API}/reports/income`, {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data.message;
  return data;
};

export const getExpenseReport = async () => {
  const res = await fetch(`${API}/reports/expense`, {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data.message;
  return data;
};
