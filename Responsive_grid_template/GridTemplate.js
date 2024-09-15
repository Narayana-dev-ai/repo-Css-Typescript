import "./GridTemplate.css";

export const GridTemplate = () => {
  return (
    <div class="layout">
      <header class="center-items">Header</header>
      <nav class="center-items">Sidebar</nav>
      <main class="center-items">Main</main>
      <article class="widget center-items">widget</article>
      <article class="statistics center-items">Statistics</article>
      <footer class="center-items">Footer</footer>
    </div>
  );
};
