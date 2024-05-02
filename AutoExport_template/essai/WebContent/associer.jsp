<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*, pack.*" %>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Insert title here</title>

        <select name="personne" id="personne">
            <option value="0">Choisir une personne</option>
            <% Collection<Personne> personnes = (Collection<Personne>) request.getAttribute("personnes");
                    /* Afficher les noms en selection */
                    for(Personne person : personnes) { %>
                    <option value="<%=person.toString() %>">
                        <%=" "+person.toString()+" " %></option>
        <% } %>
        </select>
        <select name=" adresse" id="adresse">
                    <option value="0">Choisir une adresse</option>
                    <% Collection<Adresse> adresses = (Collection<Adresse>) request.getAttribute("adresses");
                            /* Afficher les adresses en selection */
                            for(Adresse adresse : adresses) { %>
                            <option value="<%=adresse.toString() %>">
                                <%=adresse.toString() %>
                            </option>
                            <% } %>
    </head>

    <body>

    </body>

    </html>