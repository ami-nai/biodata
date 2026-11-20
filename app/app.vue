<script lang="ts" setup>
import { ref } from 'vue';
import FormWizard from './components/form/FormWizard.vue';
import PreviewPane from './components/preview/PreviewPane.vue';

// On mobile, let users toggle between form editor and live preview
const activeTab = ref<'edit' | 'preview'>('edit');
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <!-- Navbar Branding Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-primary flex justify-center items-center text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <h1 class="text-md font-bold text-slate-800 font-inter leading-none">Marriage Biodata</h1>
            <span class="text-[10px] text-slate-400 font-inter font-semibold uppercase tracking-wider">Generator</span>
          </div>
        </div>

        <div class="flex items-center gap-4 text-xs font-semibold text-slate-500 font-inter">
          <span>Version 1.0</span>
        </div>
      </div>
    </header>

    <!-- Main Workspace Content Area -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      <!-- Title section -->
      <div class="flex flex-col gap-1.5 md:flex-row md:items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-800 font-inter">Create Marriage Biodata</h2>
          <p class="text-sm text-slate-500 font-inter">Fill out details and download a polished PDF instantly.</p>
        </div>

        <!-- Mobile Toggles -->
        <div class="flex lg:hidden mt-3 lg:mt-0 justify-center">
          <UTabs
            v-model="activeTab"
            :items="[
              { label: 'Edit Form', value: 'edit' },
              { label: 'Live Preview', value: 'preview' }
            ]"
            class="w-full max-w-xs font-inter"
          />
        </div>
      </div>

      <!-- Split Layout Workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left Side: Wizard Form (Hidden on mobile if preview tab active) -->
        <div
          class="lg:col-span-6 w-full min-w-0"
          :class="[activeTab === 'edit' ? 'block' : 'hidden lg:block']"
        >
          <FormWizard />
        </div>

        <!-- Right Side: Real-time Live Preview (Hidden on mobile if edit tab active) -->
        <div
          class="lg:col-span-6 w-full min-w-0"
          :class="[activeTab === 'preview' ? 'block' : 'hidden lg:block']"
        >
          <PreviewPane />
        </div>
      </div>
    </main>

    <!-- Footer branding -->
    <footer class="bg-white border-t border-slate-200 py-4 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 font-inter font-medium">
        &copy; 2026 Marriage Care BD. Powered by Anilon Devs.
      </div>
    </footer>
  </div>
</template>

<style>
/* Make layout feel clean */
body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}
</style>
