// function searchSong(){
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displaySongs(data.data))
//     .catch(error => displayError('Something went Wrong!! Please try again later!'))
// };

const searchSong = async() => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    try{
        const res = await fetch(url)
        const data = await res.json()
        displaySongs(data.data)
    }
    catch(error){
        displayError('Something went Wrong!! Please try again later!')
    }
}

const displaySongs = songs => {
    console.log(songs)
    const songContainer = document.getElementById('song-container');
    allInnerTextHTML();
    songs.forEach(song => {
        const newDiv = document.createElement('div');
        newDiv.className = 'single-result row align-items-center my-3 p-3'
        newDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
              </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(newDiv);
    })
};

// async function getLyric(artist, title) {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displayLyrics(data.lyrics);
// };

function getLyric(artist, title) {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError(error));
}

const displayLyrics = lyrics => {
    const songLyricsTag = document.getElementById('song-lyrics');
    allInnerTextHTML();
    songLyricsTag.innerText = lyrics;
};

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    allInnerTextHTML();
    errorTag.innerText = error;
}

const allInnerTextHTML = () => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = '';
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = '';
}