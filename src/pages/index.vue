<template>
  <div>
    <div ref="ganttRef" class="h-[100vh]"></div>
  </div>
</template>

<script lang="ts" setup>
import { gantt } from 'dhtmlx-gantt';
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"
import { data } from '../mock/ganttData'
const ganttRef = ref()

onMounted(() => {
   // row自定义
   gantt.config.columns = [
    {
      label: '',
      name: '',
      width: '40',
      align: 'center',
      template: (task) => {
        const checkboxState = task.checkboxState
        if (checkboxState === 'checked') {
          return `<input class='is-indeterminate' type='checkbox' checked='true'>`
        } else if (checkboxState === 'unchecked') {
          return `<input  class='is-indeterminate' type='checkbox'>`
        } else {
          return `<input class='is-indeterminate' indeterminate type='checkbox'>`
        }
      }
    },
    // { label: 'id', name: 'id', width: '330' },
    // { label: 'sort', name: 'sort', width: '330' },
    // { label: 'parentWbsId', name: 'parentWbsId', width: '330' },
    {
      label: '工程部位',
      tree: true,
      name: 'name',
      min_width: 500,
      width: 800,
      template: (task) => {
        const html = `
        <div style='display:flex;align-items:center;justify-content: space-between;width:100%' title=${task.name}>
          <div class="name">${task.name || ''}</div>
          ${task.isWbs ? `<div class='actions_icon'><div class="addEbs" title="新增EBS"></div><div class='addWbs' title="新增WBS"></div><div class='banchAdd' title="批量新增"></div></div>` : ''}
        </div>
      `
        return html
      },
      editor: { type: 'custom_input_editor', map_to: 'name' }
    },
    {
      label: 'EBS标记',
      name: 'isWbs',
      width: '*',
      align: 'center',
      template: (task) => {
        return 1
      }
    },
    {
      label: '当前状态',
      name: 'ebsStatus',
      width: '*',
      align: 'center',
      template: (task) => {
        return 2
      }
    },
    {
      label: '工艺库编号',
      name: 'ebsTypeId',
      width: '*',
      align: 'center',
      template: (task) => {
        const html = `
          ${
            !task.isWbs
              ? task.ebsStatus === '' || task.ebsStatus === '0'
                ? `<div class="ebsType ellipsis_content" title=${task.ebsTypeName}>${task.ebsTypeName || ''}</div>`
                : `<div class="ebsType-notAllow ellipsis_content" title=${task.ebsTypeName}>${task.ebsTypeName || ''}</div>`
              : ''
          }`
        return html
      }
    },
    {
      label: '模型编码',
      name: 'sgcdm',
      min_width: 220,
      width: '*',
      align: 'center',
      editor: { type: 'custom_input_editor', map_to: 'sgcdm' },
      template: (task) => {
        const html = `
         <div title=${task.sgcdm} class="ellipsis_content">${task.sgcdm}</div>`
        return html
      }
    },
    {
      label: '图号',
      name: 'stuhao',
      width: '*',
      align: 'center',
      editor: { type: 'custom_input_editor', map_to: 'stuhao' },
      template: (task) => {
        const html = `
         <div title=${task.stuhao} class="ellipsis_content">${task.stuhao}</div>`
        return html
      }
    }
  ]
  gantt.init(ganttRef.value)
  const dataset = {
    data: data.map(item => {
      item.start_date = "01-01-2023"
      return item
    })
  }
  loadDataWithClear(dataset)
})


// 甘特图加载数据
function loadDataWithClear(dataset: any, clearAll = true) {
  if (clearAll) {
    gantt.clearAll()
  }
  gantt.parse(dataset)
  gantt.$grid.focus()
}

</script>

<style></style>