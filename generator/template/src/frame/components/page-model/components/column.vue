<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :sort-orders="column['sort-orders'] || useConfig.table['sort-orders']"
    :sortable="column.sortValue ? 'custom' : false"
    :min-width="column['min-width']"
  >
    <template
      v-if="!column.children && (column.html || column.render || column.renderFn)"
      v-slot="{row, $index}"
    >
      <table-cell-template
        :html="column.html && column.html.call(context, row, $index)"
        :render="column.render && column.render.call(context, row, $index)"
        :render-fn="column.renderFn && column.renderFn.bind(context, row, $index)"
        :click="column.click && typeof column.click === 'function' && column.click.bind(context, row, $index)"
      />
    </template>
    <template v-if="column.children">
      <column v-for="(ccolumn, index) in column.children" :key="index" :column="ccolumn" />
    </template>
  </el-table-column>
</template>

<script>
import provideMixin from '../utils/provide-mixin'
export default {
  name: 'Column',
  mixins: [provideMixin],
  props: {
    column: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
