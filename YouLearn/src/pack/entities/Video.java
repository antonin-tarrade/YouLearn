package pack.entities;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Video {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Course course;
    @ManyToMany
    private Collection<User> userLikes;
    @OneToMany(mappedBy = "video")
    private Collection<Comment> comments;

    private String title;
    private int orderInCourse;
    private String url;

    public Video() {
    }

    public Video(String title, int order, String url, Course course) {
        this.title = title;
        this.orderInCourse = order;
        this.url = url;
        this.course = course;

        this.userLikes = new ArrayList<User>();
    }

    // Getters / setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Collection<User> getUserLikes() {
        return userLikes;
    }

    public void setUserLikes(Collection<User> userLikes) {
        this.userLikes = userLikes;
    }

    public Collection<Comment> getComments() {
        return comments;
    }

    public void setComments(Collection<Comment> comments) {
        this.comments = comments;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getOrder() {
        return this.orderInCourse;
    }

    public void setOrder(int order) {
        this.orderInCourse = order;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}