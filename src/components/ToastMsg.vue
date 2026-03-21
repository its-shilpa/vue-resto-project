<template>
  <div v-if="visible" class="toast">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: ""
    };
  },
  methods: {
    show(msg) {
      this.message = msg;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 2000);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #333;
  color: #fff;
  padding: 12px 18px;
  border-radius: 8px;
  z-index: 9999;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>