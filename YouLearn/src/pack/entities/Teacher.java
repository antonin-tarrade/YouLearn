package pack.entities;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Teacher {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @OneToOne
    //@JsonManagedReference pas besoin car pas de variable de type Teacher dans User
    private User user;

    @OneToMany(mappedBy = "owner",fetch = FetchType.EAGER)
    @JsonManagedReference(value = "owner-course")
    private Collection<Course> courses;

    private String name;

    public Teacher() {
    }

    public Teacher(User user, String name) {
        this.user = user;
        this.name = name;
    }

    // Getters / setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collection<Course> getCourses() {
        return courses;
    }

    public void setCourses(Collection<Course> courses) {
        this.courses = courses;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}