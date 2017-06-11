function upgrade() {
  for (var index = 0; index < 1000000000000000000000000; index++) {
    setTimeout(function() {
      console.log('numéro ' + index);  
    }, 1000);
    
  }
}