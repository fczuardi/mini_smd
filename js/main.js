
var subject,
    formname;

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
    estado_civil: {
      type:'select',
      value:'-1',
      selectedIndex:0
      },
    situacao_laboral: {
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
      value:'-1',
      selectedIndex:0
      }
  }
  this.phq2 = {
    a: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      },
    b: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      }
  }
  this.gad2 = {
    a: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      },
    b: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      }
  }
  this.audit3 = {
    a: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      }
  }
  this.cudit1 = {
    a: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      }
  }
  this.m3 = {
    a: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      },
    b: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      },
    c: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      },
    d: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      }
  }
  this.apss3 = {
    a: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      },
    b: {
      type:'radio',
      value:'-1',
      selectedIndex:0
      },
    c: {
      type:'radio',
      value:'-1',
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
function getLocalSubjectList(){
  var subjectList = localStorage.getItem('subjectList');
  if (subjectList == null){
    subjectList = [];
  } else {
    subjectList = JSON.parse(subjectList);
  }
  return subjectList;
}
function newSubject(event){
  // event.preventDefault();
  // event.stopPropagation();
  var subjectList = getLocalSubjectList();
  subject = new Answers();
  localStorage.setItem('currentSubjectID', subject.id);
  localStorage.setItem(subject.id, JSON.stringify(subject));
  subjectList.push(subject.id);
  localStorage.setItem('subjectList', JSON.stringify(subjectList));
  // $('#subject_list_btn').removeClass('ui-disabled');
  console.log("current subject: "+ subject.id);
}
function deleteSubject(id,link){
  var subjectList = getLocalSubjectList();
  id = Number(id);
  subjectList.splice(subjectList.indexOf(id), 1);
  localStorage.removeItem(id);
  localStorage.setItem('subjectList', JSON.stringify(subjectList));
  $(link).parents('li').remove();
  $('#subjectList').listview('refresh');
}
function setSubjectAndGo(id,link){
  if ($(link).parents('li').attr('data-icon') == 'delete'){
    deleteSubject(id,link);
    return false
  }
  localStorage.setItem('currentSubjectID', id);
  window.location.href = "./1_identificacao.html";
  return false;
}
function toggleDeleteSubjectMode(){
  console.log('toggleDeleteSubjectMode');
  if(!$('#subjectList').hasClass('deletemode')){
    $('#subjectList').addClass('deletemode');
    $('#subjectList').html('');
    listSubjects('delete');
  }else{
    $('#subjectList').removeClass('deletemode');
    $('#subjectList').html('');
    listSubjects();
  }
  return false;
}
function listSubjects(mode){
  console.log('listSubjects '+mode);
  // event.preventDefault();
  // event.stopPropagation();
  var subjectList = JSON.parse(localStorage.getItem('subjectList')),
      subjectID,
      subjectName,
      subject,
      itemHTML,
      removeButtonHTML,
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
    itemHTML = '<li '+ ((mode=='delete')?'data-icon="delete"':'')+
                '><a href="#" onclick="setSubjectAndGo(\''+subjectID+'\',this);">'+
               subjectName +
               '</a></li>';
    $('#subjectList').append(itemHTML);
  }
  removeButtonHTML =  '<li data-icon="false" data-theme="b" >'+
                      '<a id="deleteModeBtn" href="#" onclick="toggleDeleteSubjectMode()" data-role="button">'+
                      ((mode=='delete')?'Sair do modo de remoção':'Remover Sujeito')+'</a></li>'
  $('#subjectList').append(removeButtonHTML);
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
function resetSendPopupButton(){
  $('#sendButton').removeClass('ui-disabled');
  $('#sendButton').html('Enviar');
  $('#sendButton').button('refresh');
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
            resetSendPopupButton();
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
  console.log('home_init');
  var subjectList = getLocalSubjectList();
  $('#subject_new_btn').click(newSubject);
  // $('#subject_list_btn').click(listSubjects);
  if ( (localStorage.length == 0) || (subjectList.length == 0) ){
    $('#subject_list_btn').addClass('ui-disabled');
  }
  console.log();
  if ((localStorage.length == 0) || (!navigator.onLine)){
    $('#sync_btn').addClass('ui-disabled');
  }
  $(window).unbind("online offline");
  $('#sendButton').unbind("click");
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
  var currentSubjectID = localStorage.getItem('currentSubjectID');
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
  if (typeof formname === 'undefined') {
    home_init();
    return;
  }
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











