function cambiarTema(miTema) {
    const customTheme = document.getElementById('customTheme');
  
    if (miTema === 'Grey') {
      customTheme.textContent = `
        body {
          background-color: #eee;
          color: #000;
        }
      `;
    } else if (miTema === 'White') {
      customTheme.textContent = `
        body {
          background-color: #fff;
          color: #000;
        }
      `;
    }else if (miTema === 'Yellow') {
      customTheme.textContent = `
        body {
          background-color: #9B9225;
          color: #f4f4f4;
        }
      `;
    }
  
    localStorage.setItem('theme', miTema);
  }
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme) {
    cambiarTema(savedTheme);
  }