const columns = [
  { title: 'Product', links: ['Pricing', 'Docs', 'Changelog'] },
  { title: 'Resources', links: ['GitHub', 'Discord', 'Installer'] },
  { title: 'Company', links: ['Blog', 'Contact'] },
];

export const Footer = () => {
  return (
    <footer className="px-6 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <img src="/assets/logo-white.svg" alt="struxa" className="h-5 w-5" />
          <p className="mt-3 max-w-xs text-sm text-neutral-500">
            Self-hosted, open-source game server management.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-neutral-400 hover:text-neutral-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 font-mono text-xs text-neutral-600">
        © {new Date().getFullYear()} Disaster Limited
      </p>
    </footer>
  );
};
