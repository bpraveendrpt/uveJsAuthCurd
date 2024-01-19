import { defineStore } from 'pinia';
import { fetchWrapperContries } from '@/helpers';



const baseUrl = `${import.meta.env.VITE_API_URL}/countries`;

export const useCountryStore = defineStore({
    id: 'countries',
    state: () => ({
        countries: {},
        country: {}
    }),
    actions: {
        async add(country) {
            console.log(country);
            await fetchWrapperContries.post(`${baseUrl}/add`, country);
        },
        async getAll() {
            
            this.countries = { loading: true };
            try {
                this.countries = await fetchWrapperContries.get(baseUrl);    
                
            } catch (error) {
                this.countries = { error };
            }
        },
        async getById(id) {
            this.country = { loading: true };
            try {
                this.country = await fetchWrapperContries.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.country = { error };
            }
        },
        async update(id, params) {
            await fetchWrapperContries.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.countries.find(x => x.id === id).isDeleting = true;

            await fetchWrapperContries.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.countries = this.countries.filter(x => x.id !== id);

            
            
        }
    }
});
