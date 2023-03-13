<script lang="ts">
  import { goto } from '$app/navigation';

  function Redirect() {
    goto('/');
  }
</script>

<button class="logo header" on:click="{Redirect}">
  <div class="logoname">LOGO</div>
</button>

<style lang="scss">
</style>
