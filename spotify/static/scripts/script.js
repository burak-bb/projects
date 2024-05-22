$(".track").click(function() {
    let id = $(this).attr('id')
    let url = "https://open.spotify.com/track/" + id;
    let oembedUrl = "https://open.spotify.com/oembed?url=" + url;});

    fetch(oembedUrl)
    .then(response => response.json())
    .then(data => {
        let iframeUrl = data.iframe_url
    })