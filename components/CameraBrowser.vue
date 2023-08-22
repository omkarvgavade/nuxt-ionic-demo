<template>
    <div>
      <ion-button @click="openCamera" expand="block">
        Open Camera
      </ion-button>
      <video ref="cameraVideo" autoplay playsinline style="display: none;"></video>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async openCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          this.$refs.cameraVideo.srcObject = stream;
          this.$refs.cameraVideo.style.display = 'block';
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* You can also add global Ionic styles here if needed */
  </style>
  