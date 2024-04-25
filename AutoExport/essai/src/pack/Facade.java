package pack;
import java.util.ArrayList;

import javax.ejb.Singleton;

@Singleton

public class Facade {

	ArrayList<Personne> personnes = new ArrayList<Personne>();
	ArrayList<Adresse> adresses = new ArrayList<Adresse>();

	public void ajoutPersonne(String nom, String prenom) {
		System.out.println("ajoutPersonne");
		Personne personne = new Personne(nom, prenom);
		personnes.add(personne);
		for (Personne p : personnes) {
			System.out.println(p);
		}
	}

	public void ajoutAdresse(String rue, String ville) {
		System.out.println("ajoutAdresse");
		Adresse adresse = new Adresse(rue, ville);
		adresses.add(adresse);
		for (Adresse a : adresses) {
			System.out.println(a);
		}
	}

	public void ajoutAdressePersonne(String nom, String prenom, String rue, String ville) {

		Personne personne = null;
		Adresse adresse = null;
		for (Personne p : personnes) {
			if (p.getNom().equals(nom) && p.getPrenom().equals(prenom)) {
				personne = p;
			}
		}
		for (Adresse a : adresses) {
			if (a.rue.equals(rue) && a.ville.equals(ville)) {
				adresse = a;
			}
		}
		if (personne != null && adresse != null) {
			personne.addAdresse(adresse);
		}
	}

	public ArrayList<Adresse> getAdressesPersonne(String nom, String prenom) {
		Personne personne = null;
		for (Personne p : personnes) {
			if (p.getNom().equals(nom) && p.getPrenom().equals(prenom)) {
				personne = p;
			}
		}
		if (personne != null) {
			return personne.getAdresses();
		}
		return null;
	}

	public ArrayList<Personne> getPersonnes() {
		return personnes;
	}

	public ArrayList<Adresse> getAdresses() {
		return adresses;
	}
}
