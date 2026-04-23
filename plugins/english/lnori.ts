import { Plugin } from '@/types/plugin';
import { FilterTypes, Filters } from '@libs/filterInputs';
import { fetchApi } from '@libs/fetch';
import { CheerioAPI, load } from 'cheerio';

class Lnori implements Plugin.PluginBase {
  id = 'lnori';
  name = 'Lnori';
  version = '1.0.0';
  icon = 'src/en/lnori/icon.png';
  site = 'https://lnori.com/';

  async popularNovels(
    page: number,
    {
      filters,
      showLatestNovels,
    }: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    const link = '${this.site}library' + (showLatestNovels ? '#sort=date' : '');
    const loadedCheerio = await this.GetCheerio(link, false);
    return this.parseNovels(loadedCheerio);
  }
  parseNovels(loadedCheerio: CheerioAPI, selector = '.'): Plugin.NovelItem[] {
    return loadedCheerio(selector);
  }
}
