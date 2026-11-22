<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import { generateBiodataPdf } from '~/features/biodata/services/pdfGenerator';
import ClassicTemplate from '~/templates/classic/ClassicTemplate.vue';
import ModernTemplate from '~/templates/modern/ModernTemplate.vue';
import MinimalTemplate from '~/templates/minimal/MinimalTemplate.vue';
import IslamicTemplate from '~/templates/islamic/IslamicTemplate.vue';

const props = defineProps<{ fullscreen?: boolean }>();
const emit = defineEmits(['edit']);
const zoom = ref(false);
const downloadStatus = ref('');
const exportContainerRef = ref<HTMLElement | null>(null);
const { biodata } = useBiodataForm();
const isGenerating = ref(false);
const pdfContainerRef = ref<HTMLElement | null>(null);
const previewViewportRef = ref<HTMLElement | null>(null);
const pageWidth = 794;
const pageHeight = ref(1123);
const previewScale = ref(1);
let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  const updatePreviewSize = () => {
    const availableWidth = previewViewportRef.value?.clientWidth ?? 0;
    if (availableWidth > 0) {
      previewScale.value = Math.min(1, Math.max(0, availableWidth - 32) / pageWidth);
    }
    pageHeight.value = pdfContainerRef.value?.offsetHeight || 1123;
  };
  resizeObserver = new ResizeObserver(updatePreviewSize);
  if (previewViewportRef.value) resizeObserver.observe(previewViewportRef.value);
  if (pdfContainerRef.value) resizeObserver.observe(pdfContainerRef.value);
  updatePreviewSize();
});

onBeforeUnmount(() => resizeObserver?.disconnect());

const templateOptions = [
  { value: 'classic', label: 'Classic Elegance' },
  { value: 'modern', label: 'Modern Professional' },
  { value: 'minimal', label: 'Minimalist Sleek' },
  { value: 'islamic', label: 'Islamic Traditional' },
];

const templateMap: Record<string, object> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  islamic: IslamicTemplate,
};

const activeTemplate = computed(() => templateMap[biodata.selectedTemplate] ?? ClassicTemplate);

const handleDownload = async () => {
  if (!exportContainerRef.value || isGenerating.value) return;
  downloadStatus.value = 'Preparing your PDF…';
  await nextTick();
  isGenerating.value = true;
  try {
    const name = biodata.identity.full_name || 'biodata';
    const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-cv.pdf`;
    await generateBiodataPdf(exportContainerRef.value, filename);
    downloadStatus.value = 'Your PDF is ready. Check your downloads.';
  } catch (e) {
    console.error('Download failed:', e);
    downloadStatus.value = 'Could not create the PDF. Please try again.';
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <section :class="fullscreen ? 'preview-fullscreen' : 'preview-panel'">
    <div class="preview-toolbar">
      <h2 v-if="!fullscreen">Your document</h2>
      <UButton v-if="fullscreen" color="neutral" variant="ghost" @click="emit('edit')">Back to details</UButton>
      <UButton color="neutral" variant="outline" :aria-pressed="zoom" @click="zoom = !zoom">{{ zoom ? 'Fit to width' : 'Zoom in' }}</UButton>
      <label class="sr-only" :for="fullscreen ? 'mobile-template' : 'desktop-template'">Layout</label>
      <USelectMenu :id="fullscreen ? 'mobile-template' : 'desktop-template'" v-model="biodata.selectedTemplate" :items="templateOptions" value-key="value" label-key="label" class="w-full" />
    </div>
    <div ref="previewViewportRef" class="preview-frame" tabindex="0" aria-label="Document preview. Zoom in to read and scroll to inspect the whole document.">
      <div class="relative mx-auto" :style="{ width: `${pageWidth * (zoom ? 1 : previewScale)}px`, height: `${pageHeight * (zoom ? 1 : previewScale)}px` }">
        <div class="absolute top-0 left-0 origin-top-left" :style="{ transform: `scale(${zoom ? 1 : previewScale})` }">
          <div ref="pdfContainerRef" class="w-[794px] min-h-[1123px] p-1 bg-white select-none" style="font-family:Inter,sans-serif">
            <ClientOnly><component :is="activeTemplate" :data="biodata" /></ClientOnly>
          </div>
        </div>
      </div>
    </div>
    <div class="preview-footer">
      <p class="preview-status" role="status">{{ downloadStatus || 'Check every detail before downloading.' }}</p>
      <UButton :loading="isGenerating" :disabled="isGenerating" @click="handleDownload">{{ isGenerating ? 'Preparing PDF…' : 'Download PDF' }}<UIcon name="i-lucide-download" /></UButton>
    </div>
    <!-- A mounted, unscaled copy keeps the PDF independent of preview zoom and scrolling. -->
    <div aria-hidden="true" inert style="position:fixed; left:-10000px; top:0; pointer-events:none; width:794px;">
      <div ref="exportContainerRef" class="w-[794px] min-h-[1123px] p-1 bg-white select-none" style="font-family:Inter,sans-serif">
        <ClientOnly><component :is="activeTemplate" :data="biodata" /></ClientOnly>
      </div>
    </div>
  </section>
</template>
