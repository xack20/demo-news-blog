import { Button } from "@material-ui/core";
import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div>
      <div className="header-container">
        <div>
          <Button
            style={{
              backgroundColor: "rgb(216, 216, 216)",
              textDecorationStyle: "none",
            }}
          >
            news
          </Button>
        </div>
        <div>
          <Button style={{ backgroundColor: "rgb(216, 216, 216)" }}>
            business
          </Button>
        </div>
        <div>
          <Button style={{ backgroundColor: "rgb(216, 216, 216)" }}>
            entertainment
          </Button>
        </div>
        <div>
          <Button style={{ backgroundColor: "rgb(216, 216, 216)" }}>
            sports
          </Button>
        </div>
        <div>
          <Button style={{ backgroundColor: "rgb(216, 216, 216)" }}>
            politics
          </Button>
        </div>

        <div className="title">
          News BD 24/7
        </div>

        <div className="search">
          <input type="text" placeholder="search" style={{ padding: "5px" }} />
        </div>
      </div>

      {/* <div className="header-container-2">
        <div><img src={process.env.PUBLIC_URL+"/news-logo.png"} alt="logo" /></div>
      </div> */}


    </div>
  );
};

export default Header;
