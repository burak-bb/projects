const Base_URL = "http://127.0.0.1:5000/api/cupcakes"

function cupCakeHtml(cupcake) {
    return `<div class="cupcake" id="${cupcake.id}">
                <img src="${cupcake.image}" alt="">
                <p class="flavor">${cupcake.flavor}</p>
                <p class="size">${cupcake.size}</p>
                <p class="rating">${cupcake.rating}</p>
                <button class="delete">X</button>
            </div>`;
}


async function showCupcakes() {
    res = await axios.get(Base_URL)
    for (let cupcake of res.data.cupcakes) {
        let newCupcake = cupCakeHtml(cupcake);
        $(".cupcakes").append(newCupcake)
    }
}

$("#new-cupcake").on("submit", async function addCupcakes() {
    let flavor = $("#flavor").val();
    let size = $("#size").val();
    let rating = $("#rating").val();
    let image = $("#image").val();


    let newCupcake = await axios.post(Base_URL, {
        flavor,
        size,
        rating,
        image
    });
    let addNewCupcake = cupCakeHtml(newCupcake.data.cupcakes);
    $(".cupcakes").append(addNewCupcake)

}) 

$(".cupcakes").on("click", ".delete", async function() {
    let id = $(this).parent().attr("id")
    await axios.delete(`${Base_URL}/${id}`)
    $(this).parent().remove()
});

showCupcakes()