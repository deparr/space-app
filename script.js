// API KEY DmdbgSZ2HYy9DBr0GLAcuXOkpVbNSIZe6AgFtKLs -- nasa
const key = "?api_key=DmdbgSZ2HYy9DBr0GLAcuXOkpVbNSIZe6AgFtKLs";

const epicURL = "https://api.nasa.gov/EPIC/";

// Get background image
/*const podURL = "https://api.nasa.gov/planetary/apod?api_key=" + key;
fetch(podURL)
    .then(function (response) {
        return response.json();
    }).then(function(json) {
        document.getElementById("topbar").style.backgroundImage = "url(" + json.url + ")";
    });
*/


document.getElementById("userform").addEventListener("submit", function(event) {
    let url = "";
    event.preventDefault();
    fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
            });

});

document.getElementById("rcDate").addEventListener("submit", function(event) {
    event.preventDefault();
    let userDate = document.getElementById("dateEpic").value;
    let url = ""
    if (userDate.length == 0 || Date.parse(userDate) > Date.now()) {
        url = epicURL + "api/natural/images";
    }
    else {
        url = epicURL + "api/natural/date/" + userDate;
    }

    fetch(url + key)
        .then(function (response) {
            return response.json()
        }).then(function (json) {
            console.log(json);
            let date = json[0].date.slice(0, 4) + "/" + json[0].date.slice(5,7) + "/" + json[0].date.slice(8, 10);
            earthImg = document.getElementById("epicImg");
            earthImg.src = epicURL + "archive/natural/" + date + "/png/" + json[0].image + ".png" + key;
            earthImg.width = "400";
            earthImg.height = "400";

            document.getElementById("epicImgCap").innerHTML = "<em>" + json[0].date + "</em>";
            
        });
});