package pack;

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
public class Facade {

    @PersistenceContext
    EntityManager em;

    public Student addStudent(String username, String email, String password, String department) {
        // Create user
        User user = new User(username, email, password, UserRole.Student);
        System.out.println("[DEBUG] adding " + user.getClass().getName() + " (username=" + user.getUsername() + ")");
        em.persist(user);
        // Create student
        Student student = new Student(user, department);
        System.out.println("[DEBUG] adding " + student.getClass().getName() + " (id=" + student.getId() + ")");
        em.persist(student);
        return student;
    }

    public Teacher addTeacher(String username, String email, String password, String name) {
        // Create user
        User user = new User(username, email, password, UserRole.Teacher);
        System.out.println("[DEBUG] adding " + user.getClass().getName() + " (username=" + user.getUsername() + ")");
        em.persist(user);
        // Create teacher
        Teacher teacher = new Teacher(user, name);
        System.out.println("[DEBUG] adding " + teacher.getClass().getName() + " (id=" + teacher.getId() + ")");
        em.persist(teacher);
        return teacher;
    }

    public Video addVideo(String title, int order, String url, int courseId) {
        Course course = em.find(Course.class, courseId);
        Video video = new Video(title, order, url, course);
        System.out.println("[DEBUG] adding " + course.getClass().getName() + " (id=" + course.getId() + ")");
        em.persist(video);
        return video;
    }

    public Course addCourse(String title, String description, int teacherId) {
        Teacher owner = em.find(Teacher.class, teacherId);
        Course course = new Course(title, description, owner);
        System.out.println("[DEBUG] adding " + course.getClass().getName() + " (id=" + course.getId() + ")");
        em.persist(course);
        return course;
    }

    public Playlist addPlaylist(boolean isPrivate, String title, String description, int userId) {
        User author = em.find(User.class, userId);
        Playlist playlist = new Playlist(isPrivate, title, description, author);
        System.out.println("[DEBUG] adding " + playlist.getClass().getName() + " (id=" + playlist.getId() + ")");
        em.persist(playlist);
        return playlist;
    }

    public Comment addComment(String content, Date date, int videoId, int userId) {
        Video video = em.find(Video.class, videoId);
        User author = em.find(User.class, userId);
        Comment comment = new Comment(content, date, video, author);
        System.out.println("[DEBUG] adding " + comment.getClass().getName() + " (id=" + comment.getId() + ")");
        em.persist(comment);
        return comment;
    }

    // Login Logic
    @POST
    @Path("/login")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public User login(String email, String password) {
        try {
            User user = (User) em
                    .createQuery("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
                    .setParameter("email", email).setParameter("password", password).getSingleResult();
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    @GET
    @Path("/doesUserExist")
    @Produces({ "application/json" })
    public boolean doesUserExist(@QueryParam("email") String email) {
        User user = em.find(User.class, email);
        return user != null;
    }

    @POST
    @Path("/signUpStudent")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Student signUpStudent(Student student) {
        // Check if user already exists
        if (doesUserExist(student.getUser().getUsername())) {
            return null;
        }
        // Create student
        User user = student.getUser();
        return addStudent(user.getUsername(), user.getEmail(), user.getPassword(), student.getDepartment());
    }

    @POST
    @Path("/signUpTeacher")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Teacher signUpTeacher(Teacher teacher) {
        // Check if user already exists
        if (doesUserExist(teacher.getUser().getUsername())) {
            return null;
        }
        // Create teacher
        User user = teacher.getUser();
        return addTeacher(user.getUsername(), user.getEmail(), user.getPassword(), teacher.getName());
    }

    // Playlist Logic

    @POST
    @Path("/addPlaylist")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Playlist addPlaylist(Playlist playlist) {
        return addPlaylist(playlist.isPrivate(), playlist.getTitle(), playlist.getDescription(), playlist.getAuthor().getId());
    }

    @GET
    @Path("/getPlaylist")
    @Produces({ "application/json" })
    public Playlist getPlaylist(@QueryParam("id") int id) {
        return em.find(Playlist.class, id);
    }

    @POST
    @Path("/addVideoToPlaylist")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Playlist addVideoToPlaylist(@QueryParam("playlistId") int playlistId, @QueryParam("videoId") int videoId) {
        Playlist playlist = em.find(Playlist.class, playlistId);
        Video video = em.find(Video.class, videoId);
        playlist.addVideo(video);
        return playlist;
    }

    @POST
    @Path("/removeVideoFromPlaylist")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Playlist removeVideoFromPlaylist(@QueryParam("playlistId") int playlistId, @QueryParam("videoId") int videoId) {
        Playlist playlist = em.find(Playlist.class, playlistId);
        Video video = em.find(Video.class, videoId);
        playlist.removeVideo(video);
        return playlist;
    }
}
