package pack;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@WebServlet("/api/")
public class DataServlet extends HttpServlet {

    @EJB
	Facade facade;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        String pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing API endpoint");
            return;
        }

        Map<String, String[]> args = request.getParameterMap();

        switch (pathInfo) {
            case "/signUpStudent":
                facade.signUpStudent(args.get("pseudo"), args.get("email"), args.get("password"), args.get("department"));
                break;
            case "/signUpTeacher":
                facade.signUpTeacher(args.get("pseudo"), args.get("email"), args.get("password"), args.get("name"));
                break;
        }

        PrintWriter out = response.getWriter();
        out.print("{\"message\": \"Hello from JBoss!\"}");
        out.flush();
    }

    /*
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Handle POST request
    }
    */
}