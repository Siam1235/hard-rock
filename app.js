const searchLyrics = () => {
    let searchValue = document.getElementById("lyrics-fields").value;
    const url = `https://api.lyrics.ovh/suggest/${searchValue}`;
    console.log(url);
    fetch(url)
    .then (response => response.json())
    .then (data => songsList(data.data));
    

}

const songsList = songs => {
    songs.forEach(song => {
        const songContainer = document.getElementById("song-container");
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
      </div>
      <div class="col-md-3 text-md-right text-center">
            <button onclick = "getLyrics('${song.artist.name}','${song.title}') " class="btn btn-success">Get Lyrics</button>
      </div>`;
        songContainer.appendChild(songDiv);

        console.log(song);
    });
}

const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then (response => response.json())
    .then(data => displayLyrics(data.lyrics));
}

const displayLyrics = lyricsSingle => {
    const singleLyrics = document.getElementById("single-lyrics");
    singleLyrics.innerText = lyricsSingle;
}