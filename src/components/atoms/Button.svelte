<script lang="ts">
  import { css } from '@emotion/css';

  type FontWeight =
    | 'Thin'
    | 'ExtraLight'
    | 'Light'
    | 'Regular'
    | 'Medium'
    | 'SemiBold'
    | 'Bold'
    | 'ExtraBold'
    | 'Heavy';

  export let onClick: () => void = () => {};
  export let type: 'button' | 'submit' = 'button';
  export let label = '버튼';

  export let fontWeight: FontWeight = 'Regular';
  export let fontSize: number = 16;
  export let color: string = 'var(--color-gray-9)';
</script>

<button
  type="{type}"
  on:click="{onClick}"
  class="{css`
    font-family: ${fontWeight};
    font-size: calc(${fontSize}rem / 16);
    color: ${color};
  `}">
  {label}
</button>

<style>
  button {
    padding: 0.75rem 1rem;
    border-radius: calc(8rem / 16);
    background-color: var(--color-gray-1);
  }
</style>
