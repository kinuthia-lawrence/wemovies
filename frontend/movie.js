// 4bbc0c6716d020efceb68b68ab52d925
const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = ""; //api link

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerHTML = movieTitle;

returnReviews(APILINK); // call the returnMovies function to get the movies from the API
//creating element  divs using javascript and append them to the section div
function returnReviews(url) {
  fetch(url + "movie/" + movieId)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      data.forEach((review) => {
        const div_card = document.createElement("div");
        div_card.innerHTML = `
        <div class="row">
        <div class="column">
        <div class="card" id="${review._id}>
        <p><strong>Review: </strong>${review.review}</p>
        <p><strong>Review: </strong>${review.user}</p>
        <p><a href="#" onclick="editReview('${review._id}','${review.review}','${review.user}')">✏️</a><a href ="#" onclick="deleteReview('${review._id}')">♻️🚮</a></p>
        </div>
        </div>
        </div>
        `;

        main.appendChild(div_row);
      });
    });
}

function editReview(id, review, user) {

    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
                <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
                </p>
                <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
                </p>
                <p><a href="#" onclick="saveReview('${reviewInputId}','${userInputId}', '${id})'">🔖</a></p>
                </p>
    `
}

function saveReview(reviewInputId, userInputId, id) {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    fetch(APILINK + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"user": user, "review": review})
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        location.reload();
    });
}

//TODO: add a new review and delete review