import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainContent.css";
// import reactImageSize from "react-image-size";
// import ImageData from "../../Utils/ImageData";
import { allNews, getPic } from "../../Services/NewsHome";

const MainContent = () => {
  const [NEWS, setNEWS] = useState([]);
  const navigate = useNavigate();

  // function shuffle(array) {
  //   let currentIndex = array.length,
  //     randomIndex;

  //   // While there remain elements to shuffle...
  //   while (currentIndex !== 0) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // }

  



  useEffect(() => {
    const getHomePage = async () => {
      const { data } = await allNews();

      for (let element of data) {
        const res = await getPic(element.mainPicture);
        setNEWS((N) => [
          ...N,
          { caption: element.caption, title: element.title,id : element.id , url : res.data.url, dimentions : res.data.dimentions },
        ]);
      }
    };
      getHomePage();
  },[]);

  const imageDetail = async (id) => {
    try {
      // const { width, height } = await reactImageSize(imageData[index]["url"]);
      navigate(`/news/${id}`);
      // console.log(width, height);
    } catch {}
  };

  return (
    <div>
      <div className="container">
        {/* {console.log(NEWS)} */}
        {NEWS.length ? NEWS.map((item, index) => {
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
                  imageDetail(item.id);
                }}
                alt="dummy"
                style={{
                  cursor: "pointer",
                }}
              />
              <h2>{`News Title ${item.id}`}</h2>

              <p>
                {item.caption}
              </p>
            </div>
          );
        }) : <h1 style={{textAlign : "center", marginTop : "20%"}}>No News To Load</h1>}
      </div>
    </div>
  );
};

export default MainContent;
