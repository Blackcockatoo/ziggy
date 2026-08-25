import type { NavigationItem } from "@/content/types";

export function SiteNav({ items }: { items: NavigationItem[] }) {
  return (
    <nav className="site-nav" aria-label="Monkey Shop sections">
      <a className="site-nav__brand" href="#top" aria-label="The Monkey Shop, back to top">
        <span aria-hidden="true">M</span>
        <span>The Monkey Shop</span>
      </a>
      <div className="site-nav__links">
        {items.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a href="/archive">Optional back room</a>
      </div>
    </nav>
  );
}
