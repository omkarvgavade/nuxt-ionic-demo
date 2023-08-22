<template>
  <ion-page id="container">
    <div>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-14db69c8="">
        <!-- SVG path -->
      </svg>
    </div>
    <h1 v-if="selectedOption === 'mobile_password'">Login with Mobile & Password</h1>
    <h1 v-else>Login with OTP</h1>

    <!-- Mobile Number and Password Login Option -->
    <div v-if="selectedOption === 'mobile_password'">
      <form @submit="handleMobileLogin">
        <ion-input type="tel" placeholder="Mobile Number" v-model="mobileNumber" required></ion-input>
        <ion-input type="password" placeholder="Password" v-model="password" required></ion-input>
        <ion-button type="submit" class="mobile-password-button">Login</ion-button>
      </form>
      <ion-button @click="selectedOption = 'otp'" class=" small-text-button otp-button">Login with OTP</ion-button>
    </div>

    <!-- OTP Login Option -->
    <div v-else>
      <form @submit="handleOTPLogin">
        <ion-input type="tel" placeholder="Mobile Number" v-model="mobileNumberOTP" required></ion-input>
        <ion-button type="submit" class="otp-button">Get OTP</ion-button>
        <ion-button @click="selectedOption = 'mobile_password'" class="big-text-button mobile-password-button">
          Login with Mobile & Password
        </ion-button>
      </form>
    </div>
    <div>
      <ion-toast :is-open="isOpen" :message="toastMsg" class="custom-toast" :duration="3000"
        @didDismiss="this.handleDismiss"></ion-toast>
      <ion-modal :is-open="isModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Otp Verification</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="this.isModalOpen = false">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding modal-content">
          <p>otp is sent to your mobile number! Please enter otp and login</p>
          <form @submit="handleOtpEnter">
            <ion-input type="number" placeholder="Enter otp" v-model="enteredOtp" required></ion-input>
            <ion-button type="submit" class="mobile-password-button">Verify</ion-button>
          </form>
        </ion-content>
      </ion-modal>
    </div>
  </ion-page>
</template>

<script>
import { IonToast } from '@ionic/vue';

export default {
  layout: 'default',
  components: {
    IonToast,
  },
  data() {
    return {
      selectedOption: 'mobile_password',
      mobileNumber: '',
      password: '',
      mobileNumberOTP: '',
      otp: '',
      isOpen: false,
      toastMsg: "",
      isModalOpen: false,
      enteredOtp: ''
    };
  },
  methods: {
    handleMobileLogin(event) {
      event.preventDefault();
      if (!(this.mobileNumber.length == 10)) {
        this.setOpen("Please enter correct mobile number!");
        return;
      } else if (this.password != 'abc@123' || this.mobileNumber != '7777777777') {
        this.setOpen("Please enter correct login details!");
        return;
      }
      this.$router.push('/lobby');

    },
    handleOTPLogin(event) {
      event.preventDefault();
      if (this.mobileNumberOTP.length != 10) {
        this.setOpen("Please enter correct mobile number!");
        return;
      }
      this.setModalOpen();
    },

    handleOtpEnter(event) {
      event.preventDefault();
      if (this.enteredOtp.length < 6) {
        this.setOpen('please enter correct otp!');
        return;
      }
      this.isModalOpen = false;
      this.$router.push('/lobby');

    },

    setOpen(msg) {
      this.toastMsg = msg;
      this.isOpen = true;
    },
    setModalOpen() {
      this.isModalOpen = true;
    },
    handleDismiss() {
      this.isOpen = false;
      this.isModalOpen = false;
      this.toastMsg = "";
    }
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container svg {
  /* Add SVG styling if needed */
}

#container h1 {
  font-size: 24px;
  margin-top: 20px;
}

/* Add more styling if needed */

/* Responsive styles */
ion-input {
  max-width: 300px;
  margin: 0 auto;
}

ion-button {
  margin-top: 10px;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.mobile-password-button {
  background-color: #5291ff;
  color: #fff;
}

.modal-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content p {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}

.otp-button {
  background-color: #ff6b6b;
  color: #fff;
}

.small-text-button {
  font-size: 12px;
}

.big-text-button {
  max-width: 300px;
}

@media (max-width: 500px) {
  #container {
    top: 40%;
  }

  #container h1 {
    font-size: 20px;
  }

  /* Add more responsive styles if needed */
}

ion-toast.custom-toast {
  --background: #d42323;
  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  --color: #ffffff;
}

ion-toast.custom-toast::part(message) {
  font-style: italic;
}

ion-toast.custom-toast::part(button) {
  border-left: 1px solid #d2d2d2;
  color: #030207;
  font-size: 15px;
  font-weight: bold;
}
</style>
