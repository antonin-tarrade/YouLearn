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

import pack.entities.Comment;
import pack.entities.Course;
import pack.entities.Playlist;
import pack.entities.Student;
import pack.entities.Teacher;
import pack.entities.User;
import pack.entities.Video;

@Singleton
@Path("/")
public class VideoAPI {

    @PersistenceContext
    EntityManager em;

    @POST
    @Path("/addVideo")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Video addVideo(Video json) {
        try {
            // Find course
            Course course = em.find(Course.class, json.getCourse().getId());
            // Create video
            Video video = new Video(json.getTitle(), json.getorderInCourse(), json.getUrl(), course);
            System.out.println("[PERSIST] " + video.getClass().getName() + " (id=" + video.getId() + ")");
            em.persist(video);
            // Return
            return video;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @POST
    @Path("/removeVideo")
    @Consumes({ "application/json" })
    public boolean removeVideo(Video json) {
        try {
            Video video = em.find(Video.class, json.getId());
            System.out.println("[REMOVE] " + video.getClass().getName() + " (id=" + video.getId() + ")");
            em.remove(video);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GET
    @Path("/getVideoInfos")
    @Produces({ "application/json" })
    public Video getVideoInfos(@QueryParam("id") int id) {
        Video video = em.find(Video.class, id);
        return video;
    }

    @GET
    @Path("/getVideoLikesAmount")
    @Produces({ "application/json" })
    public int getVideoLikesAmount(@QueryParam("id") int id) {
        Video video = em.find(Video.class, id);
        if (video == null)
            return -1;
        int likes = video.getUserLikes().size();
        return likes;
    }

    @GET
    @Path("/getVideoCommments")
    @Produces({ "application/json" })
    public Collection<Comment> getVideoCommments(@QueryParam("id") int id) {
        Video video = em.find(Video.class, id);
        if (video == null)
            return null;
        Collection<Comment> comments = video.getComments();
        return comments;
    }
}
