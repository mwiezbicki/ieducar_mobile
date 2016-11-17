angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: '/home/:dependentes',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('sobreOIeducarMobile', {
    url: '/page4',
    templateUrl: 'templates/sobreOIeducarMobile.html',
    controller: 'sobreOIeducarMobileCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('listagemDeDependentes', {
    url: '/dependentes/:dependentes',
    templateUrl: 'templates/listagemDeDependentes.html',
    controller: 'listagemDeDependentesCtrl'
  })

  .state('telefonesTeis', {
    url: '/telefonesUteis',
    templateUrl: 'templates/telefonesTeis.html',
    controller: 'telefonesTeisCtrl'
  })

  .state('meusDados', {
    url: '/meuDados',
    templateUrl: 'templates/meusDados.html',
    controller: 'meusDadosCtrl'
  })

  .state('detalhesDependente', {
    url: '/detalhesDependente/:matricula',
    templateUrl: 'templates/detalhesDependente.html',
    controller: 'detalhesDependenteCtrl'
  })

  .state('notasParciais', {
    url: '/notasParciais',
    templateUrl: 'templates/notasParciais.html',
    controller: 'notasParciaisCtrl'
  })

  .state('ocorrencias', {
    url: '/ocorrencias/:matricula',
    templateUrl: 'templates/ocorrencias.html',
    controller: 'ocorrenciasCtrl'
  })

  .state('frequNcia', {
    url: '/frenquencia',
    templateUrl: 'templates/frequNcia.html',
    controller: 'frequNciaCtrl'
  })

  .state('boletim', {
    url: '/boletim',
    templateUrl: 'templates/boletim.html',
    controller: 'boletimCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});
