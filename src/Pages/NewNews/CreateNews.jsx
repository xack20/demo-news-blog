import React from "react";
import { useState } from "react";
import { addPic, createNews, uploadPic } from "../../Services/NewsHome";
import reactImageSize from "react-image-size";
import "./CreateNews.css";

const CreateNews = (props) => {

  const [data, setData] = useState({ subHeaders: [] , title : "" , caption : "", mainPicture : []});


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



  const changeMainPictureURL = (e) => {
    // console.log(e.target.files[0].name);
    // console.log(e.target.value);
    setData({
      ...data,
      mainPicture: [...e.target.files],
    });
  };


  

  const [subData, setSubData] = useState({pictures : [], header : "",content : ""});

  const chanageSubHeader = (e) => {
    // console.log(e.target.value);
    setSubData({
      ...subData,
      header: e.target.value,
    });
  };

  const chanageDetailedNews = (e) => {
    // console.log(e.target.value);
    setSubData({
      ...subData,
      content: e.target.value,
    });
  };

  const changeSubPictureURL = async(e) => {
    // console.log(e.target.files);
    // console.log(e.target.value);
    // const {width,height} = await reactImageSize(e.target.files[0]);
    // console.log(width,height);

    setSubData({
      ...subData,
      pictures: [...e.target.files],
    });

  };







  const saveSubNews = () => {
    if (subData.header && subData.content && subData.pictures.length > 0) {

      setData({
        ...data,
        subHeaders: [...data.subHeaders, subData],
      });

      setSubData({
        header: "",
        content: "",
        pictures: null,
      });     

    } else {
      alert("Please fill all the fields");
    }
  };

  const saveNews = async () => {
    if (data.title && data.caption && data.mainPicture.length > 0 && data.subHeaders.length > 0) {

      const {width,height} = await reactImageSize(URL.createObjectURL( data.mainPicture[0] ));
      
      let formData = new FormData();      
      formData.append('news-img', data.mainPicture[0]);

      const imgData = { url: "/images/" + data.mainPicture[0].name , dimentions : {width,height} };
      const res = await addPic(imgData);
      

      let updateData = {...data};

      for(let sh of data.subHeaders){
        let pictures = [];
        for(let pic of sh.pictures){
          
          formData.append('news-img', pic);

          const imgData = {
            url: "/images/" + pic.name,
            dimentions: { width, height },
          };
          const res = await addPic(imgData);

          pictures.push(res.data.id);
        }
        updateData.subHeaders[data.subHeaders.indexOf(sh)] = {...sh, pictures}; 
      }


      
      await uploadPic(formData);
      
      alert("News Uploaded Successfully");




      await createNews({
        ...updateData,
        mainPicture: res.data.id,
      });

      // window.location.replace("/");

      // setData({ ...data, title: "", caption: "" });
    }
    else {
      alert("Please fill all the fields");
    }              
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
          value={data.title}
        />

        <label htmlFor="img">Select image:</label>

        <input
          type="file"
          id="img"
          name="img"
          accept="images/*"
          className="news-input"
          onChange={changeMainPictureURL}
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
          value={data.caption}
        />
      </div>

      <div>
        {data.subHeaders &&
          data.subHeaders.map((subNews, index) => {
            return (
              <div className="news-container" key={index}>
                <label className="full-width">{subNews.header}</label>
                <p className="full-width">{subNews.content}</p>
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
          value={subData.header}
        />
        <label htmlFor="img">Select images:</label>
        <input
          type="file"
          id="img"
          name="news-img"
          accept="images/*"
          multiple
          className="news-input"
          onChange={changeSubPictureURL}
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
          value={subData.content}
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
