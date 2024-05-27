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
public class CourseAPI {

    @PersistenceContext
    EntityManager em;

    @POST
    @Path("/addCourse")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Course addCourse(Course json) {
        try {
            // Find course owner
            Teacher owner = em.find(Teacher.class, json.getOwner().getId());
            if (owner == null)
                return null;
            // Create course
            Course course = new Course(json.getTitle(), json.getDescription(), owner);
            System.out.println("[PERSIST] " + course.getClass().getName() + " (id=" + course.getId() + ")");
            em.persist(course);
            // Return
            return course;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @POST
    @Path("/removeCourse")
    @Consumes({ "application/json" })
    public boolean removeCourse(Course json) {
        try {
            Course course = em.find(Course.class, json.getId());
            System.out.println("[REMOVE] " + course.getClass().getName() + " (id=" + course.getId() + ")");
            em.remove(course);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GET
    @Path("/getCourses")
    @Produces({ "application/json" })
    public Collection<Course> getCourses(@QueryParam("teacherId") int teacherId){
        Collection<Course> courses = (Collection<Course>) em.createQuery("SELECT c FROM Course c WHERE c.owner.id = :id")
                .setParameter("id", teacherId).getResultList();
        return courses;
    }

    @GET
    @Path("/getCourseInfos")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Course getCourseInfos(@QueryParam("id") int id) {
        Course course = em.find(Course.class, id);
        return course;
    }

    @GET
    @Path("/getCourseVideos")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Collection<Video> getCourseVideos(@QueryParam("id") int id) {
        Course course = em.find(Course.class, id);
        if (course == null)
            return null;
        Collection<Video> videos = course.getVideos();
        return videos;
    }

    @GET
    @Path("/getCourseFollowers")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Collection<User> getCourseFollowers(@QueryParam("id") int id) {
        Course course = em.find(Course.class, id);
        if (course == null)
            return null;
        Collection<User> followers = course.getFollowers();
        return followers;
    }

    @GET
    @Path("/getCourseOwner")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Teacher getCourseOwner(@QueryParam("id") int id) {
        Course course = em.find(Course.class, id);
        if (course == null)
            return null;
        Teacher owner = course.getOwner();
        return owner;
    }
}
