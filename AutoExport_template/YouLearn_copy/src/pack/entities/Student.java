package pack.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Student {
    @Id
    private int id;

    @OneToOne
    private User user;

    private String department;

    public Student() {
    }

    public Student(User user, String department) {
        this.user = user;
        this.department = department;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}