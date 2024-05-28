package pack.entities;

import java.util.Collection;
import java.util.List;import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Course {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Teacher owner;
    @ManyToMany(mappedBy = "followedCourses")
    private Collection<User> followers;
    @OneToMany(mappedBy = "course")
    private Collection<Video> videos;

    private String title;
    private String description;

    public Course() {
    }

    public Course(String title, String description, Teacher owner) {
        this.title = title;
        this.description = description;
        this.owner = owner;
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