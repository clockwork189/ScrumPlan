var ScrumData = function (company, onDataUpdate) {
	var self = {},
		rootRef = new Firebase('https://scrumplan.firebaseIO.com/'),
		companyRef = rootRef.child('companies').child(company);
	
	self.tasks = {};
	self.people = {};
	self.projects = {};

	self.tasksRef = companyRef.child('tasks');
	self.peopleRef = companyRef.child('people');
	self.projectsRef = companyRef.child('projects');
	
	self.getTasks = function () { return self.tasks; }
	self.addTask = function (task) { self.tasksRef.push(task); }
	self.setTask = function (task, data) { self.tasksRef.child(task).set(data); }
	self.removeTask = function (task) { self.tasksRef.child(task).remove(); }
	
	self.getPeople = function () { return self.people; }
	self.addPerson = function (person) { self.peopleRef.push(person); }
	self.setPerson = function (person, data) { self.peopleRef.child(person).set(data); }
	self.removePerson = function (person) { self.peopleRef.child(person).remove(); }	
	
	self.getProjects = function () { return self.projects; }
	self.addProject = function (project) { self.projectsRef.push(project); }
	self.setProject = function (project, data) { self.projectsRef.child(project).set(data); }
	self.removeProject = function (project) { self.projectsRef.child(project).remove(); }
	
	return self;
}