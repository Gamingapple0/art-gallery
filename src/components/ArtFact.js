import React, { useState } from 'react';
import Card from './Card';
import "./ArtFact.css"

const funFacts = [
  "Honey never spoils. Archaeologists have found pots of honey in ancient tombs that are over 3,000 years old!",
  "Octopuses have three hearts and blue blood.",
  "Bananas are berries, but strawberries aren't.",
  "Wombat poop is cube-shaped!",
  "A day on Venus is longer than a year on Venus.",
  "There's a basketball court on the top floor of the U.S. Supreme Court building. It's nicknamed 'The Highest Court in the Land.'"
];

export default function ArtFact(props) {
  const [fact, setFact] = useState(funFacts[0]);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setFact(funFacts[randomIndex]);
  };

  return (
    <>
    {props.details ? <div class="fact-container">
        <h1 className="text-xl font-bold">Art Fact!</h1>
        <div className='fact-title'>{props.details.factTitle}</div>
        <div className='fact-body'>{props.details.factBody}</div>
        </div> : ""
    }
    </>
  );
}
