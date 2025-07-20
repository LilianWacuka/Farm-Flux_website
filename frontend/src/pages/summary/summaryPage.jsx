import { useEffect, useState } from "react";
import { getTransactions } from "../../services/transaction";

export default function SummaryPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getTransactions(token);
        setTransactions(data);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction Summary</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="p-2">{tx.name}</td>
                <td className="p-2">{tx.category}</td>
                <td className="p-2">KSh {tx.amount?.toFixed(2)}</td>
                <td className="p-2">{tx.quantity}</td>
                <td className="p-2 font-semibold">KSh {tx.total?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
