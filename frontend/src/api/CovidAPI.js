const getCovidData = async () => {
    const response = await fetch('https://corona-api.com/countries');
    const data = await response.json()
    return data;
  }


const getCountyData = async () => {
  const response = await fetch('covid.json');
  const data = await response.json()
  return data;
}


const CovidAPI = { 
    getCovidData,
    getCountyData,
  }


export default CovidAPI