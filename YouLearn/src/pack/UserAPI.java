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
public class UserAPI {

    @PersistenceContext
    EntityManager em;

    @POST
    @Path("/loginUser")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public User loginUser(User json) {
        try {
            User user = (User) em
                    .createQuery("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
                    .setParameter("username", json.getUsername()).setParameter("password", json.getPassword()).getSingleResult();
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    @POST
    @Path("/signUpStudent")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Student signUpStudent(Student json) {
        // Check if user already exists
        if (doesUserExist(json.getUser().getUsername())) {
            return null;
        }
        // Create student
        return addStudent(json.getUser().getUsername(), json.getUser().getEmail(), json.getUser().getPassword(), json.getDepartment());
    }

    @POST
    @Path("/signUpTeacher")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Teacher signUpTeacher(Teacher json) {
        // Check if user already exists
        if (doesUserExist(json.getUser().getUsername())) {
            return null;
        }
        // Create teacher
        return addTeacher(json.getUser().getUsername(), json.getUser().getEmail(), json.getUser().getPassword(), json.getName());
    }

    @GET
    @Path("/getUserInfos")
    @Produces({ "application/json" })
    public User getUserInfos(@QueryParam("username") String username) {
        User user = em.find(User.class, username);
        return user;
    }

    @GET
    @Path("/getStudentInfos")
    @Produces({ "application/json" })
    public Student getStudentInfos(@QueryParam("username") String username) {
        Student student = (Student) em.createQuery("SELECT s FROM Student s WHERE s.user = :username")
                .setParameter("username", username).getSingleResult();
        return student;
    }

    @GET
    @Path("/getTeacherInfos")
    @Produces({ "application/json" })
    public Teacher getTeacherInfos(@QueryParam("username") String username) {
        Teacher teacher = (Teacher) em.createQuery("SELECT t FROM Teacher t WHERE t.user = :username")
                .setParameter("username", username).getSingleResult();
        return teacher;
    }

    @GET
    @Path("/getUserLikedVideos")
    @Produces({ "application/json" })
    public Collection<Video> getUserLikedVideos(@QueryParam("username") int username) {
        User user = em.find(User.class, username);
        if (user == null)
            return null;
        Collection<Video> videos = user.getLikedVideos();
        return videos;
    }

    @GET
    @Path("/getUserPlaylists")
    @Produces({ "application/json" })
    public Collection<Playlist> getUserPlaylists(@QueryParam("username") int username) {
        User user = em.find(User.class, username);
        if (user == null)
            return null;
        Collection<Playlist> playlists = user.getPlaylists();
        return playlists;
    }

    @GET
    @Path("/doesUserExist")
    @Produces({ "application/json" })
    public boolean doesUserExist(@QueryParam("username") String username) {
        User user = em.find(User.class, username);
        return user != null;
    }

    private Student addStudent(String username, String email, String password, String department) {
        try {
            // Create user
            User user = new User(username, email, password, UserRole.Student);
            System.out.println("[PERSIST] " + user.getClass().getName() + " (username=" + user.getUsername() + ")");
            em.persist(user);
            // Create student
            Student student = new Student(user, department);
            System.out.println("[PERSIST] " + student.getClass().getName() + " (id=" + student.getId() + ")");
            em.persist(student);
            // Return
            return student;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Teacher addTeacher(String username, String email, String password, String name) {
        try {
            // Create user
            User user = new User(username, email, password, UserRole.Teacher);
            System.out.println("[PERSIST] " + user.getClass().getName() + " (username=" + user.getUsername() + ")");
            em.persist(user);
            // Create teacher
            Teacher teacher = new Teacher(user, name);
            System.out.println("[PERSIST] " + teacher.getClass().getName() + " (id=" + teacher.getId() + ")");
            em.persist(teacher);
            // Return
            return teacher;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
