angular.module('app.controllers', [])
     
.controller('loginCtrl', ['$scope', '$stateParams','config','$location','Sessao', '$ionicNavBarDelegate','$http','$state',
function ($scope, $stateParams, config, $location, Sessao, $ionicNavBarDelegate, $http, $state) {
   
    $scope.cpf = "04692423960";
    $scope.matricula_dependente = 14404;
    localStorage = null;
    
    // Função que valida o login   
    $scope.login = function(cpf,matricula_dependente){
        $scope.message_error = false;
        $scope.loading = true;
        
        // Define variáveis utilizadas na chamada da API
        var complementoUrl = "Aluno",
            recurso = "alunos_by_guardian_cpf";
        
        // Faz a chamada a API
        $http({
            method: 'GET',
            url: config.url_Base+"module/Api/"+complementoUrl+"?oper=get&resource="+recurso+"&access_key="+config.access_Key+"&aluno_id="+matricula_dependente+"&cpf="+cpf
        // Função que é executada quando ocorre o retorno dos dados da API
        }).then(function successCallback(result) {
            // Verifica se a API retornou um erro
            if(result.data.any_error_msg){
                // Caso positivo exibe o erro para o usuário
                $scope.message_error = "Erro ao validar CPF e código de aluno! \n\
                Tente novamente se o problema persistir, entre em contato \n\
                com o administrador da escola.";                
            }else{
                // Caso negativo quer dizer que o login é válido
                Sessao.setUsuario(cpf);
                localStorage.dependentes = JSON.stringify(result.data.alunos);
                $state.go('home');
            }
        }, function errorCallback(result) {
            $scope.message_error = "Oops... Ocorreu um erro inesperado!";   
        }); 
    };
}])




.controller('homeCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicSideMenuDelegate', 'Sessao', '$ionicLoading',
function ($scope, $stateParams, $http, $state, $ionicSideMenuDelegate, Sessao, $ionicLoading) {
    
    //$ionicSideMenuDelegate.canDragContent(true);
    
    // Sai da aplicação
    $scope.sair = function(){ 
        // Zera a sessão
        Sessao.setUsuario(false);
        // Limpa o local storage
        localStorage.clear();
    };
    
    $scope.go_listagem = function(){
      $state.go('listagemDeDependentes',{dependentes:$stateParams.dependentes}); 
    };
}])
   
   
   
.controller('listagemDeDependentesCtrl', ['$scope', '$stateParams', '$http', '$state',
function ($scope, $stateParams, $http, $state) {
    // Obtem os códigos dos dependentes 
    $scope.dependentes = JSON.parse(localStorage.dependentes);
    
    // Função que direciona o usuário para a página que detalha um dependente
    $scope.go_listagem = function(matricula_dependente){
      $state.go('detalhesDependente',{matricula : matricula_dependente});  
    };
    
    // Grava os códigos de dependentes no armazenamento local
    localStorage.dependentes = JSON.stringify($scope.dependentes);
    
}])
   
   
   
.controller('detalhesDependenteCtrl', ['$scope', '$stateParams','$http', '$state', 'config','$ionicLoading', 'Util',
function ($scope, $stateParams, $http, $state, config, $ionicLoading, Util) {
    
    // Verifica se o código da matricula foi passado por parâmetro
    if ($stateParams.matricula) {
        var complementoUrl = "Aluno",
            recurso = "matriculas";
        $ionicLoading.show({template: 'Carregando...'});
        // Faz a chamada para a API
        $http({
            method: 'GET',
            url: config.url_Base+"module/Api/"+complementoUrl+"?oper=get&resource="+recurso+"&access_key="+config.access_Key+"&aluno_id="+$stateParams.matricula
           // Função que é executada quando a API retorna os dados
        }).then(function successCallback(result) {
            $ionicLoading.hide().then(function(){});
            var matriculas = result.data.matriculas;
             // Filtra somente a matricula em que o aluno esta cursando.
            $scope.matricula = matriculas.filter(function(matricula){
               return matricula.situacao === "Cursando"; 
            })[0];
 
             // Guarda no armazenamento local os dados da matrícula
            localStorage.matricula = JSON.stringify($scope.matricula);
        }, function errorCallback(result) {
            $ionicLoading.hide().then(function(){});
            Util.showError();
        });
    } else {
        $scope.matricula = JSON.parse(localStorage.matricula);
    } 
    
    // Direciona o usuário para a página de ocorrências
    $scope.go_ocorrencias = function(){
        $state.go('ocorrencias',{matricula: JSON.stringify($scope.matricula)});
    };
}])
      
      
      
