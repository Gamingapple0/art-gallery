import React from "react";
import test from "../images/logo.png"
import "./Card.css"

function Card(props){
  

    return(

            <div key={0} className="rounded-m relative card" onClick={props.onClick}>
              {/* Overlay */}
              <div class="card-overlay absolute w-full h-full bg-black bg-opacity-50 rounded-l text-white">
                <p className="card-text font-bold text-2xl">{props.name} </p>
                <p className="card-price font-bold text-2xl">${props.price} </p>
              </div>
              <img
                className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
                src={props.imgURL}
                alt="/"
              />
            </div>
    );
}

export default Card;