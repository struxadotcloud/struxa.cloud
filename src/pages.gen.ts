// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_404_getConfig } from './pages/404';
// prettier-ignore
import type { getConfig as File_Changelog_getConfig } from './pages/changelog';
// prettier-ignore
import type { getConfig as File_Compare_getConfig } from './pages/compare';
// prettier-ignore
import type { getConfig as File_Cookies_getConfig } from './pages/cookies';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_Pricing_getConfig } from './pages/pricing';
// prettier-ignore
import type { getConfig as File_Privacy_getConfig } from './pages/privacy';
// prettier-ignore
import type { getConfig as File_Terms_getConfig } from './pages/terms';

// prettier-ignore
type Page =
| ({ path: '/404' } & GetConfigResponse<typeof File_404_getConfig>)
| ({ path: '/changelog' } & GetConfigResponse<typeof File_Changelog_getConfig>)
| ({ path: '/compare' } & GetConfigResponse<typeof File_Compare_getConfig>)
| ({ path: '/cookies' } & GetConfigResponse<typeof File_Cookies_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/pricing' } & GetConfigResponse<typeof File_Pricing_getConfig>)
| ({ path: '/privacy' } & GetConfigResponse<typeof File_Privacy_getConfig>)
| ({ path: '/terms' } & GetConfigResponse<typeof File_Terms_getConfig>);

// prettier-ignore
type Layout =
| { path: '/' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
