package pack.entities;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Teacher {
    @Id
    private int id;

    @OneToOne
    private User user;
    @OneToMany(mappedBy = "owner")
    private Collection<Course> courses;

    private String name;

    // Getters / setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Collection<Course> getCourses() { return courses; }
    public void setCourses(Collection<Course> courses) { this.courses = courses; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}