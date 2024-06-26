package pack.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List; 
import java.util.HashSet;
import java.util.Set;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany; 
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import pack.UserRole;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
 

@Entity 

public class User {
    @Id
    private String username;

    
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"followers"})
    private Collection<Course> followedCourses;

    @ManyToMany(mappedBy = "userLikes",fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"userLikes","course"})
    private Collection<Video> likedVideos;

    @OneToMany(mappedBy = "author",fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"author","video"})
    private Collection<Comment> comments;

    @OneToMany(mappedBy = "author",fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"author"})
    private Collection<Playlist> playlists;

    private String email;
    private String password;
    private UserRole role;

    public User() {
    }

    public User(String username, String email, String password, UserRole role) {
        this.username = username;
        this.email = email;
        this.password = password; 
        this.role = role;

        this.followedCourses = new ArrayList<Course>();
        this.likedVideos = new ArrayList<Video>();
        this.comments = new ArrayList<Comment>();
        this.playlists = new ArrayList<Playlist>();
    }


    public Collection<Course> getFollowedCourses() {
        return followedCourses;
    }

    public void setFollowedCourses(Collection<Course> followedCourses) {
        this.followedCourses = followedCourses;
    }

    public void addFollowedCourse(Course course) {
        this.followedCourses.add(course);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Collection<Video> getLikedVideos() {
        return likedVideos;
    }

    public void setLikedVideos(Collection<Video> likedVideos) {
        this.likedVideos = likedVideos;
    }

    public Collection<Comment> getComments() {
        return comments;
    }

    public void setComments(Collection<Comment> comments) {
        this.comments = comments;
    }

    public Collection<Playlist> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(Collection<Playlist> playlists) {
        this.playlists = playlists;
    }
}