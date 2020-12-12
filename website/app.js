/* Global Variables */

//WEB API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
const apiKey = '&appid=1b348307a2bf6dddc1dca08b15252835';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
//const userResponse = document.getElementById('feelings').value;

document.getElementById("title").innerHTML = " Weather " + '&#x2665';


document.getElementById('generate').addEventListener('click', performAction)
function performAction() {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    
    // return zipCode;
    if (!zipCode) {
        alert ('Please enter a zip code');
        //return false;
    }
    else {
        getWeatherData()
            .then((apiData) => {
                postWeatherData('/addData', {
                    date: newDate,
                    temp: apiData.main.temp,
                    feeling: userResponse,
                })
            })
            .then(() => {
                updateUI();
            });
        }


}


const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const upUI = await req.json();
        console.log(upUI); 
        document.getElementById("date").innerHTML = " Date : " + `${upUI.date}`;
        document.getElementById("temp").innerHTML = " Temperature : " + `${upUI.temp}` +'\u00B0';
        document.getElementById("content").innerHTML = " Feeling : " + `${upUI.feeling}`;
    } catch (error) {
        console.log("error", error)
    }
}

const getWeatherData = async () => {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    console.log(userResponse);
    const request = await fetch(baseURL + zipCode + apiKey);
    try {
        const gData = await request.json();
        return gData;
    } catch (error) {
        console.log("error", error)
    }

}

const postWeatherData = async (url = "", data = {}) => {
    //console.log(data);
    await fetch('/addData', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        //const newData = await response.json();
        return;
    } catch (error) {
        console.log("error", error);
    }
};