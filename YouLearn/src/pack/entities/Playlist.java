package pack.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Playlist {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnoreProperties({"playlists","followedCourses","likedVideos","comments"})
    private User author;

    private boolean isPrivate;
    private String title;
    private String description;

    //Liste des vidéos de la playlist
    @ManyToMany(fetch = FetchType.EAGER)
    // @JsonManagedReference pas besoin car pas de variable de type Playlist dans Video
    @JsonIgnoreProperties({"playlists"})
    private Collection<Video> videos;

    public Playlist() {
    }

    public Playlist(boolean isPrivate, String title, String description, User author) {
        this.isPrivate = isPrivate;
        this.title = title;
        this.description = description;
        this.author = author;

        this.videos = new ArrayList<Video>();

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

    public boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(boolean isPrivate) {
        this.isPrivate = isPrivate;
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

    public Collection<Video> getVideos() {
        return videos;
    }

    public void setVideos(Collection<Video> videos) {
        this.videos = videos;
    }

    public void addVideo(Video video) {
        this.videos.add(video);
    }

    public void removeVideo(Video video) {
        this.videos.remove(video);
    }
} 