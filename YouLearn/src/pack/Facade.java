package pack;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
 
import pack.entities.Comment;
import pack.entities.Course;
import pack.entities.Playlist;
import pack.entities.Student;
import pack.entities.Teacher;
import pack.entities.User;
import pack.entities.Video;

public class Facade {
        
    @PersistenceContext
    EntityManager em;
    
    public void addStudent(String username, String email, String password, String department) {
        // Create user
        User user = new User(username, email, password, UserRole.Student);
        System.out.println("[DEBUG] adding " + user.getClass().getName() + " (id=" + user.getId() + ")");
        em.persist(user);
        // Create student
        Student student = new Student(user, department);
        System.out.println("[DEBUG] adding " + student.getClass().getName() + " (id=" + student.getId() + ")");
        em.persist(student);
    }

    public void addTeacher(String username, String email, String password, String name) {
        // Create user
        User user = new User(username, email, password, UserRole.Teacher);
        System.out.println("[DEBUG] adding " + user.getClass().getName() + " (id=" + user.getId() + ")");
        em.persist(user);
        // Create teacher
        Teacher teacher = new Teacher(user, name);
        System.out.println("[DEBUG] adding " + teacher.getClass().getName() + " (id=" + teacher.getId() + ")");
        em.persist(teacher);
    }

    public void addVideo(String title, int order, String url, int courseId) {
        Course course = em.find(Course.class, courseId);
        Video video = new Video(title, order, url, course);
        System.out.println("[DEBUG] adding " + course.getClass().getName() + " (id=" + course.getId() + ")");
        em.persist(video);
    }

    public void addCourse(String title, String description, int teacherId) {
        Teacher owner = em.find(Teacher.class, teacherId);
        Course course = new Course(title, description, owner);
        System.out.println("[DEBUG] adding " + course.getClass().getName() + " (id=" + course.getId() + ")");
        em.persist(course);
    }

    public void addPlaylist(boolean isPrivate, String title, String description, int userId) {
        User author = em.find(User.class, userId);
        Playlist playlist = new Playlist(isPrivate, title, description, author);
        System.out.println("[DEBUG] adding " + playlist.getClass().getName() + " (id=" + playlist.getId() + ")");
        em.persist(playlist);
    }   

    public void addComment(String content, Date date, int videoId, int userId) {
        Video video = em.find(Video.class, videoId);
        User author = em.find(User.class, userId);
        Comment comment = new Comment(content, date, video, author);
        System.out.println("[DEBUG] adding " + comment.getClass().getName() + " (id=" + comment.getId() + ")");
        em.persist(comment);
    }
}
