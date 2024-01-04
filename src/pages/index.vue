<template>
  <div>
    <a-form :model="formState" :rules="rules">
      <a-form-item label="Username" v-bind="validateInfos.username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="arr" v-bind="validateInfos['data.arr']">
        <a-select :value="formState.data.arr" mode="multiple" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button @click="submit" type="primary">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'ant-design-vue';

const rules = {
  username: [
    { required: true, message: 'Please input your username!' }
  ],
  'data.arr': [
    { required: true, message: 'Please select your favorite color!' }
  ]
}
const formState = ref({
  username: '',
  data: {
    arr: []
  }
})
const useForm = Form.useForm;
const { resetFields, validate, validateInfos } = useForm(
  formState,
  reactive(rules),
);
function handleChange(e: any) {
  console.log(e);
  formState.value.data.arr = e
}

function submit() {
  validate()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log('error', err);
    });

}
</script>

<style></style>