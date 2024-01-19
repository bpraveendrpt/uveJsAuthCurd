<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useAlertStore, useCountryStore } from '@/stores';
import { router } from '@/router';


const alertStore = useAlertStore();
const countryStore = useCountryStore();
const route = useRoute();
const id = route.params.id;


let title = 'Add Country';
let country = null;
if (id) {
    // edit mode
    title = 'Edit Country';
    ({ country } = storeToRefs(countryStore));
    countryStore.getById(id);
}

const schema = Yup.object().shape({
    countryname: Yup.string()
        .required('Country Name is required'),
    countrycode: Yup.string()
        .required('Country Code is required'),
   
});

async function onSubmit(values) {
   // console.log(values);
    try {
        let message;
        if (country) {
             console.log(country, 'updated');
            await countryStore.update(country.value.id, values)
            message = 'Country updated';
        } else {
            console.log(values, 'add');
            await countryStore.add(values);

            message = 'Country added';
        }
        await router.push('/countries');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(country?.loading || country?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="country" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Country Name</label>
                    <Field name="countryname" type="text" class="form-control" :class="{ 'is-invalid': errors.countryname }" />
                    <div class="invalid-feedback">{{ errors.countryname }}</div>
                </div>
                <div class="form-group col">
                    <label>Country Code</label>
                    <Field name="countrycode" type="number" class="form-control" :class="{ 'is-invalid': errors.countrycode }" />
                    <div class="invalid-feedback">{{ errors.countrycode }}</div>
                </div>
            </div>
            
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/countries" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="country?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="country?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading Countries: {{country.error}}</div>
        </div>
    </template>
</template>
