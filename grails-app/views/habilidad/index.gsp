<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">
    <title>Consulta de Habilidades</title>
</head>

<body>
<g:javascript src="habilidad.js"/>

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
    <h1 style="margin-left: 5%">Consulta de habilidades</h1>
</div>

<table>
    <thead>
    <th>#</th>
    <th>Nombre</th>
    <th>Persona</th>
    <th colspan="2" style="text-align: center">Acción</th>
    </thead>
    <tbody id="habilidades">

    </tbody>
</table>

<g:javascript>listarHablidad()</g:javascript>

</body>
</html>
