<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">
    <title>Editar información de curso</title>
</head>

<body>
<g:javascript src="curso.js"/>

<div class="nav" role="navigation">
    <ul>
        <li>
            <a class="home" href="${createLink(uri: '/')}">Principal</a>
        </li>
        <li>
            <g:link class="list" onclick="indexCursos()">Consultar de cursos</g:link>
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
    <h1 style="margin-left: 5%">Editar información de cursos</h1>
</div>

<div style="margin-left:10%">
    <g:form onsubmit="guardarCurso(event, 'editar')">
        <g:render template="form"/>
        <button class="btn-warning" type="submit">Editar datos</button>
    </g:form>
</div>

<g:javascript> cargarCurso() </g:javascript>

</body>
</html>
