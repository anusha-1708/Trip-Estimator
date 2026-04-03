import Button from "../Button/Button";
const DeleteModal = ({ id, handleClose }) => {
  return (
    <div className="flex flex-col gap-3 text-center p-3 m-4">
      <h2 className="text-2xl font-bold text-blue-900">Delete Trip</h2>
      <p className="text-blue-800">
        This will permanently delete this Trip. This action cannot be undone.
      </p>
      <div className="flex items-center justify-center gap-2 mt-4">
        <input
          type="checkbox"
          className="h-4 w-5 cursor-pointer accent-blue-700"
          //   checked={checkboxClick}
          //   onChange={(e) => setCheckboxClick(e.target.checked)}
        />
        <span className="text-sm text-blue-900 font-medium">
          I understand this action is permanent
        </span>
      </div>
      <div className="flex gap-4 mt-6">
        <Button
          className="bg-gray-500 text-black w-full justify-center hover:bg-gray-600"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          className="bg-red-600 text-white w-full justify-center hover:bg-red-700"
          //   disabled={!checkboxClick}
          onClick={() => handleDelete(id)}
        >
          Confirm Delete
        </Button>
      </div>
    </div>
  );
};
export default DeleteModal;
