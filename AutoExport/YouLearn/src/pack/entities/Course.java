package pack.entities;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Course {
    @Id
    private int id;

    @ManyToOne
    private Teacher owner;
    @ManyToMany(mappedBy = "followedCourses")
    private Collection<User> user;
    @OneToMany(mappedBy = "course")
    private Collection<Video> videos;

    private String title;
    private String description;

    // Getters / setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public Teacher getOwner() { return owner; }
    public void setOwner(Teacher owner) { this.owner = owner; }
    public Collection<User> getUser() { return user; }
    public void setUser(Collection<User> user) { this.user = user; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}