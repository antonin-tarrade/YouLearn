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
public class CommentAPI {

    @PersistenceContext
    EntityManager em;
 
    @POST
    @Path("/addComment")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Comment addComment(Comment json) {
        try {
            // Find video and comment author
            Video video = em.find(Video.class, json.getVideo().getId());
            User author = em.find(User.class, json.getAuthor().getUsername());
            if (video == null || author == null)
                return null;
            // Create comment
            Comment comment = new Comment(json.getContent(), new Date(), video, author);
            System.out.println("[PERSIST] " + comment.getClass().getName() + " (id=" + comment.getId() + ")");
            em.persist(comment);
            // Return
            return comment;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @POST
    @Path("/removeComment")
    @Consumes({ "application/json" })
    public boolean removeComment(Comment json) {
        try {
            Comment comment = em.find(Comment.class, json.getId());
            System.out.println("[REMOVE] " + comment.getClass().getName() + " (id=" + comment.getId() + ")");
            em.remove(comment);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GET
    @Path("/getCommentInfos")
    @Produces({ "application/json" })
    public Comment getCommentInfos(@QueryParam("id") int id) {
        Comment comment = em.find(Comment.class, id);
        return comment;
    }
}
