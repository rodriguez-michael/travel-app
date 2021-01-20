import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import useStyles from "./styles";
import { useRecoilState } from "recoil";
import { createComponentGlobalState } from "../../globalstate/atom";
import FavoritesAPI from "../../api/FavoritesAPI";
import Button from "@material-ui/core/Button";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Moment from "react-moment";
import YoutubeAPI from "../../api/YoutubeAPI";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const DetailPageCard = (props) => {
  const [youtubeData, setYoutubeData] = useState([]);
  const [youtubeVideoID, setYoutubeVideoID] = useState("");
  const API_KEY = process.env.REACT_APP_YOUTUBE;

  const getYoutubeLink = async (city) => {
    let response = await YoutubeAPI.getYoutube(city, API_KEY);
    setYoutubeData(response);
    setYoutubeVideoID(response?.items[0]?.id?.videoId);
  };

  useEffect(() => {
    getYoutubeLink(props.destinationCityName);
  }, []);

  const classes = useStyles();
  const [globalState, setGlobalState] = useRecoilState(
    createComponentGlobalState
  );

  const addFavorite = (event) => {
    event.preventDefault();
    let userId = localStorage.getItem("userId");

    let formdata = new FormData();

    formdata.append("origin", `${globalState.city}`);
    formdata.append("destination", `${props.destinationCityName}`);
    formdata.append("departure_date", `${props.departureDate}`);
    formdata.append("return_date", `${props.departureDate}`);
    formdata.append("oneway", "True");
    formdata.append("user", `${userId}`);
    formdata.append("price", `${props.price}`);

    FavoritesAPI.addFavoriteToDb(formdata);

    let faveIcon = document.getElementById("heart");
    faveIcon.remove();
  };

  return (
    <div>
      <form>
        <Card style={{ textAlign: "center" }}>
          <CardContent style={{ textAlign: "center" }}>
            <div>
              <FavoriteBorderIcon
                onClick={addFavorite}
                id="heart"
                style={{
                  marginLeft: "850px",
                  cursor: "pointer",
                  fontSize: "30px",
                  color: "#3F51B5",
                }}
              />
              <Typography
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: "34px",
                }}
              >
                {" "}
                <FlightTakeoffIcon
                  style={{ color: "#3F51B5", marginRight: "15px" }}
                />
                Selected fare to {props.destinationCityName}
                <FlightTakeoffIcon
                  style={{ color: "#3F51B5", marginLeft: "15px" }}
                />
              </Typography>
            </div>

            <Divider />

            <div
              className={classes.cardContent}
              style={{ textAlign: "center", marginTop: "30px" }}
            >
              <iframe
                width="520"
                height="310"
                title="hello"
                src={`https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&mute=1`}
              ></iframe>

              <Typography
                variant="h4"
                gutterTop
                style={{
                  width: "35%",
                  height: "10%",
                  marginRight: "45px",
                  lineHeight: "60px",
                  marginTop: "30px",
                  color: "black",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginTop: "0px",
                    marginBottom: "10px",
                  }}
                >
                  {" "}
                  ${props.price}{" "}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    marginTop: "-40px",
                    marginBottom: "10px",
                  }}
                >
                  {" "}
                  per traveler{" "}
                </div>
                <div
                  style={{
                    marginTop: "30px",
                    marginBottom: "20px",
                    fontSize: "30px",
                  }}
                >
                  <Moment format="dddd, MMM D, YYYY">
                    {props.departureDate}
                  </Moment>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-40px",
                    textAlign: "left",
                  }}
                >
                  Changes
                </div>{" "}
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-60px",
                    textAlign: "right",
                    marginRight: "20px",
                  }}
                >
                  Included
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-40px",
                    textAlign: "left",
                  }}
                >
                  Personal item{" "}
                </div>{" "}
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-60px",
                    textAlign: "right",
                    marginRight: "20px",
                  }}
                >
                  Included
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-40px",
                    textAlign: "left",
                  }}
                >
                  Seat choice
                </div>{" "}
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-60px",
                    textAlign: "right",
                    marginRight: "20px",
                  }}
                >
                  Fee applies{" "}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-40px",
                    textAlign: "left",
                  }}
                >
                  Carry-on bag
                </div>{" "}
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-60px",
                    textAlign: "right",
                    marginRight: "20px",
                  }}
                >
                  Fee applies{" "}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-40px",
                    textAlign: "left",
                  }}
                >
                  Checked bag
                </div>{" "}
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "-60px",
                    textAlign: "right",
                    marginRight: "20px",
                  }}
                >
                  Fee applies{" "}
                </div>
              </Typography>

              <Typography
                style={{
                  fontSize: "30px",
                  margin: "15px 40px 0px 542px",
                  marginTop: "20px",
                  color: "blue",
                }}
              >
                <div style={{ opacity: "100%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    <a
                      href={`https://www.skyscanner.com/transport/flights/${props.orig}/${props.dest}/${props.date}/`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "White" }}
                    >
                      Book this flight
                    </a>
                  </Button>

                  <Button variant="contained" color="primary">
                    <a
                      href={`https://www.airbnb.com/s/${props.destinationCityName}/homes`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        marginLeft: "10px",
                        textDecoration: "none",
                        color: "White",
                      }}
                    >
                      Book AN AirBnB
                    </a>
                  </Button>
                </div>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
export default DetailPageCard;
