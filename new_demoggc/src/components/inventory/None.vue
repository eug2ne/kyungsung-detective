<template>
  <div class="wrapper">
    <p>
      아직 얻지않은 <br />
      아이템입니다.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  background-color: white;
  border-color: #808080;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%23808080' /></svg>");
  box-shadow: 0 10px 0 rgba(255, 255, 255, 0.4) inset,
    0 -10px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 310px lightgray inset;
}

.wrapper p {
  position: absolute;
  top: 48%;
  left: 13%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 20px;
  line-height: 150%;
}
</style>