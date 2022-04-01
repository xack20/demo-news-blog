import React, { useEffect, useState } from "react";
import "./MainContent.css";
import reactImageSize from "react-image-size";
// import ImageData from "../../Utils/ImageData";
import { homePage } from "../../Services/NewsHome";

const MainContent = () => {
  const [imageData, setImageData] = useState([]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    // setImageData(ImageData["images"]);
      const getHomePage = async () => {
        const {data} = await homePage();
        // console.log(data);
        shuffle(data["images"]);
        setImageData(data["images"]);
      };
      getHomePage();
    
    
  }, []);

  const imageDetail = async (imgUrl) => {
    try {
      const { width, height } = await reactImageSize(imgUrl);
      alert(`width: ${width}, height: ${height}`);
      // console.log(width, height);
    } catch {}
  };

  return (
    <div>
      <div className="container">
        {imageData.map((item, index) => {
          return (
            <div
              style={
                parseFloat(item["dimentions"]["height"]) >
                parseFloat(item["dimentions"]["width"])
                  ? {
                      gridRow: `span ${Math.ceil(
                        parseFloat(item["dimentions"]["height"]) /
                          parseFloat(item["dimentions"]["width"])
                      )}`,
                      padding: "4px",
                    }
                  : {
                      gridColumn: `span ${Math.ceil(
                        parseFloat(item["dimentions"]["width"]) /
                          parseFloat(item["dimentions"]["height"])
                      )}`,
                      padding: "4px",
                    }
              }
              key={index}
            >
              <h3>News Catergory</h3>
              <img
                key={index}
                src={item["url"]}
                onClick={() => {
                  imageDetail(item["url"]);
                }}
                alt="dummy"
                style={{
                  cursor: "pointer",
                }}
              />
              <h2>{`News Title ${item.id}`}</h2>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
                minus hic! Nisi ullam sint quam! Aspernatur accusantium itaque
                ab tempore minus placeat fugit quam quo similique perferendis.
                Beatae porro omnis quaerat culpa vero autem qui illum similique
                sunt unde. Eos.Aspernatur accusantium itaque
                ab tempore minus placeat fugit quam quo similique perferendis.
                Beatae porro omnis quaerat culpa vero autem qui illum similique
                sunt unde. Eos.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainContent;
