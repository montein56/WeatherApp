async function refreshing(newGifItem) {
  if (newGifItem === undefined) {
    newGifItem = "rock";
  }
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=2n7POPaMC5FWod3I9Ag5QQmYZ96U6CKP&s=${newGifItem}`,
    { mode: "cors" }
  );
  response
    .json()
    .then(function (response) {
      image.src = response.data.images.original.url;
    })
    .catch(function (err) {
      const span = document.getElementById("errorSpan");
      span.textContent = "You searched for WHAT??? :)";
      refreshing("laugh");
    });
}
refreshing();
