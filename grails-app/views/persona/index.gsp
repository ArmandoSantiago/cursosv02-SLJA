<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">
    <title>Consulta de Personas</title>
</head>

<body>
<g:javascript src="persona.js"/>

<div class="nav" role="navigation">
    <ul>
        <li>
            <a class="home" href="${createLink(uri: '/')}">Principal</a>
        </li>
        <li>
            <g:link class="create" action="registrar">Registrar</g:link>
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
    <h1 style="margin-left: 5%">Consulta de personas</h1>
</div>

<table>
    <thead>
    <th>#</th>
    <th>Nombre completo</th>
    <th>Edad</th>
    <th>Correo</th>
    <th>Teléfono</th>
    <th></th>
    <th></th>
    </thead>
    <tbody id="personas">

    </tbody>
</table>

<g:javascript>listar()</g:javascript>

</body>
</html>
