package pack;

import pack.entities.Playlist;
import pack.entities.Video;


public class PlaylistVideo {
    private Playlist playlist;
    private Video video;

    public PlaylistVideo() {
    }

    public PlaylistVideo(Playlist playlist, Video video) {
        this.playlist = playlist;
        this.video = video;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public Video getVideo() {
        return video;
    } 
}