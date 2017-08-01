/* AUTORE: Antonio Riccio
 * DATA CREAZIONE: 01-08-2017
 * VERSIONE: 1.0
*/
var sic = 1; // variabile globale per scelta sicurezza password

$( document ).ready(function() { // al caricamento del DOM

  $('.sic').each( function(){ // a tutti gli elementi di classe .sic (ovvero tutti i radio dedicati alla scelta del livello di sicurezza)
    $(this).prop('checked', false); // tolgo il checked
    if($(this).val() == 1){ // se il valore del radio è 1
      $(this).prop('checked', true); // allora attivo il checked così da partire sempre dal valore 1 (livello molto basso) all'caricamento della pagina
    }
  });
  $('#eccessivo').click(function(){
    alert('ATTENZIONE: Sono sconsigliate password di questa complessità poichè potrebbero essere utilizzati caratteri con codifica differente dallo standard UTF-8!');
  });



  $('.sic').click(function(){ // al click di qualsiasi radio con classe .sic
    sic = $(this).val(); // la variabile globale sic assume il nuovo valore di sicurezza
  });

  $('#genera').click(function(){ // al click del tasto genera
    if(verifica()){
      genera_stringa(); // richiamo la funzione genera_stringa
    }
  });

});
function verifica(){
  if($('#num_char').val()==""){
    alert('devi inserire il numero di caratteri!');
    return false;
  }
  if($('#num_char').val() < 8 || $('#num_char').val() > 50 ){
    alert('Il numero di caratteri deve essere compreso tra 8 e 50');
    return false;
  }
  if($('#pref').val().length > $('#num_char').val() ){
    alert('Il prefisso '+ $('#pref').val() +' contiene più di '+$('#num_char').val()+' caratteri!');
    return false;
  }
  return true;
}

function genera_stringa(){ // FUNZIONE RICORSIVA
  var n = $('#num_char').val(); // numero di caratteri da generare
  var text = $('#pref').val(); // iniziaizzo variabile che conterrà la password associandogli il valore del prefisso
  var n_text = text.length;
  n = n - n_text;
  var possible = ""; // inizzializzo la variabile che conterrà il range di valori ammessi

  if (sic == 1){ // se il valore di sicurezza è 1
    possible = "abcdefghijklmnopqrstuvwxyz"; // i valori possibili saranno solo le lettere dalla a alla z minuscole
  }
  else if(sic == 2){ // se il valore di sicurezza è 2
    possible = "abcdefghijklmnopqrstuvwxyz0123456789"; // i valori possibili saranno tutte le lettere minuscole dalla a alla z e tutti i  numeri da 0 a 9
  }
  else if(sic == 3){ // se il valore di sicurezza è 3
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // saranno ammesse tutte le lettere dalla a alla z maiuscole e minuscole più tutti i numeri da 0 a 9
  }
  else if(sic == 4){ // se il valore di sicurezza è 4
   possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!%$[]{}~@#\\§*€£"; // oltre ai numeri da 0 a 9 e le lettere maiuscole e minuscole saranno ammessi un primo range di caratteri speciali
 }
 else if( sic == 5){ // se il valore di sicurezza è 5
   possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!%()$[]{}~@#\\§*€£¢©÷><µ·¶±®™¥æÆ"; // saranno ammessi tutti i caratteri ammessi al livello 4 più alòcuni caratteri speciali più complessi
 }

  for (var i = 0; i < n; i++){  // finchè non arrivo al numero indicato dall'utente
    text += possible.charAt(Math.floor(Math.random() * possible.length)); // estraggo un carattere casuale e lo accodo alla variabile "text"
  }

  if(controllo_sicurezza(text,sic)){ // richiamo il controllo di sicurezza per verificare che la password generata rispecchi i parametri di sicurezza richiesti
    $('#psw').html(text); // se la funzione controllo_sicurezza va a buon fine e restituisce true allora sparo a video la password
    //console.log('password: '+text);
  }

}

function controllo_sicurezza(text,sic){

  // livelli di sicurezza
  reg5 = new RegExp("[a-z]{1,}[0-9]{1,}[A-Z]{1,}[?!%()$]{1,}[¢©÷><µ·¶±®™¥æÆ]{1,}");
  reg4 = new RegExp("[a-z]{1,}[0-9]{1,}[A-Z]{1,}[?!%$\\~@#§*€£]{1,}");
  reg3 = new RegExp("[a-z]{1,}[0-9]{1,}[A-Z]{1,}");
  reg2 = new RegExp("[a-z]{1,}[0-9]{1,}");
  reg = new RegExp("[a-z]");


  if(sic == 1){ // se la sicurezza si ferma al primo livello
    if(!reg.test(text)){ // se non viene rispettata rag
      genera_stringa(); // richiamo nuovamente genera_stringa (funzione ricorsiva) e genero una nuova password
    }else{ // altrimenti restituisco true
      return true;
    }
  }
  if(sic == 2){ // se viene rischiesto un secondo livello
    if(!(reg2.test(text))){ // se non viene rispettata rag2
      genera_stringa(); // richiamo nuovamente genera_stringa (funzione ricorsiva) e genero una nuova password
    }else{ // altrimenti restituisco true
      return true;
    }
  }

  if(sic == 3){ // se viene rischiesto un terzo livello
    if(!(reg3.test(text))){ // se non viene rispettata rag3
      genera_stringa(); // richiamo nuovamente genera_stringa (funzione ricorsiva) e genero una nuova password
    }else{ // altrimenti restituisco true
      return true;
    }
  }

  if(sic == 4){ // se viene rischiesto un quarto livello
    if(!(reg4.test(text))){ // se non viene rispettata rag4
      genera_stringa(); // richiamo nuovamente genera_stringa (funzione ricorsiva) e genero una nuova password
    }else{ // altrimenti restituisco true
      return true;
    }
  }

  if(sic == 5){ // se viene rischiesto un quinto livello
    if(!(reg5.test(text))){ // se non viene rispettata rag5
      genera_stringa(); // richiamo nuovamente genera_stringa (funzione ricorsiva) e genero una nuova password
    }else{ // altrimenti restituisco true
      return true;
    }
  }
}
