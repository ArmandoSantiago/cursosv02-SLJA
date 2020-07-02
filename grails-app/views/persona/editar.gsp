<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">
    <title>Editar información de persona</title>
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
    <h1 style="margin-left: 5%">Actualizar información de personas</h1>
</div>

<div style="margin-left:10%">
    <g:form onsubmit="guardar(event, 'editar')">
        <g:render template="form"/>
        <br>
        <g:actionSubmit value="Actualizar datos"/>
    </g:form>
</div>

<g:javascript> cargarPersona() </g:javascript>

</body>
</html>
