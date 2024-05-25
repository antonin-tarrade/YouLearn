// data.js
export const commentExample = {
  author: null,
  content: 'Super vidéo !',
}

export const commentsExample = [commentExample, commentExample, commentExample];

export const videoExample = {
  title: 'Top 100 Artiste',
  description: 'Vidéo de fou zinzin vraiment trop bien !',
  url: 'https://www.youtube.com/watch?v=fIPA8oT5qBo',
  numberOfLike: 1000,
  course: 'Modélisation',
  author: 'LEGOAT',
  comments : commentsExample
};

export const courseExample = {
  title: 'Modélisation',
  description: 'Description de la modélisation',
  author: 'LEGOAT',
  videos: [videoExample, videoExample]
};

export const playlistExample = {
  title: 'Pour Lundi !',
  description: 'Très urgent a réviser pour lundi !',
  author: 'LEGOAT',
  videos: [videoExample, videoExample]
};

export const playlistsExample = [playlistExample, playlistExample, playlistExample];

export const userExample = {
  username : 'Jean',
  department : 'Sciences du Numériques',
  email : 'j@j',
  password : '123',
  role : 0,
  likedVideos: [videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample],
  playlists : playlistsExample,
  cours: [courseExample, courseExample],
  followedCourses: [courseExample,courseExample,courseExample]
};

videoExample.author = userExample;
videoExample.course = courseExample;
courseExample.author = userExample;
commentExample.author = userExample;
playlistExample.author = userExample;
