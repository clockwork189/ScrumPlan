<!DOCTYPE html>

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->

<head>
	<meta charset="utf-8" />

	<!-- Set the viewport width to device width for mobile -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<title>ScrumPlan</title>

	<!-- Included CSS Files -->
	<link rel="stylesheet" href="stylesheets/app.css">

	<script src="javascripts/foundation/modernizr.foundation.js"></script>

</head>
<body>

	<!-- Basic Navigation -->
	<nav class="top-bar">
	  <ul>
	    <li class="name"><h1><a href="http://localhost:8888/ScrumPlan/">ScrumPlan</a></h1></li>
	  </ul>
	  <section>
	    <ul class="right">
	      <li><a href="http://localhost:8888/ScrumPlan/manage.php">Manage</a></li>
				<li><a href="http://localhost:8888/ScrumPlan/board.php">Board</a></li>
				<li><a href="http://localhost:8888/ScrumPlan/list.php">List</a></li>
				<li><a href="http://localhost:8888/ScrumPlan/stats.php">Stats</a></li>
	    </ul>
	  </section>
	</nav>
	
	<div id="loading">
		Loading...
	</div>