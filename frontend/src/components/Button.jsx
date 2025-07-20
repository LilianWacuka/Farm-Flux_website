export default function Button({ onClick, backgroundColor="bg-green-500", label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`${backgroundColor} mt-2 flex w-full  text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-center justify-center`}
    >
      {icon}
      <p className="ml-4 ">{label}</p>
    </button>
  );
}