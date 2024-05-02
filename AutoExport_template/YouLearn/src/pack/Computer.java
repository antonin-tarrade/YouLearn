package pack;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Computer {
    @Id
    private int id;

    @OneToMany
    private Collection<Course> followedCourses;

    private String username;
    private String email;
    private String password;
    private UserRole role;

    // Getters / setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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