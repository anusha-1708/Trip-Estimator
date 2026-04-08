import React from "react";

const ListCard = ({ title, data, renderItem }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#1f2a44]/10 shadow-sm p-5 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-[#101828] font-['Fraunces']">{title}</h2>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {data?.map((item, index) => (
          <div
            key={index}
            className="border border-[#1f2a44]/10 rounded-xl p-3 flex items-center justify-between"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCard;
