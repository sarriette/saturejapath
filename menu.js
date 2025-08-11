fetch('menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('menu-container').innerHTML = data;

    // Fonction appelée par le bouton "Random project"
    window.goToRandomProject = function () {
      const projectPages = [
        'cats2.html',
        'charlouse.html',
        'ciboulette.html',
        'coco-elements.html',
        'echalote.html',
        'family-pictures.html',
        'harvey.html',
        'kakis.html',
        'massilia.html',
        'petiteboule.html',
        'petitpois.html',
        'portraits.html',
        'posters.html',
        'randomcats.html',
        'spatule.html',
        'titouan-s-room.html',
        'tulba.html',
        'oekoumene.html',
        'jeu_pieds.htmls'
      ];
      const randomIndex = Math.floor(Math.random() * projectPages.length);
      window.location.href = projectPages[randomIndex];
    };
  });
