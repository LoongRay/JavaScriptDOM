    function showPic(whichpic){
        console.log(1);
        let source = whichpic.getAttribute('href');
        let content = document.getElementById('pic');
        content.setAttribute('src',source);
        let tips = whichpic.getAttribute('title');
        let textshow = document.getElementById('text');
        textshow.firstChild.nodeValue = tips;
    }
