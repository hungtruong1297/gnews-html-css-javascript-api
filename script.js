$(document).ready(function () {
  // Handler for .ready() called.
  function getArticles() {
    // Add "Loading Animation"
    $("article")
      .html(
        `<span class="loading" style="margin-top: 2rem"></span></br><span>Loading...</span>`
      )
      .addClass("center");
    let allArticles = "";

    // Fetching API JSON
    fetch(urlAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Check data
        // console.log(data);

        // Add articles from fetched data
        for (let i = 0; i < 10; i++) {
          let articleNumber = i;
          let title = data.articles[articleNumber].title;
          let publishedAt = data.articles[articleNumber].publishedAt;
          let description = data.articles[articleNumber].description;
          let imgURL = data.articles[articleNumber].image;
          let articleURL = data.articles[articleNumber].url;
          // Another way to add articles is using jQuery append

          allArticles += `
            <div class="flex-container">
                <div class="article-image">
                    <img src = "${imgURL}" alt="" id="article-image" />
                </div>
                <div class="article-content">
                    <h2><a href="${articleURL}" target="_blank">${title}</a></h2>
                    <p id="publishedAt">${publishedAt}</p>
                    <p id="description">${description}</p>
                </div>
            </div>
            `;
          //Remove class of animation
          $("article").html(allArticles).removeClass("center");
        }
      });
  }

  // Main Page - First time run
  // Gmail's token: hungtnfx10930
  //   let token = "4d65641353f3bca45fd2e310c6c5ae5c";
  // Gmail's token: hungtruong1297
  let token = "7066c155fbacb0725b7ddebe77f99d37";
  let urlAPI = `https://gnews.io/api/v4/top-headlines?&lang=en&token=${token}`;
  getArticles();

  // Search Button event
  $("#searchBtn").click(function () {
    let searchValue = $("#searchValue").val();
    if (!searchValue) {
      searchValue = "example";
    }
    urlAPI = `https://gnews.io/api/v4/search?q=${searchValue}&lang=en&token=${token}`;

    // Reset "article" by remove animation
    $("article").html("");

    // Get value from "search by date"
    let inputFromDate = $("#inputFromDate").val();
    let inputToDate = $("#inputToDate").val();

    if (inputFromDate) {
      urlAPI += `&from=${inputFromDate}T00:00:40Z`;
    }
    if (inputToDate) {
      urlAPI += `&to=${inputToDate}T23:59:40Z`;
    }
    // Check urlAPI after adding "Search, from date, to date"
    // console.log(urlAPI);

    getArticles();
    hideModelAndOverlay();
  });

  //Function for Search Icon, Close Button, Overlay
  $("#searchIcon").click(showModelAndOverlay);
  $("#closeBtn").click(hideModelAndOverlay);
  $(".overlay").click(hideModelAndOverlay);

  function hideModelAndOverlay() {
    $(".overlay").addClass("hidden");
    $(".modal").addClass("hidden");
    // Reset input fields value
    $("#searchValue").val("");
    $("#inputFromDate").val("");
    $("#inputToDate").val("");
  }

  function showModelAndOverlay() {
    $(".overlay").removeClass("hidden");
    $(".modal").removeClass("hidden");
  }
});
