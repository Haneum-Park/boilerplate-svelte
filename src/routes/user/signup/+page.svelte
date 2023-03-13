<script lang="ts">
  import Swal from 'sweetalert2';
  import { get } from 'svelte/store';
  import HCaptcha from '$block/HCaptcha.svelte';
  import FormGroup from '$block/FormGroup.svelte';
  import { captchaToken } from '$store/captcha';
  import fetchAPI from '$util/fetch.util';

  interface UserInfo {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    passwordConfirm: string;
    // TODO : 약관 동의 필요함
  }

  const userInfo = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    passwordConfirm: '',
  };

  let duplicate: boolean | null = null;

  const messages = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    passwordConfirm: '',
    token: '',
  };

  const onChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const { id, value } = e.currentTarget;
    if (id === 'passwordConfirm') {
      if (value !== userInfo.password) {
        messages.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      } else {
        messages.passwordConfirm = '';
      }
    }
    userInfo[id as keyof UserInfo] = value;
  };

  const onDuplicate = async () => {
    const { email } = userInfo;
    if (!email) {
      messages.email = '이메일을 입력해주세요';
      return;
    } else {
      messages.email = '';
    }
    const retData = await fetchAPI.get<{ duplicate: boolean }>('auth/duplicate', {}, { email });
    const { statusCode, data } = retData;
    console.log(statusCode, data);
    if ([200, 201].includes(statusCode)) {
      duplicate = data?.duplicate as boolean;
      if (data && data.duplicate) {
        messages.email = '이미 사용중인 이메일입니다.';
      } else {
        messages.email = '사용 가능한 이메일입니다.';
      }
    }
  };

  const onSubmit = async () => {
    const { email, firstname, lastname, password, passwordConfirm } = userInfo;
    const token = get(captchaToken);
    if (!email) messages.email = '이메일을 입력해주세요';
    else messages.email = '';
    if (!firstname) messages.firstname = '이름을 입력해주세요';
    else messages.firstname = '';
    if (!lastname) messages.lastname = '성을 입력해주세요';
    else messages.lastname = '';
    if (!password) messages.password = '비밀번호를 입력해주세요';
    else messages.password = '';
    if (!passwordConfirm) messages.passwordConfirm = '비밀번호 확인을 확인해주세요';
    else messages.passwordConfirm = '';
    if (!token) messages.token = 'Captcha 인증이 필요합니다.';
    else messages.token = '';
    if (!email || !firstname || !lastname || !password || !passwordConfirm || !token) {
      return;
    }
    if (duplicate) {
      messages.email = '중복확인을 해주세요.';
      return;
    } else {
      messages.email = '';
    }

    const retData = await fetchAPI.post('auth/signup', { ...userInfo, token });
    const {} = retData;
    if ([200, 201].includes(retData.statusCode)) {
      Swal.fire({
        title: '회원가입 성공',
        text: `${userInfo.lastname} ${userInfo.firstname}님, 가입을 환영합니다!`,
        confirmButtonText: '로그인 화면으로 이동',
      }).then((res) => {
        if (res.isConfirmed) {
          location.href = '/user/signin';
        }
      });
    }
  };
</script>

<form on:submit|preventDefault="{onSubmit}">
  <div class="form-email-group">
    <FormGroup
      autocomplete="on"
      target="email"
      label="이메일"
      value="{userInfo.email}"
      onChange="{onChange}"
      message="{messages.email}">
      <button type="button" on:click="{onDuplicate}"> 중복확인 </button>
    </FormGroup>
  </div>
  <div class="form-name-group">
    <FormGroup
      autocomplete="on"
      target="lastname"
      label="성"
      value="{userInfo.lastname}"
      onChange="{onChange}"
      message="{messages.lastname}" />
    <FormGroup
      autocomplete="on"
      target="firstname"
      label="이름"
      value="{userInfo.firstname}"
      onChange="{onChange}"
      message="{messages.firstname}" />
  </div>
  <FormGroup
    type="password"
    target="password"
    label="비밀번호"
    value="{userInfo.password}"
    onChange="{onChange}"
    message="{messages.password}" />
  <FormGroup
    type="password"
    target="passwordConfirm"
    label="비밀번호 확인"
    value="{userInfo.passwordConfirm}"
    onChange="{onChange}"
    message="{messages.passwordConfirm}" />
  <button type="submit">회원가입</button>
  {#if messages.token}
    <div class="form-group-msg">{messages.token}</div>
  {/if}
  <HCaptcha />
</form>

<style>
  .form-email-group {
    display: flex;
    align-items: center;
  }
  .form-name-group {
    display: flex;
    align-items: center;
  }
</style>
