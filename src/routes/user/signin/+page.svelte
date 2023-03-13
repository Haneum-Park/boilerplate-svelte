<script lang="ts">
  import { get } from 'svelte/store';
  import HCaptcha from '$block/HCaptcha.svelte';
  import FormGroup from '$block/FormGroup.svelte';
  import { captchaToken } from '$store/captcha';
  import fetchAPI from '$util/fetch.util';
  import { cookies } from '$util/common.util';

  interface UserInfo {
    email: string;
    password: string;
  }

  const userInfo = {
    email: '',
    password: '',
  };

  const messages = {
    email: '',
    password: '',
    token: '',
  };

  const onChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const { id, value } = e.currentTarget;
    userInfo[id as keyof UserInfo] = value;
  };

  const onSubmit = async () => {
    const { email, password } = userInfo;
    const token = get(captchaToken);
    if (!email) messages.email = '이메일을 입력해주세요';
    else messages.email = '';
    if (!password) messages.password = '비밀번호를 입력해주세요';
    else messages.password = '';
    if (!token) messages.token = 'Captcha 인증이 필요합니다.';
    else messages.token = '';
    if (!email || !password || !token) {
      return;
    }

    const result = await fetchAPI.post<{ accessToken: string }>('auth/signin', {
      ...userInfo,
      token,
    });
    const { statusCode, data } = result;
    if ([201, 200].includes(statusCode)) {
      if (data) {
        const { accessToken } = data;
        cookies.set('accessToken', accessToken);
        location.href = '/';
      }
    }
  };
</script>

<form class="sign-form" on:submit|preventDefault="{onSubmit}">
  <FormGroup
    target="email"
    label="이메일"
    value="{userInfo.email}"
    onChange="{onChange}"
    message="{messages.email}" />
  <FormGroup
    type="password"
    target="password"
    label="비밀번호"
    value="{userInfo.password}"
    onChange="{onChange}"
    message="{messages.password}" />
  <button type="submit">로그인</button>
  {#if messages.token}
    <div class="form-group-msg">{messages.token}</div>
  {/if}
  <HCaptcha />
</form>
