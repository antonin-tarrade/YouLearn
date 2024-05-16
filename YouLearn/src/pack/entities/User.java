package pack.entities;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import pack.UserRole;

@Entity
public class User {
    @Id 
    private String username;


    @ManyToMany
    private Collection<Course> followedCourses;
    @ManyToMany(mappedBy = "userLikes")
    private Collection<Video> likedVideos;
    @OneToMany(mappedBy = "author")
    private Collection<Comment> comments;
    @OneToMany(mappedBy = "author")
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
    }

 
    public Collection<Course> getFollowedCourses() {
        return followedCourses;
    }

    public void setFollowedCourses(Collection<Course> followedCourses) {
        this.followedCourses = followedCourses;
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
}