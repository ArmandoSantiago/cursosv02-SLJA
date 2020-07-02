<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">
    <title>Registrar Persona</title>
</head>

<body>
<g:javascript src="persona.js"/>

<div class="nav" role="navigation">
    <ul>
        <li>
            <a class="home" href="${createLink(uri: '/')}">Principal</a>
        </li>
        <li>
            <g:link class="list" onclick="index()">Consulta de personas</g:link>
        </li>
    </ul>
</div>

<div id="page-body" role="main">
    <g:if test="${flash.mensaje}">
        <div class="message" role="status">
            ${flash.mensaje}
        </div>
    </g:if>
</div>

<div id="titulo">
    <h1 style="margin-left: 5%">Registro de personas</h1>
</div>

<div style="margin-left:10%">
    <g:form onsubmit="guardar(event, 'registrar')">
        <g:render template="form"/>
        <br>
        <g:actionSubmit value="Registrar persona"/>
    </g:form>
</div>

</body>
</html>
