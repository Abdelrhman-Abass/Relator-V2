/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom"
// import {MdLocationOn} from 'react-icons/md'
// // import { useDurations } from '../hooks/useDurations'
// const Listing = ({listing,id}) => {
//   console.log(listing.timestamp)

  
//   return <li className="relative bg-white flex flex-col justify-between  shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] ">

//     <Link to={`/category/${listing.type}/${id}`}>
//       <img src={listing.imgUrls[0]} alt="img" className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in" loading="lazy"/>

      

//       <div className="w-full p-[10px] overflow-hidden ">
//         <div className="flex items-center space-x-1 ">
//           <MdLocationOn className="h-4 w-4 text-green-600"/>
//           <p className="font-semibold truncate5 text-sm mb-[2px] text-gray-600 ">{listing.address}</p>
//         </div>
//         <p className="truncate font-semibold m-0 text-xl ">{listing.name} </p>
//         <p className=" text-[#457b9d] mt-2 font-semibold">$ {listing.offer
//               ? listing.discountedPrice
//                   .toString()
//                   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//               : listing.regularPrice
//                   .toString()
//                   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//             {listing.type === "rent" && " / month"}</p>
//         <div className="flex items-center mt-[10px] space-x-3">
//           <div className="flex items-center space-x-1">
//             <p className="font-bold text-xs ">{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
//           </div>
//           <div className="flex items-center space-x-1">
//             <p className="font-bold text-xs ">{listing.bathrooms > 1
//                   ? `${listing.bathrooms} Baths`
//                   : "1 Bath"}</p>
//           </div>
//         </div>    
//       </div> 
//     </Link>
//   </li>
// }

function millisecondsToDays(milliseconds) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.floor(milliseconds / millisecondsPerDay);
}
function millisecondsToMonth(milliseconds) {
  const daysPerMonth = 30.436875; // 30.436875 days per month
  const months = milliseconds / (1000 * 60 * 60 * 24 * daysPerMonth);
  return months;
}

import moment from 'moment'

import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md"

const Listing = ({ listing, id, onEdit, onDelete }) =>{

  const parsedInputTimestamp = new Date(moment(listing.timestamp.toDate()).format());
  const duration = Date.now() - parsedInputTimestamp;
  const finalDuration = Math.floor(Math.max(millisecondsToDays(duration),millisecondsToMonth(duration)))
  
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
        />
        <div className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">{finalDuration<='7' ? `${finalDuration} Days`: `${finalDuration} Months`} 
        </div>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
}
export default Listing