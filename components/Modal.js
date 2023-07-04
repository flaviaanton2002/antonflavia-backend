export default function Modal({ onClose }) {
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-bgModal">
      <div className="bg-white maxw-[600px] w-full mx-5 p-3">
        <div className="flex items-center justify-between ">
          <h3>Modal title</h3>
          <button className="cursor-pointer" onClick={onClose}>
            X
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-x-3">
          <button
            className="bg-primary text-white py-2 px-5"
            onClick={() => {}}
          >
            Yes
          </button>
          <button className="bg-highlight py-2 px-5" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
