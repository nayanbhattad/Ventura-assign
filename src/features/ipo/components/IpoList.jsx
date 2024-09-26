import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIpoList,
  selectIpoListError,
  selectIpoListStatus,
} from "../../api/ipoSlice";
import { fetchIpoList } from "../../api/network";
import BasicTable from "./Table";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";

const header = [
  {
    id: "companyName",
    label: "Company/Issue date",
    nestedData: true,
    subId: "issueDates",
  },
  {
    id: "issueSize",
    label: "Issue size",
    nestedData: false,
  },
  {
    id: "priceRange",
    label: "price Range",
    nestedData: false,
  },
  {
    id: "minimumAmount",
    label: "Min invest/qty",
    nestedData: true,
    subId: "lotSize",
  },
];

function IpoList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors to get IPO list, status, and error from Redux store
  const ipoList = useSelector(selectIpoList);
  const ipoListStatus = useSelector(selectIpoListStatus);
  const ipoListError = useSelector(selectIpoListError);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    dispatch(fetchIpoList()).catch((err) => showBoundary(err));
  }, []);

  // Format Data before render for table
  const formatData = (data) => {
    const formatedRows = [];
    data?.forEach((item) => {
      formatedRows.push({
        id: item.id,
        avatar: item.avatar,
        companyName: item.companyName,
        issueSize: `₹ ${item.issueSize}`,
        priceRange: `₹ ${item.priceRange}`,
        minimumAmount: `₹ ${item.minimumAmount}`,
        lotSize: `${item.lotSize} shares/5 lots`,
        issueDates: item.issueDates,
      });
    });
    return formatedRows;
  };

  const handleNavigate = (id) => {
    navigate(`/ipo/${id}`);
  };

  // Handle different loading states
  if (ipoListStatus === "loading") {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        {<CircularProgress />}
      </div>
    );
  }

  if (ipoListStatus === "failed") {
    return <div>Error: {ipoListError}</div>;
  }

  if (ipoListStatus === "succeeded" && ipoList.length === 0) {
    return <div>No IPOs available.</div>;
  }

  // Render the list of IPOs
  return (
    <div className="">
      <BasicTable
        header={header}
        data={formatData(ipoList)}
        handleNavigate={handleNavigate}
      />
    </div>
  );
}

export default IpoList;
