<?php include('header.php'); ?>

	<div id="content" data-app="manage">
		<div class="row">
			<h4>People</h4>
		</div>
	
		<div class="row">
			<div class="people-container">
				Loading...
			</div>
		</div>
	
		<form class="person-creation">
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">First Name:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" placeholder="eg. Mitchell" class="eight first-name">
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Last Name:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" class="eight last-name">
	      </div>
	    </div>
			<div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Title:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" class="eight title">
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Gravatar Email:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" class="eight gravatar">
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">User ID:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" class="eight id">
	      </div>
	    </div>
			<div class="actions row">
				<a class="success radius button create">Create Person</a>
				<a class="radius button cancel">Cancel</a>
			</div>
	  </form>
		
		<div class="row">
			<h4>Projects</h4>
		</div>
		
		
		<div class="row">
			<div class="projects-container">
				Loading...
			</div>
		</div>
	
		<form class="project-creation">
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Project Name:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" class="eight project-name">
	      </div>
	    </div>
			<div class="actions row">
				<a class="success radius button create">Create Project</a>
				<a class="radius button cancel">Cancel</a>
			</div>
	  </form>
	
		<div class="row">
			<h4>Tasks</h4>
		</div>
	
		<div class="row">
			<div class="tasks-container">
				Loading...
			</div>
		</div>
	
		<form class="task-creation">
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Project:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <select class="eight project chzn-select"></select>
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Delegates:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <select class="eight delegates chzn-select" multiple></select>
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Task Name:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" placeholder="Describe the Task" class="eight name">
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Time Estimate:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" class="eight time">
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Priority:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <input type="text" class="eight priority">
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Status:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <select class="eight status chzn-select"></select>
	      </div>
	    </div>
	    <div class="row">
	      <div class="two mobile-one columns">
	        <label class="right inline">Notes:</label>
	      </div>
	      <div class="ten mobile-three columns">
	        <textarea type="text" class="eight notes"></textarea>
	      </div>
	    </div>
			<div class="actions row">
				<a class="success radius button create">Create Task</a>
				<a class="radius button cancel">Cancel</a>
			</div>
	  </form>
	</div>

<?php include('footer.php'); ?>