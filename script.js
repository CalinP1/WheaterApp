const formCity = document.getElementById("formSearch");
const cityInput = document.getElementById("citySearch");
const apiKey = "7d6a19606646e24b13e0ea3a504144bc"; 

formCity.addEventListener('submit', function(event) {
  event.preventDefault();
  var city = cityInput.value;

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
            const temp = data.list[0].main.temp;
            //console.log(temp);
            dataPrint.classList.remove("d-none");
            dataPrint.classList.add("p-2");
            const temperatureNow = document.getElementById("temperature");
            temperatureNow.textContent = `Current temperature in ${city} is: ${temp} C`;     
            const temFeelsLike = document.getElementById("tempFeelsLike");
            temFeelsLike.textContent = `Real Feel: ${data.list[0].main.feels_like} C`
            const humidity = document.getElementById("humidity");
            humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`;
            const wind = document.getElementById("wind");
            wind.textContent = `Wind: ${data.list[0].wind.speed} km/h`;
            const weatherDescription = document.getElementById("weatherDesc");
            weatherDescription.textContent = `${data.list[0].weather[0].main}, ${data.list[0].weather[0].description}`;

            //b<=8 epntru ca avem nevoie de indexare pt data.list care incepe de la 0 si indexarea se face din 3 in 3 ore, astfel avem nevoie de 8 indexari in total pentru a acoperii o zi intreaga
            const parentElement = document.getElementById("hoursWeatherCarousel");
            parentElement.innerHTML ='';
            for (let i = 1; i <= 8; i++) {

                const childElement = document.createElement("div");
                parentElement.appendChild(childElement);
                const hour = new Date(data.list[i].dt_txt).getHours(); 
                childElement.classList.add("d-flex", "align-items-center", "justify-content-center", "text-center", "col-5","py-3","m-3","rounded-5");
                if(data.list[i].weather[0].main === "Clouds"){
                    childElement.classList.add("clouds", "col-12", "col-sm-6", "col-md-4","col-lg-4");
                }
                else if(data.list[i].weather[0].main === "Rain"){
                    childElement.classList.add("rain","col-12", "col-sm-6", "col-md-4","col-lg-4");
                }
                else if(data.list[i].weather[0].main === "Clear"){
                    childElement.classList.add("clear","col-12", "col-sm-6", "col-md-4","col-lg-4");
                }
                else if(data.list[i].weather[0].main === "Drizzle"){
                    childElement.classList.add("drizzle","col-12", "col-sm-6", "col-md-4","col-lg-4");
                }
                else if(data.list[i].weather[0].main === "Thunderstorm"){
                    childElement.classList.add("thunder","col-12", "col-sm-6", "col-md-4","col-lg-4");
                }
                else{
                    childElement.classList.add("default","col-12", "col-sm-6", "col-md-4","col-lg-4")
                }
                childElement.textContent = `Hour ${hour}:00, temperature: ${data.list[i].main.temp} C, humidity: ${data.list[i].main.humidity} %, wind: ${data.list[i].wind.speed} km/h, ${data.list[i].weather[0].main} - ${data.list[i].weather[0].description}`;
            }
 
    })    
    .catch(error => {
        console.log('There is an error:', error);
        window.alert("This place does not exist or you've made a spelling error");
        cityInput.value = " ";
        const dataPrint = document.getElementById("dataPrint");
        dataPrint.classList.add("d-none");
        const carouselCard = document.getElementById("hoursWeatherCarousel");
        carouselCard.classList.add("d-none");
        });
    
});