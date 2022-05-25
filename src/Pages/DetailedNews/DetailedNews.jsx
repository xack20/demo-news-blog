import React,{ useState } from 'react';
import { useEffect } from 'react';
import './DetailedNews.css';
import { getPic, oneNews } from "../../Services/NewsHome";
import { useParams } from 'react-router-dom';

const DetailedNews = (props) => {
    const newsId = useParams().id;
    const [news, setNews] = useState({"subHeaders" : [],"dimentions" : {"height": "0", "width": "0"}});
    const [pic, setPic] = useState([]);

    // const [win, setWin] = useState({ width : window.innerWidth, height:  window.innerHeight });

    useEffect (() => {

        
      const OneNews = async () => {    

          const { data } = await oneNews(newsId);
          const res = await getPic(data.mainPicture);

          for(const sh of data['subHeaders']){
            for(const pic of sh['pictures']){
              const { data } = await getPic(pic);
              setPic(prev => [...prev, data]);
            }
          }

          setNews((N)=>({...N, ...res.data}));
          setNews((N)=>({...N, ...data}));
          
        };
        OneNews();

        

    },[newsId]);

    // window.addEventListener("resize", () => {
    //   // setWin({ width: window.innerWidth, height: window.innerHeight });
    //   console.log(window.innerWidth, window.innerHeight);
    // });

    


    return (
      <div className="container-main">
        <h1>{news.title}</h1>
        <img
          className="img-main"
          src={news.url}
          alt="Pic Here"
          height={Math.min(
            window.innerHeight * 0.45,parseInt(news.dimentions.height)
          )}
        />
        {console.log(news)}
        <p style={{ fontSize: "15px" }}>{news.caption}</p>
        <br />
        <br />
        {news["subHeaders"].map((subHeader, index) => {
          return (
            <div key={index}>
              <h2>{subHeader.header}</h2>
              {subHeader["pictures"].map((picture, index) => {
                return pic.map((p, index) => {
                  if (picture === p.id) {
                    return (
                      <img
                        key={index}
                        className="img-sub"
                        src={p.url}
                        alt="Pic Here"
                        height={Math.min(
            window.innerHeight * 0.2,parseInt(p.dimentions.height))}
                      />
                    );
                  }
                  return null;
                });
              })}
              <p>{subHeader.content}</p>
            </div>
          );
        })}
      </div>
    );
};

export default DetailedNews;