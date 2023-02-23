
// All variables

    const baseUrl='http://api.openweathermap.org/data/2.5/forecast?zip=';
    const apiKey = '&appid=3768c9fa22c8bc8a9bc8ce8bc33be318&units=imperial';

    let zip=document.getElementById('zip');
    let generateElement=document.getElementById('generate');
    let userResponse=document.getElementById('feelings');



    // we will start working when we hit the generate button

    generateElement.addEventListener('click', function(){
      if(zip.value==''){
        alert('please enter a zip code');
        return;
      }
        let data= getData(baseUrl,zip.value,apiKey);// the full url to get the data
        data.then(
        async  function(result){
            try{
              res=await result;
              let dataObj={
                temperature:res['list'][0]['main']['temp'],
                date:new Date(),
                response:userResponse.value,
              }
                  postData('/index',dataObj); // post the result of the fetch to the server
            }catch(error) {
              console.log("error", error);
              }
          }
          );
      
    })

    
    let getData=async (baseUrl,zip,apiKey)=>{
    
    const res=await fetch(baseUrl+zip+apiKey);
    try{
      const data=await res.json(); // extracting the json data into a js object
          return data;
      }catch(error){
          throw Error(error);
        }
      };

      let postData = async ( url = '', data = {})=>{
        const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
  
      try {
          if(response.ok){
            updateUi();
          }
          else{
            alert("the process didn't complete");
            return;
          }

          const newData = await response.json();
          return newData;

          
          }
        catch(error) {
        console.log("error", error);
        }}
    
    let updateUi=async()=>{

      const request = await fetch('/all');
      try {
      // Transform into JSON
      const allData = await request.json()
      console.log(allData)
      // Write updated data to DOM elements
      document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ ' degrees';
      document.getElementById('content').innerHTML = allData.response;
      document.getElementById("date").innerHTML =allData.date;
      }
      catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
      
    };