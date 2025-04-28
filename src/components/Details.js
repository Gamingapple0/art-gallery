import React, { useEffect, useState } from "react";
import "./Details.css"
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate } from "react-router";
import ArtType from "./ArtType";
import Bids from "./Bids";
import { UserContext } from "../App";
import axios from 'axios';
import { getAuth } from "firebase/auth";

function Details(productDetailItem){
    const plusMinuceButton ="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
    const navigate = useNavigate();
    const bidz = productDetailItem.artifact.bids;
    const [allBids, setAllBids] = useState(bidz);
    const [highestBid, setHighestBid] = useState(productDetailItem.artifact.price);
    const [currentBid, setCurrentBid] = useState(0);
    const {user, setUser} = React.useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      if(productDetailItem.artifact.bids.length > 0){
        var highest = productDetailItem.artifact.bids[0].newBid;
        for (let i = 0; i < productDetailItem.artifact.bids.length; i++) {
          if (productDetailItem.artifact.bids[i].newBid > highest) {
            highest = productDetailItem.artifact.bids[i].newBid;
          }
        }
        setCurrentBid(highest + 1)
        setHighestBid(highest)
      }
    },[])

    const clickedBid = async (productDetailItem) => {
        console.log(productDetailItem);
        console.log(user);
        const data = {
              "newBid":currentBid,
              "originalPrice":highestBid,
              "newBidder":user.email
        }; 
        console.log(new Date(productDetailItem.artifact.endDate).toLocaleDateString('en-ZA') >= new Date().toLocaleDateString('en-ZA'))
        if (currentBid > highestBid && currentBid >= productDetailItem.artifact.price&& user && new Date(productDetailItem.artifact.endDate).toLocaleDateString('en-ZA') >= new Date().toLocaleDateString('en-ZA')) {
          const auth = getAuth();
          const user = auth.currentUser;{
          const idToken = await user.getIdToken();
        
            fetch('http://localhost:8081/api/artifacts/' + productDetailItem.artifact.id + '/bid', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,  // <-- Send token here
              },
              body: JSON.stringify({
                "newBid": currentBid,
                "originalPrice": highestBid,
                "newBidder": user.email
              })
            });
          }
        setErrorMessage("");
        // window.location.reload();
      }
      else if(new Date(productDetailItem.artifact.endDate).toLocaleDateString('en-ZA') < new Date().toLocaleDateString('en-ZA')){
        setErrorMessage("Bidding time has expired, no further bids can be added")
        setTimeout(()=>{
          setErrorMessage("")
        },2000)
      }
      else if(user.email == null || user.email == ""){
        setErrorMessage("You need to be logged in to bid bro")
        setTimeout(()=>{
          setErrorMessage("")
        },2000)
      }
      else{
        currentBid > highestBid && currentBid >= productDetailItem.artifact.price ? setErrorMessage("Unexpected Error Occured") : setErrorMessage("Bid must be higher than original price and highest previous bid")
        setTimeout(()=>{
          setErrorMessage("");
        }, 2000)
      }
      }
        // navigate('/shipping', { state: { productDetailItem } });

    const handleInput = (e) => {
      const val = e.target.value;
  
      // Only allow numbers >= 0 with up to 2 decimal places
      if (val === "" || (/^\d*\.?\d{0,2}$/.test(val) && parseFloat(val) >= 0)) {
        setCurrentBid(val);
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "-" || e.key === "e") {
        e.preventDefault(); // Prevent negative sign and exponential input
      }
    };

    return(
        <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        <div className="container mx-auto px-4">
          <img src={productDetailItem.artifact.imgURL}></img>
  
          {/* /image gallery  */}
        </div>
        {/* description  */}
  
        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
            {productDetailItem.artifact.name}
          </h2>
          <p className="mt-4 text-4xl font-bold">
            {
              highestBid && highestBid != productDetailItem.artifact.price ? <div>{"$" + highestBid + "  "}
              <span className="text-xs text-gray-400 line-through">
               {"$" + productDetailItem.artifact.price + "  "}
              </span></div> : "$" + productDetailItem.artifact.price + "  "
            }
            {/* ${productDetailItem.artifact.price}{"  "}
            <span className="text-xs text-gray-400 line-through">
              $40
            </span> */}
          </p>
          <p className="pt-5 text-sm leading-5 text-gray-500 pb-4">
            {productDetailItem.artifact.description}
          </p>
          <p>
            <b>Artist: </b>
            {productDetailItem.artifact.artist.firstName} {productDetailItem.artifact.artist.lastName}
            </p>
            <p><b>Bidding End date:</b> {productDetailItem.artifact.endDate}</p>
          <p>{productDetailItem.artifact.artist.email}</p>
          {productDetailItem.artifact.artTypes.length > 0 && <ul className="art-types mx-auto px-5 lg:px-5">
            {productDetailItem.artifact.artTypes.map((artType) => <li><ArtType details={artType} /></li>)}
          </ul>}
          {/* <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Quantity</p>
            <div className="flex">
              <button className={`${plusMinuceButton}`}>−</button>
              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                1
              </div>
              <button className={`${plusMinuceButton}`}> +</button>
            </div>
          </div> */}
          <br></br>
          <br></br>
          <Bids bids={allBids} />
          
          <div className="mt-7 flex flex-row items-center gap-6">
            <button className="add-to-cart flex h-12 w-1/3 items-center justify-center text-white duration-100 hover:bg-blue-800" style={{width:"fitContent"}} onClick={()=>{clickedBid(productDetailItem)}}>
              <BiShoppingBag className="mx-2" />
              Bid
            </button>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                min={highestBid+1}
                value={currentBid}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 text-red-600">{errorMessage}</div>

        </div>
      </section>
    );
}

export default Details;