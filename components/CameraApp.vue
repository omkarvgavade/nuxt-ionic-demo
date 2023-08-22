<template>
    <div>
      <ion-button @click="openCameraApp" expand="block">
        Open Camera (App)
      </ion-button>
      <img v-if="photoData" :src="photoData" alt="Taken Photo" />
    </div>
  </template>
  
  <script>
  import { Plugins } from '@capacitor/core';
  
  const { Camera } = Plugins;
  
  export default {
    data() {
      return {
        photoData: null,
      };
    },
    methods: {
      async openCameraApp() {
        try {
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: 'base64',
          });
  
          this.photoData = image.base64Data;
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      },
    },
  };
  </script>
  