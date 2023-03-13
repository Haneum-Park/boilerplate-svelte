<script lang='ts'>
  export let target = 'form-group';
  export let type = 'text';
  export let label = 'Label';
  export let value = '';
  export let autocomplete = 'off';
  export let message = '';
  export let onChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {};
  $: placeholder = `${label}을 입력해주세요`;
</script>

<div class='form-group'>
  <label for={target}>{label}</label>
  <div class='form-group-input'>
    <input { type } { autocomplete } id={target} {value} on:input={onChange} placeholder={placeholder} />
    <slot />
  </div>
  {#if message}<div class='form-group-msg'>{message}</div>{/if}
</div>

<style>
  .form-group {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
  }
  .form-group:last-child {
    margin-bottom: 0;
  }
  .form-group > * {
    margin-top: 0.5rem;
  }
  .form-group * {
    font-size: 16px;
  }
  .form-group > *:first-child {
    margin-top: 0;
  }
  .form-group label {
    width: fit-content;
  }
  .form-group > .form-group-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .form-group > .form-group-input > * {
    flex: 1;
  }
  .form-group > .form-group-input > *:first-child {
    margin-right: 1rem;
  }
  .form-group > .form-group-input > *:last-child {
    margin-right: 0;
  }
</style>