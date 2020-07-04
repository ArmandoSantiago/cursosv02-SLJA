<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">
    <title>Registrar participación</title>
</head>

<body>
<g:javascript src="participacion.js"/>

<div class="nav" role="navigation">
    <ul>
        <li>
            <a class="home" href="${createLink(uri: '/')}">Principal</a>
        </li>
        <li>
            <g:link class="list" onclick="index()">Consultar participaciones</g:link>
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
    <h1 style="margin-left: 5%">Registro de participaciones</h1>
</div>

<div style="margin-left:10%">
    <g:form onsubmit="guardarParticipacion(event, 'registrar')">
        <g:render template="form"/>
        <br>
        <g:actionSubmit value="Registrar participación"/>
    </g:form>
</div>

<g:javascript> cargarListas() </g:javascript>
</body>
</html>
