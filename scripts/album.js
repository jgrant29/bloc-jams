

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
};

var createSongRow = function(songNumber, songName, songLength) {
  var template = 
    '<tr class="album-view-song-item">'
    +'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + ' <td class="song-item-title">' + songName + '</td>'
    + ' <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    var $row = $(template);

    var clickHandler = function() {
      var songNumber = $(this).attr('data-song-number');

      if (currentlyPlayingSong !== null) {
        var currentlyPlayingCell = $('.song-item-number[data-song-number]="' + currentlyPlayingSong + '"]');
        currentlyPlayingCell.html(currentlyPlayingSong);
      }
      if (currentlyPlayingSong !== songNumber) {
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSong = songNumber;
      } else if (currentlyPlayingSong == songNumber) {
        $(this).html(playButtonTemplate);
        currentlyPlayingSong = null;
      }
    };

    var onHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate)
      }
    };

    var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(songNumber);
      }
    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
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

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span>';

var currentlyPlayingSong = null;

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
});



