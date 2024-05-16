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
    
    public User addStudent(String username, String email, String password, String department) {
        // Create user
        User user = new User(username, email, password, UserRole.Student);
        System.out.println("[DEBUG] adding " + user.getClass().getName() + " (username=" + user.getUsername() + ")");
        em.persist(user);
        // Create student
        Student student = new Student(user, department);
        System.out.println("[DEBUG] adding " + student.getClass().getName() + " (id=" + student.getId() + ")");
        em.persist(student);
        return user;
    }

    public User addTeacher(String username, String email, String password, String name) {
        // Create user
        User user = new User(username, email, password, UserRole.Teacher);
        System.out.println("[DEBUG] adding " + user.getClass().getName() + " (username=" + user.getUsername() + ")");
        em.persist(user);
        // Create teacher
        Teacher teacher = new Teacher(user, name);
        System.out.println("[DEBUG] adding " + teacher.getClass().getName() + " (id=" + teacher.getId() + ")");
        em.persist(teacher);
        return user;
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

    public User login(String pseudo, String password) {
        try {
            User user = (User) em.createQuery("SELECT u FROM User u WHERE u.username = :pseudo AND u.password = :password")
                    .setParameter("pseudo", pseudo).setParameter("password", password).getSingleResult();
            return user;
        } catch (Exception e) {
            return null;
        }

    }

    public boolean doesUserExist(String pseudo) {
        User user = em.find(User.class, pseudo);
        return user != null;
    }


    @GET
	@Path("/signUpStudent")
    @Produces({"application/json"})
    public User signUpStudent(Student student) {
        // Check if user already exists
        if (doesUserExist(student.getUser().getUsername())) {
            return null;
        }
        // Create student
        return addStudent(student.getUser().getUsername(), student.getUser().getEmail(), student.getUser().getPassword(), student.getDepartment());
    }

    @GET
	@Path("/signUpTeacher")
    @Produces({"application/json"})
    public User signUpTeacher(String pseudo, String email, String password, String name) {
        // Check if user already exists
        if (doesUserExist(pseudo)) {
            return null;
        }
        // Create teacher
        return addTeacher(pseudo, email, password, name);
    }

}
