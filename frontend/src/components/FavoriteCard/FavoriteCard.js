import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { createClient } from "pexels";
import FavoritesAPI from "../../api/FavoritesAPI";
import { useRecoilState } from "recoil";
import {
  createFavoritesGlobalState,
  createAirportGlobalState,
} from "../../globalstate/atom";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const FavoriteCard = ({ favorite, index }) => {
  const [userFavorites, setUserFavorites] = useRecoilState(
    createFavoritesGlobalState
  );
  const [airport, setAirport] = useRecoilState(createAirportGlobalState);
  const [displayPhotoUrl, setDisplayPhotoUrl] = useState(null);

  let handleClick = (event) => {
    event.preventDefault();

    FavoritesAPI.deleteFavorite(favorite.id);
    setUserFavorites(userFavorites.filter((e) => e.id !== favorite.id));
  };

  const getIATAFromCity = (city) => {
    let foundCity = airport.find((element) => element.city === city);
    if (foundCity === undefined) {
      return "LAX";
    } else {
      return foundCity.IATA;
    }
  };

  const morphDate = () => {
    let newDate = favorite.departure_date.split("-");
    let year = newDate[0].slice(2, 4);
    let finalDate = `${year}${newDate[1]}${newDate[2]}`;

    return finalDate;
  };

  const classes = useStyles();

  const API_KEY1 = process.env.REACT_APP_PEXELS_API_ONE;
  const API_KEY2 = process.env.REACT_APP_PEXELS_API_TWO;

  const client = createClient(
  API_KEY1
  );
  
  const query = favorite?.destination;
  let displayPhoto = client?.photos
    .search({ query, per_page: 1 })
    .then((photos) => setDisplayPhotoUrl(photos?.photos[0]?.src?.medium));

  return (
    <>
      <Card
        className={classes.root}
        key={index}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          className={classes.media}
          image={
            displayPhotoUrl ? displayPhotoUrl : `https://picsum.photos/200`
          }
          title={"Card"}
        />

        <CardContent style={{ backgroundColor: "white" }}>
          <div className={classes.cardContent}>
            <Typography
              variant="h5"
              style={{ marginLeft: "40px", color: "#3F51B5" }}
            >
              {favorite.origin} to {favorite.destination}
              <DeleteForeverIcon
                onClick={handleClick}
                fontSize="medium"
                style={{
                  marginLeft: "20px",
                  marginTop: "0px",
                  cursor: "pointer",
                  color: "Red",
                }}
              />
            </Typography>
          </div>
        </CardContent>

        <CardActions
          disableSpacing
          className={classes.cardActions}
          style={{ backgroundColor: "white", textDecoration: "none" }}
        >
          <Typography variant="h5">${favorite.price}</Typography>
          <Typography variant="h5">{favorite.return_date}</Typography>
        </CardActions>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "5px", marginBottom: "10px" }}
          >
            <a
              href={`https://www.skyscanner.com/transport/flights/${getIATAFromCity(
                favorite.origin
              )}/${getIATAFromCity(favorite.destination)}/${morphDate()}/`}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "White",
                fontSize: "15px",
              }}
            >
              Book This Flight
            </a>
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "5px", marginBottom: "10px" }}
          >
            <a
              href={`https://www.airbnb.com/s/${favorite.destination}/homes`}
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: "10px",
                textDecoration: "none",
                color: "White",
                fontSize: "15px",
              }}
            >
              Book An Airbnb
            </a>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default FavoriteCard;
