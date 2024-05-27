package pack.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;
@Entity
public class Video {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Course course;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<User> userLikes;
    @OneToMany(mappedBy = "video")
    private Collection<Comment> comments;

    private String title;
    private int order;
    private String url;

    public Video() {
    }

    public Video(String title, int order, String url, Course course) {
        this.title = title;
        this.order = order;
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
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}