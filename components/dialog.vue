<template>
  <Teleport to="body">
    <dialog ref="dialog" class="dialog" v-bind="attrs" @click="backdropClick">
      <div class="dialog__container">
        <div class="dialog__top">
          <h2 class="dialog__heading">{{ title }}</h2>
          <button @click="$emit('close-modal')" type="button" class="dialog__close" title="Close modal">
            <Icon name="line-md:remove" class="dialog__close-icon" />
          </button>
        </div>
        <div class="dialog__content">
          <slot />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect, useAttrs } from "vue";
const emit = defineEmits(["close-modal"]);
const dialog = ref<InstanceType<any> | undefined>(null);
const attrs = useAttrs();
const internalOpen = ref(false);
const props = defineProps({
  open: Boolean,
  title: String,
});

const toggleDialog = () => {
  if (!dialog?.value) return;
  props.open ? dialog.value.showModal() : dialog.value.close();
};

onMounted(() => {
  watchEffect(() => {
    if (props.open !== internalOpen.value) {
      toggleDialog();
      internalOpen.value = props.open;
    }
  });
});

const backdropClick = (event: MouseEvent) => {
  if (!dialog?.value) return;
  const rect = dialog.value.getBoundingClientRect();
  const isInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width;

  if (!isInDialog && props.open) {
    emit("close-modal");
  }
};
</script>
<style lang="scss">
@import "~/scss/main.scss";

.dialog {
  background-color: $white;
  border-radius: 16px;
  border: none;
  max-width: 560px;
  padding: 0;
  width: 80vw;
  z-index: 10;

  &::backdrop {
    background-color: rgba($black, 0.1);
    backdrop-filter: blur(2px);
  }
}

.dialog__container {
  display: flex;
  flex-direction: column;
}

.dialog__top {
  align-items: center;
  background-color: $bright-lavender;
  color: $white;
  display: flex;
  justify-content: space-between;
  padding: 10px 32px;
}

.dialog__heading {
  font-size: 14px;
  font-weight: normal;
  line-height: 1;
  margin: 0;
}

.dialog__close {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  height: 16px;
  justify-content: center;
  line-height: 1;
  width: 16px;
}

.dialog__close-icon {
  color: $jack-and-coke;
}

.dialog__content {
  padding: 32px;
  flex: 1 1 auto;
}
</style>
