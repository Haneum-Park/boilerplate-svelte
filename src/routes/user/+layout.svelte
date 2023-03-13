<script lang="ts">
  import { onMount } from "svelte";
  let pathname = '';

  onMount(() => pathname = window.location.href);

  const onBack = () => {
    window.history.back();
  }
  const onRedirect = (link: string) => {
    location.href = link;
  }
</script>

<div class='sign-form'>
  <div class='sign-form-nav'>
    <button type='button' on:click={onBack}>뒤로가기</button>
    <button type='button' on:click={() => onRedirect(pathname.indexOf('signin') > -1 ? 'signup' : 'signin')}>
      {#if pathname.indexOf('signin') > -1}
        회원가입
      {:else}
        로그인
      {/if}
    </button>
  </div>
  <slot />
</div>

<style>
	:global(*) {
		color: #000;
	}
  .sign-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }

  .sign-form > .sign-form-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  :global(.sign-form > form) {
    display: flex;
    flex-direction: column;
  }

  :global(form > *) {
    margin-bottom: 1rem;
  }

  :global(form .form-group-msg) {
    font-size: 12px !important;
    color: var(--color-red);
  } 
</style>
