var action = 0;
var nameButton = "";
var server = "http://" + window.location.host;
var idButton = "btn-transcription";
var userNameField = document.getElementById("IdUsuario");

function handleFill(value) {
  var fields = document.getElementsByTagName("textarea");
  var field;

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value.trim() === "") {
      field = fields[i];
      break;
    }
  }
  if (field) {
    field.value = value;
  }
}

function handleData() {
  var api = server + "WebApiSiamComunes/api/consultarnota";
  var xhr;

  xhr = new XMLHttpRequest();

  xhr.open("POST", api, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        handleFill(data.nota)
      } else {
        alert("Algo salio mal!")
      }
    }
  };

  xhr.onerror = function () {
    alert.log("Error en la conexión");
  };

  xhr.send(JSON.stringify({ loginName: userNameField.value }));
  action = 0;
  document.getElementById(idButton).innerText = nameButton;
}

function externalApp() {
  var width = 900;
  var height = 400;
  var top = 200;
  var left = (screen.width - width) / 2;

  window.open(server + "/siam/Siamplus/transcripcion", '_blank', 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
  action = 1;
  document.getElementById(idButton).innerText = "Actualizar";
}

function handleClick() {
  if (action == 0) {
    externalApp();
  } else {
    handleData();
  }
}

window.onload = function () {
  var btnTranscription = document.getElementById(idButton);
  nameButton = btnTranscription.innerText;
  btnTranscription.onclick = handleClick;
};
