var ScrumForm = function (scrumData) {
	var self = {},
			scrumData = scrumData || {};
		
	self.clearForm = function (form) { form.find('input, textarea').val(''); };
	
	self.buildTaskForm = function (form) {
		var task = {};
		
		task["name"] = form.find('.name').val();
		task["time"] = form.find('.time').val();
		task["priority"] = form.find('.priority').val();
		task["notes"] = form.find('.notes').val();
		task["status"] = form.find('.status').val();
		task["delegates"] = form.find('.delegates').chosen().val();
		task["project"] = form.find('.project').val();
		
		return task;
	}
	
	self.buildProjectForm = function (form) {
		var project = {};
		project["name"] = form.find('.project-name').val();
		return project;
	}
	
	self.buildPersonForm = function (form) {
		var person = {};
		person["first-name"] = form.find('.first-name').val();
		person["last-name"] = form.find('.last-name').val();
		person["gravatar"] = form.find('.gravatar').val();
		person["title"] = form.find('.title').val();
		person["id"] = form.find('.id').val();
		return person;
	}
	
	self.drawPeopleOptions = function (container, data) {
		var people = data.people || scrumData.people;
		
		if (people) {
			container.empty();
			for (var person in people) {
				$('<option />')
					.text(people[person]['first-name'] + " " + people[person]['last-name'])
					.attr('value', person)
					.appendTo(container);
			}
		}
	
		container.trigger("liszt:updated");
	}
	
	self.drawProjectsOptions = function (container, data) {
		var projects = data.projects || scrumData.projects;
		
		if (projects) {
			container.empty();
			for (var project in projects) {
				$('<option />')
					.text(projects[project]['name'])
					.attr('value', project)
					.appendTo(container);
			}
		}
	
		container.trigger("liszt:updated");
	}
	
	self.editPerson = function (person, form) {
		form.find('.first-name').val(person["first-name"]);
		form.find('.last-name').val(person["last-name"]);
		form.find('.gravatar').val(person["gravatar"]);
		form.find('.title').val(person["title"]);
		form.find('.id').val(person["id"]);
	}
  
	self.drawPeopleList = function (container, data) {
		var people = data.people || scrumData.people,
				selectedPerson = '';
		container.empty();
		
		function resetPersonForm (form) {
			$('.person', container).removeClass('selected');
			form
				.find('.create')
				.text('Create Person')
				.unbind('click')
				.bind('click', function(){
					var person = self.buildPersonForm(form);
					scrumData.addPerson(person);
					self.clearForm(form);
				});
			self.clearForm(form);
		}
	
		if (people) {
			for (var person in people) {
				var personDiv = $('<div />')
					.addClass('task-box secondary person')
					.text(people[person]['first-name'] + " " + people[person]['last-name'])
					.data('person', person)
					.unbind('click')
					.bind('click', function(){
						var personForm = $('.person-creation');
						$('.person', container).removeClass('selected');
						$(this).addClass('selected');
						var person = $(this).data('person');
						selectedPerson = person;
						self.editPerson(people[person], personForm);
						personForm
							.find('.create')
							.text('Save Changes')
							.unbind('click')
							.bind('click', function() {
								var data = self.buildPersonForm(personForm);
								scrumData.setPerson(selectedPerson, data);
								resetPersonForm(personForm);
							});
						$('.cancel', personForm)
							.unbind('click')
							.bind('click', function(){
								resetPersonForm(personForm);
							});
					});
			
				$('<a />')
					.addClass('close')
					.text('x')
					.on('click', function(){
						scrumData.removePerson($(this).parent().data('person'));
					})
					.appendTo(personDiv);
			
				personDiv.appendTo(container);
			}
		} else {
			$('<div />')
				.addClass('task-box')
				.text('there are currently no people')
				.appendTo(container);
		}
		
	}
	
	self.editProject = function (project, form) {
		form.find('.project-name').val(project["name"]);
	}
	
	self.drawProjectsList = function (container, data) {
		var projects = data.projects || scrumData.projects,
				selectedProject = {};
		container.empty();
		
		function resetProjectForm (form) {
			$('.project', container).removeClass('selected');
			form
				.find('.create')
				.text('Create Project')
				.unbind('click')
				.bind('click', function(){
					var project = self.buildProjectForm(form);
					scrumData.addProject(project);
					self.clearForm(form);
				});
			self.clearForm(form);
		}
		
		if (projects) {
			for (var project in projects) {
				var projectDiv = $('<div />')
					.addClass('task-box secondary project')
					.text(projects[project]['name'])
					.data('project', project)
					.unbind('click')
					.bind('click', function(){
						var projectForm = $('.project-creation');
						$('.project', container).removeClass('selected');
						$(this).addClass('selected');
						var project = $(this).data('project');
						selectedProject = project;
						self.editProject(projects[project], projectForm);
						projectForm
							.find('.create')
							.text('Save Changes')
							.unbind('click')
							.bind('click', function() {
								var data = self.buildProjectForm(projectForm);
								scrumData.setProject(selectedProject, data);
								resetProjectForm(projectForm);
							});
						$('.cancel', projectForm)
							.unbind('click')
							.bind('click', function(){
								resetProjectForm(projectForm);
							});
					});
			
				$('<a />')
					.addClass('close')
					.text('x')
					.on('click', function(){
						scrumData.removeProject($(this).parent().data('project'));
					})
					.appendTo(projectDiv);
			
				projectDiv.appendTo(container);
			}
		} else {
			$('<div />')
				.addClass('task-box')
				.text('there are currently no Projects')
				.appendTo(container);
		}
		
	}
	
	function getDelegatesList (delegates, people) {
		var delegatesList = [];
		for (var i in delegates) {
			var delegate = people[delegates[i]];
			if (delegate) {
				delegatesList.push(delegate['first-name']);
			}
		}
		return delegatesList;
	}
	
	self.editTask = function (task, form) {
		form.find('.name').val(task["name"]);
		form.find('.time').val(task["time"]);
		form.find('.priority').val(task["priority"]);
		form.find('.notes').val(task["notes"]);
		form.find('.status').val(task["status"]);
		form.find('.delegates').val(task["delegates"]).trigger('change');
		form.find('.project').val(task["project"]).trigger('change');
	}
  
	self.drawTasksList = function (container, data) {
		var tasks = data.tasks || scrumData.tasks,
				people = data.people || scrumData.people;
				
		container.empty();
		
		function resetTaskForm (form) {
			$('.task', container).removeClass('selected');
			form
				.find('.create')
				.text('Create Task')
				.unbind('click')
				.bind('click', function(){
					var task = self.buildTaskForm(form);
					scrumData.addTask(task);
					self.clearForm(form);
				});
			self.clearForm(form);
		}
		
		if (tasks) {
			
			for (var task in tasks) {
			
				var taskDiv = $('<div />')
					.addClass('task-box secondary task')
					.text("(" + tasks[task]['time'] + ") " + tasks[task]['name'])
					.data('task', task)
					.unbind('click')
					.bind('click', function(){
						var taskForm = $('.task-creation');
						$('.task', container).removeClass('selected');
						$(this).addClass('selected');
						var task = $(this).data('task');
						selectedTask = task;
						self.editTask(tasks[task], taskForm);
						taskForm
							.find('.create')
							.text('Save Changes')
							.unbind('click')
							.bind('click', function() {
								var data = self.buildTaskForm(taskForm);
								scrumData.setTask(selectedTask, data);
								resetTaskForm(taskForm);
							});
						$('.cancel', taskForm)
							.unbind('click')
							.bind('click', function(){
								resetTaskForm(taskForm);
							});
					});
			
				$('<a />')
					.addClass('close')
					.text('x')
					.on('click', function(){
						scrumData.removeTask(task);
					})
					.appendTo(taskDiv);
				
				$('<p />')
					.text(tasks[task]['notes'])
					.appendTo(taskDiv);
			
				if (people && tasks[task]['delegates']) {
					var delegates = getDelegatesList(tasks[task]['delegates'], people);
					var delegatesDiv = $('<div />').addClass('delegates').text('Delegates: ');
					for (var j in delegates) {
						$('<div />')
							.addClass('delegate')
							.text(delegates[j])
							.appendTo(delegatesDiv);
					}
					delegatesDiv.appendTo(taskDiv);
				}	
			
				taskDiv.appendTo(container);
			}
		} else {
			$('<div />')
				.addClass('task-box')
				.text('there are currently no tasks')
				.appendTo(container);
		}
	}
	
	self.drawScrumBoard = function (container, data) {
		var tasks = data.tasks || scrumData.tasks,
				projects = data.projects || scrumData.projects,
				headings = ['Project', 'To Do', 'In Progress', 'Verify', 'Done'];
				
		container.empty();
		var thead  = $('<thead />')
		var row = $('<tr />');
		for (var heading in headings) {
			$('<th />').text(headings[heading]).appendTo(row);
		}
		row.appendTo(thead);
		thead.appendTo(container);
		
		if (projects) {
			var tbody  = $('<tbody />')
			for (var project in projects) {
				row = $('<tr />')
					.addClass('project')
					.data('project', project);
				for (var item in headings) {
					if (headings[item] == 'Project') {
						$('<td />')
							.addClass('project-title')
							.text(projects[project]['name'])
							.appendTo(row);
					} else {
						var column = $('<td />').data('status', headings[item]);
						for (var task in tasks) {
							if (headings[item] == tasks[task]['status'] && project == tasks[task]['project']) {
								$('<div />')
									.addClass('task task-box')
									.text("(" + tasks[task]['time'] + ") " + tasks[task]['name'])
									.data('task', task)
									.appendTo(column);
							}
						}
						column.appendTo(row);
					}
				}
				row.appendTo(tbody);
			}
			tbody.appendTo(container);
		}
		
		container.find('div').draggable({ revert: "invalid" });
    container.find('td').not('.project-title').droppable({
			activeClass: "active",
			hoverClass: "drag-over",
			accept: '.ui-draggable',
      drop: function( event, ui ) {
        moveTask( ui.draggable, $(this) );
      }
    });
		var moveTask = function (element, container) {
			var taskID = $(element).data('task'),
					newTask = tasks[taskID];

			newTask['status'] = container.data('status');
			newTask['project'] = container.parent('tr').data('project');
			
			scrumData.setTask(taskID, newTask);
		}
		// container.children('tbody').sortable();
	}
	
	// self.drawBoardSection(tasks, project, status);
	
	return self;
}