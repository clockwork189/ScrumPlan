var ScrumHomeApp = function(scrumData, scrumForm, userID) {
	var self = {};
	
	self.onDataUpdate = function (affected, data) {
		var people = data.people;
		
		if (affected == "people") {
			for (var p in people) {
				if (people[p]['id'] == userID) {
					var person = people[p],
							profile = $('<div />').addClass("user-profile");
					
					if (person['gravatar']) {
						var gravHash = CryptoJS.MD5(person['gravatar']);
						$('<div />')
							.addClass('avatar')
							.css('background-image','url("http://www.gravatar.com/avatar/' + gravHash + '?s=40")')
							.appendTo(profile);
					}
					
					$('<h5 />')
						.text(person['first-name'] + " " + person['last-name'])
						.appendTo(profile);
					
					if (person['title']) {
						$('<div />')
							.addClass('title')
							.text(person['title'])
							.appendTo(profile);
					}
						
					$('.main .user-profile').remove();
					profile.appendTo('.main');
					break;
				}
			}
		}
	}
			
	return self;
}

var ScrumStatsApp = function(scrumData, scrumForm) {
	return {};
}

var ScrumListApp = function(scrumData, scrumForm, userID) {
	var self = {};
	
	self.onDataUpdate = function(affected, data) {
		if (affected == "tasks") {
			
			var people = data.people,
					person = '';
			for (var p in people) {
				if (people[p]['id'] == userID) {
					person = p;
				}
			}
			
			var tasks = data.tasks,
					userTasks = {};
			for (var t in tasks) {
				var delegates = tasks[t]['delegates'];
				for (var d in delegates) {
					if (delegates[d] == person) {
						userTasks[t] = tasks[t];
					}
				}
			}
			
			var newData = {};
			newData['tasks'] = userTasks;
			newData['people'] = people;
			
			scrumForm.drawTasksList($('.tasks-container'), newData);
		}
	}
	
	return self;
}
	
var ScrumBoardApp = function(scrumData, scrumForm) {
	var self = {};
	self.onDataUpdate = function (affected, data) {
		if (affected == "tasks" || affected == "projects") {
			scrumForm.drawScrumBoard($('.scrum-board'), data);
		}
	}	
	return self;
}

var ScrumManageApp = function(scrumData, scrumForm) {
	
	var self = {},
			taskForm = $('.task-creation'),
			personForm = $('.person-creation'),
			projectForm = $('.project-creation');
	
	self.onDataUpdate = function (affected, data) {
		
		if (affected == "people") {
			scrumForm.drawPeopleList($('.people-container'), data);
			scrumForm.drawPeopleOptions($('.task-creation .delegates'), data);
			scrumForm.drawTasksList($('.tasks-container'), data);
			
		} else if (affected == "tasks") {
			scrumForm.drawTasksList($('.tasks-container'), data);
			
		} else if (affected == "projects") {
			scrumForm.drawProjectsList($('.projects-container'), data);
			scrumForm.drawProjectsOptions($('.task-creation .project'), data);
		}
		
	}	
	
	self.init = function () {
		
		var headings = ['Project', 'To Do', 'In Progress', 'Verify', 'Done'];
				
		for (var item in headings) {
			if (headings[item] != 'Project') {
				$('<option />')
					.text(headings[item])
					.appendTo($('.status', taskForm));
				$('.status', taskForm).trigger("liszt:updated");
			}
		}
		
		// Task form actions
		$('.create', taskForm).unbind('click').bind('click', function(){
			var task = scrumForm.buildTaskForm(taskForm);	
			scrumData.addTask(task);
			scrumForm.clearForm(taskForm);
		});
		$('.cancel', taskForm).unbind('click').bind('click', function(){
			scrumForm.clearForm(taskForm);
		});		
		
		// Project form actions	
		$('.create', projectForm).unbind('click').bind('click', function(){
			var project = scrumForm.buildProjectForm(projectForm);			
			scrumData.addProject(project);
			scrumForm.clearForm(projectForm);
		});
		$('.cancel', projectForm).unbind('click').bind('click', function(){
			scrumForm.clearForm(projectForm);
		});
		
		// Person form actions
		$('.create', personForm).unbind('click').bind('click', function(){
			var person = scrumForm.buildPersonForm(personForm);
			scrumData.addPerson(person);
			scrumForm.clearForm(personForm);
		});
		$('.cancel', personForm).unbind('click').bind('click', function(){
			scrumForm.clearForm(personForm);
		});
	}
	
	return self;
}
	