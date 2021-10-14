<template>
  <table class='table table-dark'>
    <thead>
    <tr>
      <th scope='col'>#</th>
      <th v-for='item in column' scope='col' :key='item.name'>{{ item.name }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for='(student,index) in data' :key='student.name'>
      <th scope='row'>{{ index }}</th>
      <td v-for='col in column' :key='col.name'>
        {{ student[col.slot] }}
        <slot :name='col.slot' :data='student'></slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'c-table',
  props: ['column', 'data'],
  setup(props) {
    return {}
  }
}
</script>
