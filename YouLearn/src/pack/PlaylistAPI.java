package pack;

import java.util.Collection;
import java.util.Date;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import pack.entities.*;

import pack.PlaylistVideo;

@Singleton
@Path("/")
public class PlaylistAPI {

    @PersistenceContext
    EntityManager em;

    @POST
    @Path("/addPlaylist")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Playlist addPlaylist(Playlist json) {
        try {
            // Find author
            User author = em.find(User.class, json.getAuthor().getUsername());
            // Create playlist
            Playlist playlist = new Playlist(json.getIsPrivate(), json.getTitle(), json.getDescription(), author);
            System.out.println("[PERSIST] " + playlist.getClass().getName() + " (id=" + playlist.getId() + ")");
            em.persist(playlist);
            // Return
            return playlist;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @POST
    @Path("/removePlaylist")
    @Consumes({ "application/json" })
    public boolean removePlaylist(Playlist json) {
        try {
            Playlist playlist = em.find(Playlist.class, json.getId());
            System.out.println("[REMOVE] " + playlist.getClass().getName() + " (id=" + playlist.getId() + ")");
            em.remove(playlist);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GET
    @Path("/getPlaylistInfos")
    @Produces({ "application/json" })
    public Playlist getPlaylistInfos(@QueryParam("id") int id) {
        Playlist playlist = em.find(Playlist.class, id);
        return playlist;
    }

    @POST
    @Path("/addVideoToPlaylist")
    @Produces({ "application/json" })
    public boolean addVideoToPlaylist(PlaylistVideo json) {
        try {
            // Find video and playlist
            Video video = em.find(Video.class, json.getVideo().getId());
            Playlist playlist = em.find(Playlist.class, json.getPlaylist().getId());
            if (video == null || playlist == null)
                return false;
            // Add video to playlist
            playlist.addVideo(video);
            System.out.println("[MERGE] " + playlist.getClass().getName() + " (id=" + playlist.getId() + ")");
            em.merge(playlist);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @POST
    @Path("/removeVideoFromPlaylist")
    @Produces({ "application/json" })
    public boolean removeVideoFromPlaylist(PlaylistVideo json) {
        try {
            // Find video and playlist
            Video video = em.find(Video.class, json.getVideo().getId());
            Playlist playlist = em.find(Playlist.class, json.getPlaylist().getId());
            
            if (video == null || playlist == null)
                return false;
            // Remove video from playlist
            Collection<Video> videos = playlist.getVideos();
            videos.remove(video);
            playlist.setVideos(videos);
            System.out.println("[MERGE] " + playlist.getClass().getName() + " (id=" + playlist.getId() + ")");
            em.merge(playlist);
            return true;
        } catch (Exception e) { 
            e.printStackTrace();
            return false;
        }
    }

}
