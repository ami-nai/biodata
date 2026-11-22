<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue: string; disabled?: boolean; id?: string }>();
const emit = defineEmits(['update:modelValue']);
let lastEmitted: string | undefined;
const day = ref(''); const month = ref(''); const year = ref('');
watch(() => props.modelValue, value => { if (value === lastEmitted) return; const parts = (value || '').split('-'); year.value = parts[0] || ''; month.value = parts[1] || ''; day.value = parts[2] || ''; }, { immediate: true, flush: 'sync' });
const update = () => {
  lastEmitted = year.value.length === 4 && month.value && day.value ? `${year.value}-${month.value.padStart(2, '0')}-${day.value.padStart(2, '0')}` : '';
  emit('update:modelValue', lastEmitted);
};
</script>
<template>
  <div class="flex gap-2" role="group" aria-label="Date of birth: day, month, year">
    <div class="flex-1 min-w-0"><label :for="id" class="text-xs">Day</label><UInput :id="id" v-model="day" inputmode="numeric" maxlength="2" placeholder="DD" :disabled="disabled" @blur="update" class="w-full" /></div>
    <div class="flex-1 min-w-0"><label :for="`${id}-month`" class="text-xs">Month</label><UInput :id="`${id}-month`" v-model="month" inputmode="numeric" maxlength="2" placeholder="MM" :disabled="disabled" @blur="update" class="w-full" /></div>
    <div class="flex-1 min-w-0"><label :for="`${id}-year`" class="text-xs">Year</label><UInput :id="`${id}-year`" v-model="year" inputmode="numeric" maxlength="4" placeholder="YYYY" :disabled="disabled" @blur="update" class="w-full" /></div>
  </div>
</template>
