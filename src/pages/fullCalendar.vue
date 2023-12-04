<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import locale from '@fullcalendar/core/locales/zh-cn'
import dayjs from 'dayjs'
import { meetings, rooms } from '../mock/data'

const calendarRef = ref()
const calendarApi = ref()

const calendarOptions = ref({
  plugins: [interactionPlugin, resourceTimelinePlugin],
  initialView: 'resourceTimeline',
  locale, // 语言
  headerToolbar: false, // 不显示头部按钮
  resourceAreaHeaderContent: '会议室', // 纵轴的第一行 用来表示纵轴的名称,
  // 此配置是为了消除右下角的版权提示
  schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
  slotMinTime: '06:00:00',
  slotMaxTime: '24:00:00',
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  // 设置拖拽的最小单位为1分钟
  snapDuration: '00:01:00',
  resourceAreaWidth: '20%',
  // 是否可以选中日历格
  selectable: true,
  // 是否可以进行（拖动、缩放）修改
  editable: true,
  // contentHeight: 650,
  // 视图中的事件显示是否可以重叠覆盖
  slotEventOverlap: false,
  select: (info: any) => {
    const obj = {
      id: Math.random(),
      start: info.start,
      end: info.end,
      resourceId: info.resource.id,
      roomName: info.resource.extendedProps.name,
      type: 'build',
    }
    calendarApi.value.addEvent(obj)
    calendarApi.value.unselect()
  },
  resources: [],
  events: [],
  eventDidMount() {
  },
  eventDragStop() {

  },
  eventResize(info: any) {
    const oldStart = info.oldEvent.start
    const oldEnd = info.oldEvent.end
    const event = info.event
    const newStart = event.start
    const newEnd = event.end
    // 比较新时间和旧时间
    const hasTimeChanged = newStart !== oldStart || newEnd !== oldEnd
    if (hasTimeChanged) {
      // 时间发生了变化
      event.setExtendedProp('type', 'build')
      calendarApi.value.updateEvent(event)
    }
  },
  eventAllow(event: any, draggedEvent: any) {
    // 根据逻辑判断事件是否允许编辑
    if (draggedEvent.extendedProps.type === 'build')
      return true

    return false
  },
})

async function getRooms() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rooms)
    }, 1000)
  })
}

async function getMeetings() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(meetings)
    }, 1000)
  })
}
onMounted(() => {
  calendarApi.value = calendarRef.value.getApi()

  nextTick(async () => {
    calendarOptions.value.resources = await getRooms()
    meetings.forEach((item: any) => {
      item.start = dayjs(item.startTime).format('YYYY-MM-DDTHH:mm:ss')
      item.end = dayjs(item.endTime).format('YYYY-MM-DDTHH:mm:ss')
      item.title = item.name
      item.resourceId = item.roomId
    })
    calendarOptions.value.events = await getMeetings()
  })
})
</script>

<template>
  <div>
    <FullCalendar ref="calendarRef" :options="calendarOptions">
      <template #resourceLabelContent="arg">
        <Popover placement="right" trigger="hover" :overlay-style="{ width: '400px' }" overlay-class-name="pop-room" :get-popup-container="() => body">
          <template #content>
            <div>
              <div class="title">
                {{ arg.resource.extendedProps.name }}
              </div>
              <div class="item">
                <div class="label">
                  组织单位 ：
                </div>
                <div class="value">
                  {{ arg.resource.extendedProps.deptName }}
                </div>
              </div>
              <div class="item">
                <div class="label">
                  管理员 ：
                </div>
                <div class="value">
                  {{ arg.resource.extendedProps.managerName }}
                </div>
              </div>
              <div class="item">
                <div class="label">
                  设施信息 ：
                </div>
                <div class="value">
                  {{ arg.resource.extendedProps.deviceName }}
                </div>
              </div>
              <div class="item">
                <div class="label">
                  可容纳人数 ：
                </div>
                <div class="value">
                  {{ arg.resource.extendedProps.capacity }}
                </div>
              </div>
              <div class="item">
                <div class="label">
                  备注 ：
                </div>
                <div class="value">
                  {{ arg.resource.extendedProps.remark || '-' }}
                </div>
              </div>
            </div>
          </template>
          <div class="resource-box">
            <div class="resource-title">
              {{ arg.resource.extendedProps.name }}
            </div>
            <div>
              <span class="resource-tag">{{ arg.resource.extendedProps.capacity }}人</span>
              <span v-for="(item, index) in arg.resource.extendedProps.deviceName.split(',')" :key="index" class="resource-tag">{{ item }}</span>
            </div>
          </div>
        </Popover>
      </template>
    </FullCalendar>
  </div>
</template>

<style>

</style>
