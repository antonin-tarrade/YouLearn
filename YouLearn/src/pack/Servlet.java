package pack;

import javax.ejb.EJB;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import pack.entities.User;

/**
 * Servlet implementation class Servlet
 */
@WebServlet("/Servlet")
public class Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@EJB
	Facade facade;

	/**
	 * Default constructor.
	 */
	public Servlet() {
		// TODO Auto-generated constructor stub

	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String message2 = "YouLearn c'est trop cool";
		response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.getWriter().write(message2);

		String op = request.getParameter("op");

		System.out.println("=== REQUEST : " + op);

		facade.signUpStudent("Dupont", "jen@sais.rien", "password", "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEA");
		// Test login 
		User user = facade.login("Dupont", "password");
		if (user != null) {
			System.out.println("User found: " + user.getUsername());
		} else {
			System.out.println("User not found");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}