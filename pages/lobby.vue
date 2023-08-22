<template>
    <ion-page class="lobby-page-container">
        <!-- <ion-button>Play Game</ion-button> -->
        <template v-if="isMobileApp">
            <CameraApp />
        </template>
        <template v-else>
            <CameraBrowser />
        </template>
    </ion-page>
</template>

<script>
import CameraApp from '../components/CameraApp';
import CameraBrowser from '../components/CameraBrowser';
export default {
    layout: 'default',
    components: {
        CameraApp,
        CameraBrowser
    },
    computed: {
        isMobileApp() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
        },
    },
}
</script>

<style scoped>
.lobby-page-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>