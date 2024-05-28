package pack.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonBackReference;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Comment {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnoreProperties({"comments","followedCourses","likedVideos","playlists"})
    private User author;
    @ManyToOne
    @JsonIgnoreProperties({"comments"})
    private Video video;

    private String content;
    private Date date;

    public Comment() {
    }

    public Comment(String content, Date date, Video video, User author) {
        this.content = content;
        this.date = date;
        this.video = video;
        this.author = author;

    }

    // Getters / setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }
}