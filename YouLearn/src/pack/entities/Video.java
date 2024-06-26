package pack.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany; 
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Video {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnoreProperties({"videos"})
    private Course course;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"likedVideos"})
    private Collection<User> userLikes;

    @OneToMany(mappedBy = "video",fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"video"})
    private Collection<Comment> comments;

    private String title;
    private String description;
    private int orderInCourse;
    private String url;

    public Video() {
    }

    public Video(String title, String description, int orderInCourse, String url, Course course) {
        this.title = title;
        this.orderInCourse = orderInCourse;
        this.url = url;
        this.course = course;
        this.description = description;

        this.userLikes = new HashSet<User>();
    
        
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

    public void addUserLikes (User user) {
        this.userLikes.add(user);
    }

    public void removeUserLikes (User user) {
        this.userLikes.remove(user);
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

    public int getorderInCourse () {
        return orderInCourse;
    }

    public void setorderInCourse(int orderInCourse) {
        this.orderInCourse = orderInCourse;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}