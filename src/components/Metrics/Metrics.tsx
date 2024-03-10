import React from "react";

const Metrics: React.FC = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 m-2">
      <div className="col-span-5 justify-center p-2 text-xl font-bold border-solid border-2 rounded-sm">Metrics</div>
      <div className="col-span-2 row-span-2 row-start-2">2</div>
      <div className="col-span-2 row-span-2 col-start-4 row-start-2">3</div>
      <div className="col-span-2 row-span-2 row-start-4">4</div>
      <div className="col-span-2 row-span-2 col-start-4 row-start-4">5</div>
    </div>
  );
};

export default Metrics;
