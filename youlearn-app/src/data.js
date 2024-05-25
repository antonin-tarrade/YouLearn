// data.js

export const commentsExample = [
  { id: 1, content: 'Super vidéo !', author: 'Jean Dupont'},
  { id: 2, content: 'Merci pour cette vidéo !', author: 'Marie Martin'},
  { id: 3, content: 'Je n\'ai pas compris la fin...', author: 'Pierre Durand'},
  { id: 4, content: 'Je n\'ai pas compris la fin...', author: 'Pierre Durand'}
];

export const videoExample = {
  title: 'Top 100 Artiste',
  description: 'Vidéo de fou zinzin vraiment trop bien !',
  url: 'https://www.youtube.com/watch?v=fIPA8oT5qBo',
  numberOfLike: 1000,
  cour: 'Modélisation',
  author: 'LEGOAT',
  comments : commentsExample
};


export const courExample = {
  title: 'Modélisation',
  description: 'Description de la modélisation',
  videos: [videoExample, videoExample]
};

export const playlistsExample = [
  { id: 1, title: 'Playlist 1 de fouuuuuu', isVideoInPlaylist: true, videos: [videoExample, videoExample, videoExample, videoExample, videoExample] },
  { id: 2, title: 'Playlist 2fffffffff', isVideoInPlaylist: true, videos: [videoExample]  },
  { id: 3, title: 'Playlist 3', isVideoInPlaylist: false, videos: [videoExample, videoExample]  }
];

export const userExample = {
  username : 'Jean',
  department : 'Sciences du Numériques',
  email : 'j@j',
  password : '123',
  role : 0,
  likedVideos: [videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample, videoExample],
  playlists : playlistsExample,
  cours: [courExample, courExample],
  followedCourses: [courExample,courExample,courExample]
};
