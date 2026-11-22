<script setup lang="ts">
import { ref } from 'vue';
import { brand, documentConfig } from './config/product';
import FormWizard from './components/form/FormWizard.vue';
import PreviewPane from './components/preview/PreviewPane.vue';
const previewOpen = ref(false);
const baseURL = useRuntimeConfig().app.baseURL;
useHead({ link: [{ rel: 'icon', href: `${baseURL}favicon.ico` }] });
</script>
<template>
  <UApp>
    <div class="editor-shell">
      <header class="masthead">
        <a :href="baseURL" class="wordmark" aria-label="Home"><img v-if="brand.logo" :src="brand.logo" :alt="brand.name" /><span v-else>{{ brand.name }}<span class="wordmark-dot">.</span></span></a>
        <span class="document-name">{{ documentConfig.name }}</span>
      </header>
      <ClientOnly>
      <main class="workspace">
        <section class="form-column" aria-label="Document details">
          <FormWizard @preview="previewOpen = true" />
        </section>
        <aside class="desktop-preview" aria-label="Live document preview"><PreviewPane /></aside>
      </main>
      <template #fallback><main class="workspace min-h-[700px]" aria-busy="true">Opening your draft…</main></template>
      </ClientOnly>
      <USlideover v-model:open="previewOpen" title="Review your document" description="Check your details and choose a layout before downloading." side="bottom" :ui="{ content: 'h-dvh max-h-dvh rounded-none', body: 'p-0 sm:p-0', header: 'min-h-16' }">
        <template #body><PreviewPane fullscreen @edit="previewOpen = false" /></template>
      </USlideover>
    </div>
  </UApp>
</template>
