import React, { useEffect } from "react";

const Bids = (props) => {

    function bidTrs(){
        return props.bids.map((bid) => {
            return (
              <tr className="border-t border-gray-200">
              <td colSpan="1" className="px-6 py-4 text-gray-600 border-t border-gray-200">
                {bid.newBidder}
              </td>
              <td colSpan="1" className="px-6 py-4 text-gray-600 border-t border-gray-200">
                {bid.newBid}
              </td>
              <td colSpan="1" className="px-6 py-4 text-gray-600 border-t border-gray-200">
                {bid.timestamp}
              </td>
            </tr>
            )
          })  
    }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <table className="min-w-full text-sm text-left text-gray-700 border-separate border-spacing-0">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th scope="col" className="px-6 py-4 border-r border-gray-200">
              <div className="flex items-center gap-1">
                Bidder
              </div>
            </th>
            <th scope="col" className="px-6 py-4 border-r border-gray-200">
              Bid amount
            </th>
            <th scope="col" className="px-6 py-4">
              Bid time
            </th>
          </tr>
        </thead>
        <tbody>
        {
            props.bids.length > 0 ?  bidTrs() : 
            <tr className="border-t border-gray-200">
                <td colSpan="3" className="px-6 py-4 text-gray-600 border-t border-gray-200">
                No bids have been placed.
              </td>
            </tr>
            
          }
        </tbody>
      </table>
    </div>
  );
};

export default Bids;
