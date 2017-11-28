'use strict';

const CONGRESSPERSON_SEARCH_URL = 'https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDmy5GqaG7XhLaYLbAUuoUqO4DRFT_Lgz4&address=';


function handleForm() {
  const addressForm = $('form[name=rep-search]');
  const addressField = $('input[name=address]');

  addressForm.on('submit', function(e) {
    e.preventDefault();

    //hide the search form and display the results
     $('.search').addClass('hidden');
     $('.js-search-results').removeClass('hidden');
    //get the address that was entered

    const voterAddress = addressField.val();

    //pass it in along with the Congressperson endpoint

    fetchData(CONGRESSPERSON_SEARCH_URL, voterAddress);
    //reset the input

    addressField.val('');

  })
}

function fetchData(baseURL, address) {
  //make the complete url by concatenating 
  //the endpoint and the address together

  const url = baseURL + address;

  //try to get some JSON
  //adn show something to the user.
  $.getJSON(url, showRepInfo)
// ... and show an error if we can't
    .fail(showErr);
}


function showRepInfo(repData) {
  // store the element we'll be appending to

  const outputResults= $('.js-search-results');

  //store the parts we want from the data
  //using object destructuring
  let {officials, offices} = repData;

  //if there's no official in the data, 
  //we'll inform our user

  if (!officials) officials = 'undefined';

  //we'll use the variables above to 
  //present the information we got 

  const repInfoHTML = ( 

 `<row class="reps">
   <div class ="rep col-4">

     <h2 class='js-search-results'>${officials[2]["name"]}</h2>
     <h2>${offices[2]["name"]}</h2>
     <h3 class = "contact-info">Info: <br>
       Party: ${officials[2]["party"]}<br>
       Phone: ${officials[2]["phones"]}<br>
       Website: ${officials[2]["urls"]}<br>
     
     <h3 class = "videos"> Recent YouTube Videos</h3>
   </div>
   <div class="rep col-4">
     <h2 class='js-search-results'>${officials[3]["name"]}</h2>
     <h2>${offices[2]["name"]}</h2>
     <h3 class = "contact-info">Info: <br>
       Party: ${officials[3]["party"]}<br>
       Phone: ${officials[3]["phones"]}<br>
       Website: ${officials[3]["urls"]}<br>
     <h3 class = "videos"> Recent YouTube Videos</h3>
   </div>
   <div class ="rep col-4">
     <h2 class='js-search-results'>${officials[4]["name"]}</h2>
     <h2>${offices[3]["name"]}</h2>
      <h3 class = "contact-info">Info: <br>
       Party: ${officials[4]["party"]}<br>
       Phone: ${officials[4]["phones"]}<br>
       Website: ${officials[4]["urls"]}<br>
    
     <h3 class = "videos"> Recent YouTube Videos</h3>
   </div>
  </row>
 `);   
    
//tehn empty the output region
// and append our profile info

outputResults
  .empty()
  .append(repInfoHTML)
}


function showErr(err) {
   const outputResults = $('js-search-results');
   const {status } = err;

   console.log (err)

   let errMsg;
  if (status === 404) {
   errMsg = `We couldn't find that address!`
  }
  if (status === 503) {
    errMsg = `We couldn't reach the database's servers!`
  }
    const errHTML = (
    `<div class="error"">
      <p>${errMsg}<p>
    </div>`
    );
    
    outputResults
      .empty()
      .append(errHTML)
      .prop('hidden', false);
}

$(handleForm);