.controller('ocorrenciasCtrl', ['$scope', '$stateParams','$http','config', '$ionicLoading', 'Util',
function ($scope, $stateParams, $http, config, $ionicLoading, Util) {
    // Mostra mensagem de loading
    $ionicLoading.show({template: 'Carregando...'});
    // Carrega os dados da matricula no escopo
    $scope.matricula = $stateParams.matricula ? JSON.parse($stateParams.matricula) : JSON.parse(localStorage.matricula);
    // Define parâmetros utilizados para fazer requisição na API
    var complementoUrl = "Aluno",
        recurso = "ocorrencias_disciplinares";
    
    // Faz reguisição GET para a API
    $http({
        method: 'GET',
        url: config.url_Base+"module/Api/"+complementoUrl+"?oper=get&resource="+recurso+"&access_key="+config.access_Key+"&aluno_id="+$scope.matricula.aluno_id+"&escola_id="+$scope.matricula.escola_id
    }).then(function successCallback(result) {
        // Carrega no scope as ocorrência
        $scope.ocorrencias_disciplinares = result.data.ocorrencias_disciplinares;
        // Esconde mensagem de loading
        $ionicLoading.hide().then(function(){});
    }, function errorCallback(result) {
        $ionicLoading.hide().then(function(){});
        Util.showError();
    });
    
}])



.controller('frequNciaCtrl', ['$scope', '$stateParams', '$http', 'Sessao', 'config', 'Util', '$ionicLoading',
function ($scope, $stateParams, $http, Sessao, config, Util, $ionicLoading) {
    // Mostra mensagem de loading
    $ionicLoading.show({template: 'Carregando...'});
    // Carrega no escope os dados da matricula
    $scope.matricula = JSON.parse(localStorage.matricula);
    
    // Faz requisição para API
    $http({
        method: 'GET',
        url: config.url_base_api_aux+"dependente/frequencia/"+$scope.matricula.id
    }).then(function successCallback(result) {
        // Carrega em uma varíavel do escope os dados da frequência
        $scope.matricula.frequencia = result.data[0].frequencia_da_matricula;
        // Arredonda o valor da frequência para duas casas decimais após a vírgula
        $scope.matricula.frequencia = Math.round($scope.matricula.frequencia * 100) / 100;
        // Esconde a mensagem de loading
        $ionicLoading.hide().then(function(){});
    }, function errorCallback(result) {
        $ionicLoading.hide().then(function(){});
        Util.showError();
    });

}])


   
.controller('boletimCtrl', ['$scope', '$stateParams','$http','config', '$sce', 'Util', '$ionicLoading',
function ($scope, $stateParams, $http, config, $sce, Util, $ionicLoading) {
    
    // Carrega no escope os dados da matricula
    $scope.matricula = JSON.parse(localStorage.matricula);
    // Exibe mensagem de loading
    $ionicLoading.show({template: 'Carregando...'});
    // Define parâmetros utilizados para fazer requisição na API
    var complementoUrl = "Report",
        recurso = "boletim";
    // Faz requisição GET para API   
    $http({
        method: 'GET',
        url: config.url_Base+"module/Api/"+complementoUrl+"?oper=get&resource="+recurso+"&matricula_id="+$scope.matricula.id+"&escola_id="+$scope.matricula.escola_id+"&access_key="+config.access_Key
    }).then(function successCallback(result) {
        // Converte os dados de base64 para binario
        var blob = Util.b64toBlob(result.data.encoded, 'application/pdf');
        // Cria uma url com o objeto pdf e carrega no escopo
        $scope.pdfUrl = URL.createObjectURL(blob);
        // Esconde mensagem de loading
        $ionicLoading.hide().then(function(){});
    }, function errorCallback(result) {
        // Esconde mensagem de loading
        $ionicLoading.hide().then(function(){});
        Util.showError();
    });
    
}])



.controller('meusDadosCtrl', ['$scope', '$stateParams', '$http', 'Sessao', 'config', 'Util', '$ionicLoading', '$ionicPopup',
function ($scope, $stateParams, $http, Sessao, config, Util, $ionicLoading, $ionicPopup) {
    
    // Mostra mensagem de loading
    $ionicLoading.show({template: 'Carregando...'});
    // Faz requisição GET para API
    $http({
        method: 'GET',
        url: config.url_base_api_aux+"responsavel/"+Sessao.getUsuario()
    }).then(function successCallback(result) {
        // Esconde mensagem de loading    
        $ionicLoading.hide().then(function(){});
        // Carrega no escope os dados do responsável
        $scope.dados_responsavel = result.data[0];
        console.log($scope.dados_responsavel);
        // Insere mascara no CPF do responsável
        $scope.dados_responsavel.cpf = Util.mascaraCPF(""+$scope.dados_responsavel.cpf+"");
        
        
    }, function errorCallback(result) {
        // Esconde mensagem de loading
        $ionicLoading.hide().then(function(){});
        Util.showError();
        
    });

}])



 .controller('notasParciaisCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
    $scope.matricula = JSON.parse(localStorage.matricula);
}])



.controller('sobreOIeducarMobileCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {}])
 
 
 
.controller('telefonesTeisCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {}])