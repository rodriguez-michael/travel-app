import React, { useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import { createFavoritesGlobalState } from "../../globalstate/atom";
import FavoritesAPI from "../../api/FavoritesAPI";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../contexts/UserContext";
import Grid from "@material-ui/core/Grid";

const FavoritesPage = () => {
  const [userFavorites, setUserFavorites] = useRecoilState(
    createFavoritesGlobalState
  );

  const userContext = useContext(UserContext);

  const getUserFavorites = async () => {
    let response = await FavoritesAPI.getFavorites(userContext?.user?.id);
    let data = await response.json();
    setUserFavorites(data);
  };

  useEffect(() => {
    getUserFavorites();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          color: "#3F51B5",
          fontSize: "50px",
          fontFamily: "Lobster",
          letterSpacing: "3px",
        }}
      >
        Favorites
      </h3>
      {userFavorites.length > 0 ? (
        <div
          className={classes.root}
          style={{ display: "flex", textAlign: "center" }}
        >
          <Grid
            container
            style={{ textAlign: "center", color: "white", fontSize: "50px" }}
          >
            <Grid
              item
              xs={10}
              container
              spacing={6}
              style={{ marginTop: "5px", margin: "auto auto" }}
              className={classes.test}
            >
              {userFavorites?.map((favorite, index) => (
                <Grid item key={index} xs={4} sm={6} md={4} lg={3}>
                  <FavoriteCard favorite={favorite} index={index} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <h1
            style={{
              textAlign: "center",
              color: "#3F51B5",
              fontSize: "30px",
              fontFamily: "Lobster",
              letterSpacing: "3px",
            }}
          >
            Please add favorites to your list to view them here
          </h1>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
