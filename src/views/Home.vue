<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <h1>Hi {{user.firstName}}!</h1>
        <p>You're logged in with Adim Dashboard</p>
        <router-link to="/users">Manage Users</router-link>| 
        <router-link to="/countries">Manage Countries</router-link>
    </div>
</template>
