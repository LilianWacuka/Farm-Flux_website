import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowPopover(false); // Close the popover after navigating
  };

  return (
    <div className="relative p-4">
      {/* View Reports Section */}
      <Card>
        <h2 className="font-bold text-xl text-center mb-4">View Reports</h2>
        <Button
          label="View Reports"
          onClick={() => navigate("/report")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md flex items-center justify-center gap-2 mx-auto"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
        />
      </Card>

      {/* Quick Actions Section */}
      <div className="mt-6 text-center">
        <Card>
          <Button
            label="Quick Actions"
            onClick={togglePopover}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md flex items-center justify-center gap-2 mx-auto"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            }
          />

          {/* Popover content */}
          {showPopover && (
            <div className="absolute top-[10rem] left-4 bg-white border rounded shadow-md z-10 w-64 p-6">
              <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
              <ul className="space-y-2">
                <li
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleNavigate("/transaction")}
                >
                  ➕ Add Transaction
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => alert("More actions coming soon")}
                >
                  📄 View Summary
                </li>
              </ul>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
