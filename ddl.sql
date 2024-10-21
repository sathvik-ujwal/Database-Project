. 
  CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL
  );
  
  CREATE TABLE Artist (
    artist_id INT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
  );
  
  CREATE TABLE album (
    album_id INT PRIMARY KEY ,
    release_date DATE NOT NULL,
    title VARCHAR(45) NOT NULL,
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES Artist(artist_id)
  );
  
  CREATE TABLE songs (
    song_id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    artist_id INT NOT NULL,
    album_id INT NOT NULL,
    genre VARCHAR(20) NOT NULL,
    play_count INT NOT NULL,
    released_on DATE NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES Artist(artist_id),
    FOREIGN KEY (album_id) REFERENCES album(album_id)
  );
  
  
  CREATE TABLE playlists (
    playlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    playlist_name VARCHAR(30) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
.  
  CREATE TABLE playlist_songs (
    playlist_id INT NOT NULL,
    song_id INT NOT NULL,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id)
  );
  
  
  CREATE TABLE user_plays_song (
    user_id INT NOT NULL,
    song_id INT NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );
  
  
CREATE TABLE followers (
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    PRIMARY KEY (follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES users(user_id),
    FOREIGN KEY (followed_id) REFERENCES users(user_id) 
);
 
  
  ALTER TABLE playlists ADD COLUMN image VARCHAR(255);
 
  
  
  
  

