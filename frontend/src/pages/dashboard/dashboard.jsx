import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => setShowPopover((prev) => !prev);

  const handleNavigate = (path) => {
    navigate(path);
    setShowPopover(false);
  };

  const PlusIcon = ({ className = "size-6" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );

  const buttonClasses = "w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 mx-auto text-base sm:text-lg";
  const cardClasses = "w-full p-4 sm:p-6 md:p-8 lg:max-w-2xl";
  const headingClasses = "font-bold text-xl sm:text-2xl text-center mb-4 md:mb-6";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 w-full md:p-8">
      {/* View Reports Section */}
      <Card className={cardClasses}>
        <h2 className={headingClasses}>View Reports</h2>
        <Button
          label="View Reports"
          onClick={() => navigate("/report")}
          className={buttonClasses}
          icon={<PlusIcon />}
        />
      </Card>

      {/* Quick Actions Section */}
      <Card className={`${cardClasses} relative`}>
        <h2 className={headingClasses}>Add Actions</h2>
        <Button
          label="Quick Actions"
          onClick={togglePopover}
          className={buttonClasses}
          icon={<PlusIcon className="w-5 h-5" />}
        />

        {/* Responsive Popover */}
        {showPopover && (
          <div className="fixed inset-x-0 bottom-0 sm:absolute sm:inset-auto sm:top-full sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:mt-1 bg-white border border-gray-200 rounded-t-lg sm:rounded-lg shadow-xl z-50 w-full sm:w-64 p-3 sm:mx-0">
            <div className="max-w-md mx-auto sm:max-w-none">
              <h3 className="font-semibold text-lg mb-2 px-2 py-1">Quick Actions</h3>
              <ul className="space-y-1">
                <li
                  className="cursor-pointer hover:bg-gray-50 p-3 rounded-md text-base flex items-center gap-3 active:bg-gray-100"
                  onClick={() => handleNavigate("/transaction")}
                >
                  <span className="text-lg flex-shrink-0">➕</span>
                  <span>Add Transaction</span>
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-50 p-3 rounded-md text-base flex items-center gap-3 active:bg-gray-100"
                  onClick={() => alert("More actions coming soon")}
                >
                  <span className="text-lg flex-shrink-0">📄</span>
                  <span>View Summary</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowPopover(false)}
                className="sm:hidden w-full mt-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}