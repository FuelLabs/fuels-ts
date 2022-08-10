function ready(callback){
  // in case the document is already rendered
  if (document.readyState!='loading') callback();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
      if (document.readyState=='complete') callback();
  });
}

ready(function(){
  let codeBlocks = document.querySelectorAll('pre.highlight');
  
  codeBlocks.forEach(function (codeBlock) {
    let copyButton = document.createElement('button');
    
    copyButton.className = 'btn-copy-code fs-3 btn btn-green';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';
  
    codeBlock.append(copyButton);
  
    copyButton.addEventListener('click', function () {
      let code = codeBlock.querySelector('code').innerText.trim();
      window.navigator.clipboard.writeText(code);
  
      copyButton.innerText = 'Copied';
      let fourSeconds = 2000;
  
      setTimeout(function () {
        copyButton.innerText = 'Copy';
      }, fourSeconds);
    });
  });
});