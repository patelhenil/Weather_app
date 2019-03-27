window.addEventListener('load', ()=>{
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    let windspeed = document.querySelector('.windspeed');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lon,lat);
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/df8c3e62f442d1472d5dbd6e5cbad89e/${lat},${lon}`;             //${lat},${lon}`;
                    
            
            
            fetch(api)
                .then(function (response) {
                    return response.json();
                })
                .then(Data => {
                    console.log(Data);
                   const {temperature, summary, icon, windSpeed} = Data.currently;
                    temperatureDegree.textContent = temperature;
                    locationTimeZone.textContent = Data.timezone;
                    temperatureDescription.textContent = summary;
                    windspeed.textContent = windSpeed;

                    windspeed.addEventListener('click', () =>{
                        if(windSpeed > 5){
                            windspeed.textContent = "It's really windy out side";
                        }
                        else{
                            windspeed.textContent = "Not too windy";
                        }

                    })


                    let celsius = (temperature - 32) * (5/9);

                    setIcon(icon,document.querySelector('.icon'));

                    temperatureSection.addEventListener('click', ()=> {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;

                        }

                    })

                });
            });
            function setIcon(icon, iconID){
                const skycons = new Skycons({color:"white"});
                const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                skycons.play();
                return skycons.set(iconID, Skycons[currentIcon]);
            }
    }
    else{
        h1.textcontent = "Please allow wesite to access your location"; 
    }

});