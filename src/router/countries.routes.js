import { Layout, List, AddEdit } from '@/views/countries';

export default {
    path: '/countries',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};
