(function(){
    loadGraph();
    getData();
    
})();

/*
Function to load all the country names in Dropdown
*/
function getData(){
    let dropdown = document.getElementById("country-dropdown");
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Country';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = 'https://restcountries.eu/rest/v2/all';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].name;
      	  option.value = data[i].alpha2Code;
      	  dropdown.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });
}

/*
Function to load the covid details of country on selecting a country name from dropdown.
*/
async function loadGraph(){
    var defaultOption="IN";
    var e = document.getElementById("country-dropdown");
    var countrySelected = e.value;
    if(countrySelected==""){
        countrySelected=defaultOption;
    }
    const url = `https://disease.sh/v3/covid-19/countries/${countrySelected}`;

    fetch(url)  
      .then(  
          
        function(response) {
           
          if (response.status !== 200) {  
            console.warn('Looks like there was a problem. Status Code: ' + 
              response.status);  
            return;  
          }
          response.json().then(function(data) {  
         let graph_container = document.getElementById("graph-body");
         graph_container.innerHTML =`
         <div>
         <img src="${data.countryInfo.flag}" class="col-sm-4 flag-image" alt="Flag Image not available">
         <div class="text-pink col-sm-8">
         <p>Country : <span>${data.country}</span></p>
         <p>Continent : <span>${data.continent}</span></p>
         <p>Population : <span>${data.population}</span></p>
         </div>
         
         <table class="table padding-top">
         <thead>
         <tr>
         <td class="text-pink">Cases</td>
         <td class="text-pink">Total Cases</td>
         <td class="text-pink">Active</td>
         <td class="text-pink">Critical</td>
         <td class="text-pink">Recovered</td>
         <td class="text-pink">Deaths</td>
         <td class="text-pink">Tests</td>
         
         </tr>
         </thead>
         <tbody>
         <tr>
         <td class="text-pink">Total</td>
         <td><span>${data.cases}</span></td>
         <td><span>${data.active}</span></td>
         <td><span>${data.critical}</span></td>
         <td><span>${data.recovered}</span></td>
         <td><span>${data.deaths}</span></td>
         <td><span>${data.tests}</span></td>
         </tr>
         <tr>
         <td class="text-pink">Per One Million</td>
         <td><span>${data.casesPerOneMillion}</span></td>
         <td><span>${data.activePerOneMillion}</span></td>
         <td><span>${data.criticalPerOneMillion}</span></td>
         <td><span>${data.recoveredPerOneMillion}</span></td>
         <td><span>${data.deathsPerOneMillion}</span></td>
         <td><span>${data.testsPerOneMillion}</span></td>
         </tr>
         </tbody>
         
         </table>
         <div class="padding-top">
         <p class="text-pink">Cases Today : <span>${data.todayCases}</span></p>
         <p class="text-pink">Deaths Today : <span>${data.todayDeaths}</span></p>
         <p class="text-pink">Recovered Today : <span>${data.todayRecovered}</span></p></div>
         
         <img src="https://corona.dnsforfamily.com/graph.png?c=${countrySelected}" class="image-align padding-top"alt="Graph not available">
         </div>
         `;
          });  
        }  
      )  
      .catch(function(err) {  
        console.error('Fetch Error -', err);  
      });
}