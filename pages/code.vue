<script setup>
const router = useRouter();
//const config = useRuntimeConfig();
const tenkiCode = ref("");
const valid = computed(() => tenkiCode.value.length > 0);
/*
const safeTrainerName = computed(() => trimAvoidCharacters(trainerName.value));
const onSubmit = async () => {
  const response = await $fetch("/api/trainer", {
    baseURL: config.public.backendOrigin,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: safeTrainerName.value,
    }),
  }).catch((e) => e);
  if (response instanceof Error) return;
  router.push(`/trainer/${safeTrainerName.value}`);
};

*/
/*
const onSubmit = async () => {
  const response = await $fetch("/api/trainer", {
    baseURL: config.public.backendOrigin,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: tenkiCode.value,
    }),
  }).catch((e) => e);
  if (response instanceof Error) return;
  router.push(`/tenki`);
};
*/

const { dialog, onOpen, onClose } = useDialog();

const onOK = async () => {
  router.push(`/tenki`);
};

</script>

<template>
  <div>
    <h1>天気を調べる</h1>
    <form @submit.prevent>
      <div class="cod">
        <P>コードは？</P>
        <input
          id="code"
          v-model="tenkiCode"
          aria-describedby="name-description"
          @keydown.enter="valid && onOpen(true)"
        />
      </div>
      <GamifyButton type="button" :disabled="!valid" @click="onOpen(true)"
        >けってい</GamifyButton>
    </form>
    /*
    <GamifyDialog
      v-if="dialog"
      id="confirm-submit"
      title="かくにん"
      :description="`${tenkiCode}ですね？`"
      @close="onClose"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="onClose">いいえ</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onOK">はい</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>  
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
