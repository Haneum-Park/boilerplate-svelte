<script>
  // @ts-nocheck

  import { MetaTags } from 'svelte-meta-tags';

  export let title = 'TITLE';
  export let titleTemplate = 'TITLE_TEMPLATE';
  export let description = 'DESCRIPTION';
  export let canonical = 'https://canonical.com/';
  export let og = {
    url: 'https://canonical.com/',
    title,
    description,
    site_name: 'ALL REVA',
  };
  export let keywords = '';
</script>

<MetaTags
  title="{title}"
  titleTemplate="{title} | {titleTemplate}"
  description="{description}"
  canonical="{canonical}"
  additionalMetaTags="{[{ name: 'keywords', content: keywords }]}"
  og="{og}" />
