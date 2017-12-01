'use strict';

const CONGRESSPERSON_SEARCH_URL = 'https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDmy5GqaG7XhLaYLbAUuoUqO4DRFT_Lgz4&address=';

function handleForm() {
  const zipcodeForm = $('form[name=rep-search]');
  const zipcodeField = $('input[name=zipcode]');
  
  zipcodeForm.on('submit', function(e) {
    e.preventDefault();

    //hide the search form and display the results
     $('.search').addClass('hidden');
     $('.js-search-results').removeClass('hidden');
    //get the zipcode that was entered

    const voterZipcode = zipcodeField.val();

    //pass it in along with the Congressperson endpoint

    fetchData(CONGRESSPERSON_SEARCH_URL, voterZipcode);
    //reset the input

    zipcodeField.val('');

  })
}

function fetchData(baseURL, zipcode) {
  //make the complete url by concatenating 
  //the endpoint and the zipcode together

  const url = baseURL + zipcode;

  //try to get some JSON
  //and show something to the user.
  $.getJSON(url, showRepInfo)
// ... and show an error if we can't 
  .fail(showErr);
}

 

function showRepInfo(repData) {
  // store the element we'll be appending to
  const outputResults= $('row.reps');
  
 outputResults
 .empty()
   //store the parts we want from the data
  //using object destructuring
  let {officials, offices} = repData;
  //Party: ${officials[2]["party"]}<br>

  
   //for (let i = 0; i <=offices.length; i++) 
  // //  let currentOffice = ${offices[i]["name"]}
  // if (offices[name[i]] == "United States Senate") {
      
const repInfoHTML = (
 


`
   <div class ="rep col-4">
     <section class ="name-box1">
       <h2 class='js-search-results'>${officials[2]["name"]}</h2>
       <h2>${offices[2]["name"]}</h2><br>
     </section>
     <section class ="info-box">
       Party: ${officials[2]["party"]}<br>
       Phone: ${officials[2]["phones"]}<br>
       Website: ${officials[2]["urls"]}<br>
     </section>
     <section class = "Tweets">Recent Tweets<br>
     </section>
   </div>  
  
`);   
    
//then empty the output region
// and append our profile info

outputResults
  
  .append(repInfoHTML)
  }
 // }


 function showErr(err) {
    const outputResults = $('row.reps');
    const {status } = err;

   console.log (err)

    let errMsg;
   if (status === 404) {
    errMsg = `We couldn't find that zipcode!`
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


