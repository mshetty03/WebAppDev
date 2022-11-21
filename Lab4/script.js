window.addEventListener('DOMContentLoaded', function(){
    
    let searchbtn = document.getElementById('searchbtn');
    let locationbtn = document.getElementById('locationbtn');
    //searchbtn.addEventListener('click', fetchWeather);
    


    searchbtn.addEventListener('click', () => {
        let checkcity = document.getElementById('city').value;
        if(checkcity.length === 0){
          this.alert("please enter city name or use get device location button to fetch weather for current location")
        } else {
            fetchWeather()
        }
        })


    locationbtn.addEventListener('click', geolocationfun);
    //$('.loader').css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​,'block');​​​​​​
    //document.getElementById("loader").style.display = "block";
    
});

    function geolocationfun(){
        document.getElementById("loader").style.display = "block";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(Onsucess,onError);
            }
      else{
           alert("your browser doesnot support geolocation");
      }
    }
     
    function onError(error){
        alert("Error fetching device location! Please enter a location");
    }
    
    function Onsucess(position){
        
        console.log("loading data from auto location");
        //document.getElementById("loader").style.display='none';
        const{latitude,longitude} = position.coords;
        //let api=`https://weatherdbi.herokuapp.com/data/weather/`+position.coords.latitude + "," + position.coords.longitude)
        fetch("https://weatherdbi.herokuapp.com/data/weather/"+position.coords.latitude + "," + position.coords.longitude)
        .then(function(res){
            console.log("here1");
            return res.json();
    
          })
          .then(function(jsonData){
            console.log("here2");
            //displayWeather(jsonData) 
            console.log(jsonData);
            console.log(jsonData.cod);
            if(jsonData.region)
            {
            displayWeather(jsonData)
            }
            else{
                alert("Enter valid city name");
                //document.getElementById("infotxt").innerHTML="Enter Valid city name";
                document.getElementById('city').value = "";
                document.getElementById("loader").style.display = "none";
                
            }
           // document.querySelector("#temp").textContent = "Temp:" + temp;
          })
          .catch(error=> console.log(error));
        }
        
    
    // City entered   
    function fetchWeather(){

        document.getElementById("loader").style.display = "block";
        let city=document.getElementById("city").value;

        
        var headers = {}


        console.log(city)
      fetch("https://weatherdbi.herokuapp.com/data/weather/" + city)
      .then(function(res){
        console.log("before return");
        return res.json();
      })
      .then(function(jsonData){
            
            if(jsonData.region)
            {
            displayWeather(jsonData)
            }
            else{
                alert("Enter valid city name");
                document.getElementById('city').value = "";
                document.getElementById("loader").style.display = "none";
            }
            

       // document.querySelector("#temp").textContent = "Temp:" + temp;
      })
    
      .catch(error=> console.log(error));
    
    }

//To display weather data
function displayWeather(data){
    //Fetching Current Weather
        
        document.getElementById("loader").style.display = "none";


        currentweatherDiv=document.querySelector('#current-weather');

        document.getElementById('name').innerHTML=' '+data.region;
        let icon = document.getElementById("icon");
        icon.src = data.currentConditions.iconURL;
        document.getElementById('dayhour').innerHTML=' '+ data.currentConditions.dayhour;
        document.getElementById('comment').innerHTML=data.currentConditions.comment;
        document.getElementById('temp').innerHTML='Temp : '+ data.currentConditions.temp.f + ' °F';
        document.getElementById('precip').innerHTML='Precip : ' + data.currentConditions.precip;
        document.getElementById('humidity').innerHTML='Humidity : '+data.currentConditions.humidity ;
        document.getElementById('wind').innerHTML='Wind : '+data.currentConditions.wind.km + " Km";

        //console.log(data.next_days[0].day);

        //Fetching 7 day  Weather
        currentweatherDiv=document.querySelector('#title2');

        document.getElementById('7day').innerHTML='7 Day Weather Forecast ';
        
        for(i=1;i<=7;i++)
        {
        
        WeatherforecastDiv=document.querySelector(String('#weather-forecast-'+i));
        console.log(WeatherforecastDiv)
        WeatherforecastDiv.innerHTML="";
        
        var day=document.createElement('day');
        day.innerHTML = '<br/>' + data.next_days[i].day;
        //day1.innerText= '' +data.next_days[i].day;
        WeatherforecastDiv.append(day);

        var icon1 = document.createElement("icon1");
        icon1.innerHTML = '<br/><br/><br/>' + "<img src=" + data.next_days[i].iconURL +"><br/>"
        WeatherforecastDiv.append(icon1);
               
        var comment=document.createElement('comment');
        comment.innerHTML= '<br/>' +data.next_days[i].comment;
        WeatherforecastDiv.append(comment);
        
        var maxtemp=document.createElement('maxtemp');
        maxtemp.innerHTML= '<br/>' + 'Max Temp : ' +data.next_days[i].max_temp.f +  ' °F';
        WeatherforecastDiv.append(maxtemp);

        var mintemp=document.createElement('mintemp');
        mintemp.innerHTML= '<br/>' + 'Min Temp : ' +data.next_days[i].min_temp.f + ' °F';
        WeatherforecastDiv.append(mintemp);
        }  
    }

