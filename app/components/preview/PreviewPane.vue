<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import { generateBiodataPdf } from '~/features/biodata/services/pdfGenerator';
import ClassicTemplate from '~/templates/classic/ClassicTemplate.vue';
import ModernTemplate from '~/templates/modern/ModernTemplate.vue';
import MinimalTemplate from '~/templates/minimal/MinimalTemplate.vue';
import IslamicTemplate from '~/templates/islamic/IslamicTemplate.vue';

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
  if (!pdfContainerRef.value || isGenerating.value) return;
  isGenerating.value = true;
  try {
    const name = biodata.identity.full_name || 'biodata';
    const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-cv.pdf`;
    await generateBiodataPdf(pdfContainerRef.value, filename);
  } catch (e) {
    console.error('Download failed:', e);
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <div class="min-w-0 space-y-6">
    <!-- Controls header -->
    <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap justify-between items-center gap-4">
      <div class="flex flex-wrap items-center gap-2 w-full min-w-0">
        <label class="text-sm font-semibold text-slate-700 font-inter whitespace-nowrap">Template Style:</label>
        <USelectMenu
          v-model="biodata.selectedTemplate"
          :items="templateOptions"
          value-key="value"
          label-key="label"
          class="min-w-0 flex-1 font-inter"
        />
      </div>

      <UButton
        @click="handleDownload"
        :loading="isGenerating"
        icon="i-lucide-download"
        variant="solid"
        color="success"
        class="font-inter w-full sm:w-auto"
      >
        Download Biodata PDF
      </UButton>
    </div>

    <!-- Scale the preview to its column while retaining full-size PDF content. -->
    <div ref="previewViewportRef" class="w-full min-w-0 overflow-hidden flex justify-center py-4 bg-slate-100 rounded-2xl border border-slate-200">
      <!-- Reserve the scaled dimensions so long pages remain fully scrollable. -->
      <div
        class="relative flex-shrink-0"
        :style="{ width: `${pageWidth * previewScale}px`, height: `${pageHeight * previewScale}px` }"
      >
        <div class="absolute top-0 left-0 origin-top-left bg-white shadow-xl" :style="{ transform: `scale(${previewScale})` }">
        <div ref="pdfContainerRef" class="w-[794px] min-h-[1123px] p-1 bg-white select-none">
          <ClientOnly>
            <KeepAlive>
              <component
                :is="activeTemplate"
                :data="biodata"
              />
            </KeepAlive>
          </ClientOnly>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
