let submitBtn = document.querySelector(".submit");
let form = document.querySelector("form");

submitBtn.addEventListener("click", function(e) {
    e.preventDefault();

    let data = {};

    for (let elem of form.children) {
        if (elem.name != "") {
            if (elem.className === "select_box") {
                for (let element of elem.children) {
                    data[element.name] = element.value;
                }
            } else {
                data[elem.name] = elem.value;
            }
        }
    }

    data.imgUrl = data.mainimgUrl;
    data.imgUrls = [data.mainimgUrl, data.secondimgUrl, data.thirdimgUrl];
    delete data.mainimgUrl
    delete data.secondimgUrl
    delete data.thirdimgUrl

    data.sizes = [];
    let keys = Object.keys(data);

    keys.forEach((el) => {
        if (/size-/.test(el)) {
            let obj = {}
            obj.size = data[el];
            obj.qty = data[`qty-${el.split("size-")[1]}`];
            data.sizes.push(obj);

            delete data[el]
            delete data[`qty-${el.split("size-")[1]}`]
        }

        if (el === "") {
            delete data[el];
        }
    })

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/admin/add-product", true);
    request.setRequestHeader('Content-type',  'application/json; charset=utf-8');
    request.send(JSON.stringify(data));

    window.location.reload();
});