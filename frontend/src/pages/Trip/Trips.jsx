import React, { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit, FaArrowCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getFixedExpenses,
  calculatePerPerson,
} from "../../customHooks/Calculation";
import { useFilterTrips } from "../../customHooks/Filter";
import Button from "../../component/Button/Button";
import { AiOutlineControl } from "react-icons/ai";
import { RiUserSharedLine } from "react-icons/ri";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaArrowCircleDown } from "react-icons/fa";
import DialogBox from "../../component/DailogModal/Dailog";
import {
  fetchAllTripsAsync,
  deleteTripAsync,
  setSearchQuery,
  setSelectedSortValue,
  setSelectedPrice,
} from "../../store/trip.store";
import { downloadTripSummary } from "../../api/trip";
import ShareTripModal from "../../component/DailogModal/ShareTripModal";
import DeleteModal from "../../component/DailogModal/DeleteModal";
import ViewModal from "../../component/DailogModal/ViewModal";
const itemsPerPage = 10;

const MyTrips = ({ isOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [checkboxClick, setCheckboxClick] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const { filteredTrips } = useFilterTrips();
  const dispatch = useDispatch();
  const { selectedSortValue, selectedPrice } = useSelector(
    (state) => state.stepper,
  );

  useEffect(() => {
    dispatch(fetchAllTripsAsync());
  }, [dispatch]);
  //Pagination logic
  const safeTrips = filteredTrips || [];
  console.log("safeTrips", safeTrips);
  const totalItems = safeTrips.length;
  console.log("totalItems", totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = safeTrips.slice(startIndex, startIndex + itemsPerPage);
  console.log("currentCards", currentCards);

  // Function for delete items
  const handleDeleteModal = (item) => {
    setSelectedItem(item);
    setModalMode("delete");
    setOpenModal(true);
  };
  const handleDelete = (id) => {
    dispatch(deleteTripAsync(id));
    handleClose();
  };

  const handleViewMore = (item) => {
    setSelectedItem(item);
    setModalMode("view");
    setOpenModal(true);
  };

  // Function for edit items
  const handleEdit = (itemId) => {
    isOpen(itemId);
    handleClose();
  };

  // Handler function for previous and next for pagination
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedItem(null);
    setCheckboxClick(false);
  };

  const handleShareTrip = (tripId) => {
    setOpenModal(true);
    setModalMode("share");
    setSelectedItem({ _id: tripId });
  };
  const handledownloadPDF = async (tripId) => {
    const data = await downloadTripSummary(tripId);
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `trip_summary_${tripId}.pdf`;
    link.click();
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-700">
                Plan Smarter
              </p>
              <h1 className="text-4xl md:text-5xl text-blue-950">My Trips</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => isOpen()}
                className="rounded-full bg-blue-700 text-white px-5 py-2 text-sm font-semibold tracking-wide shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                New Trip
              </button>
              <div className="relative w-48">
                <select
                  className="w-full h-10 px-4 pr-9 border border-blue-200 bg-white text-blue-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 "
                  value={selectedSortValue}
                  onChange={(e) =>
                    dispatch(setSelectedSortValue(e.target.value))
                  }
                >
                  <option value="none">Filters</option>
                  <option value="low">Price (Low-High)</option>
                  <option value="high">Price (High-Low)</option>
                  <option value="ascending">Sort(a-z)</option>
                  <option value="descending">Sort(z-a)</option>
                </select>
                <AiOutlineControl
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-700 rotate-90"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentCards.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-dashed border-blue-200 bg-white/80 p-10 text-center shadow-sm">
                <p className="text-blue-900">
                  No trips found yet. Create your first adventure!
                </p>
              </div>
            ) : (
              currentCards.map((item) => {
                const expense = getFixedExpenses(item.fixedExpense || {});
                const perPersonCost = calculatePerPerson(
                  item.fixedExpense || {},
                  item.persons || 1,
                );
                return (
                  <div
                    key={item._id}
                    className="group relative rounded-3xl bg-white border border-blue-100 shadow-xl shadow-blue-900/10 p-5 flex flex-col gap-4 transition hover:-translate-y-1 hover:border-blue-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-blue-700 ">
                          Trip
                        </p>
                        <h2 className="text-xl text-blue-950 ">
                          {item.tripName}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="h-9 w-9 rounded-full bg-blue-50 text-blue-700 grid place-items-center hover:cursor-pointer transition hover:bg-blue-100"
                          onClick={() => handleEdit(item._id)}
                          aria-label="Edit trip"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          className="h-9 w-9 rounded-full bg-blue-50 text-blue-700 grid place-items-center hover:cursor-pointer transition hover:bg-blue-100"
                          onClick={() => handleDeleteModal(item)}
                          aria-label="Delete trip"
                        >
                          <RiDeleteBin5Line className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 text-blue-800 px-3 py-1 text-xs font-semibold">
                        {item.destination}
                      </span>
                      <span className="rounded-full bg-blue-50 text-blue-800 px-3 py-1 text-xs font-semibold ">
                        {item.persons} People
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-blue-900 ">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-blue-700">
                          Total Cost
                        </p>
                        <p className="text-base text-blue-950 font-semibold">
                          {expense}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-blue-700">
                          Per Person
                        </p>
                        <p className="text-base text-blue-950 font-semibold">
                          {perPersonCost}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="self-start gap-2 bg-blue-700 text-white rounded-full px-4 py-2 shadow-md shadow-blue-900/20 hover:cursor-pointer hover:bg-blue-800"
                      onClick={() => handleViewMore(item)}
                    >
                      View Details <FaArrowCircleRight />
                    </Button>
                    <button
                      className="h-9 w-9 rounded-full bg-blue-50 text-blue-700 grid place-items-center hover:cursor-pointer transition hover:bg-blue-100"
                      onClick={() => handleShareTrip(item._id)}
                      aria-label="share trip"
                    >
                      <RiUserSharedLine className="h-4 w-4" />
                    </button>
                    <button
                      className="h-9 w-9 rounded-full bg-blue-50 text-blue-700 grid place-items-center hover:cursor-pointer transition hover:bg-blue-100"
                      onClick={() => handledownloadPDF(item._id)}
                      aria-label="download pdf"
                    >
                      <FaArrowCircleDown className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <div className="flex flex-col items-center gap-3 mt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-blue-700">
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </div>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-blue-700 text-white rounded-full px-4 hover:bg-blue-800"
              onClick={handlePrev}
            >
              <GrPrevious />
            </Button>
            <Button
              className="bg-blue-700 text-white rounded-full px-4 hover:bg-blue-800"
              onClick={handleNext}
            >
              <GrNext />
            </Button>
          </div>
        </div>
      </div>
      <DialogBox onClose={handleClose} open={openModal}>
        {modalMode === "view" && selectedItem && (
          <ViewModal
            trip={selectedItem}
            handleEdit={handleEdit}
            setModalMode={setModalMode}
          />
        )}
        {modalMode === "delete" && selectedItem && (
          <DeleteModal
            id={selectedItem._id}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        )}
        {modalMode === "share" && selectedItem && (
          <ShareTripModal
            open={openModal}
            onClose={handleClose}
            tripId={selectedItem._id}
          />
        )}
      </DialogBox>
    </div>
  );
};

export default MyTrips;
