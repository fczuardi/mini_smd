
var subject
var formname

Answers = function(){
  this.id = new Date().getTime();
  this.about = {
    name: {
      type:'text',
      value:''
      },
    address: {
      type:'textarea',
      value:''
      },
    phone_1: {
      type:'tel',
      value:''
      },
    phone_2: {
      type:'tel',
      value:''
      },
    phone_3: {
      type:'tel',
      value:''
      },
    email: {
      type:'email',
      value:''
      },
    area: {
      type:'radio',
      value:'1'
      },
    gender: {
      type:'radio',
      value: 'masculino'
      },
    birth: {
      type:'date',
      value:''
      },
    escolaridade: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    tv: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    radio: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    bathroom: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    cars: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    maid: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    washingMachine: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    dvdPlayer: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    fridge: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    freezer: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    instrucao_chefe: {
      type:'select',
      value:'-1',
      selectedIndex:0
      }
  }
  this.coopWonca = {
    a: {
      type:'radio',
      value:'0',
      selectedIndex:0
      }
  }
  this.phq2 = {
    b: {
      type:'radio',
      value:'0',
      selectedIndex:0
      },
    c: {
      type:'radio',
      value:'0',
      selectedIndex:0
      }
  }
  this.gad2 = {
    d: {
      type:'radio',
      value:'0',
      selectedIndex:0
      },
    e: {
      type:'radio',
      value:'0',
      selectedIndex:0
      }
  }
  this.idate3 = {
    f: {
      type:'radio',
      value:'0',
      selectedIndex:0
      }
  }
  this.cudit3 = {
    g: {
      type:'radio',
      value:'0',
      selectedIndex:0
      }
  }
  this.m3 = {
    h: {
      type:'radio',
      value:'0',
      selectedIndex:0
      },
    i: {
      type:'radio',
      value:'0',
      selectedIndex:0
      },
    j: {
      type:'radio',
      value:'0',
      selectedIndex:0
      },
    k: {
      type:'radio',
      value:'0',
      selectedIndex:0
      }
  }
  this.apss3 = {
    l: {
      type:'radio',
      value:'0',
      selectedIndex:0
      },
    m: {
      type:'radio',
      value:'0',
      selectedIndex:0
      },
    n: {
      type:'radio',
      value:'0',
      selectedIndex:0
      }
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
  // $('#subject_list_btn').removeClass('ui-disabled');
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
function fillFormValues(){
  console.log('fillFormValues');
  for (var input_name in subject[formname]){
    var input_type = subject[formname][input_name]['type'];
    var input_value = subject[formname][input_name]['value'];
    console.log(input_value);
    var selector = '';
    var form_element = {};
    switch (input_type){
      case 'textarea':
        selector = input_type+"[name='"+input_name+"']";
        form_element = $(selector);
        form_element.val(input_value);
        break;
      case 'radio':
        selector = "input[type='"+input_type+"'][name='"+input_name+"']";
        form_element = $(selector);
        input_value = [input_value];
        console.log(input_value);
        form_element.val(input_value).checkboxradio("refresh");
        break;
      case 'select':
        var input_index = subject[formname][input_name]['selectedIndex'];
        selector = input_type+"[name='"+input_name+"']";
        form_element = $(selector);
        form_element[0].selectedIndex = input_index;
        // input_value = [input_value];
        // console.log(input_value);
        form_element.selectmenu("refresh");
        break;
      case 'text':
      case 'tel':
      case 'email':
      case 'date':
      default:
        selector = "input[type='"+input_type+"'][name='"+input_name+"']";
        form_element = $(selector);
        form_element.val(input_value);
        break;
    }
    // console.log($('#'+input_name));
    // console.log(subject[formname][$('#'+input_name).attr('name')]['type'])
    // console.log(subject[formname][$('#'+input_name).attr('name')]['value'])
      // $('#'+).attr("checked",false).checkboxradio("refresh");
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
  fillFormValues();
}
function updateSubjectData(event){
  subject[formname][$(this).attr('name')]['value'] = $(this).attr('value');
  console.log(formname + '.' + $(this).attr('name') + '.value = ' + subject[formname][$(this).attr('name')]['value']);
  localStorage.setItem(subject.id, JSON.stringify(subject));
  if(this.nodeName =='SELECT'){
    console.log(this);
    console.log(this.selectedIndex);
    subject[formname][$(this).attr('name')]['selectedIndex'] = this.selectedIndex;
    console.log(formname + '.' + $(this).attr('name') + '.selectedIndex = ' + subject[formname][$(this).attr('name')]['selectedIndex']);
    $(this).selectmenu("refresh");
  }
}
function form_page_init(event){
  console.log(event);
  formname = $("div[data-role='page']").last().data('pagename');
  console.log($("div[data-role='page']"));
  console.log('form_page_init '+formname);
  setTimeout(loadCurrentSubject, 1)
  $('input, textarea, select').unbind("blur change keyup");
  $('input, textarea, select').bind("blur change keyup", updateSubjectData);
}
history.navigationMode = 'compatible';











