const API = 'http://localhost:5000/api';

export const getWeeklyReport = async (token) => {
  const res = await fetch(`${API}/report/weekly`, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data.message;
  return data;
};

export const getMonthlyReport = async (year, month) => {
  const res = await fetch(`${API}/report/monthly/${year}/${month}`, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data.message;
  return data;
};
