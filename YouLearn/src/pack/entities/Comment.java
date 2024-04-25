package pack.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Comment {
    @Id
    private int id;

    @ManyToOne
    private User author;
    @ManyToOne
    private Video video;

    private String content;
    private Date date;

    // Getters / setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
}