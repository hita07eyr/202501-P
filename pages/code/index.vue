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

const valid = computed(() => {
  const code = Number(CodeName.value); // 数値に変換
  return (
    CodeName.value.length > 0 &&
    !isNaN(code) &&
    code >= 100000 &&
    code <= 450000 &&
    code % 10000 === 0
  );
});


</script>

<template>
  <div>
    <h1>登録地点（コード）一覧</h1>
    <GamifyList>
      <GamifyItem v-for="code in codes" :key="code">
        <NuxtLink :to="`/code/${code}`">{{ code }}</NuxtLink>
      </GamifyItem>
    </GamifyList>

    <h2>登録地点追加</h2>
    <form @submit.prevent>
      <div class="item">
        <P>コードを入力してください</P>
        <P>（100000～450000）※ 10000単位に限定</P>
        <P>＜例＞群馬県：100000、東京都：130000、宮崎県：450000</P>
        <input
          id="name"
          v-model="CodeName"
          @keydown.enter="valid && onOpen(true)"
        />
      </div>
      <GamifyButton type="button" :disabled="!valid" @click="onSubmit">登録</GamifyButton>
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
