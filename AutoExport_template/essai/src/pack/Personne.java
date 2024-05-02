package pack;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Personne {
	public String nom;
	public String prenom;
	public ArrayList<Adresse> adresses = new ArrayList<Adresse>();
	public static int id = 1000;
	public int personneId;

	public Personne(String nom, String prenom) {
		this.nom = nom;
		this.prenom = prenom;
		id = id + 1;
		this.personneId = id;
	}

	public void addAdresse(Adresse adresse) {
		adresses.add(adresse);
	}

	public ArrayList<Adresse> getAdresses() {
		return adresses;
	}

	public String getNom() {
		return nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String toString() {
		return nom + " " + prenom;
	}

}