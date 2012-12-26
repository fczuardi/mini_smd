
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
function dataToSend(){
  var subjectList = JSON.parse(localStorage.getItem('subjectList')),
      subject,
      summarizedSubject,
      toSend = [];
  for(var i=0; i< subjectList.length; i++){
    subject = JSON.parse(localStorage.getItem(subjectList[i]));
    if (!subject){continue;}
    if(!subject.about.name.value){ continue;}
    summarizedSubject = {
      id: subject.id
    };
    for (var j in subject){
      for (var k in subject[j]){
        for (var l in subject[j][k]){
          if (l == 'value'){
            summarizedSubject[j+'_'+k] = subject[j][k][l];
          }
        }
      }
    }
    toSend.push(summarizedSubject);
  }
  // console.log(JSON.stringify(toSend));
  // return JSON.stringify(toSend);
  return toSend;
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
  var subjectList = localStorage.getItem('subjectList');
  if (subjectList == null){
    subjectList = [];
  } else {
    subjectList = JSON.parse(subjectList);
  }
  subject = new Answers();
  localStorage.setItem('currentSubjectID', subject.id);
  localStorage.setItem(subject.id, JSON.stringify(subject));
  subjectList.push(subject.id);
  localStorage.setItem('subjectList', JSON.stringify(subjectList));
  // $('#subject_list_btn').removeClass('ui-disabled');
  console.log("current subject: "+ subject.id);
}
function listSubjects(){
  // event.preventDefault();
  // event.stopPropagation();
  var subjectList = JSON.parse(localStorage.getItem('subjectList')),
      subjectID,
      subjectName,
      subject,
      itemHTML,
      newSubjectList = [];
  console.log(subjectList);
  console.log('---------------');
  $('#subjectList').html('');
  for(var i=0; i< subjectList.length; i++){
    subjectID = subjectList[i];
    subject = JSON.parse(localStorage.getItem(subjectID));
    if (!subject){continue;}
    //remove sujeitos sem nome
    if(!subject.about.name.value){
      localStorage.removeItem(subjectID);
      continue;
    }
    newSubjectList.push(subjectID);
    subjectName = subject.about.name.value;
    console.log(subjectID);
    console.log(subject.about.name.value);
    itemHTML = '<li><a href="./1_identificacao.html?subject='+subjectID+'">'+
               subjectName +
               '</a></li>';
    $('#subjectList').append(itemHTML);
  }
  localStorage.setItem('subjectList', JSON.stringify(newSubjectList));
  $('#subjectList').listview('refresh');
}
function offlineStateChanged(event){
  console.log('offlineStateChanged');
  console.log(navigator.onLine)
  if (navigator.onLine){
    $('#sync_btn').removeClass('ui-disabled');
  } else{
    $('#sync_btn').addClass('ui-disabled');
  }
}
function sendData(event){
  console.log('sendData');
  var url = "./sync.php";
  event.preventDefault();
  event.stopPropagation();
  $('#sendButton').addClass('ui-disabled');
  $('#sendButton').html('Enviando…');
  $('#sendButton').button('refresh');
  $.post( url,
          {
            sent_by: $("#interviewerName").attr('value'),
            data: dataToSend()
          },
          function(data){
            // console.log(data.received);
            $('#sendButton').removeClass('ui-disabled');
            $('#sendButton').html('Enviar');
            $('#sendButton').button('refresh');
            $("#responseMsg").html(data.msg);
            $("#popupSend").bind({
               popupafterclose: function(event, ui) {
                setTimeout(function(){
                  $("#popupSent").popup( "open" );
                  if (data.success == 1){
                    //remove local data here
                  }
                },300);
               }
            });
            $("#popupSend").popup( "close" );
          },
          "json");

}
function home_init(){
  $('#subject_new_btn').click(newSubject);
  // $('#subject_list_btn').click(listSubjects);
  if (localStorage.length == 0){
    $('#subject_list_btn').addClass('ui-disabled');
  }
  if ((localStorage.length == 0) || (!navigator.onLine)){
    $('#sync_btn').addClass('ui-disabled');
  }
  $(window).bind("online offline", offlineStateChanged);
  $('#sendButton').bind("click", sendData);
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
  var urlSubject = getURLParameter('subject');
  console.log('AAAA')
  console.log(urlSubject);
  console.log(typeof urlSubject);
  console.log(localStorage.getItem('currentSubjectID'));
  var currentSubjectID = urlSubject ? urlSubject : localStorage.getItem('currentSubjectID');
  console.log(currentSubjectID);
  var storedSubject = localStorage.getItem(currentSubjectID);
  localStorage.setItem('currentSubjectID', currentSubjectID);
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
  if (typeof formname === 'undefined') { return; }
  if (formname == 'list'){
    list_page_init(event);
    return;
  }
  setTimeout(loadCurrentSubject, 1)
  $('input, textarea, select').unbind("blur change keyup");
  $('input, textarea, select').bind("blur change keyup", updateSubjectData);
}
function list_page_init(event){
  console.log('list_page_init');
  console.log(event);
  formname = $("div[data-role='page']").last().data('pagename');
  setTimeout(listSubjects, 1)
}

//helpers
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

history.navigationMode = 'compatible';










