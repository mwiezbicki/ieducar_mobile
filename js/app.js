angular.module('app', ['ionic', 
    'app.controllers',
    'app.routes',
    'app.directives',
    'app.services',
    'pdf',
    'ui.utils.masks'])

.run(function($ionicPlatform, $rootScope, Sessao, $state, $ionicNavBarDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  // Execura esta função a cada vez que o usuário troca de página no aplicativo
  $rootScope.$on('$stateChangeStart', function (event,toState) {     
    // Verifica se o usuário esta logado
    if(!Sessao.estaLogado() && toState.name !== 'login' && toState.name !== 'sobreOIeducarMobile') {
          event.preventDefault();
          $state.go("login");
    } //else if (toState.name === 'home') {
        // Desabilita o botão voltar
        //$ionicNavBarDelegate.showBackButton(false);
        //$rootScope.$root.showMenuIcon = false;
    //} else {
        // Habilita o botão voltar
        //$ionicNavBarDelegate.showBackButton(true);
        //$rootScope.$root.showMenuIcon = true;
    //}
      
  });
    
  
})

.constant('config',{
    url_Base : 'http://bc_testing.ieducar.com.br/',
    url_base_api_aux : 'http://177.67.200.226:7575/ieducar_api_aux/',
    access_Key : 'keyAUVUd1LA50qLVA4esAo6G4M3PA0',
    secret_Key : 'mj2lqU0kh629T7g0pxUzD8YOWEH5jq'
});

