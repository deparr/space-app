const key = "";

const epicURL = "https://api.nasa.gov/EPIC/";
const flrURL = "https://api.nasa.gov/DONKI/FLR?";



document.getElementById("flareInput").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("flareData").style.display = "table";
    document.getElementById("flareData").style.backgroundImage = "url(\"/images/space.svg\")";

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
                let row = document.createElement("tr")
                row.classList.add("flareRow");
                for (let j = 0; j < header.children.length; j++) {
                    let p = document.createElement("td");
                    if (header.children[j].id === "instruments") {
                        p.innerHTML = json[i]["instruments"][0].displayName;
                    }
                    else if (header.children[j].id === "link") {
                        a = document.createElement("a");
                        a.innerHTML = "more info";
                        a.classList.add("link");
                        a.href = json[i]["link"];
                        p.appendChild(a);
                    }
                    else {
                        p.innerHTML = json[i][header.children[j].id];
                    }

                    p.classList.add(header.children[j].id);
                    p.classList.add("flareEle");
                    row.appendChild(p);
                }

                if (row.children[3].innerHTML === "") {
                    row.children[3].innerHTML = "no end date record";
                }
                table.appendChild(row);
            }
            document.getElementById("footer").classList.add("footerPos");
            if (document.getElementById("epicImg").getAttribute("src") != "") {
                document.getElementById("footer").style.position = "relative";
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
            if (document.getElementById("flareData").style.display === "table") {
                document.getElementById("footer").style.position = "relative";
            }
            
        });
});
