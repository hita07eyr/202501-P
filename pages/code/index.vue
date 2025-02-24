<script setup>
const { data: codes } = await useTenkiCodes();
console.log('取得した天気コード:', codes);  // レスポンスを確認

const router = useRouter();
const config = useRuntimeConfig();
const CodeName = ref("");

const onSubmit = async () => {
  const response = await $fetch("/api/tenkiCode", {
    baseURL: config.public.backendOrigin,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: CodeName.value,
    }),
  }).catch((e) => e);
  if (response instanceof Error) return;
  router.push(`/`);
};

</script>

<template>
  <div>
    <h1>登録コード（場所）一覧</h1>
    <GamifyList>
      <GamifyItem v-for="code in codes" :key="code">
        <NuxtLink :to="`/code/${code}`">{{ code }}</NuxtLink>
      </GamifyItem>
    </GamifyList>

    <h2>登録コード（場所） 新規登録</h2>
    <form @submit.prevent>
      <div class="item">
        <P>コード 10～47</P>
        <input
          id="name"
          v-model="CodeName"
          @keydown.enter="valid && onOpen(true)"
        /><P>0000</P>
      </div>
      <GamifyButton type="button" @click="onSubmit">決定</GamifyButton>
    </form>
    <CatchButton :to="`/`">メニューに戻る</CatchButton>
  </div>
</template>


<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.code > label,
.code > span {
  display: block;
  margin-bottom: 0.25rem;
}
.code > span {
  font-size: 0.875rem;
}
</style>
