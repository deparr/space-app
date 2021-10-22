// API KEY DmdbgSZ2HYy9DBr0GLAcuXOkpVbNSIZe6AgFtKLs -- nasa
const key = "api_key=DmdbgSZ2HYy9DBr0GLAcuXOkpVbNSIZe6AgFtKLs";

const epicURL = "https://api.nasa.gov/EPIC/";
const flrURL = "https://api.nasa.gov/DONKI/FLR?";

// Get background image
/*const podURL = "https://api.nasa.gov/planetary/apod?api_key=" + key;
fetch(podURL)
    .then(function (response) {
        return response.json();
    }).then(function(json) {
        document.getElementById("topbar").style.backgroundImage = "url(" + json.url + ")";
    });
*/


document.getElementById("flareInput").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("flareData").style.display = "flex";

    let daysToFetch = parseInt(document.getElementById("flareDays").value);
    let startDate = new Date();
    let endDate = [startDate.getFullYear(), startDate.getMonth(), startDate.getDate()]; 
    startDate.setDate(startDate.getDate() - daysToFetch);
    console.log(startDate);

    let url = flrURL + "startDate=" +
              startDate.getFullYear() + "-" + ((startDate.getMonth()+1).toString().length<2?"0"+(startDate.getMonth()+1).toString():(startDate.getMonth()+1).toString()) +
              "-" + (startDate.getDate().toString().length<2?"0"+startDate.getDate().toString():startDate.getDate().toString()) + "&endDate=" + endDate[0] +
              "-" + ((endDate[1]+1).toString().length<2?"0"+(endDate[1]+1).toString():(endDate[1]+1).toString()) + "-" +
              (endDate[2].toString().length<2?"0"+endDate[2].toString():endDate[2].toString()) + "&" + key;

    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let table = document.getElementById("flareData");
            let header = document.getElementById("flareHeader");
            for (let i = 0; i < json.length; i++) {
                let row = document.createElement("div")
                row.classList.add("flareRow");
                for (let j = 0; j < header.children.length; j++) {
                    let p = document.createElement("p");
                    if (header.children[j].id === "instruments") {
                        p.innerHTML = json[i]["instruments"][0].displayName;
                    }
                    else if (header.children[j].id === "link") {
                        p = document.createElement("a");
                        p.innerHTML = "more info";
                        p.classList.add("link");
                        p.href = json[i]["link"];

                    }
                    else {
                        p.innerHTML = json[i][header.children[j].id];
                    }

                    p.classList.add(header.children[j].id);
                    row.appendChild(p);
                }

                if (row.children[3].innerHTML === "") {
                    row.children[3].innerHTML = "no end date recorded";
                }
                table.appendChild(row);
            }
        })
    
});

document.getElementById("rcInput").addEventListener("submit", function(event) {
    event.preventDefault();
    let userDate = document.getElementById("dateEpic").value;
    let url = ""
    if (userDate.length == 0 || Date.parse(userDate) > Date.now()) {
        url = epicURL + "api/natural/images?";
    }
    else {
        url = epicURL + "api/natural/date/" + userDate + "?";
    }

    fetch(url + key)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let date = json[0].date.slice(0, 4) + "/" + json[0].date.slice(5,7) + "/" + json[0].date.slice(8, 10);
            earthImg = document.getElementById("epicImg");
            earthImg.src = epicURL + "archive/natural/" + date + "/png/" + json[0].image + ".png?" + key;
            earthImg.width = "400";
            earthImg.height = "400";

            document.getElementById("epicImgCap").innerHTML = "<em>" + json[0].date + "</em>";
            
        });
});