import "./GridTemplate.css";

export const GridTemplate = () => {
  return (
    <div className="layout">
      <header className="center-items">Header</header>
      <nav className="center-items">Sidebar</nav>
      <main className="center-items">Main</main>
      <article className="widget center-items">widget</article>
      <article className="statistics center-items">Statistics</article>
      <footer className="center-items">Footer</footer>
    </div>
  );
};
