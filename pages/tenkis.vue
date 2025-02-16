<script setup>
//const router = useRouter();
//const config = useRuntimeConfig();
//const areaCode = ref("");
//const safeareaCode = computed(() => trimAvoidCharacters(areaCode.value));
//const valid = computed(() => safeareaCode.value.length > 0);

/*
 const onSubmit = async () => {
  const response = await $fetch("/api/tenki", {
    baseURL: config.public.backendOrigin,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: safeareaCode.value,
    }),
  }).catch((e) => e);
  if (response instanceof Error) return;
 router.push(`/tenki/`);
};
const { dialog, onOpen, onClose } = useDialog();
const { data: Tenkis } = await useTenkis();
*/
const { data: Tenkis } = await useTenkis();

</script>

<template>
  <div>
    <h1>大阪の天気</h1>
    <GamifyList>
      <GamifyItem v-for="tenki in Tenkis" :key="tenki">
        <NuxtLink :to="`/tenki`">{{ tenki }}</NuxtLink>
      </GamifyItem>
    </GamifyList>
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

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
