package pack;

public class Adresse {
	public String rue;
	public String ville;
	public static int id = 0;
	public int adresseId;

	public Adresse(String rue, String ville) {
		this.rue = rue;
		this.ville = ville;
		id = id + 1;
		this.adresseId = id;
	}

	public String toString() {
		return rue + " " + ville;
	}
}