

// Example Album
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablso Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { name: 'Blue', length: '4:26' },
    { name: 'Green', length: '3:14' },
    { name: 'Red', length: '5:01' },
    { name: 'Pink', length: '3:21' },
    { name: 'Magenta', length: '2:15' },
  ]
};

// Another example Album
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { name: 'Hello, Operator?', length: '1:01' },
    { name: 'Ring, ring, ring', length: '5:01' },
    { name: 'Fits in your pocket', length: '3:21' },
    { name: 'Can you hear me now?', length: '3:14' },
    { name: 'Wrong phone number', length: '2:15' },
  ]
};

var albumDrGrant = {
  name: 'Cookies and Milk',
  artist: 'The Pell',
  label: 'Eldo Records',
  year: '1985',
  albumArtUrl: 'assets/images/album_covers/09.png', 
  songs: [
  { name: 'Burning water', length: '3:21' }, 
  { name: 'Crouching Tiger', length: '2:12' }, 
  { name: 'Iron Fist', length: '4:59' }, 
  { name: 'Flying Dragon', length: '1:56' }, 
  { name: 'Praying Mantis Kung Foo', length: '10:11' }, 
  ]
}

var createSongRow = function(songNumber, songName, songLength) {
  var template = 
    '<tr class="album-view-song-item">'
    +'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + ' <td class="song-item-title">' + songName + '</td>'
    + ' <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    return $(template);
};

  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function(album) {
     $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
  }
};


window.onload = function() {
  setCurrentAlbum(albumPicasso);

  var albums = [albumPicasso, albumMarconi, albumDrGrant];
  var index = 1;

  albumImage.addEventListener("click", function(event) {
    setCurrentAlbum(albums[index]);
    index++;
    if (index == albums.length) {
      index = 0;
    }
  });
};

var child = document.getElementsByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement; 

    if (currentParent) {
       while (currentParent.className && currentParent.className != targetClass) {
          currentParent = currentParent.parentElement;
    }

      if (currentParent.className == targetClass) {
        return currentParent;
      } else {
        alert("No parent with that class name found.")
      }
    } else {
      alert("No parent found");
    }
   };

   var getSongItem = function(element) {
    switch(element.className) {
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
        return findParentClassName(element, 'song-item-number');
      case 'album-view-song-item':
        return element.querySelector('.song-item-number');
      case 'song-item-title':
      case 'song-item-duration':
        return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      case 'song-item-number':
        return element;
      default: 
        return;
    }
   };

   var clickHandler = function(targetElement) {

      var songItem = getSongItem(targetElement);

      if (currentlyPlayingSong ===  null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
      } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
          songItem.innerHTML = playButtonTemplate;
          currentlyPlayingSong = null;
      } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
          var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
          currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
          songItem.innerHTML = pauseButtonTemplate;
          currentlyPlayingSong = songItem.getAttribute('data-song-number');
      }
   };

 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item')

 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span>';

 var currentlyPlayingSong = null;

 window.onload = function() {
     setCurrentAlbum(albumPicasso);

     songListContainer.addEventListener('mouseover', function(event) {
         // #1
         if (event.target.parentElement.className === 'album-view-song-item') {
          event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
          var songItem = getSongItem(event.target);

          if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
            songItem.innerHTML = playButtonTemplate;
          }
         }
     });

     for (i = 0; i < songRows.length; i++) {
      songRows[i].addEventListener('mouseleave', function(event) {
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute('data-song-number');

        if (songItemNumber !== currentlyPlayingSong) {
          songItem.innerHTML = songItemNumber;
        }
      });

      songRows[i].addEventListener('click', function(event) {
        clickHandler(event.target);
      });
     }
   }





