<template>
    <td aria-rowindex={{rowIndex}} aria-colindex={{colIndex}}>
        {{letter}}
    </td>
</template>

<script>
export default {
  name: 'Letter',
  props: ['rowIndex', 'colIndex', 'letter']
}
</script>

<style scoped>
</style>
