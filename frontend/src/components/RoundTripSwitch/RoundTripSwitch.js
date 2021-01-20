import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useRecoilState } from "recoil";
import { createComponentGlobalState } from "../../globalstate/atom";

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#3F51B5",
    "&$checked": {
      color: "#3F51B5",
    },
    "&$checked + $track": {
      backgroundColor: "grey",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function RoundTripSwitch() {
  const [roundTrip, setRoundTrip] = useRecoilState(createComponentGlobalState);

  const handleChange = (event) => {
    setRoundTrip((prevState) => {
      return {
        ...prevState,
        roundTrip: !prevState.roundTrip,
      };
    });
  };

  return (
    <FormGroup style={{ marginTop: "30px" }}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Round Trip</Grid>
          <Grid item>
            <FormControlLabel
              control={
                <PurpleSwitch
                  checked={roundTrip.roundTrip}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="One Way"
            />
          </Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
