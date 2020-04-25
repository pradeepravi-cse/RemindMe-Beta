import React from "react";
import noData from "../../assets/images/NoData.png";
export default function NoRemider({ message }: any) {
  return (
    <div className="row">
      <div className="col text-center mt-4">
        <img
          src={noData}
          alt="No Data"
          className="img-fluid"
          style={{ maxHeight: "40vh" }}
        />
        {message}
      </div>
    </div>
  );
}
