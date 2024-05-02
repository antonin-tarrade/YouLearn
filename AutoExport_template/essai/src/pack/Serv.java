package pack;

import java.io.IOException;
import java.util.ArrayList;

import javax.ejb.EJB;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Serv
 */
@WebServlet("/Serv")
public class Serv extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@EJB
	Facade facade;

	/**
	 * Default constructor.
	 */
	public Serv() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		String op = request.getParameter("op");

		switch (op) {
			case "associer":
				// Get all persons
				ArrayList<Personne> personnes = facade.getPersonnes();
				ArrayList<Adresse> adresses = facade.getAdresses();
				request.setAttribute("personnes", personnes);
				request.setAttribute("adresses", adresses);

				RequestDispatcher rd = request.getRequestDispatcher("associer.jsp");
				rd.forward(request, response);

				break;

			case "lister":

				RequestDispatcher rd2 = request.getRequestDispatcher("lister.jsp");
				rd2.forward(request, response);
				break;

		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// test type
		String type = request.getParameter("type");

		switch (type) {
			case "ajoutPersonne":
				String nom = request.getParameter("nom");
				String prenom = request.getParameter("prenom");
				facade.ajoutPersonne(nom, prenom);
				break;
			case "ajoutAdresse":
				String rue = request.getParameter("rue");
				String ville = request.getParameter("ville");
				facade.ajoutAdresse(rue, ville);
				break;
		}
	}

}
