import React from "react";
import { useState } from "react";
import "./CreateNews.css";

const CreateNews = (props) => {
  const [data, setData] = useState({ subNews: [] });

  const chanageTitle = (e) => {
    // console.log(e.target.value);
    setData({
      ...data,
      title: e.target.value,
    });
  };

  const chanageCaption = (e) => {
    // console.log(e.target.value);
    setData({
      ...data,
      caption: e.target.value,
    });
  };

  const [subData, setSubData] = useState({});

  const chanageSubHeader = (e) => {
    // console.log(e.target.value);
    setSubData({
      ...subData,
      subHeader: e.target.value,
    });
  };

  const chanageDetailedNews = (e) => {
    // console.log(e.target.value);
    setSubData({
      ...subData,
      detailedNews: e.target.value,
    });
  };

  const saveSubNews = () => {
    if (subData.subHeader && subData.detailedNews) {
      setData({
        ...data,
        subNews: [...data.subNews, subData],
      });
    }
    else {
      alert("Please fill all the fields");
    }
  };

  const saveNews = () => {
    console.log(data);

    window.location.replace("/");
  };

  return (
    <div className="main-content">
      <div className="news-container">
        <label>Title : </label>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="news-input"
          onChange={chanageTitle}
        />

        <label htmlFor="img">Select image:</label>

        <input
          type="file"
          id="img"
          name="img"
          accept="images/*"
          className="news-input"
        ></input>

        <label className="full-width" style={{ justifySelf: "center" }}>
          <b>Cation (optional)</b>
        </label>

        <textarea
          type="text"
          name="Caption"
          placeholder="Additional Caption"
          className="full-width"
          onChange={chanageCaption}
          rows="4"
        />
      </div>

      <div>
        {data.subNews &&
          data.subNews.map((subNews, index) => {
            return (
              <div className="news-container" key={index}>
                <label className="full-width">{subNews.subHeader}</label>
                <p className="full-width">{subNews.detailedNews}</p>
              </div>
            );
          })}
      </div>

      <div className="news-container">
        <label>Sub-Header </label>
        <input
          type="text"
          name="sub-header"
          placeholder="sub-header"
          className="news-input"
          onChange={chanageSubHeader}
        />
        <label htmlFor="img">Select images:</label>
        <input
          type="file"
          id="img"
          name="news-img"
          accept="images/*"
          multiple
          className="news-input"
          onChange={(e) => {
            console.log(e.target.files);
          }}
        ></input>
        <label className="full-width" style={{ justifySelf: "center" }}>
          <b>Detailed news</b>
        </label>
        <textarea
          type="text"
          name="detail-news"
          placeholder="Full News"
          className="full-width"
          onChange={chanageDetailedNews}
          rows="10"
        />
        <button className="save-button" onClick={saveSubNews}>
          Save
        </button>
      </div>

      <button className="submit-button" onClick={saveNews}>
        Submit News
      </button>

      <footer className="footer">Created By Xack</footer>
    </div>
  );
};

export default CreateNews;
