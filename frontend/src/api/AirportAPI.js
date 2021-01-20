const getData = async () => {
  const response = await fetch('airports.json');
  const data = await response.json()
  return data;
}


const getAccessToken = async () => {
  const API_ID = process.env.REACT_APP_AMADEUS_ID;
  const API_SECRET = process.env.REACT_APP_AMADEUS_SECRET;

  let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
    urlencoded.append("client_id", `${API_ID}`);
    urlencoded.append("client_secret", `${API_SECRET}`);
    urlencoded.append("grant_type", "client_credentials");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  let response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', requestOptions) 
  return response
}


const getFlight = async (origin, budget, roundTrip, departureDate) => {
  let amadeusToken = localStorage.getItem('amadeusToken')
  let response = await fetch(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${origin}&departureDate=${departureDate}&oneWay=${roundTrip}&nonStop=false&maxPrice=${budget}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${amadeusToken}`
    }
  })
  return response
}


const AirportAPI = { 
  getData,
  getAccessToken,
  getFlight,
}


export default AirportAPI