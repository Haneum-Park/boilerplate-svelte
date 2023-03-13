<script lang="ts">
  export let iconSrc: string;
  export let onClick = () => {};
</script>

<div class="icon-container">
  <!-- icon rendering -->
  <img src="{iconSrc}" alt="icon" on:click="{onClick}" aria-hidden="true" />
</div>

<style lang="scss">
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #f8f8ff;
    width: var(--width, 24px);
    height: var(--height, 24px);
    cursor: pointer;

    & > img {
      display: block;
      width: 100%;
    }
  }
</style>
