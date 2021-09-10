console.log("Item net tester")
  
function getData() {  

    // get image url value
    const imageurl = document.getElementById("imageurl").value
    console.log(imageurl)
    fetchDataFromAPI(imageurl)

}

function fetchDataFromAPI(imageurl) {
    console.log("Getting data...");
    const url = 'https://cvservice-dot-mixandmatch-databasemanager.uc.r.appspot.com/itemtype';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        url: imageurl
      }
    };
    fetch(url, options)
    .then(res => res.json())
    .then(json => processData(json, imageurl))
    .catch(err => console.error('error result:' + err));
  }
  
  function processData(json, imageurl) {

    console.log(json)

    // fill in image
    document.getElementById("resultimage").src = imageurl


    // fill in data
    let predictionResult = document.getElementById("predictionResult")
    let confidenceResult = document.getElementById("confidenceResult")
    let predictionRanking = document.getElementById("predictionRanking")
    let confidenceRanking = document.getElementById("confidenceRanking")

    predictionResult.innerHTML = json.prediction
    confidenceResult.innerHTML = (json.confidence.toPrecision(2) * 100).toString() + " %"
    
    let predictionArray = Object.values(json.prediction_ranking)
    let confidenceArray = Object.values(json.confidence_ranking)

    predictionRanking.innerHTML = ""
    confidenceRanking.innerHTML = ""

    predictionArray.forEach(element => {

        var li = document.createElement("li")
        li.appendChild(document.createTextNode(element))
        predictionRanking.appendChild(li)
        
    });

    confidenceArray.forEach(element => {

        var li = document.createElement("li")
        li.appendChild(document.createTextNode(element))
        confidenceRanking.appendChild(li)
        
    });

    // set visibiliity of result container to true
    document.getElementById("resultContainer").style.visibility = "visible"
    
  }