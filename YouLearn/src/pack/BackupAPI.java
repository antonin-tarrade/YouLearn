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

import java.util.HashMap;
import java.util.Map;
import pack.entities.*;

@Singleton
@Path("/")
public class BackupAPI {

    @PersistenceContext
    EntityManager em;

    @GET
    @Path("/backupDatabaseIntoJSON")
    @Produces({ "application/json" })
    public Map<String, Collection<?>> backupDatabaseIntoJSON() {
        try {
            // Get all users
            Collection<User> users = em.createQuery("SELECT u FROM User u").getResultList();
            // Get all students
            Collection<Student> students = em.createQuery("SELECT s FROM Student s").getResultList();
            // Get all teachers
            Collection<Teacher> teachers = em.createQuery("SELECT t FROM Teacher t").getResultList();
            // Get all courses
            Collection<Course> courses = em.createQuery("SELECT c FROM Course c").getResultList();
            // Get all videos
            Collection<Video> videos = em.createQuery("SELECT v FROM Video v").getResultList();
            // Get all playlists
            Collection<Playlist> playlists = em.createQuery("SELECT p FROM Playlist p").getResultList();
            // Get all comments
            Collection<Comment> comments = em.createQuery("SELECT c FROM Comment c").getResultList();
            
            // Create dictionary with User, Student, Teacher, Course, Video, Playlist, Comment as keys and their respective collections as values
            
            Map<String, Collection<?>> database = new HashMap<>();
            database.put("users", users);
            database.put("students", students);
            database.put("teachers", teachers);
            database.put("courses", courses);
            database.put("videos", videos);
            database.put("playlists", playlists);
            database.put("comments", comments);

            return database;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @POST
    @Path("/restoreDatabaseFromJSON")
    @Consumes({ "application/json" })
    public boolean restoreDatabaseFromJSON(Map<String, Collection<?>> database) {
        try {
            // Restore database
            Collection<User> users = (Collection<User>) database.get("users");
            Collection<Student> students = (Collection<Student>) database.get("students");
            Collection<Teacher> teachers = (Collection<Teacher>) database.get("teachers");
            Collection<Course> courses = (Collection<Course>) database.get("courses");
            Collection<Video> videos = (Collection<Video>) database.get("videos");
            Collection<Playlist> playlists = (Collection<Playlist>) database.get("playlists");
            Collection<Comment> comments = (Collection<Comment>) database.get("comments");
            
            for (User user : users) {
                em.persist(user);
            }
            for (Student student : students) {
                em.persist(student);
            }
            for (Teacher teacher : teachers) {
                em.persist(teacher);
            }
            for (Course course : courses) {
                em.persist(course);
            }
            for (Video video : videos) {
                em.persist(video);
            }
            for (Playlist playlist : playlists) {
                em.persist(playlist);
            }
            for (Comment comment : comments) {
                em.persist(comment);
            }
            
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
