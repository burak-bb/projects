async function getGif(term) {
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {params: {q: term, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"}})
    const randomGif = (Math.floor(Math.random() * res.data.data.length));
    return (res.data.data[randomGif].images.original.url);
}


$("#search").click(async function (e) {
    e.preventDefault()
    const term = $("#term").val();
    const imgSrc = await getGif(term);
    const gif = $("<img>").attr("src", imgSrc);
    $(".gifs").append(gif)
})

$("#remove").click(function (e) {
    e.preventDefault();
    $(".gifs").empty();
})

