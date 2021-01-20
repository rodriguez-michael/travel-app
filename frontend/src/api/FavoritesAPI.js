const addFavoriteToDb = async (formdata) => {
    let token = localStorage.getItem('auth-user');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    }
    const rawResponse = await fetch('http://localhost:8000/api/list/', requestOptions);
    const content = await rawResponse.json();
}


const getFavorites = async (userID) => {
    let token = localStorage.getItem('auth-user');
    let response = await fetch(`http://localhost:8000/api/list?user=${userID}`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
        }
    })
  return response
}


const deleteFavorite = async (id) => {
    let token = localStorage.getItem('auth-user');
    let response = await fetch(`http://localhost:8000/api/list/${id}/`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
        },
        method: 'DELETE',
    })
  return response
};


const FavoritesAPI = { 
    addFavoriteToDb,
    getFavorites,
    deleteFavorite
}


export default FavoritesAPI