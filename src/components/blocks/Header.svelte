<script lang="ts">
  import Button from '$atom/Button.svelte';
</script>

<header>
  <div></div>
  <ul>
    <li>
      <Button label="관리자 페이지" fontWeight="Bold" />
    </li>
    <li>
      <Button label="로그인" fontWeight="Bold" />
    </li>
  </ul>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: var(--color-white);

    ul {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
</style>
