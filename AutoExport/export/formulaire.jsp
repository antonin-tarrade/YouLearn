<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<form name="calculatrice" method="post" action="Serv">
    <input type="text" name="a" value="0" />
    <input type="text" name="b" value="0" />
    <input type="submit" value="=" />
</form>

<p>
    <% if (request.getAttribute("resultat") != null) { 
    out.println(request.getAttribute("resultat"));
} >%

</p>

</body>
</html>