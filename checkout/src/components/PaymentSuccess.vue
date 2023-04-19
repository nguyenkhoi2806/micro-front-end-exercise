<template>
  <div class="container">
    <p>
      <i class="fa fa-check-circle-o"></i>
      <span> Payment Successful! </span>
    </p>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2ecc71;
    gap: 1rem;
    width: 70%;

    padding: 32px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 2rem;
    color: white;

    i {
      font-size: 5rem;
    }
  }
}
</style>
