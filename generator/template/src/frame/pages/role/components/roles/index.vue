<template>
  <el-scrollbar
    :vertical="true"
    class="scroll-menu-container"
  >
    <div
      v-for="(menu, index) in roles"
      :key="menu.id"
      class="fa-item"
      :class="{'selected': index === current}"
      @click="onSelect(menu, index)"
    >
      <span class="menu-text">{{ menu.roName }}</span>
      <el-tooltip class="item" effect="dark" content="页面权限" placement="top-start">
        <i class=" el-icon-view" @click="editPower(menu, index)" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="编辑部门" placement="top-start">
        <i class="el-icon-edit" @click="onEdit(menu, index)" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除部门" placement="top-start">
        <i class="el-icon-delete" @click="onDel(menu, index)" />
      </el-tooltip>
    </div>

    <powerForm ref="powerForm" />

  </el-scrollbar>
</template>

<script>
import powerForm from './components/powerForm'
export default {
  name: 'roles',
  components: {
    powerForm
  },
  props: {
    roles: {
      type: Array,
      default: () => ([])
    },
    current: {
      type: Number,
      default: 0
    }
  },
  methods: {
    editPower(menu) {
      this.$refs.powerForm.setValue(menu.roCode)
    },
    onSelect(menu, index) {
      this.$emit('update:current', index)
    },
    onEdit(menu, index) {
      this.$emit('edit', menu, index)
    },
    onDel(menu, index) {
      this.$emit('del', menu, index)
    }
  }
}
</script>

<style lang='scss'>
@import '@/styles/variables.scss';
.scroll-menu-container {
  height: calc(100% - 20px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .fa-item {
    margin: 10px 10px 10px 20px;
    color: #666666;
    padding: 12px 18px;
    cursor: pointer;
    transition: background-color 1s, color .3s;
    font-size: 14px;
    position: relative;
    display: flex;
    .menu-text {
      flex-grow: 1;
    }
    i {
      flex-shrink: 0;
      color: #999;
      margin-left: 10px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 5px;
      top: 50%;
      right: 0;
      bottom: 50%;
      background-color: $theme;
      transition: top .2s, bottom .2s;
    }
    &.selected {
      background-color: #EDFFF7;
      color: $theme;
      &::after {
        top: 0;
        bottom: 0;
      }
    }
    &:hover {
      background-color: #EDFFF7;
    }
  }
}
</style>
