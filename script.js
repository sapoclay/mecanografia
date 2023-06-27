var myText = receive()
var pos = 0
var letra
var correct = 0
var error = 0

changeCharacter()

window.addEventListener('keypress', function(e) {
  letra = myText.charAt(pos)
  var num = letra.charCodeAt()
  //console.log('Tecla pulsada: '+ e.keyCode)
  var key = event.keyCode
  key = parseInt(key)
  if(num == key){
    document.getElementById(key).style.backgroundColor = "green";
    correct++
    document.getElementById('aciertos').innerHTML = '- Aciertos: '+ correct;
    pos++
    isFinal()
    changeCharacter()
  }
  else{
    document.getElementById(key).style.backgroundColor = "red";
    error++
    document.getElementById('fallos').innerHTML = '- Fallos: '+ error;
  }
})

window.addEventListener('keyup', function(e) {
  //console.log('Tecla soltada: '+ e.keyCode)
  var key = event.keyCode
  key = parseInt(key)
  if(key == 186){
    document.getElementById(key+55).style.backgroundColor = "white";
  }
  else if(key == 32) {
    document.getElementById(key).style.backgroundColor = "white";
  }
  else{
   document.getElementById(key+32).style.backgroundColor = "white"; 
  }
})

function receive(){ 
  var textValue = document.getElementById("pTexto").innerText;
  console.log(textValue)
  return textValue
}

function changeCharacter(){
  var firstPart = myText.substr(0,pos)
  var secondPart = myText.substr(pos+1)
  //var newString = firstPart + '<span class="actual">'+myText.charAt(pos) + '</span'> + secondPart
  var otro = ''
  otro = otro.concat(firstPart,'<span class="actual">',myText.charAt(pos))
  otro = otro.concat('</span>','',secondPart)
  document.getElementById("pTexto").innerHTML = otro;
}

function isFinal(){
  if(pos >= myText.length){
    alert('Ha finalizado el texto con '+ correct +' aciertos y '+ error + ' errores.');
  }
}