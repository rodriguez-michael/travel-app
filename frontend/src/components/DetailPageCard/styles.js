import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    maxHeight: "50em",
    opacity: "75%",
    width: "auto",
    display: "flex-end",
    borderRadius: "20px",
  },

  media: {
    height: 0,
    paddingTop: "10%",
  },
  cardActions: {
    justifyContent: "flex-end",
  },
  cardTitle: {
    color: "red",
    margin: "auto auto",
  },

  cardContent: {
    color: "blue",
    textAlign: "left",
    borderBox: "content-box",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
  },
}));
