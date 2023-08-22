<template>
  <ion-page class="index-container">
    <h1 class="index-title">Welcome to Nuxt Ionic App</h1>
    <p class="index-description">Click below to login:</p>
    <nuxt-link to="/login" class="index-login-link">Login</nuxt-link>
  </ion-page>
</template>
  
<style scoped>
.index-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* Center the text horizontally */
}

.index-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.index-description {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}

.index-login-link {
  font-size: 20px;
  color: #5291ff;
  text-decoration: none;
  border: 2px solid #5291ff;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.index-login-link:hover {
  background-color: #5291ff;
  color: #fff;
}

@media (max-width: 600px) {
  .index-title {
    font-size: 28px;
  }

  .index-description {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .index-login-link {
    font-size: 18px;
    padding: 8px 16px;
  }
}
</style>
  