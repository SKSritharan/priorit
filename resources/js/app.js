import './bootstrap';

import {createApp} from 'vue';
import {createPinia} from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './components/App.vue';

const app = createApp(App)

const toastOptions = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
}

app.use(createPinia())
app.use(Toast, toastOptions)
app.mount('#app')
