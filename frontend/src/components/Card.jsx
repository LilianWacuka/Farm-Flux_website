export default function Card({ children }) {
  return (
    <div className="bg-white w-[400px] p-4 rounded-md shadow-md my-2 hover:cursor-pointer">
      { children }
    </div>
  )
}