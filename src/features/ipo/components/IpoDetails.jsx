import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import {
  selectIpoFromListById,
  selectIpoById,
  selectIpoByIdStatus,
} from "../../api/ipoSlice";
import { fetchIpoById } from "../../api/network";
import Timeline from "../../../components/Stepper";
import { Button, CircularProgress } from "@mui/material";
import Navigator from "../../../components/Breadcrumbs";
import { useErrorBoundary } from "react-error-boundary";

const IpoDetails = () => {
  const { id } = useParams(); // Get IPO ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // Selectors to get IPO details and status
  const ipoFromList = useSelector((state) => selectIpoFromListById(state, id));
  const ipoById = useSelector(selectIpoById);
  const ipoByIdStatus = useSelector(selectIpoByIdStatus);

  const { showBoundary } = useErrorBoundary();

  // State to manage readmore
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Fetch IPO by ID if not found in the list
    if (!ipoFromList && ipoByIdStatus == "idle") {
      dispatch(fetchIpoById(id)).catch((err)=> showBoundary(err));
    }
  }, [id, ipoFromList]);

  const findActiveStep = (val) => {
    return val?.findIndex((item) => item.isCompleted == false);
  };

  // Handle loading and error states
  if (ipoByIdStatus === "loading") {
    return <div className="h-[100vh] flex items-center justify-center">{<CircularProgress />}</div>;
  }

  if (ipoByIdStatus === "failed") {
    return <div>Error fetching IPO details.</div>;
  }

  const ipo = ipoFromList || ipoById; // IPO details

  if (!ipo) {
    return <div>IPO not found!</div>;
  }

  // render the details
  return (
    <div className="flex flex-col md:gap-8 gap-6">
      <div className="hidden md:block">
        <Navigator navigationItems={[{label:'Home', navigate:"/"}, {label: 'Market watch'}]} />
      </div>

      {/* header section */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="p-2 border rounded-lg cursor-pointer">
            <ArrowBackIosRoundedIcon fontSize="small" onClick={()=>navigate(-1)} />
          </div>
          <div className="flex gap-3">
            <img
              src={ipo.avatar}
              className="rounded-[50%] object-contain border-2 w-[45px] h-[45px]"
            />
            <div>
              <div className="font-bold">{ipo.companyName}</div>
              <div className="capitalize text-lightText text-sm">{`${ipo.companyName} Private Limited`}</div>
            </div>
          </div>
        </div>
        <div className="md:flex items-center justify-between gap-4 hidden ">
          <div>
            <SimCardDownloadOutlinedIcon fontSize="large" />
          </div>
          <div>
            <Button variant="contained" disableElevation  className="!bg-blue-950 !rounded-xl !px-8 !py-3 !capitalize" >Apply now</Button>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="border-none md:border-solid border rounded-2xl p-3 flex flex-col gap-4">
        <div className="font-bold">IPO details</div>
        <div className="border rounded-2xl p-3 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 place-items-stretch">
          <div className="flex flex-col gap-1 items-start">
            <div className="text-xs text-lightText">Issue size</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.issueSize}</div>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <div className="text-xs text-lightText">Price Range</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.priceRange}</div>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <div className="text-xs text-lightText">Minimum amount</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.minimumAmount}</div>
          </div>
          <div className="flex flex-col gap-1 items-start ">
            <div className="text-xs text-lightText">Lot size</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.lotSize}</div>
          </div>
          <div className="flex flex-col gap-1 items-start ">
            <div className="text-xs text-lightText">Issue dates</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.issueDates}</div>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <div className="text-xs text-lightText">Listed on</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.listedOn}</div>
          </div>
          <div className="flex flex-col gap-1 items-start ">
            <div className="text-xs text-lightText">Listed price</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.listedPrice}</div>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <div className="text-xs text-lightText">Listing gain</div>
            <div className="font-bold text-sm md:text-md">₹ {ipo.listingGains}</div>
          </div>
        </div>
      </div>

      {/* Timeline section */}
      <div className="border-none md:border-solid border rounded-2xl p-3 flex flex-col gap-4">
        <div className="font-bold">IPO timeline</div>
        <div className="hidden md:block">
          <Timeline
            orientation="horizontal"
            steps={ipo.timeline || []}
            activeStep={
              findActiveStep(ipo.timeline) == -1
                ? ipo?.timeline?.length
                : findActiveStep(ipo.timeline)
            }
          />
        </div>
        <div className="block md:hidden py-2">
          <Timeline
            orientation="vertical"
            steps={ipo.timeline || []}
            activeStep={
              findActiveStep(ipo.timeline) == -1
                ? ipo?.timeline?.length
                : findActiveStep(ipo.timeline)
            }
          />
        </div>
      </div>

      {/* About Company Section */}
      <div className="border-none md:border-solid border rounded-2xl p-3 flex flex-col gap-4">
        <div className="font-bold">About the company</div>
        <p className="text-lightText block md:hidden text-sm">
          {isExpanded ? ipo.about : `${ipo.about?.slice(0, 250)}...`}{" "}
          <span className={isExpanded ? "hidden" : "inline"}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-500"
            >
              {isExpanded ? "Show Less" : "Read more"}
            </button>
          </span>
        </p>
        <p className="text-lightText hidden md:block">{ipo.about}</p>
      </div>
    </div>
  );
};

export default IpoDetails;
