<script setup>
import { storeToRefs } from "pinia";

import { useCountryStore } from "@/stores";

const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

countryStore.getAll();


</script>

<template>
  <h1>Countries</h1>
  <router-link to="/countries/add" class="btn btn-sm btn-success mb-2"
    >Add country</router-link
  >
  <!-- <table class="table table-striped">
    <thead>
      <tr>
        <th style="width: 30%">Country Name</th>
        <th style="width: 30%">Country Code</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="countries.length">
        <tr v-for="county in countries" :key="county.id">
          <td>{{ county.countryname }}</td>
          <td>{{ county.countrycode }}</td>

          <td style="white-space: nowrap">
            <router-link
              :to="`/countries/edit/${county.id}`"
              class="btn btn-sm btn-primary mr-1"
              >Edit</router-link
            >
            <button
              @click="countryStore.delete(county.id)"
              class="btn btn-sm btn-danger btn-delete-county"
              :disabled="county.isDeleting"
            >
              <span
                v-if="county.isDeleting"
                class="spinner-border spinner-border-sm"
              ></span>
              <span v-else>Delete</span>
            </button>
          </td>
        </tr>
      </template>
      <tr v-if="countries.loading">
        <td colspan="4" class="text-center">
          <span class="spinner-border spinner-border-lg align-center"></span>
        </td>
      </tr>
      <tr v-if="countries.error">
        <td colspan="4">
          <div class="text-danger">
            Error loading Countries: {{ countries.error }}
          </div>
        </td>
      </tr>
    </tbody>
  </table> -->

  <template v-if="countries.length">
        <div class="card ">
            <div v-for="county in countries" :key="county.id" class="card-list" >
                <!-- <img src="..." class="card-img-top" alt="..." /> -->
                <div class="card-body">
                    <p class="card-text">  {{ county.countryname }} </p>  
                                 
                </div>
                <div class="card-footer"><span>#{{ county.countrycode }}</span></div>
                
               
            </div>
        </div>
  </template>

</template>
