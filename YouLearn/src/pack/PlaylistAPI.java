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
            Playlist playlist = new Playlist(json.isPrivate(), json.getTitle(), json.getDescription(), author);
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
}
