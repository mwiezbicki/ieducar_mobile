angular.module('app.services', [])

.factory('Sessao', [function(){
    var usuario;
    
    return{
        setUsuario : function (usuarioLogado) {
            usuario = usuarioLogado;
        },
        estaLogado : function () {
            return(usuario)? usuario : false;
        },
        getUsuario : function (){
            return usuario;
        }
    }
}])

.service('Util', ['$ionicPopup', function($ionicPopup){

    this.b64toBlob = function(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    } 
    
    this.mascaraCPF = function(cpf){
            if(mascaraInteiro(cpf)==false){
                    event.returnValue = false;
            }       
            return formataCampo(cpf, '000.000.000-00', event);
    };


    //valida numero inteiro com mascara
    function mascaraInteiro(){
            if (event.keyCode < 48 || event.keyCode > 57){
                    event.returnValue = false;
                    return false;
            }
            return true;
    }
    
    //formata de forma generica os campos
    function formataCampo(campo, Mascara, evento) { 
            var boleanoMascara; 

            var Digitato = evento.keyCode;
            exp = /\-|\.|\/|\(|\)| /g
            campoSoNumeros = campo.toString().replace( exp, "" ); 

            var posicaoCampo = 0;    
            var NovoValorCampo="";
            var TamanhoMascara = campoSoNumeros.length;; 

            if (Digitato != 8) { // backspace 
                    for(i=0; i<= TamanhoMascara; i++) { 
                            boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                                    || (Mascara.charAt(i) == "/")) 
                            boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                                    || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
                            if (boleanoMascara) { 
                                    NovoValorCampo += Mascara.charAt(i); 
                                      TamanhoMascara++;
                            }else { 
                                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                                    posicaoCampo++; 
                              }              
                      }      
                    campo = NovoValorCampo;
                      return campo; 
            }else { 
                    return true; 
            }
    }
    
    this.showError = function (message){
        
        var messageErro = message ? message : '<br/>Erro inesperado! Tente novamente, se o problema persistir entre em contato com o administrador do sistema.';
        
        var alertPopup = $ionicPopup.alert({
           title: '<div class="bar bar-header bar-assertive"><h1 class="title">Erro!</h1></div>',
           template: messageErro,
           okText:'Fechar'
         });
         alertPopup.then(function(res) {
           console.log(message);
         });
    }
    

}]);