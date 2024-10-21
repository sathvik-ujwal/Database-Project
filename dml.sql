INSERT INTO users (username, email, password) VALUES ('Sathvik', 'Sathvik@gmail.com', '11111111');
INSERT INTO users (username, email, password) VALUES ('aaa', 'aaa@yahoo.com', 'aaaaaaaa');
INSERT INTO users (username, email, password) VALUES ('Kirtan', 'kirtan@hotmail.com', '22222222');
INSERT INTO users (username, email, password) VALUES ('testing', 'testing@gmail.com', '33333333');
INSERT INTO users (username, email, password) VALUES ('DavidJones', 'david.jones@yahoo.com', 'Jones007');
INSERT INTO users (username, email, password) VALUES ('OliviaTaylor', 'olivia.taylor@gmail.com', 'OliviaTaylor22');
INSERT INTO users (username, email, password) VALUES ('JamesDavis', 'james.davis@hotmail.com', 'Davis1985');
INSERT INTO users (username, email, password) VALUES ('SophiaMiller', 'sophia.miller@gmail.com', 'Sophia123');
INSERT INTO users (username, email, password) VALUES ('DanielAnderson', 'daniel.anderson@yahoo.com', 'Anderson456');
INSERT INTO users (username, email, password) VALUES ('Sath', 'sath@gmail.com', '11111112');


INSERT INTO Artist (artist_id, name)
VALUES (111, 'Linkin Park');

INSERT INTO Artist (artist_id, name)
VALUES (222, 'Ed Sheeran');

INSERT INTO Artist (artist_id, name)
VALUES (333, 'Adele');

INSERT INTO Artist (artist_id, name)
VALUES (444, 'Beyoncé');

INSERT INTO Artist (artist_id, name)
VALUES (555, 'Bruno Mars');

INSERT INTO Artist (artist_id, name)
VALUES (666, 'Rihanna');

INSERT INTO Artist (artist_id, name)
VALUES (777, 'Justin Bieber');

INSERT INTO Artist (artist_id, name)
VALUES (888, 'Avicii');

INSERT INTO Artist (artist_id, name)
VALUES (999, 'Katy Perry');

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1001, '2013-07-24', 'Meteora', 111);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1002, '2017-03-03', '÷ ', 222);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1003, '2015-11-20', '25', 333);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1004, '2013-12-13', 'Beyoncé', 444);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1005, '2010-10-04', 'Doo-Wops & Hooligans', 555);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1006, '2016-01-28', 'ANTI', 666);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1007, '2020-02-14', 'Changes', 777);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1008, '2008-10-28', 'True', 888);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1009, '2010-08-24', 'stories', 888);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1010, '2016-04-29', 'Views', 999);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1011, '2018-08-17', 'Minutes to Midnight', 111);

INSERT INTO album (album_id, release_date, title, artist_id)
VALUES (1012, '2020-03-20', 'Hybrid Theory', 111);

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (12342, 'Numb', 111, 1001, 'Rock', 0, '2020-12-11');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (67890, 'Faint', 111, 1001, 'Rock', 0, '2020-01-06');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (12346, 'Breaking the Habit', 111, 1001, 'Rock', 0, '2020-10-23');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (78901, 'perfect', 222, 1002, 'pop', 0, '2016-02-06');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (23456, 'Shape of You', 222, 1002, 'Pop', 0, '2016-07-20');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (56789, 'Fire', 333, 1003, 'country', 0, '2012-11-08');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (23457, 'Intentions', 777, 1007, 'pop', 0, '2020-02-07');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (89012, 'Poker Face', 666, 1006, 'country', 0, '2008-09-26');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (34567, 'Firework', 666, 1006, 'Pop', 0, '2010-10-26');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (67891, 'One Dance', 999, 1010, 'Hip Hop', 0, '2016-04-05');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (45678, 'Gods Plan', 999, 1010, 'Hip Hop', 0, '2013-11-21');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (90123, 'Wake Me Up', 888, 1008, 'EDM', 0, '2014-08-18');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (567890, 'Hey Brother', 888, 1008, 'EDM', 0, '2012-01-02');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (23458, 'The Nights', 888, 1009, 'EDM', 0, '2012-09-15');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (67892, 'Broken Arrows', 888, 1009, 'EDM', 0, '2012-05-06');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (34568, 'Shoadow of the day', 111, 1011, 'Rock', 0, '2011-06-24');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (78902, 'Bleed it Out', 111, 1011, 'Rock', 0, '2011-06-03');

INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
VALUES (12347, 'In the End', 111, 1011, 'Rock', 0, '2011-10-28');


INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (1234567, 23, 'Top Rock');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (2345678, 23, 'Party Songs');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (3456789, 24, 'Throwback Hits');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (4567890, 23, 'Road Trip Mix');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (5678901, 23, 'Workout Pump');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (6789012, 25, 'Late Night Grooves');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (7890123, 25, 'Party Anthems');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (8901234, 26, 'Study Focus');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (9012345, 27, 'Feel Good Tunes');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (1234568, 28, 'Acoustic Bliss');

INSERT INTO playlists (playlist_id, user_id, playlist_name)
VALUES (2345679, 29, 'Rhythm and Blues');
;

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1234567, 12342);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1234567, 67890);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1234567, 12347);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1234567, 78902);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (2345678, 45678);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (3456789, 90123);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (4567890, 567890);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (5678901, 23458);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (6789012, 56789);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (7890123, 23457);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (8901234, 89012);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (9012345, 34567);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1234567, 67891);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (2345678, 12347);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (3456789, 79902);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (4567890, 90123);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (5678901, 34567);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (6789012, 78902);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (7890123, 34568);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (8901234, 23457);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (9012345, 90123);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1234568, 56789);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (2345679, 12342);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (1, 12342);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (2, 67890);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (3, 12346);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (4, 78901);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (5, 23456);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (6, 67890);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (7, 12346);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (8, 78901);

INSERT INTO user_plays_song (user_id, song_id)
VALUES (9, 23456);


/* inserting values of images into playlists table */
UPDATE playlists
SET image = 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/master/pass/Artist-Designed%20Album%20Covers%202.jpg'
WHERE playlist_id = 1234567;

UPDATE playlists
SET image = 'https://www.aimm.edu/hubfs/Blog%20Images/Top%2010%20Album%20Covers%20of%202017/Tyler%20the%20Creator-%20Flower%20boy.jpg'
WHERE playlist_id = 2345678;

UPDATE playlists
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuVi9V0hFD6rTwaNfzfPPLYkSowoB6z3gOrjQulp_Acg&s'
WHERE playlist_id = 1234568;

UPDATE playlists
SET image = 'https://anaruh.com/wp-content/uploads/2023/08/shadow-scaled.jpg'
WHERE playlist_id = 2345679;

UPDATE playlists
SET image = 'https://j-generation.com/wp-content/uploads/2021/01/JGen-Kenshi-Yonezu-Stray-Sheep-best-cover-2.jpg'
WHERE playlist_id = 3456789;

UPDATE playlists
SET image = 'https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e2f9aa74-7587-4a30-b0c0-4df61d7ac308/43.jpg'
WHERE playlist_id = 5678901;

UPDATE playlists
SET image = 'https://albumcoverzone.com/slir/h1200/png24-front/albumcover0002465.jpg'
WHERE playlist_id = 4567890;

INSERT INTO followers (follower_id, followed_id) VALUES (23, 24);
INSERT INTO followers (follower_id, followed_id) VALUES (23, 25);
INSERT INTO followers (follower_id, followed_id) VALUES (23, 26);
INSERT INTO followers (follower_id, followed_id) VALUES (23, 27);
INSERT INTO followers (follower_id, followed_id) VALUES (25, 31);
INSERT INTO followers (follower_id, followed_id) VALUES (24, 23);
INSERT INTO followers (follower_id, followed_id) VALUES (25, 23);
INSERT INTO followers (follower_id, followed_id) VALUES (27, 26);
INSERT INTO followers (follower_id, followed_id) VALUES (27, 28);
INSERT INTO followers (follower_id, followed_id) VALUES (24, 25);
