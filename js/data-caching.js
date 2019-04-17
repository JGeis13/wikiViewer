// When user searches for a term, 10 results are returned
// When user clicks on a result, modal is opened with more details of result
// How to deal with storing data in order to not keep running the same queries? 

// IDEAS
// store the query results of the previous X number of searches, if they are re-run, use stored data instead of querying again
// also store the individual query results for the modal in case they are utilized again
// session storage or local storage?


let searches = {
  'cheese': {
    results: {things: 'stuff'}
  },
}

let pages = {
  'Cream cheese': {
    results: {}
  }
}