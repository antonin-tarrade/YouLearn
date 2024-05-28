package pack;

import pack.entities.Course;
import pack.entities.User;

public class UserCourse {
    private User user;
    private Course course;

    public UserCourse() {
    }

    public UserCourse(User user, Course course) {
        this.user = user;
        this.course = course;
    }

    public User getUser() {
        return user;
    }

    public Course getCourse() {
        return course;
    }
}