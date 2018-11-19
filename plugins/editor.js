import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'

import Quill from 'quill'

import {ImageUpload} from 'quill-image-upload';

Quill.register('modules/imageUpload', ImageUpload);
Vue.use(VueQuillEditor)
