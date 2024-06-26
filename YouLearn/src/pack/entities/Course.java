package pack.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnoreProperties({"courses"})
    private Teacher owner;

    @ManyToMany(mappedBy = "followedCourses",fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"followedCourses","likedVideos","comments","playlists"})
    private Collection<User> followers;
    @OneToMany(mappedBy = "course",fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"comments"})
    private Collection<Video> videos;

    private String title;
    private String description;

    public Course() {
    }

    public Course(String title, String description, Teacher owner) {
        this.title = title;
        this.description = description;
        this.owner = owner;

        this.followers = new ArrayList<User>();
        this.videos = new ArrayList<Video>();

    }

    // Getters / setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Teacher getOwner() {
        return owner;
    }

    public void setOwner(Teacher owner) {
        this.owner = owner;
    }

    public Collection<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Collection<User> followers) {
        this.followers = followers;
    }

    public Collection<Video> getVideos() {
        return videos;
    }

    public void setVideos(Collection<Video> videos) {
        this.videos = videos;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}