import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';

// setup fake backend
import { fakeBackend,  countriesBackend } from './helpers';
fakeBackend();
countriesBackend();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
