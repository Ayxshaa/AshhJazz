<template>
  <footer>
    <div class="foot-brand">Monograph</div>
    <ul class="foot-links">
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Terms</a></li>
      <li><a href="#" class="dim">Archive</a></li>
    </ul>
    <span class="foot-copy">&copy; 1964 Nocturne Editions</span>
  </footer>
</template>

<style scoped>
footer {
  padding: 56px 44px;
  background: var(--bg);
  border-top: 1px solid rgba(201,168,76,.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.foot-brand {
  font-family: 'Pinyon Script', cursive;
  font-size: 28px;
  color: #3a3634;
}
.foot-links {
  display: flex;
  gap: 36px;
  list-style: none;
}
.foot-links a {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: .38em;
  text-transform: uppercase;
  color: #2a2725;
  text-decoration: none;
  transition: color .3s;
}
.foot-links a:hover { color: var(--red-mid); }
.foot-links a.dim { color: #3a3634; }
.foot-copy {
  font-size: 7px;
  letter-spacing: .35em;
  text-transform: uppercase;
  color: #1e1c1b;
}

@media (max-width: 600px) {
  footer {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px 24px;
    text-align: center;
  }

  .foot-links {
    gap: 24px;
  }
}
</style>
