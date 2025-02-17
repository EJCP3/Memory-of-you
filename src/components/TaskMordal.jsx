export const TaskMordal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`w-full h-full r  z-[1000] fixed inset-0   transition-colors  ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div className="w-[360px] sm:w-11/12  h-screen flex justify-center items-center ">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative
        bg-gray-800 h-[400px] w-[300px] lg:w-[800px] ml-4  rounded-xl shadow overflow-visible  transition-all sm:w-[620px]
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
