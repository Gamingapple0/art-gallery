import { useEffect, useState } from "react";
import Card from "./Card";
import Details from "./Details";
import "./Home.css"
import ArtFact from "./ArtFact";

function Home(){
  const [productData, setProductData] = useState([]);
  const [artFacts, setArtFacts] = useState([]);
  const [artFact, setArtFact] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
    const [chosenProductIndex, setChosenProductIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          if (productData.length < 1){
            var response = await fetch('http://localhost:8081/api/artifacts'); 
            const res = await response.json();

            var response1 = await fetch('http://localhost:8081/api/art-facts'); 
            const res1 = await response1.json();
            setArtFacts(res1);
            setArtFact(artFacts[0]);

            // const res = 
            //   [
            //     {
            //         "id": 1,
            //         "name": "Tuzzles Turtle",
            //         "description": "This is a description",
            //         "price": 5000.0,
            //         "imgURL": "https://d2x7nmti04c7jb.cloudfront.net/uploads/bs094/zoom/bs094_tuzzles-aboriginal-art-turtle-floor-puzzle-22-pieces_v1_1.webp",
            //         "artTypes": [],
            //         "artist": {
            //             "id": 1,
            //             "firstName": "Leonardo",
            //             "lastName": "da Vinci",
            //             "bio": null,
            //             "email": "leonardo.davinci@example.com",
            //             "dob": "1452-04-15",
            //             "imgURL": null,
            //             "male": true
            //         }
            //     }
            // ]
            setProductData(res);
            console.log(res1);
          }
            }
            
        fetchData();
      }, []);

      useEffect(() => {
        const interval = setInterval(() => {
          setIsFading(true); // start fade-out
    
          // wait for fade-out before changing the content
          setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * artFacts.length);
            setArtFact(artFacts[randomIndex]);
            setIsFading(false); // trigger fade-in
          }, 500); // fade-out duration must match CSS
        }, 2000);
    
        return () => clearInterval(interval);
      }, [artFacts]);
      
      const clickedCard = (id)=>{
        console.log(id);
        setChosenProductIndex(id);
        setViewDetails(true);
      }

      const handleBack = ()=>{
        setViewDetails(!viewDetails)
      }

      const DetailedCard = (product)=>{
        if (product){
            return (
                <div>
                    <Details artifact={product} />
                </div>
            )
        }
        return (<></>)
        
      }

    
      const ProductCards = (products) => {
        return(
            <div className="product-cards" style={{display:'flex'}}>
            {Object.keys(products).map(key => (
              <Card onClick= {() => {clickedCard(key)}} key={key} name={products[key].name} imgURL={products[key].imgURL} price={products[key].price} />
            ))}
          </div>
        )
      }
      


    return (
        <div>
        <ArtFact className={`art-fact ${isFading ? 'fade-out' : 'fade-in'}`} details={artFact}></ArtFact>
        {viewDetails && <button onClick={()=>{handleBack()}} className="back-button">{"< "} Back</button>}
        {viewDetails ? DetailedCard(productData[chosenProductIndex]) : ProductCards(productData)}
      </div>
    )
        
}

export default Home;