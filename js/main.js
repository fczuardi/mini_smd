
var subject

Answers = function(){
  this.id = new Date().getTime();
  this.about = {
    name: '',
    address: '',
    phone_1: '',
    phone_1: '',
    phone_3: '',
    area: '',
    gender: '',
    birth: '',
    escolaridade: 0,
    tv: 0,
    radio: 0,
    bathroom: 0,
    cars: 0,
    maid: 0,
    washingMachine: 0,
    dvdPlayer: 0,
    fridge: 0,
    freezer: 0,
    instrucao_chefe: 0
  }
  this.coopWonca = {
    a: 0
  }
  this.phq2 = {
    a: 0,
    b: 0
  }
  this.gad2 = {
    a: 0,
    b: 0
  }
  this.idate3 = {
    a: 0
  }
}
//for debugging purposes
function clearStorage(){
  for (var i in localStorage){
    localStorage.removeItem(i);
  }
}
function newSubject(event){
  // event.preventDefault();
  // event.stopPropagation();
  subject = new Answers();
  localStorage.setItem('currentSubjectID', subject.id);
  localStorage.setItem(subject.id, JSON.stringify(subject));
  $('#subject_list_btn').removeClass('ui-disabled');
  console.log("current subject: "+ subject.id);
}
function listSubjects(event){
  event.preventDefault();
  event.stopPropagation();
  alert(localStorage.length);
  console.log(JSON.stringify(localStorage));
}
function home_init(){
  $('#subject_new_btn').click(newSubject);
  $('#subject_list_btn').click(listSubjects);
  if (localStorage.length == 0){
    $('#subject_list_btn').addClass('ui-disabled');
  }
}
function loadCurrentSubject(){
  var currentSubjectID = localStorage.getItem('currentSubjectID');
  var storedSubject = localStorage.getItem(currentSubjectID);
  subject = JSON.parse(storedSubject);
  if (subject == null){
    alert('Erro: não foi possível recuperar os dados do sujeito. Um novo formulário em branco foi criado.');
    newSubject();
  }
}
function updateSubjectData(event){
  var formname =   $('div[data-role=page]').data('formname');
  subject[formname][$(this).attr('name')] = $(this).attr('value');
  localStorage.setItem(subject.id, JSON.stringify(subject));
}
function form_page_init(formname){
  console.log('form_page_init '+formname);
  $('div[data-role=page]').data('formname',formname);
  loadCurrentSubject();
  $('input, textarea, select').bind("blur change keyup", updateSubjectData)
}












