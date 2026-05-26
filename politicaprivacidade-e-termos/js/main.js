const PAGES = {
  privacy: {
    h1:  'Política de <em>Privacidade</em>',
    sub: 'Transparência total sobre como o InfinityEd coleta, usa e protege seus dados — em conformidade com a LGPD e o ECA Digital.'
  },
  terms: {
    h1:  'Termos e <em>Condições</em>',
    sub: 'Regras de uso da plataforma InfinityEd para alunos, professores e demais membros da comunidade escolar.'
  }
};

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');

  document.getElementById('heroTitle').innerHTML = PAGES[id].h1;
  document.getElementById('heroSub').textContent  = PAGES[id].sub;

  buildToc(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildToc(pageId) {
  const blocks = document.getElementById(pageId).querySelectorAll('.section-block[data-toc]');
  const list   = document.getElementById('tocList');
  list.innerHTML = '';

  blocks.forEach((block, i) => {
    const id    = 'sec-' + pageId + '-' + i;
    block.id    = id;
    const li    = document.createElement('li');
    li.innerHTML = '<a href="#' + id + '">' + block.getAttribute('data-toc') + '</a>';
    list.appendChild(li);
  });

  updateActiveToc();
}

function updateActiveToc() {
  const links  = document.querySelectorAll('.toc-list a');
  const scrollY = window.scrollY + 90;
  let active = null;

  links.forEach(link => {
    const t = document.querySelector(link.getAttribute('href'));
    if (t && t.offsetTop <= scrollY) active = link;
  });

  links.forEach(l => l.classList.remove('active'));
  if (active) active.classList.add('active');
}

window.addEventListener('scroll', () => {
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
  updateActiveToc();
}, { passive: true });

// Init
buildToc('privacy');
