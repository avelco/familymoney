import React from "react";

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Spinner;